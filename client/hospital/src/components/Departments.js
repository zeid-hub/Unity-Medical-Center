// import React, { useEffect, useState } from "react";
// // import "./Departments.css";

// function Departments() {
//   const [departmentsList, setDepartmentsList] = useState([]);
//   const [newDepartment, setNewDepartment] = useState({
//     name: "",
//     head_of_department: "",
//     number_of_doctors: 0,
//     number_of_patients: 0
//   });

//   const fetchDepartments = () => {
//     fetch(("/departments"))
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setDepartmentsList(data);
//       })
//       .catch((error) => console.error("Error fetching departments data:", error));
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch("/departments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newDepartment),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         fetchDepartments();
//         setNewDepartment({
//           name: "",
//           head_of_department: "",
//           number_of_doctors: 0,
//           number_of_patients: 0
//         });
//       })
//       .catch((error) => console.error("Error adding department:", error));
//   };

//   const handleDelete = (id) => {
//     fetch(`/departments/${id}`, {
//       method: "DELETE",
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         fetchDepartments();
//       })
//       .catch((error) => console.error("Error deleting department:", error));
//   };

//   return (
//     <div className="container">
//       <h1 className="header">
//         <span className="span">Departments</span>
//       </h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Department Name:</label>
//           <input
//             type="text"
//             value={newDepartment.name}
//             onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
//           />
//         </div>
//         <div className="form-group">
//           <label>Head of Department:</label>
//           <input
//             type="text"
//             value={newDepartment.head_of_department}
//             onChange={(e) => setNewDepartment({ ...newDepartment, head_of_department: e.target.value })}
//           />
//         </div>
//         <div className="form-group">
//           <label>Number of Doctors:</label>
//           <input
//             type="number"
//             value={newDepartment.number_of_doctors}
//             onChange={(e) => setNewDepartment({ ...newDepartment, number_of_doctors: parseInt(e.target.value) })}
//           />
//         </div>
//         <div className="form-group">
//           <label>Number of Patients:</label>
//           <input
//             type="number"
//             value={newDepartment.number_of_patients}
//             onChange={(e) => setNewDepartment({ ...newDepartment, number_of_patients: parseInt(e.target.value) })}
//           />
//         </div>
//         <button type="submit">Add Department</button>
//       </form>
//       <ul className="list">
//         {departmentsList.map((department) => (
//           <li key={department.id}>
//             <h2 className="inner-header">Department Name: {department.name}</h2>
//             <p>Head of Department: {department.head_of_department}</p>
//             <p>Number of Doctors: {department.number_of_doctors}</p>
//             <p>Number of Patients: {department.number_of_patients}</p>
//             <button onClick={() => handleDelete(department.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Departments;
import React, { useEffect, useState } from "react";
import "./Departments.css";

function Departments() {
  // State for holding department data and new department details
  const [departmentsList, setDepartmentsList] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    headOfDepartment: "",
    numberOfDoctors: 0,
    numberOfPatients: 0
  });

  // Function to fetch departments from the backend
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

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Function to handle form submission for adding a new department
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform basic validation
    if (!newDepartment.name || !newDepartment.headOfDepartment) {
      alert("Please provide department name and head of department.");
      return;
    }
    // Send POST request to add new department
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
        // Fetch departments again to update the list
        fetchDepartments();
        // Clear the form fields
        setNewDepartment({
          name: "",
          headOfDepartment: "",
          numberOfDoctors: 0,
          numberOfPatients: 0
        });
      })
      .catch((error) => console.error("Error adding department:", error));
  };

  // Function to handle deletion of a department
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
        // Fetch departments again to update the list
        fetchDepartments();
      })
      .catch((error) => console.error("Error deleting department:", error));
  };

  return (
    <div className="container">
      <h1 className="header">
        <span className="span">Departments</span>
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
            value={newDepartment.headOfDepartment}
            onChange={(e) => setNewDepartment({ ...newDepartment, headOfDepartment: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Number of Doctors:</label>
          <input
            type="number"
            value={newDepartment.numberOfDoctors}
            onChange={(e) => setNewDepartment({ ...newDepartment, numberOfDoctors: parseInt(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label>Number of Patients:</label>
          <input
            type="number"
            value={newDepartment.numberOfPatients}
            onChange={(e) => setNewDepartment({ ...newDepartment, numberOfPatients: parseInt(e.target.value) })}
          />
        </div>
        <button type="submit">Add Department</button>
      </form>
      <ul className="list">
        {departmentsList.map((department) => (
          <li key={department.id}>
            <h2 className="inner-header">Department Name: {department.name}</h2>
            <p>Head of Department: {department.headOfDepartment}</p>
            <p>Number of Doctors: {department.numberOfDoctors}</p>
            <p>Number of Patients: {department.numberOfPatients}</p>
            <button onClick={() => handleDelete(department.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Departments;
