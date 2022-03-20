import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

describe('guards', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/budgetify-supertest');
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  // AUTH
  describe('AUTH: GET /api/account', () => {
    it('should send error: when no token', async () => {
      const response = await supertest(app).get('/api/account');

      expect(response.body.message).toBe('Unauthorized');
    });

    it('should send error: when fake id', async () => {
      const token = generateToken({ id: '777777777777777777777777' });
      const response = await supertest(app)
        .get('/api/account')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });

    it('should send error: id not like id', async () => {
      const token = generateToken({ id: 'something' });
      const response = await supertest(app)
        .get('/api/account')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
    });
  });

  // ADMIN
  describe('ADMIN: GET /api/reports/totalusers', () => {
    it('should get total users: when admin', async () => {
      const admin = await User.create({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@example.com',
        password: 'test1234',
        role: 'admin',
      });

      const token = generateToken({ id: admin._id });

      const response = await supertest(app)
        .get('/api/reports/totalusers')
        .set('Authorization', `Bearer ${token}`);

      expect(response.body.total).toEqual(expect.any(Number));
    });

    it('should send error: when not admin ', async () => {
      const user = await User.create({
        firstName: 'user',
        lastName: 'user',
        email: 'user@example.com',
        password: 'test1234',
        role: 'user',
      });

      const token = generateToken({ id: user._id });

      const response = await supertest(app)
        .get('/api/reports/totalusers')
        .set('Authorization', `Bearer ${token}`);

      expect(response.body.message).toBe('Unauthorized');
    });
  });
});
