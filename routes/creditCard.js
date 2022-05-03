const express = require('express')

let router = express.Router();

const bank = require('../store/index')

router
  .route('/deposit')
  .get((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const { account_id, card_number, amount } = req.query;

    const status = bank.deposit(account_id, card_number, amount);

    res.end(JSON.stringify(status));

  })

router
  .route('/withdraw')
  .get((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const { account_id, card_number, amount } = req.query;

    const status = bank.withdraw(account_id, card_number, amount);

    res.end(JSON.stringify(status));

  })

router
  .route('/deactivate')
  .get((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const { account_id, card_number } = req.query;

    const status = bank.deactivate(account_id, card_number);

    res.end(JSON.stringify(status));

  })

module.exports = router;