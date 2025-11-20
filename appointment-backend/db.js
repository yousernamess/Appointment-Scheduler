// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    console.log("Skipping real DB connection in test mode");
    return; // prevent Atlas connection during tests
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB Connected ✔");
  } catch (err) {
    console.error("Database connection error ❌:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
