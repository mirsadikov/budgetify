import bcrypt from 'bcrypt';

export const users = [
  {
    id: 8619598882918447,
    email: 'user1@example.com',
    password: '$2b$10$KCQJo7VKj7uFr8GsFYN9g.M.Xd4vvUD3Ah1x5STesBiA0Z1W.OXna', // user1_123!
    role: 'user',
  },
  {
    id: 4580173761551696,
    email: 'user2@example.com',
    password: '$2b$10$IPFzsImA6ypcncyWid48COvDBAL0h4px2U/bOyu6lfjaeIVXt4AL2', // user2_123!
    role: 'user',
  },
  {
    id: 6299130007248499,
    email: 'admin@example.com',
    password: '$2b$10$FRFXctyUyyscMvL2N41pNu8xmpK5f.Ar3vISUwnz20xoBoUJPNmtu', // admin123!
    role: 'admin',
  },
];

export const accounts = [
  {
    id: 1,
    userId: 8619598882918447,
    name: 'Account 1',
    balance: 100,
    currency: 'USD',
  },
  {
    id: 2,
    userId: 8619598882918447,
    name: 'Account 2',
    balance: 0,
    currency: 'USD',
  },
  {
    id: 3,
    userId: 6299130007248499,
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

export function registerUser(user) {
  const id = +Math.random().toString().slice(2);
  users.push({
    id,
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    role: user.role,
  });

  return id;
}

export function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}
