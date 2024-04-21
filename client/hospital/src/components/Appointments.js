
import React, { useState, useEffect } from "react";
import "./Appointments.css";

function Appointments() {
  const [id, setId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [reason, setReason] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentsList, setAppointmentsList] = useState([]);

  const fetchAppointments = () => {
    fetch("/appointments")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAppointmentsList(data);
      })
      .catch((error) => console.error("Error fetching appointments data:", error));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: parseInt(id), // Convert id to integer
      patient_name: patientName,
      reason,
      doctor_name: doctorName,
      datetime,
      doctor_id: parseInt(doctorId), // Convert doctorId to integer
    };
  
    fetch("/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAppointment),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Appointment added successfully:", data);
        setId("");
        setPatientName("");
        setReason("");
        setDoctorName("");
        setDatetime("");
        setDoctorId("");
        fetchAppointments();
      })
      .catch((error) => console.error("Error adding appointment:", error));
  };  

  const handleDelete = (id) => {
    fetch(`/appointments/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Appointment deleted successfully:", data);
        fetchAppointments();
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  return (
    <div className="appointment-form-container" id="appointments-form">
      <h2>Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <label>
          Patient Name:
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </label>
        <label>
          Reason:
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
        <label>
          Doctor Name:
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </label>
        <label>
          Date and Time:
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </label>
        <label>
          Doctor ID:
          <input
            type="number"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />
        </label>
        <button type="submit">Add Appointment</button>
      </form>
      <h2>Appointments List</h2>
      <ul id="appointments-list">
        {appointmentsList.map((appointment) => (
          <li key={appointment.id}>
            <div>
              <strong>ID:</strong> {appointment.id}<br />
              <strong>Patient Name:</strong> {appointment.patient_name}<br />
              <strong>Reason:</strong> {appointment.reason}<br />
              <strong>Doctor Name:</strong> {appointment.doctor_name}<br />
              <strong>Date and Time:</strong> {appointment.datetime}<br />
              <strong>Doctor ID:</strong> {appointment.doctor_id}<br />
            </div>
            <button onClick={() => handleDelete(appointment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
