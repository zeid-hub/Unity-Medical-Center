
import React, { useEffect, useState } from "react";
import "./Doctors.css";

function Doctor() {
  const [doctorList, setdoctorList] = useState([]);

useEffect(() => {
    fetch("/doctors")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data from API:", data); // Log the data received from the API
        setdoctorList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="header">
        OUR <span className="span">DOCTORS</span>
      </h1>
      <ul className="list">
        {doctorList.map((item) => (
          <li key={item.id}>
            <h2 className="inner-header">
              <span className="name">Name:</span> {item.name}
            </h2>
            <h4>LICENSE NUMBER: {item.license_number}</h4>
            <h4>SPECIALIZATION: {item.specialization}</h4>
            <h4>LANGUAGE SPOKEN: {item.language_spoken}</h4>
            <h4>DEPARTMENT NAME: {item.department_name}</h4>
            <h4>DEPARTMENT ID: {item.department_id}</h4>
          </li>
        ))}
      </ul>
    </div>
  ); 
}

export default Doctor;