class Bank {

  constructor() {

    this.accounts = []

  }

  createAccount(firstName, lastName, amount) {

    if (amount >= 10000) {

      const account = new Account(firstName, lastName, amount);

      this.accounts.push(account);

      return account;

    }

    return { 'message': 'Amount should be greater than 10000' };

  }

  getAccount(account_id) {

    for (let i = 0; i < this.accounts.length; i++)
      if (this.accounts[i].account_id === account_id)
        return this.accounts[i];

    return { 'message': 'Account not found' };

  }

  deposit(account_id, card_number, amount) {

    if (amount > 0) {

      for (let i = 0; i < this.accounts.length; i++) {

        if (this.accounts[i].account_id === account_id) {

          for (let j = 0; j < this.accounts[i].creditCards.length; j++)
            if (this.accounts[i].creditCards[j].card_number === card_number)
              return this.accounts[i].creditCards[j].deposit(amount);

        }

      }

      return { 'message': 'Account not found' };

    }

    return { 'message': 'Deposit should be greater than 0' };

  }

  withdraw(account_id, card_number, amount) {

    for (let i = 0; i < this.accounts.length; i++) {

      if (this.accounts[i].account_id === account_id) {

        for (let j = 0; j < this.accounts[i].creditCards.length; j++)
          if (this.accounts[i].creditCards[j].card_number === card_number)
            return this.accounts[i].creditCards[j].withdraw(amount);

      }

    }

    return { 'message': 'Account not found' };

  }

  deactivate(account_id, card_number) {

    for (let i = 0; i < this.accounts.length; i++) {

      if (this.accounts[i].account_id === account_id) {

        for (let j = 0; j < this.accounts[i].creditCards.length; j++)
          if (this.accounts[i].creditCards[j].card_number === card_number)
            return this.accounts[i].creditCards[j].deactivate();

      }

    }

    return { 'message': 'Account not found' };

  }

  getCreditCards(account_id) {

    for (let i = 0; i < this.accounts.length; i++)
      if (this.accounts[i].account_id === account_id)
        return this.accounts[i].creditCards;

    return { 'message': 'Account not found' };

  }

}

class Account {

  creditCards = [];

  constructor(firstName, lastName, amount) {

    this.account_id = 'xxx'.replace(/[xy]/g, (c) => {

      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);

    })

    this.firstName = firstName;
    this.lastName = lastName;

    this.addCreditCard(this.account_id, amount);

  }

  addCreditCard(account_id, amount) {

    const creditCard = new CreditCard(account_id, amount);
    this.creditCards.push(creditCard);

  }

}

class CreditCard {

  constructor(account_id, amount) {

    this.account_id = account_id;

    const randomNums = [];

    for (let i = 0; i < 4; i++) {

      let str = '';

      for (let j = 0; j < 4; j++)
        str += Math.floor(Math.random() * 10);

      randomNums.push(str);

    }

    this.card_number = randomNums.join('-');
    this.balance = parseInt(amount);

    this.transaction_history = []

    this.status = 'active';

  }

  deposit(amount) {

    if (this.status == 'active') {

      this.balance = parseInt(this.balance) + parseInt(amount);

      const transaction = {

        'transaction_type': 'credit',
        'account_id': this.account_id,
        'card_number': this.card_number,
        'balance': this.balance,
        'timestamp': Date.now()
  
      };

      this.transaction_history.push(transaction);

      return transaction;

    }
    
    return { 'message': 'Amount cannot be deposited. Credit card is deactivated' }

  }

  withdraw(amount) {

    if (this.status == 'active') {

      if (amount <= this.balance) {

        this.balance -= parseInt(amount);

        const transaction = {

          'transaction_type': 'debit',
          'account_id': this.account_id,
          'card_number': this.card_number,
          'balance': this.balance,
          'timestamp': Date.now()
  
        };

        this.transaction_history.push(transaction);
  
        return transaction;
  
      }

      return { 'message': 'Cannot withdraw amount larger than current balance' }

    }

    return { 'message': 'Amount cannot be deposited. Credit card is deactivated' }

  }

  deactivate() {

    this.status = 'deactivated'

    return { 'message': `Credit card number ${this.card_number} is deactivated` }

  }

}

const bank = new Bank();

module.exports = bank;