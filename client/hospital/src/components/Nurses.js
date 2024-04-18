import React, { useState } from 'react';
import './Nurses.css';

function Nurse({ id, name, licenseNumber, department, doctorId, languageSpoken, departmentId, onUpdate, onDelete }) {
  const [editedId, setEditedId] = useState(id);
  const [editedName, setEditedName] = useState(name);
  const [editedLicenseNumber, setEditedLicenseNumber] = useState(licenseNumber);
  const [editedDepartment, setEditedDepartment] = useState(department);
  const [editedDoctorId, setEditedDoctorId] = useState(doctorId);
  const [editedLanguageSpoken, setEditedLanguageSpoken] = useState(languageSpoken);
  const [editedDepartmentId, setEditedDepartmentId] = useState(departmentId);

  const handleUpdate = () => {
    onUpdate(id, {
      id: editedId,
      name: editedName,
      licenseNumber: editedLicenseNumber,
      department: editedDepartment,
      doctorId: editedDoctorId,
      languageSpoken: editedLanguageSpoken,
      departmentId: editedDepartmentId
    });
  };

  return (
    <div className="nurse-item">
      <h3>Nurse Information</h3>
      <label htmlFor="editedId">ID:</label>
      <input type="text" id="editedId" value={editedId} onChange={(e) => setEditedId(e.target.value)} />
      <label htmlFor="editedName">Name:</label>
      <input type="text" id="editedName" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
      <label htmlFor="editedLicenseNumber">License Number:</label>
      <input type="text" id="editedLicenseNumber" value={editedLicenseNumber} onChange={(e) => setEditedLicenseNumber(e.target.value)} />
      <label htmlFor="editedDepartment">Department:</label>
      <input type="text" id="editedDepartment" value={editedDepartment} onChange={(e) => setEditedDepartment(e.target.value)} />
      <label htmlFor="editedDoctorId">Doctor ID:</label>
      <input type="text" id="editedDoctorId" value={editedDoctorId} onChange={(e) => setEditedDoctorId(e.target.value)} />
      <label htmlFor="editedLanguageSpoken">Language Spoken:</label>
      <input type="text" id="editedLanguageSpoken" value={editedLanguageSpoken} onChange={(e) => setEditedLanguageSpoken(e.target.value)} />
      <label htmlFor="editedDepartmentId">Department ID:</label>
      <input type="text" id="editedDepartmentId" value={editedDepartmentId} onChange={(e) => setEditedDepartmentId(e.target.value)} />
      <button onClick={handleUpdate}>Update Nurse</button>
      <button onClick={() => onDelete(id)}>Delete Nurse</button>
    </div>
  );
}

function HospitalNurses() {
  const [nurses, setNurses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNurse, setNewNurse] = useState({
    id: '',
    name: '',
    licenseNumber: '',
    department: '',
    doctorId: '',
    languageSpoken: '',
    departmentId: ''
  });

  const addNurse = (id) => {
    setNurses([...nurses, { ...newNurse, id }]);
    setNewNurse({
      id: '',
      name: '',
      licenseNumber: '',
      department: '',
      doctorId: '',
      languageSpoken: '',
      departmentId: ''
    });
  };

  const updateNurse = (id, updatedData) => {
    setNurses(nurses.map((nurse) => (nurse.id === id ? { ...nurse, ...updatedData } : nurse)));
  };

  const deleteNurse = (nurseId) => {
    setNurses(nurses.filter((nurse) => nurse.id !== nurseId));
  };

  const handleAddNurse = (e) => {
    e.preventDefault();
    addNurse(newNurse.id);
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNurse({ ...newNurse, [name]: value });
  };

  return (
    <div className="nurse-container">
      <h2>Hospital Nurses</h2>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Close Add Nurse Form' : 'Add Nurse'}
      </button>
      {showAddForm && (
        <form onSubmit={handleAddNurse} className="nurse-form">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" value={newNurse.id} onChange={handleInputChange} required />
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={newNurse.name} onChange={handleInputChange} required />
          <label htmlFor="licenseNumber">License Number:</label>
          <input type="text" id="licenseNumber" name="licenseNumber" value={newNurse.licenseNumber} onChange={handleInputChange} required />
          <label htmlFor="department">Department:</label>
          <input type="text" id="department" name="department" value={newNurse.department} onChange={handleInputChange} required />
          <label htmlFor="doctorId">Doctor ID:</label>
          <input type="text" id="doctorId" name="doctorId" value={newNurse.doctorId} onChange={handleInputChange} required />
          <label htmlFor="languageSpoken">Language Spoken:</label>
          <input type="text" id="languageSpoken" name="languageSpoken" value={newNurse.languageSpoken} onChange={handleInputChange} required />
          <label htmlFor="departmentId">Department ID:</label>
          <input type="text" id="departmentId" name="departmentId" value={newNurse.departmentId} onChange={handleInputChange} required />
          <button type="submit">Add Nurse</button>
        </form>
      )}
      <ul className="nurse-list">
        {nurses.map((nurse) => (
          <li key={nurse.id}>
            <Nurse {...nurse} onUpdate={updateNurse} onDelete={deleteNurse} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return <HospitalNurses />;
}
