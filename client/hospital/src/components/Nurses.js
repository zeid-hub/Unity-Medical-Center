import React, { useEffect, useState } from "react";

function Nurses() {
  const [nursesList, setNursesList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/nurses")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data from API:", data); // Log the data received from the API
        setNursesList(data);
      })
      .catch((error) => console.error("Error fetching nurses data:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="header">
        <span className="span">Nurses</span>
      </h1>
      <ul className="list">
        {nursesList.map((nurse) => (
          <li key={nurse.id}>
            <h2 className="inner-header">
              <span className="name">Name:</span> {nurse.name}
            </h2>
            <h4>Department ID: {nurse.department_id}</h4>
            <h4>Doctor ID: {nurse.doctor_id}</h4>
            <h4>Language Spoken: {nurse.language_spoken}</h4>
            <h4>License Number: {nurse.license_number}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Nurses;
