import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';

describe('user', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/budgetify-supertest');
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  // REGISTER
  describe('register user: POST /api/user/register', () => {
    it('should create user when request body is valid', async () => {
      const response = await supertest(app).post('/api/user/register').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'usertest@example.com',
        password: 'test1234',
      });

      expect(response.body.token).toBeDefined();
      expect(response.body.id).toBeDefined();
    });

    it('should send error when user already exists', async () => {
      const response = await supertest(app).post('/api/user/register').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'usertest@example.com',
        password: 'test1234',
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBeDefined();
    });

    it('should send error when request body is NOT valid', async () => {
      const response = await supertest(app).post('/api/user/register').send({
        email: 'usertest@example.com',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid input!');
    });
  });

  // LOGIN
  describe('login user: POST /api/user/login', () => {
    it('should return token when request body is valid', async () => {
      const response = await supertest(app).post('/api/user/login').send({
        email: 'usertest@example.com',
        password: 'test1234',
      });

      expect(response.body.token).toEqual(expect.any(String));
    });

    it('should send error when credentials are invalid', async () => {
      const response = await supertest(app).post('/api/user/login').send({
        email: 'usertest@example.com',
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Incorrect email or password!');
    });

    it('should send error when user not found', async () => {
      const response = await supertest(app).post('/api/user/login').send({
        email: 'newuser@example.com',
        password: 'somepassword',
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found!');
    });

    it('should send error when request body is NOT valid', async () => {
      const response = await supertest(app).post('/api/user/login').send({
        email: 'usertest@example.com',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid input!');
    });
  });
});
