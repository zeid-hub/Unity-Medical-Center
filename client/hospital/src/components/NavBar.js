import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"

function NavBar() {
    return (
        <div className="navbar-container">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/about">ABOUT US</NavLink>
            <NavLink to="/departments">DEPARTMENTS</NavLink>
            <NavLink to="/doctors">DOCTORS</NavLink>
            <NavLink to="/patients">PATIENTS</NavLink>
            <NavLink to="/nurses">NURSES</NavLink>
            <NavLink to="/appointment">APPOINTMENTS</NavLink>
         
            <button>Make Appointment</button>
        </div>
    );
}

export default NavBar;
