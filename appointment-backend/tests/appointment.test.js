const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

let token = ""; // Will hold the JWT for test user

beforeAll(async () => {
  const uniqueEmail = `appt${Date.now()}@example.com`;

  // Register user
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Appointment Tester",
      email: uniqueEmail,
      password: "123456"
    });

  // Login user
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: uniqueEmail,
      password: "123456"
    });

  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Appointment API Tests", () => {

  test("Book an appointment", async () => {
    const res = await request(app)
      .post("/api/appointments/book")   // 🟢 FIXED ENDPOINT
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "Dentist",
        date: "2025-12-20",
        time: "10:00 AM"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("appointment");
  });

  test("Prevent duplicate booking", async () => {
    const res = await request(app)
      .post("/api/appointments/book")    // 🟢 FIXED ENDPOINT
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "Dentist",
        date: "2025-12-20",
        time: "10:00 AM"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Time slot already booked");
  });

  test("Get scheduled appointments", async () => {
    const res = await request(app)
      .get("/api/appointments")         // 🟢 THIS ONE WAS ALREADY CORRECT
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
