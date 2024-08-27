import React from "react";
import "../../cssFiles/SideBar.css";

import Cookies from "js-cookie";

const SideBar = () => {
  const removeToken = () => {
    Cookies.remove("token");
    window.location.reload();
  };
  return (
    <div className="mainSide px-3  text-center">
      <div className="topSection py-4">
        <a className="logo" href="/" style={{ textDecoration: "none" }}>
          <h3 className="fs-2 text-end topLink">VioLibrary</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="none"
            viewBox="0 0 40 40"
          >
            <path
              fill="#FCA72C"
              d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"
            ></path>
            <path
              fill="#FCA72C"
              d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
            ></path>
          </svg>
        </a>
      </div>
      <div className="navigatinLinks text-center">
        <div className="navLink">
          <a href="/books" className="navLink poppins">
            All Books
          </a>
        </div>
        <div className="navLink">
          <a href="/books/requests" className="navLink poppins">
            All Requests
          </a>
        </div>
        <div className="navLink ">
          <a href="/books/myBooks" className="navLink poppins">
            My Collection
          </a>
        </div>
        <div className="navLink">
          <a href="/books/post" className="navLink poppins">
            Add A Book
          </a>
        </div>

        <div className="navLink">
          <a href="/contributions" className="navLink poppins">
            My Contributions
          </a>
        </div>
        <div className="sideButtons py-5 ">
          <a
            className="btn primaryButton poppins"
            href="/requests/post-request"
          >
            Add A Request
          </a>
          <button className="btn btn-light poppins" onClick={removeToken}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
