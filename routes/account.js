const express = require('express')

let router = express.Router();

const bank = require('../store/index')


router
  .route('/')
  .get((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const { account_id } = req.query;

    const account = bank.getAccount(account_id);

    res.end(JSON.stringify(account));

  })
  .post((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const { firstName, lastName, amount } = req.query;

    const account = bank.createAccount(firstName, lastName, amount);

    res.end(JSON.stringify(account));

  })

module.exports = router;