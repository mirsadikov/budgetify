import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';

describe('app', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/budgetify-supertest');
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  // TEST
  describe('TEST: GET /', () => {
    it('should return Hello World!', async () => {
      const response = await supertest(app).get('/');

      expect(response.text).toBe('Hello World!');
    });
  });

  // NOT FOUND
  describe('NOT FOUND: GET /api/some/wrong/url', () => {
    it('should send error: not found', async () => {
      const response = await supertest(app).get('/api/some/wrong/url');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Not found - /api/some/wrong/url');
      expect(response.body.stack).toEqual(expect.any(String));
    });
  });
});
