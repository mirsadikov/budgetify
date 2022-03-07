import { accounts } from '../data/db.js';

export function createAccount(req, res) {
  // get info from req.body
  const { name, currency } = req.body;
  // get info from req.user
  const userId = req.user;
  // create account in database
  const newAcc = {
    id: accounts.length + 1,
    userId,
    name,
    currency,
    balance: 0,
  };

  accounts.push(newAcc);

  res.json(newAcc);
}

export function updateAccount(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get info from req.body
  const { name, currency, balance } = req.body;
  // get info from req.user
  const userId = req.user;
  // update account in database
  const accIndex = accounts.findIndex((acc) => acc.id === +id);
  accounts[accIndex].name = name;
  accounts[accIndex].currency = currency;
  accounts[accIndex].balance = balance;

  res.json(accounts[accIndex]);
}

export function getAccount(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get info from req.user
  // get account from database
  const account = accounts.find((acc) => acc.id === +id);
  res.json(account);
}

export function getAllAccounts(req, res) {
  // get info from req.user
  // get all accounts from database

  res.json(accounts);
}

export function deleteAccount(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get info from req.user
  // delete account from database
  const accIndex = accounts.findIndex((acc) => acc.id === +id);
  accounts.splice(accIndex, 1);
  // delete all incomes and expenses from database

  res.json({ message: 'Account deleted' });
}
