import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';


beforeAll(async () => {
  await mongoose.connect(process.env.DBURL!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/login', () => {
  const userData = {
    name: 'Test Login',
    email: `login${Date.now()}@test.com`,
    password: 'loginpass123',
  };

  beforeAll(async () => {
    await request(app).post('/api/register').send(userData);
  });

  it('should login successfully with valid credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: userData.email,
        password: userData.password,
      });

    console.log('Login response:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', userData.email.toLowerCase());
    expect(res.body.user).toHaveProperty('name', userData.name);
  });

  it('should fail with incorrect password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: userData.email,
        password: 'wrongpass',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });

  it('should fail with non-existing email', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'notfound@example.com',
        password: 'loginpass123',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Credentials Not Found!');
  });
});
