(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Web3Constants = {}));
  }(this, (function (exports) { 'use strict';
  
    let CONSTANTS = {
      ZERO: '0x0000000000000000000000000000000000000000',
      MAXINT: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      WRAPPED: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
      NATIVE: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      DECIMALS: 18,
      SYMBOL: 'ETH',
      CURRENCY: 'Ether',
      NAME: 'Ethereum',
      USD: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa'
    };
  
    let CONSTANTS$1 = {
      ZERO: '0x0000000000000000000000000000000000000000',
      MAXINT: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      WRAPPED: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      NATIVE: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      DECIMALS: 18,
      SYMBOL: 'BNB',
      CURRENCY: 'Binance Coin',
      NAME: 'Binance Smart Chain',
      USD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
    };
  
    let CONSTANTS$2 = {};
  
    CONSTANTS$2['ethereum'] = CONSTANTS;
    CONSTANTS$2['bsc'] = CONSTANTS$1;
  
    exports.CONSTANTS = CONSTANTS$2;
  
    Object.defineProperty(exports, '__esModule', { value: true });
  
  })));
  