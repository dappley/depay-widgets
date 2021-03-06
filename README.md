## Installation

You can either load the depay-widgets package via CDN:

```
<script src="https://depay.fi/integrate/widgets/v2.js"></script>
```

or you install depay-widgets via the package manager of your choice and ship it as part of your application bundle:

```
yarn add depay-widgets
```

```
npm install depay-widgets --save
```

and load the DePayWidgets package wherever you need it:

```
import DePayWidgets from 'depay-widgets'
```

## Support

This library supports the following blockchains:

- [Ethereum](https://ethereum.org)
- [Binance Smart Chain](https://www.binance.org/en/smartChain)

This library supports the following wallets:

- [MetaMask](https://metamask.io)
- [Coinbase Wallet](https://wallet.coinbase.com)
- [WalletConnect](https://walletconnect.org)

via WalletConnect:

- [Trust Wallet](https://trustwallet.com)
- [imToken Wallet](https://www.token.im)
- [Argent Wallet](https://www.argent.xyz)
- [Unstoppable Wallet](https://unstoppable.money)
- [Atomic Wallet](https://atomicwallet.io)
- and more...

## DePay Payments

DePay Payments allows you to accept and perform crypto payments.

### Preparation

In order to receive decentralized payments on any blockchain you need to have your own wallet on that particular blockchain first:

- [Create an Ethereum wallet](https://ethereum.org/en/wallets/)
- [Create an BSC wallet](https://academy.binance.com/en/articles/how-to-get-started-with-binance-smart-chain-bsc)

### Quick start

```
<script src="https://depay.fi/integrate/widgets/v2.js"/>
```

```
DePayWidgets.Payment({
  accept: [{
    blockchain: 'ethereum',
    amount: 20,
    token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
    receiver: '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02'
  }]
});
```

### Configuration

You need to pass a configuration object to `DePayWidgets.Payment` which needs to at least contain the `accept` field:

```javascript
DePayWidgets.Payment({
  accept: [{
    blockchain: 'ethereum',
    amount: 20,
    token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
    receiver: '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02'
  }]
});
```

You can also accept multiple payments on multiple blockchains:

```javascript
DePayWidgets.Payment({
  accept: [
    { // 20 USDT on ethereum
      blockchain: 'ethereum',
      amount: 20,
      token: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      receiver: '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02'
    },{ // 20 BUSD on bsc
      blockchain: 'bsc',
      amount: 20,
      token: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      receiver: '0x552C2a5a774CcaEeC036d41c983808E3c76477e6'
    }
  ]
});
```

#### accept

`blockchain`

The blockchain you want to receive the payment on.

Currently supported:

- `ethereum`
- `bsc` (Binance Smart Chain)

`amount`

The amount of tokens you want to receive. Needs to be passed as a number e.g. `20`. If passed as string the widget will asume it's a `BigNumber`.

The `BigNumber` of that amount will be calculated internally including finding the right amount of decimals for the given token.
So please just pass the amount in a human readable form as Number/Decimal: e.g. `20` for 20 USDT or `20.25` etc.

`token`

The address of the token you want to receive.

Use our [payment configurator](https://depay.fi/documentation/payments#payment-configurator) in order to simplify configuring this.

`receiver`

The address receiving the payment. Always double check that you've set the right address.

#### receiver

Payment receivers can either be wallet addresses, but also smart contracts.

In order to have smart contracts receive the payments you will need to pass an object as receiver containing the following attributes.

```javascript
DePayWidgets.Payment({
  accept: [
    receiver: {
      address: toAddress,
      signature: 'claim(address,uint256,bool)',
      params: ['true']
    }
  ]
});
```

`address`: The address of the smart contract.

`signature`: The signature of the smart contract method you want to call as part of the payment.

`params`: Additional params forwarded to the smart contract method.

Checkout [DePay Web3 Payments](https://github.com/DePayFi/depay-web3-payments#pay-into-smart-contracts) and [DePay Router Smart Contract](https://github.com/DePayFi/depay-evm-router) for more details.

#### connected

`connected`

A function that will be called once the user connects a wallet.

This function will be called with the connected wallet address as the main argument:

```javascript
DePayWidgets.Payment({

  connected: (address)=> {
    // do something with the address
  }
})

```

#### closed

`closed`

A function that will be called once the user closes the widget (no matter if before or after the payment).

```javascript
DePayWidgets.Payment({

  closed: ()=> {
    // do something if user closed the widget
  }
})

```

#### sent

`sent`

A function that will be called once the payment has been sent to the network (but still needs to be mined/confirmed).

The widget will call this function with a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Payment({

  sent: (transaction)=> {
    // called when payment transaction has been sent to the network
  }
})
```

#### confirmed

`confirmed`

A function that will be called once the payment has been confirmed once by the network.

The widget will call this function passing a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Payment({

  confirmed: (transaction)=> {
    // called when payment transaction has been confirmed once by the network
  }
})
```

#### ensured

`ensured`

A function that will be called once the payment has been confirmed enough times to consider it's "ensured" (e.g. 12 confirmations on Ethereum).

The widget will call this function passing a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Payment({

  ensured: (transaction)=> {
    // called when payment transaction has been confirmed X times by the network
  }
})
```

#### failed

`failed`

A function that will be called if the payment execution failed on the blockchain (after it has been sent/submitted).

The widget will call this function passing a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Payment({

  failed: (transaction)=> {
    // called when payment transaction failed on the blockchain
    // handled by the widget, no need to display anything
  }
})
```

#### critical

`critical`

A function that will be called if the widget throws an critical internal error that it can't handle and display on it's own:

```javascript
DePayWidgets.Payment({
  
  critical: (error)=> {
    // render and display the error with error.toString()
  }
})
```

#### error

`error`

A function that will be called if the widget throws an non-critical internal error that it can and will handle and display on it's own:

```javascript
DePayWidgets.Payment({

  error: (error)=> {
    // maybe do some internal tracking with error.toString()
    // no need to display anything as widget takes care of displaying the error
  }
})
```

#### providers

Allows to set providers to be used for making RPC calls to the individiual blockchains:

```javascript
DePayWidgets.Payment({

  providers: {
    ethereum: ['http://localhost:8545'],
    bsc: ['http://localhost:8545']
  }
})
```

#### currency

Allows you to enforce displayed local currency (instead of automatically detecting it):

```javascript

DePayWidgets.Payment({

  currency: 'USD'

})

```

#### whitelist

Allows only the configured tokens to be eligible as means of payment (from the sender):

```javacript
DePayWidgets.Payment({
  
  whitelist: {
    ethereum: [
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH
      '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
      '0x6b175474e89094c44da98b954eedeac495271d0f'  // DAI
    ],
    bsc: [
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // BNB
      '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
      '0x55d398326f99059ff775485246999027b3197955'  // BSC-USD
    ]
  }

})

```

#### blacklist

Allows to blacklist tokens so that they will not be suggested as means of payment (from the sender):

```javacript
DePayWidgets.Payment({
  
  blacklist: {
    ethereum: [
      '0x82dfDB2ec1aa6003Ed4aCBa663403D7c2127Ff67',  // akSwap
      '0x1368452Bfb5Cd127971C8DE22C58fBE89D35A6BF',  // JNTR/e
      '0xC12D1c73eE7DC3615BA4e37E4ABFdbDDFA38907E',  // KICK
    ],
    bsc: [
      '0x119e2ad8f0c85c6f61afdf0df69693028cdc10be', // Zepe
      '0xb0557906c617f0048a700758606f64b33d0c41a6', // Zepe
      '0x5190b01965b6e3d786706fd4a999978626c19880', // TheEver
      '0x68d1569d1a6968f194b4d93f8d0b416c123a599f', // AABek
      '0xa2295477a3433f1d06ba349cde9f89a8b24e7f8d', // AAX
      '0xbc6675de91e3da8eac51293ecb87c359019621cf', // AIR
      '0x5558447b06867ffebd87dd63426d61c868c45904', // BNBW
      '0x569b2cf0b745ef7fad04e8ae226251814b3395f9', // BSCTOKEN
      '0x373233a38ae21cf0c4f9de11570e7d5aa6824a1e', // ALPACA
      '0x7269163f2b060fb90101f58cf724737a2759f0bb', // PUPDOGE
      '0xb16600c510b0f323dee2cb212924d90e58864421', // FLUX
      '0x2df0b14ee90671021b016dab59f2300fb08681fa', // SAFEMOON.is
      '0xd22202d23fe7de9e3dbe11a2a88f42f4cb9507cf', // MNEB
      '0xfc646d0b564bf191b3d3adf2b620a792e485e6da', // PIZA
      '0xa58950f05fea2277d2608748412bf9f802ea4901', // WSG
      '0x12e34cdf6a031a10fe241864c32fb03a4fdad739' // FREE
    ]
  }
})
```

#### event

`event`

If set to `ifSwapped`, emits a [payment event](https://github.com/depayfi/depay-evm-router#depayrouterv1paymentevent02) if payments are routed through [router smart contract](https://github.com/depayfi/depay-evm-router).
Payments are routed through the DePayPaymentRouter if swapping tokens is required in order to perform the payment. If payments are not routed through the router, e.g. direct transfer, no event is emited if `event` is set to `ifSwapped`.


```javascript
DePayWidgets.Payment({
  
  event: 'ifSwapped'

})
```

#### style

`style`

Allows you to change the style of the widget.

```javascript
DePayWidgets.Payment({
  style: {
    colors: {
      primary: '#ffd265',
      text: '#e1b64a',
      buttonText: '#000000',
      icons: '#ffd265'
    },
    fontFamily: '"Cardo", serif !important',
    css: `
      @import url("https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap");

      .ReactDialogBackground {
        background: rgba(0,0,0,0.8);
      }
    `
  }
})
```

##### colors

`colors`

Allows you to set color values:

```javascript
DePayWidgets.Payment({
  
  style: {
    colors: {
      primary: '#ffd265',
      text: '#ffd265',
      buttonText: '#000000',
      icons: '#ffd265'
    }
  }
})
```

##### fontFamily

`fontFamily`

Allows you to set the font-family:

```javascript
DePayWidgets.Payment({
  
  style: {
    fontFamily: '"Cardo", serif !important'
  }
})
```

##### css

`css`

Allows you to inject CSS:

```javascript
DePayWidgets.Payment({
  
  style: {
    css: `
      @import url("https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap");

      .ReactDialogBackground {
        background: rgba(0,0,0,0.8);
      }
    `
  }
})
```

#### unmount

`unmount`

Allows you to unmount (the React safe way) the entire widget from the outside:

```javascript
let { unmount } = await DePayWidgets.Payment({})

unmount()
```

## DePay Sales

DePay Sales allows you to sell tokens directly from your website or dApp with automatic any-to-any payment conversion (so people can use any token when buying your token directly off your website or dApp).

### Preparation

In order to sell tokens in a decentralized way, that token needs to have a liquidity pool on a decentralized exchange:

- [Create Uniswap v2 Liquidity Pool](https://app.uniswap.org/#/add/v2/ETH)
- [Create Pancakeswap Liquidity Pool](https://pancakeswap.finance/add)

### Quick start

```
<script src="https://depay.fi/integrate/widgets/v2.js"/>
```

```javascript
DePayWidgets.Sale({
  amount: {
    start: 10,
    min: 1,
    step: 1
  },
  token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
  blockchains: ['ethereum']
);
```

### Configuration

You need to pass a configuration object to `DePayWidgets.Sale` which needs to at least contain `amount.start`, `amount.min`, `amount.step`, `token` and `blockchains`:

```javascript
DePayWidgets.Sale({
  amount: {
    start: 10,
    min: 1,
    step: 1
  },
  token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
  blockchains: ['ethereum']
);
```

You can also sell the same token on multiple blockchains:

```javascript
DePayWidgets.Sale({
  amount: {
    start: 10,
    min: 1,
    step: 1
  },
  token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
  blockchains: ['ethereum', 'bsc']
);
```

#### amount

The amount object contains the amount of preselected tokens when the widget opens (`start`),
the minimum amount of tokens the user can select in the widget (`min`) and
by which number the amount increments/decrements when changed by the user (`step`).

#### token

The address of the token you want to sell.

#### connected

`connected`

A function that will be called once the user connects a wallet.

Will be called with the connected wallet address as the main argument:

```javascript
DePayWidgets.Sale({

  connected: (address)=> {
    // do something with the address
  }
})

```

#### closed

`closed`

A function that will be called once the user closes the widget (no matter if before or after the payment).

```javascript
DePayWidgets.Sale({

  closed: ()=> {
    // do something if user closed the widget
  }
})

```

#### sent

`sent`

A function that will be called once the payment has been sent to the network (but still needs to be mined/confirmed).

The widget will call this function with a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Sale({
  
  sent: (transaction)=> {
    // called when payment transaction has been sent to the network
  }
})
```

#### confirmed

`confirmed`

A function that will be called once the payment has been confirmed once by the network.

The widget will call this function passing a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Sale({

  confirmed: (transaction)=> {
    // called when payment transaction has been confirmed once by the network
  }
})
```

#### ensured

`ensured`

A function that will be called once the payment has been confirmed enough times to consider it's "ensured" (e.g. 12 confirmations on Ethereum).

The widget will call this function passing a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Sale({

  ensured: (transaction)=> {
    // called when payment transaction has been confirmed X times by the network
  }
})
```

#### failed

`failed`

A function that will be called if the payment execution failed on the blockchain (after it has been sent/submitted).

The widget will call this function passing a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Sale({

  failed: (transaction)=> {
    // called when payment transaction failed on the blockchain
    // handled by the widget, no need to display anything
  }
})
```

#### critical

`critical`

A function that will be called if the widget throws an critical internal error that it can't handle and display on it's own:

```javascript
DePayWidgets.Sale({
  
  critical: (error)=> {
    // render and display the error with error.toString()
  }
})
```

#### error

`error`

A function that will be called if the widget throws an non-critical internal error that it can and will handle and display on it's own:

```javascript
DePayWidgets.Sale({
  
  error: (error)=> {
    // maybe do some internal tracking with error.toString()
    // no need to display anything as widget takes care of displaying the error
  }
})
```

#### providers

Allows to set providers to be used for making RPC calls to the individiual blockchains:

```javascript
DePayWidgets.Sale({

  providers: {
    ethereum: ['http://localhost:8545'],
    bsc: ['http://localhost:8545']
  }
})
```

#### currency

Allows you to enforce displayed local currency (instead of automatically detecting it):

```javascript

DePayWidgets.Sale({

  currency: 'USD'

})

```

#### blacklist

Allows to blacklist tokens so that they will not be suggested as means of payment (from the sender):

```javacript
DePayWidgets.Sale({
  
  blacklist: {
    ethereum: [
      '0x82dfDB2ec1aa6003Ed4aCBa663403D7c2127Ff67',  // akSwap
      '0x1368452Bfb5Cd127971C8DE22C58fBE89D35A6BF',  // JNTR/e
      '0xC12D1c73eE7DC3615BA4e37E4ABFdbDDFA38907E',  // KICK
    ],
    bsc: [
      '0x119e2ad8f0c85c6f61afdf0df69693028cdc10be', // Zepe
      '0xb0557906c617f0048a700758606f64b33d0c41a6', // Zepe
      '0x5190b01965b6e3d786706fd4a999978626c19880', // TheEver
      '0x68d1569d1a6968f194b4d93f8d0b416c123a599f', // AABek
      '0xa2295477a3433f1d06ba349cde9f89a8b24e7f8d', // AAX
      '0xbc6675de91e3da8eac51293ecb87c359019621cf', // AIR
      '0x5558447b06867ffebd87dd63426d61c868c45904', // BNBW
      '0x569b2cf0b745ef7fad04e8ae226251814b3395f9', // BSCTOKEN
      '0x373233a38ae21cf0c4f9de11570e7d5aa6824a1e', // ALPACA
      '0x7269163f2b060fb90101f58cf724737a2759f0bb', // PUPDOGE
      '0xb16600c510b0f323dee2cb212924d90e58864421', // FLUX
      '0x2df0b14ee90671021b016dab59f2300fb08681fa', // SAFEMOON.is
      '0xd22202d23fe7de9e3dbe11a2a88f42f4cb9507cf', // MNEB
      '0xfc646d0b564bf191b3d3adf2b620a792e485e6da', // PIZA
      '0xa58950f05fea2277d2608748412bf9f802ea4901', // WSG
      '0x12e34cdf6a031a10fe241864c32fb03a4fdad739' // FREE
    ]
  }
})
```

#### style

`style`

Allows you to change the style of the widget.

```javascript
DePayWidgets.Sale({
  
  style: {
    colors: {
      primary: '#ffd265',
      text: '#e1b64a',
      buttonText: '#000000',
      icons: '#ffd265'
    },
    fontFamily: '"Cardo", serif !important',
    css: `
      @import url("https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap");

      .ReactDialogBackground {
        background: rgba(0,0,0,0.8);
      }
    `
  }
})
```

##### colors

`colors`

Allows you to set color values:

```javascript
DePayWidgets.Sale({
  
  style: {
    colors: {
      primary: '#ffd265',
      text: '#ffd265',
      buttonText: '#000000',
      icons: '#ffd265'
    }
  }
})
```

##### fontFamily

`fontFamily`

Allows you to set the font-family:

```javascript
DePayWidgets.Sale({
  
  style: {
    fontFamily: '"Cardo", serif !important'
  }
})
```

##### css

`css`

Allows you to inject CSS:

```javascript
DePayWidgets.Sale({
  
  style: {
    css: `
      @import url("https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap");

      .ReactDialogBackground {
        background: rgba(0,0,0,0.8);
      }
    `
  }
})
```

#### unmount

`unmount`

Allows you to unmount (the React safe way) the entire widget from the outside:

```javascript
let { unmount } = await DePayWidgets.Payment({})

unmount()
```

## DePay Donations

DePay Donations allows you to accept donation payments made with thousands of different crypto currencies.

### Preparation

In order to receive decentralized donation payments on any blockchain you need to have your own wallet on that particular blockchain first:

- [Create an Ethereum wallet](https://ethereum.org/en/wallets/)
- [Create an BSC wallet](https://academy.binance.com/en/articles/how-to-get-started-with-binance-smart-chain-bsc)

### Quick start

```
<script src="https://depay.fi/integrate/widgets/v2.js"/>
```

```javascript
DePayWidgets.Donation({
  amount: {
    start: 10,
    min: 1,
    step: 1
  },
  token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
  blockchains: ['ethereum'],
  receiver: '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02'
);
```

### Configuration

You need to pass a configuration object to `DePayWidgets.Donation` which needs to at least contain `amount.start`, `amount.min`, `amount.step`, `token`, `blockchains` and `receiver`:

```javascript
DePayWidgets.Donation({
  amount: {
    start: 10,
    min: 1,
    step: 1
  },
  token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
  blockchains: ['ethereum'],
  receiver: '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02'
);
```

You can also accept donations on multiple blockchains:

```javascript
DePayWidgets.Donation({
  amount: {
    start: 10,
    min: 1,
    step: 1
  },
  token: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb',
  blockchains: ['ethereum', 'bsc'],
  receiver: '0x4e260bB2b25EC6F3A59B478fCDe5eD5B8D783B02'
);
```

#### amount

The amount object contains the amount of preselected tokens when the widget opens (`start`),
the minimum amount of tokens the user can select in the widget (`min`) and
by which number the amount increments/decrements when changed by the user (`step`).

#### token

The address of the token you want to sell.

#### receiver

The address supposed to receive the donation.

#### connected

`connected`

A function that will be called once the user connects a wallet.

Will be called with the connected wallet address as the main argument:

```javascript
DePayWidgets.Donation({

  connected: (address)=> {
    // do something with the address
  }
})

```

#### closed

`closed`

A function that will be called once the user closes the widget (no matter if before or after the payment).

```javascript
DePayWidgets.Donation({

  closed: ()=> {
    // do something if user closed the widget
  }
})

```

#### sent

`sent`

A function that will be called once the payment has been sent to the network (but still needs to be mined/confirmed).

The widget will call this function with a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Donation({
  
  sent: (transaction)=> {
    // called when payment transaction has been sent to the network
  }
})
```

#### confirmed

`confirmed`

A function that will be called once the payment has been confirmed once by the network.

The widget will call this function passing a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Donation({

  confirmed: (transaction)=> {
    // called when payment transaction has been confirmed once by the network
  }
})
```

#### ensured

`ensured`

A function that will be called once the payment has been confirmed enough times to consider it's "ensured" (e.g. 12 confirmations on Ethereum).

The widget will call this function passing a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Donation({

  ensured: (transaction)=> {
    // called when payment transaction has been confirmed X times by the network
  }
})
```

#### failed

`failed`

A function that will be called if the payment execution failed on the blockchain (after it has been sent/submitted).

The widget will call this function passing a transaction as single argument (see: [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets#transaction) for more details)

```javascript
DePayWidgets.Donation({

  failed: (transaction)=> {
    // called when payment transaction failed on the blockchain
    // handled by the widget, no need to display anything
  }
})
```

#### critical

`critical`

A function that will be called if the widget throws an critical internal error that it can't handle and display on it's own:

```javascript
DePayWidgets.Donation({
  
  critical: (error)=> {
    // render and display the error with error.toString()
  }
})
```

#### error

`error`

A function that will be called if the widget throws an non-critical internal error that it can and will handle and display on it's own:

```javascript
DePayWidgets.Donation({
  
  error: (error)=> {
    // maybe do some internal tracking with error.toString()
    // no need to display anything as widget takes care of displaying the error
  }
})
```

#### providers

Allows to set providers to be used for making RPC calls to the individiual blockchains:

```javascript
DePayWidgets.Donation({

  providers: {
    ethereum: ['http://localhost:8545'],
    bsc: ['http://localhost:8545']
  }
})
```

#### currency

Allows you to enforce displayed local currency (instead of automatically detecting it):

```javascript

DePayWidgets.Donation({

  currency: 'USD'

})

```

#### blacklist

Allows to blacklist tokens so that they will not be suggested as means of payment (from the sender):

```javacript
DePayWidgets.Donation({
  
  blacklist: {
    ethereum: [
      '0x82dfDB2ec1aa6003Ed4aCBa663403D7c2127Ff67',  // akSwap
      '0x1368452Bfb5Cd127971C8DE22C58fBE89D35A6BF',  // JNTR/e
      '0xC12D1c73eE7DC3615BA4e37E4ABFdbDDFA38907E',  // KICK
    ],
    bsc: [
      '0x119e2ad8f0c85c6f61afdf0df69693028cdc10be', // Zepe
      '0xb0557906c617f0048a700758606f64b33d0c41a6', // Zepe
      '0x5190b01965b6e3d786706fd4a999978626c19880', // TheEver
      '0x68d1569d1a6968f194b4d93f8d0b416c123a599f', // AABek
      '0xa2295477a3433f1d06ba349cde9f89a8b24e7f8d', // AAX
      '0xbc6675de91e3da8eac51293ecb87c359019621cf', // AIR
      '0x5558447b06867ffebd87dd63426d61c868c45904', // BNBW
      '0x569b2cf0b745ef7fad04e8ae226251814b3395f9', // BSCTOKEN
      '0x373233a38ae21cf0c4f9de11570e7d5aa6824a1e', // ALPACA
      '0x7269163f2b060fb90101f58cf724737a2759f0bb', // PUPDOGE
      '0xb16600c510b0f323dee2cb212924d90e58864421', // FLUX
      '0x2df0b14ee90671021b016dab59f2300fb08681fa', // SAFEMOON.is
      '0xd22202d23fe7de9e3dbe11a2a88f42f4cb9507cf', // MNEB
      '0xfc646d0b564bf191b3d3adf2b620a792e485e6da', // PIZA
      '0xa58950f05fea2277d2608748412bf9f802ea4901', // WSG
      '0x12e34cdf6a031a10fe241864c32fb03a4fdad739' // FREE
    ]
  }
})
```

#### style

`style`

Allows you to change the style of the widget.

```javascript
DePayWidgets.Donation({
  
  style: {
    colors: {
      primary: '#ffd265',
      text: '#e1b64a',
      buttonText: '#000000',
      icons: '#ffd265'
    },
    fontFamily: '"Cardo", serif !important',
    css: `
      @import url("https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap");

      .ReactDialogBackground {
        background: rgba(0,0,0,0.8);
      }
    `
  }
})
```

##### colors

`colors`

Allows you to set color values:

```javascript
DePayWidgets.Donation({
  
  style: {
    colors: {
      primary: '#ffd265',
      text: '#ffd265',
      buttonText: '#000000',
      icons: '#ffd265'
    }
  }
})
```

##### fontFamily

`fontFamily`

Allows you to set the font-family:

```javascript
DePayWidgets.Donation({
  
  style: {
    fontFamily: '"Cardo", serif !important'
  }
})
```

##### css

`css`

Allows you to inject CSS:

```javascript
DePayWidgets.Donation({
  
  style: {
    css: `
      @import url("https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&display=swap");

      .ReactDialogBackground {
        background: rgba(0,0,0,0.8);
      }
    `
  }
})
```

#### unmount

`unmount`

Allows you to unmount (the React safe way) the entire widget from the outside:

```javascript
let { unmount } = await DePayWidgets.Payment({})

unmount()
```

## DePay Connect

DePay Connect allows you to have your users connect their crypto wallet to your dApp or website.

Returns connected `account`, `accounts` and `wallet` in return. 

```
<script src="https://depay.fi/integrate/widgets/v2.js"/>
```

```javascript
let { account, accounts, wallet }  = await DePayWidgets.Connect()
```

See [depay-web3-wallets](https://github.com/depayfi/depay-web3-wallets) for more details about the returned `wallet`.

### Rejections

1. Rejects if user just closes the dialog without connecting any wallet:

```javascript

DePayWidgets.Connect().then(()=>{}).catch((error)=>{
  error // "USER_CLOSED_DIALOG"
})

```

## Development

### Quick start

```
yarn install
yarn dev
```

### Testing

#### Debug Cypress

Starts cypress in `--headed` and `--no-exit`

```
test:cypress:debug
```

Test and debug single cypress file:

```
yarn test:cypress:debug --spec "cypress/integration/Payment/nowallet.js"
```

### Release new versions to npm

```
npm login
npm publish
```
