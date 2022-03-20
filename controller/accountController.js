import Account from '../models/Account.js';
import asyncHandler from '../helpers/asyncErrorHandler.js';

export const createAccount = asyncHandler(async (req, res) => {
  const { title, description, currency } = req.body;

  if (!title || !description || !currency) {
    res.status(400);
    throw new Error('Invalid input!');
  }

  const { id: userId } = req.user;
  const newAcc = await Account.create({
    userId,
    title,
    description,
    currency,
  });

  res.status(201).json(newAcc);
});

export const updateAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, currency, balance } = req.body;
  const { id: userId } = req.user;

  const account = await Account.findOne({ _id: id, userId });

  if (account) {
    const udtAcc = await Account.findByIdAndUpdate(
      id,
      { title, description, currency, balance },
      { new: true },
    );
    res.status(200).json(udtAcc);
  } else {
    res.status(404);
    throw new Error('Account not found!');
  }
});

export const getAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const account = await Account.findOne({ _id: id, userId });

  if (account) {
    res.status(200).json(account);
  } else {
    res.status(404);
    throw new Error('Account not found!');
  }
});

export const getAllAccounts = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const userAccounts = await Account.where({ userId: id });

  res.json(userAccounts);
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const account = await Account.findOne({ _id: id, userId });

  if (account) {
    await account.remove();
    res.status(200).json({ success: true });
  } else {
    res.status(404);
    throw new Error('Account not found!');
  }
});
