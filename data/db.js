import bcrypt from 'bcrypt';

export const users = [
  {
    id: 1,
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'Admin',
    password: bcrypt.hashSync('admin123!', 10),
    role: 'admin',
  },
  {
    id: 2,
    email: 'user1@example.com',
    firstName: 'User',
    lastName: 'User',
    password: bcrypt.hashSync('user1_123!', 10),
    role: 'user',
  },
  {
    id: 3,
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: bcrypt.hashSync('johndoe123', 10),
    role: 'user',
  },
];

export const accounts = [
  {
    id: 1,
    userId: 1,
    title: 'Account 1',
    description: 'Account 1 description',
    balance: 600,
    currency: 'USD',
  },
  {
    id: 2,
    userId: 2,
    title: 'Account 2',
    description: 'Account 2 description',
    balance: 200,
    currency: 'USD',
  },
  {
    id: 3,
    userId: 2,
    title: 'Account 3',
    description: 'Account 3 description',
    balance: 20000,
    currency: 'RUB',
  },
];

export const categories = [
  {
    id: 1,
    userId: 1,
    title: 'Travel',
    type: 'expense',
  },
  {
    id: 2,
    userId: 1,
    title: 'Salary',
    type: 'income',
  },
  {
    id: 3,
    userId: 2,
    title: 'Food',
    type: 'expense',
  },
  {
    id: 4,
    userId: 2,
    title: 'Business',
    type: 'income',
  },
  {
    id: 4,
    userId: 2,
    title: 'Freelance',
    type: 'income',
  },
];

export const transactions = [
  {
    id: 1,
    accountId: 1,
    amount: 600,
    date: '2022-03-01',
    categoryId: 1,
    comment: 'Good salary',
    type: 'income',
  },
  {
    id: 2,
    accountId: 3,
    amount: 30000,
    date: '2022-03-02',
    comment: 'Business income',
    categoryId: 4,
    type: 'income',
  },
  {
    id: 3,
    accountId: 3,
    amount: 10000,
    date: '2022-03-03',
    comment: 'Food expense',
    categoryId: 3,
    type: 'expense',
  },
  {
    id: 4,
    accountId: 2,
    amount: 200,
    date: '2022-01-01',
    comment: 'Upwork income',
    categoryId: 4,
    type: 'income',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Question 1 of the faqs',
    answer: 'Anwser 1 of the faqs',
  },
  {
    id: 2,
    question: 'How to create category?',
    answer: 'Create category by clicking on the button "Add category"',
  },
  {
    id: 3,
    question: 'How to create account?',
    answer: 'Create account by clicking on the button "Add account"',
  },
];
