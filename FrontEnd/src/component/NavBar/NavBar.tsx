import React from "react";
import logo from "../../assets/images/logo.svg";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="container-fluid navBar">
      <img className="logoImage" src={logo} alt="Logo" />
    </nav>
  );
};
