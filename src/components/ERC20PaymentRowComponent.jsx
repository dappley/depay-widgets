import React from 'react';
import TokenIconComponent from '../components/TokenIconComponent';

class ERC20PaymentRowComponent extends React.Component {
  
  render() {
    return(
      <div className='PaymentRow ChangePaymentRow' onClick={ ()=> this.props.navigateIfActionable(this.props.navigate, 'ChangePaymentToken', this.props.dialogContext) }>
        <div className='PaymentColumn PaymentColumn1'>
          <TokenIconComponent
            title={ this.props.selected.token.name }
            src={ this.props.selected.token.logoURI }
          />
        </div>
        <div className='PaymentColumn PaymentColumn2'>
          <div className='PaymentDescription'>
            Payment
          </div>
          <div className='PaymentAmountRow1 TextEllipsis'>
            { this.props.paymentContext.token }
          </div>
          <div className='PaymentAmountRow2 TextEllipsis'>
            { this.props.paymentContext.local }
          </div>
        </div>
        <div className='PaymentColumn PaymentColumn3'>
          <span className='PaymentAction' title='Change payment'>
            Change
          </span>
        </div>
      </div>
    )
  }
}

export default ERC20PaymentRowComponent;
