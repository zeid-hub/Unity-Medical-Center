import React, { useState, useEffect } from "react";
import "./Nurses.css";

function Nurses() {
  const [id, setId] = useState(""); // Added ID state
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [languageSpoken, setLanguageSpoken] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [nursesList, setNursesList] = useState([]);

  const fetchNurses = () => {
    fetch("/nurses")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setNursesList(data);
      })
      .catch((error) => console.error("Error fetching nurses data:", error));
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNurse = {
      id,
      name,
      department_id: departmentId,
      doctor_id: doctorId,
      language_spoken: languageSpoken,
      license_number: licenseNumber,
    };

    fetch("/nurses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNurse),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Nurse added successfully:", data);
        setId(""); // Clear ID field after submission
        setName("");
        setDepartmentId("");
        setDoctorId("");
        setLanguageSpoken("");
        setLicenseNumber("");
        fetchNurses();
      })
      .catch((error) => console.error("Error adding nurse:", error));
  };

  const handleDelete = (id) => {
    fetch(`/nurses/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Nurse deleted successfully:", data);
        fetchNurses();
      })
      .catch((error) => console.error("Error deleting nurse:", error));
  };

  return (
    <div className="nurse-form-container">
      <h2>Add Nurse</h2>
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
          Department ID:
          <input
            type="text"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          />
        </label>
        <label>
          Doctor ID:
          <input
            type="text"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />
        </label>
        <label>
          Language Spoken:
          <input
            type="text"
            value={languageSpoken}
            onChange={(e) => setLanguageSpoken(e.target.value)}
          />
        </label>
        <label>
          License Number:
          <input
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
          />
        </label>
        <button type="submit">Add Nurse</button>
      </form>
      <h2>Nurses List</h2>
      <ul>
        {nursesList.map((nurse) => (
          <li key={nurse.id}>
            {nurse.name} -{" "}
            <button onClick={() => handleDelete(nurse.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Nurses;
