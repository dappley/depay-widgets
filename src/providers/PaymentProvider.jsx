import ClosableContext from '../contexts/ClosableContext'
import ConfigurationContext from '../contexts/ConfigurationContext'
import ErrorContext from '../contexts/ErrorContext'
import NoPaymentMethodFoundDialog from '../dialogs/NoPaymentMethodFoundDialog'
import PaymentContext from '../contexts/PaymentContext'
import PaymentRoutingContext from '../contexts/PaymentRoutingContext'
import React, { useContext, useEffect, useState } from 'react'
import UpdateContext from '../contexts/UpdateContext'
import WalletContext from '../contexts/WalletContext'
import { ReactDialogStack } from 'depay-react-dialog-stack'

export default (props)=>{

  const { setError } = useContext(ErrorContext)
  const { sent, confirmed, ensured, failed } = useContext(ConfigurationContext)
  const { selectedRoute } = useContext(PaymentRoutingContext)
  const { open, close, setClosable } = useContext(ClosableContext)
  const { allRoutes } = useContext(PaymentRoutingContext)
  const { update, setUpdate } = useContext(UpdateContext)
  const { wallet } = useContext(WalletContext)
  const [ payment, setPayment ] = useState()
  const [ transaction, setTransaction ] = useState()
  const [ approvalTransaction, setApprovalTransaction ] = useState()
  const [ paymentState, setPaymentState ] = useState('initialized')

  const pay = ({ navigate })=> {
    setClosable(false)
    setPaymentState('paying')
    setUpdate(false)
    wallet.sendTransaction(Object.assign({}, payment.route.transaction, {
      sent: (transaction)=>{
        if(sent) { sent(transaction) }
      },
      confirmed: (transaction)=>{
        setClosable(true)
        setPaymentState('confirmed')
        if(confirmed) { confirmed(transaction) }
      },
      ensured: (transaction)=>{
        if(ensured) { ensured(transaction) }
      },
      failed: (transaction, error)=> {
        if(failed) { failed(transaction, error) }
        setPaymentState('initialized')
        setClosable(true)
        setUpdate(true)
        navigate('PaymentError')
      }
    }))
      .then((sentTransaction)=>{
        setTransaction(sentTransaction)
      })
      .catch((error)=>{
        console.log('error', error)
        setPaymentState('initialized')
        setClosable(true)
        setUpdate(true)
        if(error?.code == 'WRONG_NETWORK') {
          navigate('WrongNetwork')
        }
      })
  }

  const approve = ()=> {
    setClosable(false)
    setPaymentState('approving')
    wallet.sendTransaction(Object.assign({}, payment.route.approvalTransaction, {
      confirmed: ()=>{
        payment.route.approvalRequired = false
        setPayment(payment)
        setClosable(true)
        setPaymentState('initialized')
      }
    }))
      .then((sentTransaction)=>{
        setApprovalTransaction(sentTransaction)
      })
      .catch((error)=>{
        console.log('error', error)
        setPaymentState('initialized')
        setClosable(true)
      })
  }

  useEffect(()=>{
    if(selectedRoute) {
      let fromToken = selectedRoute.fromToken
      let transactionParams = selectedRoute.transaction.params
      Promise.all([
        fromToken.name(),
        fromToken.symbol(),
        fromToken.readable(selectedRoute.fromAmount)
      ]).then(([name, symbol, amount])=>{
        setPayment({
          route: selectedRoute,
          token: selectedRoute.fromToken.address,
          name,
          symbol: symbol.toUpperCase(),
          amount
        })
      }).catch(setError)
    } else {
      setPayment(undefined)
    }
  }, [selectedRoute])

  useEffect(()=>{
    if(allRoutes && allRoutes.length == 0) {
      setUpdate(false)
    } else if(allRoutes && allRoutes.length > 0) {
      setUpdate(true)
    }
  }, [allRoutes])

  if(allRoutes instanceof Array && allRoutes.length == 0) {
    return(
      <ReactDialogStack
        open={ open }
        close={ close }
        start='NoPaymentMethodFound'
        container={ props.container }
        document={ props.document }
        dialogs={{
          NoPaymentMethodFound: <NoPaymentMethodFoundDialog/>,
        }}
      />
    )
  } else {
    return(
      <PaymentContext.Provider value={{
        payment,
        paymentState,
        pay,
        transaction,
        approve,
        approvalTransaction
      }}>
        { props.children }
      </PaymentContext.Provider>
    )
  }
}
