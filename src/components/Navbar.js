import React from "react";
import "./../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Flare Escrow</div>
      <div className="navbar-links">
        <a href="#about">About</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;