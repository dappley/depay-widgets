import DisplayTokenAmount from '../utils/DisplayTokenAmount';
import React from 'react';
import TokenIconComponent from '../components/TokenIconComponent';

class NFTChangePaymentRowComponent extends React.Component {
  
  render() {
    const displayedTokenAmount = DisplayTokenAmount(this.props.route.amounts[1], 18, 'WETH');
    const totalDisplayed = DisplayTokenAmount(this.props.route.amounts[1], 18, 'WETH');

    return(
      <div className='PaymentRow NFTPaymentRow ChangePaymentRow' onClick={ ()=> this.props.selectNewRoute(this.props.index, this.props.navigate) }>
        <div className='NFTPaymentHeader'>
          <div className='PaymentColumn PaymentColumn1'>
          </div>
          <div className='PaymentColumn PaymentColumn2'>
            <div className='PaymentDescription TextEllipsis'>
              { this.props.route.token.name }
            </div>
          </div>
          <div className='PaymentColumn PaymentColumn3'>
          </div>
        </div>
        <div className='NFTPaymentBody'>
          <div className='PaymentColumn PaymentColumn1'>
            <TokenIconComponent
              title={ 'OpenSea Exchange' }
              src={ 'https://files.readme.io/566c72b-opensea-logomark-full-colored.png' }
            />
          </div>
          <div className='PaymentColumn PaymentColumn2'>
            <TokenIconComponent
              title={ this.props.route.token.name }
              src={ this.props.route.token.logoURI }
              className='NFTImage'
            />
          </div>
          <div className='PaymentColumn PaymentColumn3'>
            <span className='PaymentAction' title='Select for payment'>
              Select
            </span>
          </div>
        </div>
        <div className='NFTPaymentFooter'>
          <div className='PaymentColumn PaymentColumn1'>
          </div>
          <div className='PaymentColumn PaymentColumn2'>
            <div className='PaymentAmountRow1 TextEllipsis'>
              { displayedTokenAmount }
            </div>
            <div className='PaymentAmountRow2 TextEllipsis'>
              { totalDisplayed }
            </div>
            { this.props.renderThirdRow(this.props.route, this.props.index, this.props.routes) }
          </div>
          <div className='PaymentColumn PaymentColumn3'>
          </div>
        </div>
      </div>
    )
  }
}

export default NFTChangePaymentRowComponent;
