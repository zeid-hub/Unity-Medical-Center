import './App.css';
import React from 'react';
import About from './components/About'
import Nurses from './components/Nurses'
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/nurses" element={<Nurses />} />
        </Routes>
      
    </div>
  );
}

export default App;