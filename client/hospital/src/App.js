import './App.css';
import React from 'react';
import About from './components/About';
import NavBar from './components/NavBar';
import Home from './components/Home'; // Import the Home component
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* <BrowserRouter> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;

