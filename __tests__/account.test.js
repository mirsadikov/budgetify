import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';

describe('account', () => {
  let user;
  let account;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/budgetify-supertest');
    await supertest(app)
      .post('/api/user/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'usertest@example.com',
        password: 'test1234',
      })
      .then((res) => {
        user = res.body;
      });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  // CREATE ACCOUNT
  describe('create account: POST /api/account/create', () => {
    it('should create account when request body is valid', async () => {
      const response = await supertest(app)
        .post('/api/account/create')
        .send({
          title: 'Test account',
          description: 'This is a test account',
          currency: 'USD',
        })
        .set('Authorization', user.token);

      expect(response.body.title).toBe('Test account');
      expect(response.body.balance).toBe(0);
      expect(response.body.userId).toBe(user.id);

      account = response.body._id;
    });

    it('should send error when request body is NOT valid: invalid input', async () => {
      const response = await supertest(app)
        .post('/api/account/create')
        .send({
          title: 'Test account',
        })
        .set('Authorization', user.token);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid input!');
    });
  });

  // UPDATE ACCOUNT
  describe('update account: PUT /api/account/:id', () => {
    it('should update account when request body is valid', async () => {
      const response = await supertest(app)
        .put(`/api/account/${account}`)
        .send({
          balance: 777,
        })
        .set('Authorization', user.token);

      expect(response.body.balance).toBe(777);
    });

    it('should send error when account not found', async () => {
      const response = await supertest(app)
        .put(`/api/account/777777777777777777777777`)
        .send({})
        .set('Authorization', user.token);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Account not found!');
    });
  });

  // GET ONE ACCOUNT
  describe('get one account: GET /api/account/:id', () => {
    it('should return one account', async () => {
      const response = await supertest(app)
        .get(`/api/account/${account}`)
        .set('Authorization', user.token);

      expect(response.body.balance).toBe(777);
    });

    it('should send error when account not found', async () => {
      const response = await supertest(app)
        .get(`/api/account/777777777777777777777777`)
        .set('Authorization', user.token);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Account not found!');
    });
  });

  // GET ALL ACCOUNTS
  describe('get all accounts: GET /api/account', () => {
    it('should return all accounts', async () => {
      const response = await supertest(app)
        .get('/api/account')
        .set('Authorization', user.token);

      expect(response.body).toEqual(expect.any(Array));
      expect(response.body.length).toBe(1);
    });
  });

  // DELETE ACCOUNT
  describe('delete account: DELETE /api/account/:id', () => {
    it('should delete account', async () => {
      const response = await supertest(app)
        .delete(`/api/account/${account}`)
        .set('Authorization', user.token);

      const accountsResponse = await supertest(app)
        .get('/api/account')
        .set('Authorization', user.token);

      expect(accountsResponse.body.length).toBe(0);
      expect(response.body.success).toBe(true);
    });

    it('should send error when account not found', async () => {
      const response = await supertest(app)
        .delete(`/api/account/777777777777777777777777`)
        .set('Authorization', user.token);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Account not found!');
    });
  });
});
