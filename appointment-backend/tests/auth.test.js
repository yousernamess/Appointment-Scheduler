const request = require("supertest");
const app = require("../server");

let testEmail = "";

describe("Auth API Tests", () => {

  test("Register a new user", async () => {
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

    console.log("LOGIN RESPONSE:", res.body); // 👈 ADD THIS

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

});
