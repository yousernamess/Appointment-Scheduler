const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  bookAppointment,
  getAppointments,
  cancelAppointment
} = require("../controllers/appointmentController");

// BOOK APPOINTMENT
router.post("/book", auth, bookAppointment);

// GET USER APPOINTMENTS
router.get("/", auth, getAppointments);

// CANCEL APPOINTMENT
router.delete("/:id", auth, cancelAppointment);

module.exports = router;
