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
  describe('POST /api/user/register', () => {
    describe('POST: when request body is valid', () => {
      it('should return token and user', async () => {
        const response = await supertest(app).post('/api/user/register').send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'usertest@example.com',
          password: 'test1234',
        });

        expect(response.body.token).toBeDefined();
        expect(response.body.id).toBeDefined();
      });

      it('should send error: already exists', async () => {
        const response = await supertest(app).post('/api/user/register').send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'usertest@example.com',
          password: 'test1234',
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
      });
    });

    describe('POST: when request body is NOT valid', () => {
      it('should send error: invalid input', async () => {
        const response = await supertest(app).post('/api/user/register').send({
          email: 'usertest@example.com',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid input!');
      });
    });
  });

  // LOGIN
  describe('POST /api/user/login', () => {
    describe('POST: when request body is valid ', () => {
      it('should return token and user', async () => {
        const response = await supertest(app).post('/api/user/login').send({
          email: 'usertest@example.com',
          password: 'test1234',
        });

        expect(response.body.token).toEqual(expect.any(String));
      });

      it('should send error: invalid credentials', async () => {
        const response = await supertest(app).post('/api/user/login').send({
          email: 'usertest@example.com',
          password: 'wrongpassword',
        });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Incorrect email or password!');
      });

      it('should send error: not found', async () => {
        const response = await supertest(app).post('/api/user/login').send({
          email: 'newuser@example.com',
          password: 'somepassword',
        });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found!');
      });
    });

    describe('POST: when request body is NOT valid', () => {
      it('should send error: invalid input', async () => {
        const response = await supertest(app).post('/api/user/login').send({
          email: 'usertest@example.com',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid input!');
      });
    });
  });
});
