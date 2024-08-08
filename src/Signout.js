import React from "react";
import "./Signout.css";
import { Link } from "react-router-dom";

const Signout = () => {
  const handleSignOut = () => {
    console.log("Signed out successfully!");
    window.location.href = "/signin";
    localStorage.setItem("sigInEmail", "");
  };

  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Signup
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/signout" className="navbar-link">
              Signout
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/addprod" className="navbar-link">
              Add Product
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/home" className="navbar-link">
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sign-out-container">
        <h1>Sign Out</h1>
        <br />
        <p>Are you sure you want to sign out?</p>
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Signout;
