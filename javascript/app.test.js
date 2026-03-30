const request = require('supertest');
const app = require('./app');

test('GET /users', async () => {
  const res = await request(app).get('/users');
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /users', async () => {
  const res = await request(app)
    .post('/users')
    .send({ name: 'Mandu' });

  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe('Mandu');
});
