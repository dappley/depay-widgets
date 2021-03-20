import CloseDialogComponent from '../components/CloseDialogComponent';
import DisplayTokenAmount from '../utils/DisplayTokenAmount';
import ERC20PaymentRowComponent from '../components/ERC20PaymentRowComponent';
import GoBackDialogComponent from '../components/GoBackDialogComponent';
import LocalCurrency from '../utils/LocalCurrency';
import NavigateStackContext from '../contexts/NavigateStackContext';
import NFTPaymentRowComponent from '../components/NFTPaymentRowComponent';
import React from 'react';

class ChangePaymentTokenDialog extends React.Component {

  selectNewRoute(index, navigate) {
    this.props.change(index);
    navigate('back');
  }

  renderThirdRow(route, index, routes) {
    let labels = [];

    if(index < (routes.length-1) && route.fee < routes[index+1].fee) {
      labels.push(
        <span key='networkfee' className='Label highlight small' title='Significantly lower network fees compared to the other payment options.'>
          Lowest Network Fee
        </span>
      )
    }

    if(route.approved === false) {
      labels.push(
        <span key='approval' className='Label highlight small' title='Requires a one-time additional approval transaction to allow swapping this token to perform payments.'>
          Requires Approval
        </span>
      )
    }

    if(labels.length) {
      return (
        <div className='PaymentAmountRow3'>
          { labels }
        </div>
      );
    } else {
      return null;
    }
  }

  render() {

    return (
      <NavigateStackContext.Consumer>
        {navigate => (
          <div className='Dialog ChangePaymentDialog'>
            <div className='DialogHeader'>
              <GoBackDialogComponent/>
              <CloseDialogComponent/>
              <h1 className='FontSizeNormal TextAlignCenter'>
                Change payment
              </h1>
              <div className='FontSizeLarge TextAlignCenter'>
                { this.props.paymentContext.local }
              </div>
            </div>
            <div className='DialogBody'>
              {this.props.routes.map((route, index) => {

                const totalDisplayed = DisplayTokenAmount(route.balance, route.token.decimals, route.token.symbol)
                const displayedTokenAmount = DisplayTokenAmount(route.amounts[0], route.token.decimals, route.token.symbol)

                return(
                  <div className='Payment' key={index}>

                    {route.nft
                      ?<NFTPaymentRowComponent
                        selectNewRoute={this.selectNewRoute}
                        renderThirdRow={this.renderThirdRow}
                        route={route}
                        routes={this.props.routes}
                        displayedTokenAmount={displayedTokenAmount}
                        totalDisplayed={totalDisplayed}
                        index={index}
                      />
                      :<ERC20PaymentRowComponent
                        selectNewRoute={this.selectNewRoute}
                        renderThirdRow={this.renderThirdRow}
                        route={route}
                        routes={this.props.routes}
                        displayedTokenAmount={displayedTokenAmount}
                        totalDisplayed={totalDisplayed}
                        index={index}
                      />
                    }

                  </div>
                )
              })}
            </div>
            <div className='DialogFooter'>
              <div className='PoweredBy'>
                <a target='_blank' rel='noopener noreferrer' href={'https://depay.fi?utm_source='+window.location.hostname+'&utm_medium=widget&utm_campaign=DePayPayment'} className='PoweredByLink' title='Powered by DePay: Decentralized Payments'>
                  by DePay
                </a>
              </div>
            </div>
          </div>
        )}
      </NavigateStackContext.Consumer>
    )
  }
}

export default ChangePaymentTokenDialog;
