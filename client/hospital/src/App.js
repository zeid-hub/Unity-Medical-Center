import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home'; 
import { Route, Routes } from 'react-router-dom';
import Doctors from './components/Doctors';
import Appointments from './components/Appointments'; 
import Departments from './components/Departments';
import Patients from './components/Patients';
import Nurses from './components/Nurses';
import About from './components/About';

function App() {
  return (
    <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/nurses" element={<Nurses />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </div>
  );
}

export default App;