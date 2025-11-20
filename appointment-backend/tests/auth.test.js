const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

let testEmail = "";   // will hold dynamic email

describe("Auth API Tests", () => {

  // Close DB connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Register a new user", async () => {
    // Create unique email every test run
    testEmail = `test${Date.now()}@example.com`;

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: testEmail,
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Login with registered user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testEmail,
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

});
