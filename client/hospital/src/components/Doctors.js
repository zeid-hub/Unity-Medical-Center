import React, { useEffect, useState } from "react";
import "./Doctors.css";

function Doctors() {
  const [doctorList, setDoctorList] = useState([]);
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [languageSpoken, setLanguageSpoken] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  const fetchDoctors = () => {
    fetch("/doctors")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setDoctorList(data);
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  };

  const fetchDepartments = () => {
    fetch("/departments")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => console.error("Error fetching departments:", error));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const newDoctor = {
      name,
      license_number: licenseNumber,
      specialization,
      language_spoken: languageSpoken,
      department_id: departmentId,
    };

    fetch("/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDoctor),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setDoctorList([...doctorList, data]);
        setName("");
        setLicenseNumber("");
        setSpecialization("");
        setLanguageSpoken("");
        setDepartmentId("");
      })
      .catch((error) => console.error("Error adding doctor:", error));
  };

  const handleDeleteDoctor = (id) => {
    fetch(`/doctors/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(() => {
        setDoctorList(doctorList.filter((doctor) => doctor.id !== id));
      })
      .catch((error) => console.error("Error deleting doctor:", error));
  };

  return (
    <div className="container">
      <h2>Add Doctor</h2>
      <form onSubmit={handleAddDoctor}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <label>
          Specialization:
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
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
          Department ID:
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Doctor</button>
      </form>

      <h1 className="header">Our Doctors</h1>
      <ul className="list">
        {doctorList.map((doctor) => (
          <li key={doctor.id}>
            <h2 className="name">Name: {doctor.name}</h2>
            <p>LICENSE NUMBER: {doctor.license_number}</p>
            <p>SPECIALIZATION: {doctor.specialization}</p>
            <p>LANGUAGE SPOKEN: {doctor.language_spoken}</p>
            <p>DEPARTMENT NAME: {doctor.department_name}</p>
            <p>DEPARTMENT ID: {doctor.department_id}</p>
            <button onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Doctors;
