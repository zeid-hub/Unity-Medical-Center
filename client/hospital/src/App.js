import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home'; 
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointment />} /> */}
        </Routes>
      
    </div>
  );
}

export default App;
