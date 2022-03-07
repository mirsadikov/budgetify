export const users = [
  { id: 1, email: 'user1@example.com', password: 'password1' },
  { id: 2, email: 'user2@example.com', password: 'password2' },
  { id: 3, email: 'user3@example.com', password: 'password3' },
];

export const accounts = [
  {
    id: 1,
    userId: 1,
    name: 'Account 1',
    balance: 100,
    currency: 'USD',
  },
  {
    id: 2,
    userId: 1,
    name: 'Account 2',
    balance: 0,
    currency: 'USD',
  },
  {
    id: 3,
    userId: 2,
    name: 'Account 3',
    balance: 300,
    currency: 'USD',
  },
];

export const incomes = [
  {
    id: 1,
    accountId: 3,
    amount: 300,
    date: '2022-03-01',
    comment: 'Income user 2',
  },
  {
    id: 2,
    accountId: 1,
    amount: 300,
    date: '2022-03-02',
    comment: 'Income user 1',
  },
];

export const expenses = [
  {
    id: 1,
    accountId: 1,
    amount: 200,
    date: '2022-03-03',
    comment: 'Expense user 1',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Question 1 of the faqs',
    answer: 'Anwser 1 of the faqs',
  },
];
