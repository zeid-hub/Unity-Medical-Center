// import React, { useEffect, useState } from "react";
// import "./Appointments.css";
// function Appointments() {
//   const [appointmentsList, setAppointmentsList] = useState([]);
//   const [newAppointment, setNewAppointment] = useState({
//     patient_name: "",
//     datetime: "",
//     doctor_name: "",
//     reason: ""
//   });
//   //

//   const fetchAppointments = () => {
//     fetch("/appointments")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setAppointmentsList(data);
//       })
//       .catch((error) => console.error("Error fetching appointments data:", error));
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch("/appointments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newAppointment),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         fetchAppointments();
//         setNewAppointment({
//           patient_name: "",
//           datetime: "",
//           doctor_name: "",
//           reason: ""
//         });
//       })
//       .catch((error) => console.error("Error adding appointment:", error));
//   };

//   const handleDelete = (id) => {
//     fetch(`/appointments/${id}`, {
//       method: "DELETE",
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         fetchAppointments();
//       })
//       .catch((error) => console.error("Error deleting appointment:", error));
//   };

//   return (
//     <div>
//       <h2>Appointments</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Patient Name:
//           <input
//             type="text"
//             value={newAppointment.patient_name}
//             onChange={(e) => setNewAppointment({ ...newAppointment, patient_name: e.target.value })}
//           />
//         </label>
//         <label>
//           Date & Time:
//           <input
//             type="datetime-local"
//             value={newAppointment.datetime}
//             onChange={(e) => setNewAppointment({ ...newAppointment, datetime: e.target.value })}
//           />
//         </label>
//         <label>
//           Doctor Name:
//           <input
//             type="text"
//             value={newAppointment.doctor_name}
//             onChange={(e) => setNewAppointment({ ...newAppointment, doctor_name: e.target.value })}
//           />
//         </label>
//         <label>
//           Reason:
//           <input
//             type="text"
//             value={newAppointment.reason}
//             onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
//           />
//         </label>
//         <button type="submit">Add Appointment</button>
//       </form>
//       <ul>
//         {appointmentsList.map((appointment) => (
//           <li key={appointment.id}>
//             <h3>Patient Name: {appointment.patient_name}</h3>
//             <p>Date & Time: {appointment.datetime}</p>
//             <p>Doctor Name: {appointment.doctor_name}</p>
//             <p>Reason: {appointment.reason}</p>
//             <button onClick={() => handleDelete(appointment.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Appointments;


import React, { useEffect, useState } from "react";
import "./Appointments.css";

function Appointments() {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patient_name: "",
    datetime: "",
    doctor_name: "",
    reason: ""
  });

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
        fetchAppointments();
        setNewAppointment({
          patient_name: "",
          datetime: "",
          doctor_name: "",
          reason: ""
        });
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
        fetchAppointments();
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <label htmlFor="patientName">
          Patient Name:
          <input
            type="text"
            id="patientName"
            value={newAppointment.patient_name}
            onChange={(e) => setNewAppointment({ ...newAppointment, patient_name: e.target.value })}
          />
        </label>
        <label htmlFor="dateTime">
          Date & Time:
          <input
            type="datetime-local"
            id="dateTime"
            value={newAppointment.datetime}
            onChange={(e) => setNewAppointment({ ...newAppointment, datetime: e.target.value })}
          />
        </label>
        <label htmlFor="doctorName">
          Doctor Name:
          <input
            type="text"
            id="doctorName"
            value={newAppointment.doctor_name}
            onChange={(e) => setNewAppointment({ ...newAppointment, doctor_name: e.target.value })}
          />
        </label>
        <label htmlFor="reason">
          Reason:
          <input
            type="text"
            id="reason"
            value={newAppointment.reason}
            onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
          />
        </label>
        <button type="submit" id="addAppointmentBtn">Add Appointment</button>
      </form>
      <ul className="appointment-list">
        {appointmentsList.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            <h3>Patient Name: {appointment.patient_name}</h3>
            <p>Date & Time: {appointment.datetime}</p>
            <p>Doctor Name: {appointment.doctor_name}</p>
            <p>Reason: {appointment.reason}</p>
            <button onClick={() => handleDelete(appointment.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;

