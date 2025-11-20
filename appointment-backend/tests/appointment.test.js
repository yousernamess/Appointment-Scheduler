const request = require("supertest");
const app = require("../server");

let token = "";

beforeAll(async () => {
  const uniqueEmail = `appt${Date.now()}@example.com`;

  await request(app).post("/api/auth/register").send({
    name: "Appointment Tester",
    email: uniqueEmail,
    password: "123456"
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: uniqueEmail,
    password: "123456"
  });

  token = loginRes.body.token;
});

describe("Appointment API Tests", () => {

  test("Book an appointment", async () => {
    const res = await request(app)
      .post("/api/appointments/book")
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
      .post("/api/appointments/book")
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
      .get("/api/appointments")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
