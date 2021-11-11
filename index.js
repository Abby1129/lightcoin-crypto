// let balance = 500;
class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance = balance + transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("Billy Jean");

console.log("Starting Balance: ", myAccount.balance);

const t1 = new Withdrawal(1.0, myAccount);
console.log("Withdraw $1:", t1.commit());
console.log("Account Balance: ", myAccount.balance);

const t2 = new Deposit(10, myAccount);
console.log("Deposit $10:", t2.commit());
console.log("Account Balance: ", myAccount.balance);

const t3 = new Withdrawal(5, myAccount);
console.log("Withdraw $5:", t3.commit());

console.log("Ending Balance: ", myAccount.balance);

console.log("Account Transaction History: ", myAccount.transactions);
