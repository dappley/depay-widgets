import DisplayTokenAmount from '../utils/DisplayTokenAmount';
import React from 'react';
import TokenIconComponent from '../components/TokenIconComponent';

class NFTPaymentRowComponent extends React.Component {
  
  render() {
    return(
      <div className='PaymentRow ChangePaymentRow' onClick={ ()=> this.props.selectNewRoute(this.props.index, navigate) }>
        <div className='PaymentColumn'>
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
            { this.props.displayedTokenAmount }
          </div>
          <div className='PaymentAmountRow2 TextEllipsis'>
            { this.props.totalDisplayed }
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

export default NFTPaymentRowComponent;
