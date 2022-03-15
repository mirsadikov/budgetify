import { accounts } from '../data/db.js';

export function createAccount(req, res) {
  // get info from req.body
  const { name, currency } = req.body;
  // get info from req.user
  const { id: userId } = req.user;
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
  const { id: userId } = req.user;
  // update account in database
  const accIndex = accounts.findIndex(
    (acc) => acc.id === +id && acc.userId === userId,
  );

  if (accIndex === -1) {
    res.status(404);
    throw new Error('Account not found');
  }
  accounts[accIndex].name = name;
  accounts[accIndex].currency = currency;
  accounts[accIndex].balance = balance;

  res.json(accounts[accIndex]);
}

export function getAccount(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get info from req.user
  const { id: userId } = req.user;
  // get account from database
  const account = accounts.find(
    (acc) => acc.id === +id && acc.userId === userId,
  );

  if (!account) {
    res.status(404);
    throw new Error('Account not found');
  }

  res.json(account);
}

export function getAllAccounts(req, res) {
  // get info from req.user
  const { id } = req.user;
  // get all accounts from database
  const userAccounts = accounts.filter((acc) => acc.userId === id);

  res.json(userAccounts);
}

export function deleteAccount(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get info from req.user
  const { id: userId } = req.user;
  // delete account from database
  const accIndex = accounts.findIndex(
    (acc) => acc.id === +id && acc.userId === userId,
  );

  if (accIndex === -1) {
    res.status(404);
    throw new Error('Account not found');
  }
  accounts.splice(accIndex, 1);
  // delete all incomes and expenses from database

  res.json({ message: 'Account deleted' });
}
