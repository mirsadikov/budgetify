import { users, transactions, accounts } from '../data/db.js';

export function totalUsers(req, res) {
  // get info from database
  const total = users.length;
  res.json({ total });
}

export function personalTotalIncome(req, res) {
  // get info from req.user
  const id = req.user;
  // get account id
  const accountIds = accounts
    .filter((account) => account.userId === +id)
    .map((account) => account.id);

  // calculate total income
  const sum = transactions
    .filter((tr) => accountIds.includes(tr.accountId) && tr.type === 'income')
    .reduce((acc, tr) => acc + tr.amount, 0);
  res.json({ sum });
}

export function generalTotalIncome(req, res) {
  // calculate general total income
  const sum = transactions
    .filter((tr) => tr.type === 'income')
    .reduce((acc, inc) => acc + inc.amount, 0);
  res.json({ sum });
}

export function expensesByCategories(req, res) {
  // get info from req.user
  // calculate total expenses
  res.send('expensesByCategories called');
}

export function personalTotalExpense(req, res) {
  // get info from req.user
  const id = req.user;
  // get account id
  const accountIds = accounts
    .filter((account) => account.userId === +id)
    .map((account) => account.id);

  // calculate total income
  const sum = transactions
    .filter(
      (inc) => accountIds.includes(inc.accountId) && inc.type === 'expense',
    )
    .reduce((acc, ex) => acc + ex.amount, 0);
  res.json({ sum }); // get info from req.user
  // calculate total expenses
  res.send('personalTotalExpense called');
}

export function generalTotalExpense(req, res) {
  // calculate general total expenses
  const sum = transactions
    .filter((tr) => tr.type === 'expense')
    .reduce((acc, ex) => acc + ex.amount, 0);
  res.json({ sum });
}
