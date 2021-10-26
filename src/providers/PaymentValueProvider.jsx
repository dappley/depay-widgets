import apiKey from '../helpers/apiKey'
import ConfigurationContext from '../contexts/ConfigurationContext'
import ErrorContext from '../contexts/ErrorContext'
import PaymentContext from '../contexts/PaymentContext'
import PaymentValueContext from '../contexts/PaymentValueContext'
import React, { useState, useEffect, useContext } from 'react'
import UpdateContext from '../contexts/UpdateContext'
import WalletContext from '../contexts/WalletContext'
import { CONSTANTS } from 'depay-web3-constants'
import { Currency } from 'depay-local-currency'
import { ethers } from 'ethers'
import { route } from 'depay-web3-exchanges'
import { Token } from 'depay-web3-tokens'

export default (props)=>{

  const { setError } = useContext(ErrorContext)
  const { account } = useContext(WalletContext)
  const { update } = useContext(UpdateContext)
  const { payment } = useContext(PaymentContext)
  const [ paymentValue, setPaymentValue ] = useState()
  const { currency } = useContext(ConfigurationContext)
  const [ reloadCount, setReloadCount ] = useState(0)
  const getToTokenLocalValue = ({ update, payment })=>{
    if(update == false || payment?.route == undefined) { return }
    Promise.all([
      route({
        blockchain: payment.route.blockchain,
        tokenIn: payment.route.fromToken.address,
        tokenOut: CONSTANTS[payment.route.blockchain].NATIVE,
        amountIn: payment.route.fromAmount,
        fromAddress: account,
        toAddress: account
      }),
      (new Token({ blockchain: payment.route.blockchain, address: CONSTANTS[payment.route.blockchain].NATIVE })).decimals()
    ]).then(([USDExchangeRoutes, USDDecimals])=>{
      let USDRoute = USDExchangeRoutes[0]

      let USDAmount
      if(payment.route.fromToken.address.toLowerCase() == CONSTANTS[payment.route.blockchain].NATIVE.toLowerCase()) {
        USDAmount = payment.route.fromAmount.toString()
      } else if (USDRoute == undefined) {
        setPaymentValue('')
        return
      } else {
        USDAmount = USDRoute.amountOut.toString()
      }

      let USDValue = ethers.utils.formatUnits(USDAmount, USDDecimals)
      Currency.fromUSD({ amount: USDValue, code: currency, apiKey })
        .then(setPaymentValue)
        .catch(setError)
    }).catch(setError)
  }
  
  useEffect(()=>{
    if(account && payment) { getToTokenLocalValue({ update, payment }) }
  }, [payment, account])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReloadCount(reloadCount + 1)
      getToTokenLocalValue({ update })
    }, 15000);

    return () => clearTimeout(timeout)
  }, [reloadCount, update])
  
  return(
    <PaymentValueContext.Provider value={{
      paymentValue
    }}>
      { props.children }
    </PaymentValueContext.Provider>
  )
}
