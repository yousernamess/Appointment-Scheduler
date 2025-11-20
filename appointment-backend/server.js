require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 👍");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/appointments", require("./routes/appointments"));

const PORT = process.env.PORT || 4000;

/**
 * 🛑 IMPORTANT: Do NOT connect to real MongoDB during tests.
 * Jest automatically sets NODE_ENV="test"
 */
if (process.env.NODE_ENV !== "test") {
  connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
