import React, { useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import { UserAuth } from "../context/UserContext";

const Navbar = () => {

  const {currentUser} = UserAuth()
  // const [loading, setLoading] = useState()
  console.log("lalal");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid  navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">Form</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" >
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item ms-3 me-3">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item ms-3 me-3">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item ms-3 me-3">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item ms-3 me-3">
              {
                !currentUser ? 
                <NavLink className="nav-link" to="/login">Log In</NavLink>
                :
                <NavLink className="nav-link" to="/logout">Log Out</NavLink>
              }
            </li>
            {
              !currentUser && 
              <li className="nav-item ms-3 me-3">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>

            }
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;