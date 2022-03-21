import mongoose from 'mongoose';
import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';
import Category from '../models/Category.js';

export async function createTransaction(req, res, next) {
  try {
    const { type, amount, categoryId, comment, date, accountId } = req.body;
    const { id: userId } = req.user;
    const account = await Account.findOne({ _id: accountId, userId });
    const category = await Category.findOne({ _id: categoryId, userId, type });

    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    if (account) {
      if (type === 'expense') {
        account.balance -= amount;
      } else {
        account.balance += amount;
      }

      const newTransaction = new Transaction({
        type,
        amount,
        categoryId,
        comment,
        date,
        accountId: account._id,
      });

      await Promise.all([account.save(), newTransaction.save()]);

      res.status(201).json(newTransaction);
    } else {
      res.status(404);
      throw new Error('Account not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function updateTransaction(req, res, next) {
  try {
    const { id } = req.params;
    const { type, amount, categoryId, comment, date, accountId } = req.body;
    const { id: userId } = req.user;
    const account = await Account.findOne({ _id: accountId, userId });
    const category = await Category.findOne({ _id: categoryId, userId });

    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    if (account) {
      const udtTr = await Transaction.findByIdAndUpdate(
        id,
        {
          type,
          amount,
          category,
          comment,
          date,
          accountId: account._id,
        },
        { new: true },
      );
      res.status(200).json(udtTr);
    } else {
      res.status(404);
      throw new Error('Account not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function getTransaction(req, res, next) {
  try {
    const { id } = req.params;

    const { id: userId } = req.user;
    const transaction = await Transaction.findById(id);
    const account = await Account.findOne({
      _id: transaction.accountId,
      userId,
    });

    if (account) {
      res.status(200).json(transaction);
    } else {
      res.status(404);
      throw new Error('Account not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllTransactions(req, res, next) {
  try {
    const { id } = req.user;
    const accounts = (
      await Account.where('userId').equals(id).select('_id')
    ).map((tr) => new mongoose.Types.ObjectId(tr._id));
    const transactions = await Transaction.where('accountId').in(accounts);
    // .populate({
    //   path: 'categoryId',
    //   select: 'title',
    // });

    res.json(transactions);
  } catch (error) {
    next(error);
  }
}

export async function getTransactionsByAccount(req, res, next) {
  try {
    const { id: userId } = req.user;
    const { accountId } = req.params;
    const account = await Account.findOne({ _id: accountId, userId });

    if (account) {
      const transactions = await Transaction.find({ accountId });
      res.status(200).json(transactions);
    } else {
      res.status(404);
      throw new Error('Account not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteTransaction(req, res, next) {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found!');
    }

    const account = await Account.findOne({
      _id: transaction.accountId,
      userId,
    });

    if (account) {
      await transaction.remove();
      res.status(200).json({ success: true });
    } else {
      res.status(404);
      throw new Error('Account not found!');
    }
  } catch (error) {
    next(error);
  }
}
