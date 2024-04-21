// import React from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import Home from './components/Home';
// import Doctors from './components/Doctors';
// import Appointments from './components/Appointments';
// import Patients from './components/Patients';
// import Departments from './components/Departments';
// import Nurses from './components/Nurses';
// import Login from './components/Login';
// import SignupForm from './components/Signup';
// import Logout from './components/Logout';

// function App() {
//   const location = useLocation();
//   const hideNavbar = location.pathname === '/signup'; // Check if current route is signup

//   return (
//     <div>
//       {!hideNavbar && <NavBar />} {/* Render NavBar if hideNavbar is false */}
//       <Routes>
//         <Route path="/" element={<Navigate to="/signup" />} />
//         <Route path="/signup" element={<SignupForm />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/appointments" element={<Appointments />} />
//         <Route path="/patients" element={<Patients />} />
//         <Route path="/departments" element={<Departments />} />
//         <Route path="/nurses" element={<Nurses />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;




import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Doctors from './components/Doctors';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import Departments from './components/Departments';
import Nurses from './components/Nurses';
import Login from './components/Login';
import SignupForm from './components/Signup';
import Logout from './components/Logout';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/signup'; // Check if current route is signup

  return (
    <div>
      {!hideNavbar && <NavBar />} {/* Render NavBar if hideNavbar is false */}
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/nurses" element={<Nurses />} />
      </Routes>
    </div>
  );
}

export default App;
