import { incomes } from '../data/db.js';

export function createIncome(req, res) {
  // get info from req.body
  const { amount, comment, date, accountId } = req.body;
  // get info from req.user
  // create income in database
  const newIncome = {
    id: incomes.length + 1,
    accountId,
    amount,
    comment,
    date,
  };

  incomes.push(newIncome);
  // update account balance in database
  res.json(newIncome);
}

export function updateIncome(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get info from req.body
  const { amount, comment, date } = req.body;
  // update income in database
  const incomeIndex = incomes.findIndex((income) => income.id === +id);
  incomes[incomeIndex].amount = amount;
  incomes[incomeIndex].comment = comment;
  incomes[incomeIndex].date = date;

  res.json(incomes[incomeIndex]);
}

export function getIncome(req, res) {
  // get id from req.params
  const { id } = req.params;
  // get income from database
  const income = incomes.find((inc) => inc.id === +id);
  res.json(income);
}

export function getAllIncomes(req, res) {
  // get info from req.user
  // get all incomes from database
  res.json(incomes);
}

export function deleteIncome(req, res) {
  // get id from req.params
  const { id } = req.params;
  // delete income from database
  const incomeIndex = incomes.findIndex((inc) => inc.id === +id);
  incomes.splice(incomeIndex, 1);
  res.json({ message: 'Income deleted' });
}
