import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function NavBar() {
    return (
        <NavBarContainer>
            <NavLinkStyled to="/">HOME</NavLinkStyled>
            <NavLinkStyled to="/about">ABOUT US</NavLinkStyled>
            <NavLinkStyled to="/departments">DEPARTMENTS</NavLinkStyled>
            <NavLinkStyled to="/doctors">DOCTORS</NavLinkStyled>
            <NavLinkStyled to="/patients">PATIENTS</NavLinkStyled>
            <NavLinkStyled to="/nurses">NURSES</NavLinkStyled>
            <NavLinkStyled to="/Appointment">APPOINTMENT</NavLinkStyled>
         
            <ButtonStyled>Make Appointment</ButtonStyled>
        </NavBarContainer>
    );
}
const NavBarContainer = styled.div`
    background-color: #324B4E;
    padding: 15px; /* Increased padding */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px; /* Adjusted margin */
    font-size: 22px; /* Increased font size */
    font-family: 'Dancing Script', cursive;
`;


const NavLinkStyled = styled(NavLink)`
    color: white;
    text-decoration: none;
    margin-right: 20px;
    font-family: 'Dancing Script', cursive;

    &:hover {
        color: #ff9900;
    }
`;

const ButtonStyled = styled.button`
    background-color: green; 
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    font-family: 'Dancing Script', cursive;

    &:hover {
        transform: scale(1.1);
    }
`;

export default NavBar;
