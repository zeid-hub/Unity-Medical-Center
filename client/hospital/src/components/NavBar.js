import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/logout", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Remove token from local storage
      localStorage.removeItem("token");
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="navbar-container">
      <NavLink to="/home">HOME</NavLink>
      <NavLink to="/about">ABOUT US</NavLink>
      <NavLink to="/departments">DEPARTMENTS</NavLink>
      <NavLink to="/doctors">DOCTORS</NavLink>
      <NavLink to="/patients">PATIENTS</NavLink>
      <NavLink to="/nurses">NURSES</NavLink>
      <NavLink to="/appointments">APPOINTMENTS</NavLink>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

export default NavBar;
