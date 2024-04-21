import React, { useState, useEffect } from "react";
import "./Doctors.css";

function Doctors() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [languageSpoken, setLanguageSpoken] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);

  const fetchDoctors = () => {
    fetch("/doctors")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setDoctorsList(data);
      })
      .catch((error) => console.error("Error fetching doctors data:", error));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoctor = {
      id,
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
        console.log("Doctor added successfully:", data);
        setId("");
        setName("");
        setLicenseNumber("");
        setSpecialization("");
        setLanguageSpoken("");
        setDepartmentId("");
        fetchDoctors();
      })
      .catch((error) => console.error("Error adding doctor:", error));
  };

  const handleDelete = (id) => {
    fetch(`/doctors/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Doctor deleted successfully:", data);
        fetchDoctors();
      })
      .catch((error) => console.error("Error deleting doctor:", error));
  };

  return (
    <div className="doctor-form-container" id="doctors-form">
      <h2>Add Doctor</h2>
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
          <input
            type="number"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          />
        </label>
        <button type="submit">Add Doctor</button>
      </form>
      <h2>Doctors List</h2>
      <ul id="doctors-list">
        {doctorsList.map((doctor) => (
          <li key={doctor.id}>
            <div>
              <strong>ID:</strong> {doctor.id}<br />
              <strong>Name:</strong> {doctor.name}<br />
              <strong>License Number:</strong> {doctor.license_number}<br />
              <strong>Specialization:</strong> {doctor.specialization}<br />
              <strong>Language Spoken:</strong> {doctor.language_spoken}<br />
              <strong>Department ID:</strong> {doctor.department_id}<br />
            </div>
            <button onClick={() => handleDelete(doctor.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Doctors;




// import React, { useState, useEffect } from "react";
// import "./Doctors.css";

// function Doctors() {
//   const [id, setId] = useState("");
//   const [name, setName] = useState("");
//   const [licenseNumber, setLicenseNumber] = useState("");
//   const [specialization, setSpecialization] = useState("");
//   const [languageSpoken, setLanguageSpoken] = useState("");
//   const [departmentId, setDepartmentId] = useState("");
//   const [doctorsList, setDoctorsList] = useState([]);

//   const fetchDoctors = () => {
//     fetch("/doctors")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setDoctorsList(data);
//       })
//       .catch((error) => console.error("Error fetching doctors data:", error));
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newDoctor = {
//       id,
//       name,
//       license_number: licenseNumber,
//       specialization,
//       language_spoken: languageSpoken,
//       department_id: departmentId,
//     };

//     fetch("/doctors", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newDoctor),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Doctor added successfully:", data);
//         setId("");
//         setName("");
//         setLicenseNumber("");
//         setSpecialization("");
//         setLanguageSpoken("");
//         setDepartmentId("");
//         fetchDoctors();
//       })
//       .catch((error) => console.error("Error adding doctor:", error));
//   };

//   const handleDelete = (id) => {
//     fetch(`/doctors/${id}`, {
//       method: "DELETE",
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Doctor deleted successfully:", data);
//         fetchDoctors();
//       })
//       .catch((error) => console.error("Error deleting doctor:", error));
//   };

//   return (
//     <div className="doctor-form-container" id="doctors-form">
//       <h2>Add Doctor</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           ID:
//           <input
//             type="text"
//             value={id}
//             onChange={(e) => setId(e.target.value)}
//           />
//         </label>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </label>
//         <label>
//           License Number:
//           <input
//             type="text"
//             value={licenseNumber}
//             onChange={(e) => setLicenseNumber(e.target.value)}
//           />
//         </label>
//         <label>
//           Specialization:
//           <input
//             type="text"
//             value={specialization}
//             onChange={(e) => setSpecialization(e.target.value)}
//           />
//         </label>
//         <label>
//           Language Spoken:
//           <input
//             type="text"
//             value={languageSpoken}
//             onChange={(e) => setLanguageSpoken(e.target.value)}
//           />
//         </label>
//         <label>
//           Department ID:
//           <input
//             type="number"
//             value={departmentId}
//             onChange={(e) => setDepartmentId(e.target.value)}
//           />
//         </label>
//         <button type="submit">Add Doctor</button>
//       </form>
//       <h2>Doctors List</h2>
//       <ul id="doctors-list">
//         {doctorsList.map((doctor) => (
//           <li key={doctor.id}>
//             <div>
//               <strong>ID:</strong> {doctor.id}<br />
//               <strong>Name:</strong> {doctor.name}<br />
//               <strong>License Number:</strong> {doctor.license_number}<br />
//               <strong>Specialization:</strong> {doctor.specialization}<br />
//               <strong>Language Spoken:</strong> {doctor.language_spoken}<br />
//               <strong>Department ID:</strong> {doctor.department_id}<br />
//             </div>
//             <button onClick={() => handleDelete(doctor.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Doctors;
