const request = require('supertest');
const app = require('../app');

describe('GET /ping', () => {
  it('should return pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'pong');
  });
});

// Alternate syntax and writeup
// https://www.testim.io/blog/supertest-how-to-test-apis-like-a-pro/

describe('API Endpoint Tests for /api/students', () => {
  let createdStudentId = null;

  it('POST /api/students → should create a student', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({ name: "Test User", major: "CS", year: "Senior" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdStudentId = res.body.id;
  });

  it('GET /api/students → should return array of students', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/students/:id → should return one student', async () => {
    const res = await request(app).get(`/api/students/${createdStudentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdStudentId);
  });

  it('PUT /api/students/:id → should update the student', async () => {
    const res = await request(app)
      .put(`/api/students/${createdStudentId}`)
      .send({ name: "Updated User", major: "Math", year: "Junior" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', "Updated User");
  });

  it('DELETE /api/students/:id → should delete the student', async () => {
    const res = await request(app).delete(`/api/students/${createdStudentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', "Student deleted successfully");
  });
});
