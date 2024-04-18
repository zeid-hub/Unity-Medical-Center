import React, { useEffect, useState } from "react";

function Departments() {
  const [departmentsList, setDepartmentsList] = useState([]);

  useEffect(() => {
    fetch("/departments")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data from API:", data); // Log the data received from the API
        setDepartmentsList(data);
      })
      .catch((error) => console.error("Error fetching departments data:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="header">
        <span className="span">Departments</span>
      </h1>
      <ul className="list">
        {departmentsList.map((department) => (
          <li key={department.id}>
            <h2 className="inner-header">
              Department Name: {department.name}
            </h2>
            <h4>Head of Department: {department.head_of_department}</h4>
            <h4>Number of Doctors: {department.number_of_doctors}</h4>
            <h4>Number of Patients: {department.number_of_patients}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Departments;
