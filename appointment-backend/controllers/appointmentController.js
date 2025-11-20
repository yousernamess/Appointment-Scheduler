const Appointment = require("../models/appointment");

// ------------------------
// BOOK APPOINTMENT
// ------------------------
exports.bookAppointment = async (req, res) => {
  try {
    const { type, date, time } = req.body;
    const userId = req.user.id;

    if (!type || !date || !time) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check for overlapping appointment (only scheduled)
    const conflict = await Appointment.findOne({
      date,
      time,
      userId,
      status: "scheduled"
    });

    if (conflict) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    const newAppt = new Appointment({
      userId,
      type,
      date,
      time
    });

    await newAppt.save();
    res.json({ message: "Appointment booked", appointment: newAppt });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// ------------------------
// VIEW USER APPOINTMENTS
// ------------------------
exports.getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await Appointment.find({
      userId,
      status: "scheduled"
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// ------------------------
// CANCEL APPOINTMENT
// ------------------------
exports.cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    await Appointment.findByIdAndUpdate(appointmentId, {
      status: "cancelled",
    });

    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
