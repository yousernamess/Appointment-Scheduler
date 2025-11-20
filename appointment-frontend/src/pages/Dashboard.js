import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

const fetchAppointments = async () => {
  try {
    const res = await API.get("/appointments");
    setAppointments([...res.data]);  // 🟢 FIXED
  } catch (err) {
    console.log(err);
  }
};


const cancelAppointment = async (id) => {
  try {
    console.log("Cancelling appointment id:", id);
    const res = await API.delete(`/appointments/${id}`);
    console.log("Cancel response:", res.data);

    await fetchAppointments(); // 🟢 FIX
  } catch (err) {
    console.error("Cancel error:", err);
  }
};


return (
  <div className="container">
    <h2>Dashboard</h2>

    <button onClick={() => navigate("/book")}>Book New Appointment</button>

    <h3>Your Appointments:</h3>

    {appointments.length === 0 && <p>No upcoming appointments</p>}

    <div>
      {appointments.map((a) => (
        <div className="appointment-card" key={a._id}>
          <div>
            <strong>{a.type}</strong><br />
            {a.date} — {a.time}
          </div>

          <button
            className="cancel-btn"
            onClick={() => cancelAppointment(a._id)}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  </div>
);

}

export default Dashboard;
