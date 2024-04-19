import React, { useEffect, useState } from "react";

function Appointments() {
  const [appointmentsList, setappointmentsList] = useState([]);

  useEffect(() => {
    fetch("/appointments")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data from API:", data); // Log the data received from the API
        setappointmentsList(data);
      })
      .catch((error) => console.error("Error fetching appointments data:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="header">
        <span className="span">Appointments</span>
      </h1>
      <ul className="list">
        {appointmentsList.map((appointment) => (
          <li key={appointment.id}>
            <h2 className="inner-header">
              <span className="patient-name">Patient Name:</span> {appointment.patient_name}
            </h2>
            <h4>Date & Time: {appointment.datetime}</h4>
            <h4>Doctor Name: {appointment.doctor_name}</h4>
            <h4>Reason: {appointment.reason}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
