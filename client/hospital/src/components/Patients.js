import React, { useState, useEffect } from "react";
import "./Patients.css";

function Patients() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [patientsList, setPatientsList] = useState([]);

  const fetchPatients = () => {
    fetch("/patients")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setPatientsList(data);
      })
      .catch((error) => console.error("Error fetching patients data:", error));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      id,
      name,
      age,
      gender,
      contact,
      diagnosis,
      bed_number: bedNumber,
      doctor_id: doctorId,
    };

    fetch("/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Patient added successfully:", data);
        setId("");
        setName("");
        setAge("");
        setGender("");
        setContact("");
        setDiagnosis("");
        setBedNumber("");
        setDoctorId("");
        fetchPatients();
      })
      .catch((error) => console.error("Error adding patient:", error));
  };

  const handleDelete = (id) => {
    fetch(`/patients/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Patient deleted successfully:", data);
        fetchPatients();
      })
      .catch((error) => console.error("Error deleting patient:", error));
  };

  return (
    <div className="patient-form-container" id="patients-form">
      <h2>Add Patient</h2>
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
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </label>
        <label>
          Diagnosis:
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </label>
        <label>
          Bed Number:
          <input
            type="text"
            value={bedNumber}
            onChange={(e) => setBedNumber(e.target.value)}
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
        <button type="submit">Add Patient</button>
      </form>
      <h2>Patients List</h2>
      <ul id="patients-list">
        {patientsList.map((patient) => (
          <li key={patient.id}>
            <div>
              <strong>ID:</strong> {patient.id}<br />
              <strong>Name:</strong> {patient.name}<br />
              <strong>Age:</strong> {patient.age}<br />
              <strong>Gender:</strong> {patient.gender}<br />
              <strong>Contact:</strong> {patient.contact}<br />
              <strong>Diagnosis:</strong> {patient.diagnosis}<br />
              <strong>Bed Number:</strong> {patient.bed_number}<br />
              <strong>Doctor ID:</strong> {patient.doctor_id}<br />
            </div>
            <button onClick={() => handleDelete(patient.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;
