import DisplayTokenAmount from '../utils/DisplayTokenAmount';
import React from 'react';
import TokenIconComponent from '../components/TokenIconComponent';

class ERC20PaymentRowComponent extends React.Component {
  
  render() {
    const totalDisplayed = DisplayTokenAmount(this.props.route.balance, this.props.route.token.decimals, this.props.route.token.symbol);
    const displayedTokenAmount = DisplayTokenAmount(this.props.route.amounts[0], this.props.route.token.decimals, this.props.route.token.symbol);

    return(
      <div className='PaymentRow ChangePaymentRow' onClick={ ()=> this.props.selectNewRoute(this.props.index, this.props.navigate) }>
        <div className='PaymentColumn PaymentColumn1'>
          <TokenIconComponent
            title={ this.props.route.token.name }
            src={ this.props.route.token.logoURI }
          />
        </div>
        <div className='PaymentColumn PaymentColumn2'>
          <div className='PaymentDescription TextEllipsis'>
            { this.props.route.token.name }
          </div>
          <div className='PaymentAmountRow1 TextEllipsis'>
            { displayedTokenAmount }
          </div>
          <div className='PaymentAmountRow2 TextEllipsis'>
            { totalDisplayed }
          </div>
          { this.props.renderThirdRow(this.props.route, this.props.index, this.props.routes) }
        </div>
        <div className='PaymentColumn PaymentColumn3'>
          <span className='PaymentAction' title='Select for payment'>
            Select
          </span>
        </div>
      </div>
    )
  }
}

export default ERC20PaymentRowComponent;
