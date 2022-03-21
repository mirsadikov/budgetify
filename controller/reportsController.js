import mongoose from 'mongoose';
import User from '../models/User.js';
import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';

export async function totalUsers(req, res) {
  const total = await User.count({});
  res.json({ total });
}

export async function personalTotalIncome(req, res) {
  const id = req.user;

  const accounts = (await Account.where('userId').equals(id).select('_id')).map(
    (tr) => new mongoose.Types.ObjectId(tr._id),
  );

  const incomes = await Transaction.aggregate([
    {
      $match: {
        accountId: { $in: accounts },
        type: 'income',
      },
    },
    { $group: { _id: '$accountId', amount: { $sum: '$amount' } } },
  ]);

  res.json(incomes);
}

export function generalTotalIncome(req, res) {
  // calculate general total income
  res.json({ sum: 0 });
}

export function expensesByCategories(req, res) {
  // calculate total expenses
  res.send('expensesByCategories called');
}

export async function personalTotalExpense(req, res) {
  const { id } = req.user;
  const accounts = (await Account.where('userId').equals(id).select('_id')).map(
    (tr) => new mongoose.Types.ObjectId(tr._id),
  );

  const expenses = await Transaction.aggregate([
    {
      $match: {
        accountId: { $in: accounts },
        type: 'expense',
      },
    },
    { $group: { _id: '$accountId', amount: { $sum: '$amount' } } },
  ]);
  res.send(expenses);
}

export function generalTotalExpense(req, res) {
  // calculate general total expenses
  res.json({ sum: 0 });
}
