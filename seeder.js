/* eslint-disable */
import 'colors';
import './config/env.js';
import connectDB from './config/db.js';
import { users, accounts, transactions, faqs, categories } from './data/db.js';
import User from './models/User.js';
import Account from './models/Account.js';
import Category from './models/Category.js';
import Transaction from './models/Transaction.js';
import FAQ from './models/FAQ.js';

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Account.deleteMany();
    await Category.deleteMany();
    await Transaction.deleteMany();
    await FAQ.deleteMany();

    const createdUser = await User.insertMany(users);
    await FAQ.insertMany(faqs);

    accounts[0].userId = createdUser[0]._id;
    accounts[1].userId = createdUser[1]._id;
    accounts[2].userId = createdUser[1]._id;
    const createdAccounts = await Account.insertMany(accounts);

    categories[0].userId = createdUser[0]._id;
    categories[1].userId = createdUser[0]._id;
    categories[2].userId = createdUser[1]._id;
    categories[3].userId = createdUser[1]._id;
    categories[4].userId = createdUser[1]._id;
    const createdCategories = await Category.insertMany(categories);

    transactions[0].accountId = createdAccounts[0]._id;
    transactions[0].categoryId = createdCategories[0]._id;
    transactions[1].accountId = createdAccounts[2]._id;
    transactions[1].categoryId = createdCategories[3]._id;
    transactions[2].accountId = createdAccounts[2]._id;
    transactions[2].categoryId = createdCategories[2]._id;
    transactions[3].accountId = createdAccounts[1]._id;
    transactions[3].categoryId = createdCategories[4]._id;
    await Transaction.insertMany(transactions);

    console.log('Data IMPORTED!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Account.deleteMany();
    await Category.deleteMany();
    await Transaction.deleteMany();
    await FAQ.deleteMany();

    console.log('Data DESTROYED!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
