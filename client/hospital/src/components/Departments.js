import React, { useState, useEffect } from "react";
import "./Departments.css";

function Departments() {
  const [departmentsList, setDepartmentsList] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    head_of_department: "",
    number_of_doctors: 0,
    number_of_patients: 0
  });

  const fetchDepartments = () => {
    fetch("/departments")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setDepartmentsList(data);
      })
      .catch((error) => console.error("Error fetching departments data:", error));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDepartment),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        fetchDepartments();
        setNewDepartment({
          name: "",
          head_of_department: "",
          number_of_doctors: 0,
          number_of_patients: 0
        });
      })
      .catch((error) => console.error("Error adding department:", error));
  };

  const handleDelete = (id) => {
    fetch(`/departments/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        fetchDepartments();
      })
      .catch((error) => console.error("Error deleting department:", error));
  };

  return (
    <div className="container">
      <h1 className="header">
        <span className="span">Add Departments</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Department Name:</label>
          <input
            type="text"
            value={newDepartment.name}
            onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Head of Department:</label>
          <input
            type="text"
            value={newDepartment.head_of_department}
            onChange={(e) => setNewDepartment({ ...newDepartment, head_of_department: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Number of Doctors:</label>
          <input
            type="number"
            value={newDepartment.number_of_doctors}
            onChange={(e) => setNewDepartment({ ...newDepartment, number_of_doctors: parseInt(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label>Number of Patients:</label>
          <input
            type="number"
            value={newDepartment.number_of_patients}
            onChange={(e) => setNewDepartment({ ...newDepartment, number_of_patients: parseInt(e.target.value) })}
          />
        </div>
        <button type="submit">Add Department</button>
      </form>
      <h1>List Of Departments</h1>
      <ul className="list">
        {departmentsList.map((department) => (
          <li key={department.id}>
            <h2 className="inner-header">Department Name: {department.name}</h2>
            <p>Head of Department: {department.head_of_department}</p>
            <p>Number of Doctors: {department.number_of_doctors}</p>
            <p>Number of Patients: {department.number_of_patients}</p>
            <button onClick={() => handleDelete(department.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Departments;

