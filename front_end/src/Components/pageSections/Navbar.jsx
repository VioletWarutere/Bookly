import React from "react";
import  "../../cssFiles/Wrapper.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top  navbar-light">
      <div className="container">
        <a className="navbar-brand display-2" href="#">
          Bookly
        </a>
       
        <div >
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item ms-3">
              <a className="btn btn-dark btn-large btn-rounded" href="/auth">
                Account
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
