import { transactions } from '../data/db.js';

export function createTransaction(req, res) {
  // get info from req.body
  const { amount, comment, date, accountId } = req.body;
  // get info from req.user
  // create income in database
  const newIncome = {
    id: transactions.length + 1,
    accountId,
    amount,
    comment,
    date,
  };

  transactions.push(newIncome);
  // update account balance in database
  res.json(newIncome);
}

export function updateTransaction(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get info from req.body
  const { amount, comment, date } = req.body;
  // update income in database
  const incomeIndex = transactions.findIndex((income) => income.id === +id);
  transactions[incomeIndex].amount = amount;
  transactions[incomeIndex].comment = comment;
  transactions[incomeIndex].date = date;

  res.json(transactions[incomeIndex]);
}

export function getTransaction(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get income from database
  const income = transactions.find((inc) => inc.id === +id);
  res.json(income);
}

export function getAllTransactions(req, res) {
  // get info from req.user
  // get all transactions from database
  res.json(transactions);
}

export function deleteTransaction(req, res) {
  // get id from req.params
  const { id } = req.params;
  // delete income from database
  const incomeIndex = transactions.findIndex((inc) => inc.id === +id);
  transactions.splice(incomeIndex, 1);
  res.json({ message: 'Income deleted' });
}
