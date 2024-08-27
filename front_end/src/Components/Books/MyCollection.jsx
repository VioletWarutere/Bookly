import React from "react";
import MyBooks from "./MyBooks";
import Recommendations from "../pageSections/Google_API/Recommendations";

const MyCollection = () => {
  console.log(document.referrer);
  return (
    <>
      <div className="collection-top">
        <div className="link-bar">
          <h1 className="fw-bold mt-2">My Books</h1>
          <a
            className="btn btn-dark poppins explore-button"
            href="/google-books"
          >
            Explore
          </a>
        </div>
        <div className="links my-3">
          <a href="#my-books" className="link">
            My Books
          </a>
          <span>|</span>
          <a href="#recommendations" className="link">
            Recommendations
          </a>
        </div>
      </div>
      <MyBooks />
      <div className="recommendations mt-3">
        <h1 id="recommendations" className="fw-bold">
          Your Recommendations
        </h1>

        <Recommendations />
      </div>
    </>
  );
};

export default MyCollection;
