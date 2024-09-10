import React from "react";
import { Link } from "react-router-dom";

const Book = ({ title, authors, description, image, id,categories }) => {
  return (
    <>
   

    <div className="col-sm-5 col-md-3">
        <div className="card" key={id} style={{ maxWidth: "240px" }}>
        <Link to={`/google-book/${id}`}>
        <img src={image} className="img-fluid rounded-start" alt={title} style={{ minWidth: "210px" }}/>
        </Link>
        </div>
        <div className="col-md-12">
          <div className="text-group g-0">
            <h5 className="books-title">{title}</h5>

            <p className="books-subtitle">{authors}</p>

            <p className="books-smalltexts">
              <small className="text-body-secondary bold sub-texts">
                {categories?.join(", ").slice(0, 10) + "..."}
              </small>
              <br />
              <small className="text-body-secondary sub-texts">
              {description ? description.slice(0, 10) + "..." : "No description available"}
              </small>
              <br />
              
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
