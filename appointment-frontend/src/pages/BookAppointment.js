import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    type: "",
    date: "",
    time: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appointments/book", appointment);
      navigate("/dashboard");
    } catch (err) {
      alert("Error booking appointment. Slot may be taken.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Type"
          value={appointment.type}
          onChange={(e) => setAppointment({ ...appointment, type: e.target.value })}
        /><br /><br />

        <input
          placeholder="Date (YYYY-MM-DD)"
          value={appointment.date}
          onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
        /><br /><br />

        <input
          placeholder="Time (e.g. 10:00 AM)"
          value={appointment.time}
          onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
        /><br /><br />

        <button type="submit">Book</button>
      </form>

      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
}

export default BookAppointment;
