import CloseDialogComponent from '../components/CloseDialogComponent';
import DisplayTokenAmount from '../utils/DisplayTokenAmount';
import ERC20ChangePaymentRowComponent from '../components/ERC20ChangePaymentRowComponent';
import GoBackDialogComponent from '../components/GoBackDialogComponent';
import LocalCurrency from '../utils/LocalCurrency';
import NavigateStackContext from '../contexts/NavigateStackContext';
import NFTChangePaymentRowComponent from '../components/NFTChangePaymentRowComponent';
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

                return(
                  <div className='Payment' key={index}>

                    {route.nft
                      ?<NFTChangePaymentRowComponent
                        selectNewRoute={this.selectNewRoute.bind(this)}
                        renderThirdRow={this.renderThirdRow}
                        route={route}
                        navigate={navigate}
                        routes={this.props.routes}
                        index={index}
                      />
                      :<ERC20ChangePaymentRowComponent
                        selectNewRoute={this.selectNewRoute.bind(this)}
                        renderThirdRow={this.renderThirdRow}
                        route={route}
                        navigate={navigate}
                        routes={this.props.routes}
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
