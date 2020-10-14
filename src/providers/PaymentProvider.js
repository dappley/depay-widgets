import DisplayTokenAmount from '../utils/DisplayTokenAmount';
import LocalCurrency from '../utils/LocalCurrency';
import PaymentContext from '../contexts/PaymentContext';
import React from 'react';

class PaymentProvider extends React.Component {
  state = {}

  isETHPayment() {
    return this.props.selected.token.address === 'ETH';
  }

  isDirectETHTransfer() {
    return this.isETHPayment() && this.props.selected.transfer;
  }

  isDirectERC20Transfer() {
    return this.props.selected.transfer;
  }

  inETH() {
    if(this.isDirectETHTransfer()){
      return DePay.ethers.utils.formatEther(this.props.amount);
    } else if (this.isETHPayment()) {
      return DePay.ethers.utils.formatEther(this.props.selected.amounts[0]);
    } else {
      return DePay.ethers.utils.formatEther(this.props.selected.amounts[1]);
    }
  }

  local() {
    return LocalCurrency(this.inETH() * this.props.price);
  }

  token() {
    return DisplayTokenAmount(this.props.selected.amounts[0], this.props.selected.token.decimals, this.props.selected.token.symbol);
  }

  feeInETH() {
    return parseFloat(DePay.ethers.utils.formatUnits(this.props.gas, 'gwei')) * this.props.selected.fee;
  }

  feeLocal() {
    return LocalCurrency(this.feeInETH() * this.props.price);
  }

  feeToken() {
    return DisplayTokenAmount(this.feeInETH(), 0, 'ETH')
  }

  total() {
    return LocalCurrency((this.feeInETH() + parseFloat(this.inETH())) * this.props.price);
  }

  render() {
    if(this.props.selected === null) { return(<div>{this.props.children}</div>) }
    return(
      <PaymentContext.Provider value={{
        local: this.local(),
        token: this.token(),
        feeInETH: this.feeInETH(),
        feeLocal: this.feeLocal(),
        feeToken: this.feeToken(),
        total: this.total()
      }}>
        {this.props.children}
      </PaymentContext.Provider>
    )
  }
}

export default PaymentProvider;