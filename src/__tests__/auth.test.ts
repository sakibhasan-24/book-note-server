
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DBURL!)
beforeAll(async () => {
  await mongoose.connect(process.env.DBURL!, {
    // options
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
const uniqueEmail = `newUser${Date.now()}@gmail.com`;
describe('POST /api/register', () => {
  it('should register a user successfully with unique email', async () => {
    const res = await request(app).post('/api/register').send({
      name: 'Test User',
      email:uniqueEmail, 
      password: 'secret123',
    });
 console.log('Response body:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('email', uniqueEmail.toLowerCase());
    expect(res.body.status).toBe(true);
  });

  it('should fail with invalid email', async () => {
    const res = await request(app).post('/api/register').send({
      name: 'Invalid',
      email: 'not-an-email',
      password: 'pass123',
    });

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe('Validation failed');
  });
});

afterAll(async () => {
  await mongoose.connection.close(); 
});
