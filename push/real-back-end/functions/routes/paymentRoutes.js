const express = require('express');
const Route = express.Router();
const fbAuth = require('../util/fbAuth');
const {
    omiseWebHooks,
    getInternetBankingCharge,
    subscribeInternetBanking,
    subscribeCreditCard,
    getRecipient,
    testPayment,
} = require('../controller/payments');

Route.post('/subscribe-credit-card', fbAuth, subscribeCreditCard);
Route.get('/getRecipient/:email', fbAuth, getRecipient);
Route.post('/webhooks', omiseWebHooks)
Route.get('/bank-charge', getInternetBankingCharge)
Route.post('/subscribe-internet-banking', subscribeInternetBanking);
Route.post('/testPayment', fbAuth, testPayment);

module.exports = Route;
