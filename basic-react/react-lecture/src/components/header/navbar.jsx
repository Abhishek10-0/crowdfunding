import React from "react";
import { NavLink } from "react-router";
import { FaSearch } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbarMain">
      <div className="navbar-link">
      <NavLink to="/home" end>
        HOME
      </NavLink>
      <NavLink to="/about" end>
      ABOUT
      </NavLink>
      <NavLink to="/contact" end>
      CONTACT
      </NavLink>
      <NavLink to="/offer" end>
      OFFERS
      </NavLink>
      <NavLink to="/experience" end>
      EXPERIENCE
      </NavLink>
      </div>
      <div className="navbar-logo">Logo</div>
      <div className="navbar-user-info">
        <div className="navbar-user-info-search"><FaSearch /></div>
        <div className="navbar-user-info-bag"><BsHandbag /></div>
        <div className="navbar-user-info-login">Login</div>

      </div>
    </div>
  );
}

export default Navbar;
