import apiKey from '../helpers/apiKey'
import React, { useState, useContext, useEffect } from 'react'
import round from '../helpers/round'
import PaymentRoutingContext from '../contexts/PaymentRoutingContext'
import UpdateContext from '../contexts/UpdateContext'
import WalletContext from '../contexts/WalletContext'
import { CONSTANTS } from 'depay-web3-constants'
import { ethers } from 'ethers'
import { route } from 'depay-web3-payments'

export default (props)=>{

  const [allRoutes, setAllRoutes] = useState()
  const [selectedRoute, setSelectedRoute] = useState()
  const [reloadCount, setReloadCount] = useState(0)
  const { account } = useContext(WalletContext)
  const { update } = useContext(UpdateContext)
  const prepareAcceptedPayments = (accept)=>{
    let toAddress = typeof accept.receiver == 'object' ? accept.receiver.address : accept.receiver
    let toContract = typeof accept.receiver == 'object' ? accept.receiver : undefined
    return({ 
      ...accept, 
      toAddress,
      toContract,
      fromAddress: account
    })
  } 
  const getPaymentRoutes = ({ allRoutes, selectedRoute, update })=>{
    if(update == false || props.accept == undefined || account == undefined) { return }
    route({
      accept: props.accept.map(prepareAcceptedPayments),
      whitelist: props.whitelist,
      blacklist: props.blacklist,
      event: props.event,
      apiKey
    }).then((routes)=>{
      if(routes.length == 0) {
        setAllRoutes([])
      } else {
        roundAmounts(routes).then((roundedRoutes)=>{
          let selected = selectedRoute ? (roundedRoutes[allRoutes.indexOf(selectedRoute)] || roundedRoutes[0]) : roundedRoutes[0]
          setSelectedRoute(selected)
          setAllRoutes(roundedRoutes)
        })
      }
    })
  }
  const roundAmounts = async (routes)=> {
    return Promise.all(routes.map(async (route)=>{
      if(route.directTransfer){ return route }
      let readableAmount = await route.fromToken.readable(route.transaction.params.amounts[0])
      let roundedAmountBN = await route.fromToken.BigNumber(round(readableAmount))
      route.fromAmount = roundedAmountBN.toString()
      route.transaction.params.amounts[0] = roundedAmountBN.toString()
      if(route.transaction.value && route.transaction.value.toString() != '0') {
        route.transaction.value = roundedAmountBN.toString()
      }
      return route
    }))
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReloadCount(reloadCount + 1)
      getPaymentRoutes({ allRoutes, selectedRoute, update })  
    }, 15000);

    return () => clearTimeout(timeout)
  }, [reloadCount, allRoutes, selectedRoute, update])

  useEffect(() => {
    if(account && props.accept) {
      setAllRoutes(undefined)
      setSelectedRoute(undefined)
      getPaymentRoutes({})
    } else {
      setAllRoutes(undefined)
      setSelectedRoute(undefined)
    }
  }, [account, props.accept])

  return(
    <PaymentRoutingContext.Provider value={{
      selectedRoute: selectedRoute,
      setSelectedRoute: setSelectedRoute,
      allRoutes: allRoutes,
      setAllRoutes: setAllRoutes
    }}>
      { props.children }
    </PaymentRoutingContext.Provider>
  )
}
