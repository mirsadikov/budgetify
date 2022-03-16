import Account from '../models/Account.js';

export async function createAccount(req, res, next) {
  try {
    const { title, description, currency } = req.body;
    const { id: userId } = req.user;
    const newAcc = await Account.create({
      userId,
      title,
      description,
      currency,
    });

    res.status(201).json(newAcc);
  } catch (error) {
    next(error);
  }
}

export async function updateAccount(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

export async function getAccount(req, res, next) {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const account = await Account.findOne({ _id: id, userId });

    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404);
      throw new Error('Account not found');
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllAccounts(req, res) {
  // get info from req.user
  const { id } = req.user;
  // get all accounts from database
  const userAccounts = await Account.where({ userId: id });

  res.json(userAccounts);
}

export async function deleteAccount(req, res, next) {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const account = await Account.findOne({ _id: id, userId });

    if (account) {
      await account.remove();
      res.status(200).json({ success: true });
    } else {
      res.status(404);
      throw new Error('Account not found');
    }
  } catch (error) {
    next(error);
  }
}
