import React from "react";
import  "../../cssFiles/Wrapper.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top  navbar-light">
      <div className="container">
        <a className="navbar-brand display-2" href="#">
          
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item ms-3">
              <a className="btn btn-dark btn-large btn-rounded" href="/auth">
                Create An Account
              </a>
            </li>
            <li className="nav-item ms-3">
              <a className="btn btn-light btn-large btn-rounded" href="/auth">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
