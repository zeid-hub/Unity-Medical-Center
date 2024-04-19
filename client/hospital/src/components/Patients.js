import React, { useEffect, useState } from "react";

function Patients() {
  const [patientsList, setPatientsList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/patients")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data from API:", data); // Log the data received from the API
        setPatientsList(data);
      })
      .catch((error) => console.error("Error fetching patients data:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="header">
        <span className="span">Patients</span>
      </h1>
      <ul className="list">
        {patientsList.map((patient) => (
          <li key={patient.id}>
            <h2 className="inner-header">
              <span className="name">Name:</span> {patient.name}
            </h2>
            <h4>Age: {patient.age}</h4>
            <h4>Gender: {patient.gender}</h4>
            <h4>Contact: {patient.contact}</h4>
            <h4>Bed Number: {patient.bed_number}</h4>
            <h4>Diagnosis: {patient.diagnosis}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;
