import React, { useState, useEffect } from "react";
import "../../cssFiles/Books.css";
import { BASE_URL } from "../../utils/backend_services";
import Cookies from "js-cookie";

const RequestCards = () => {
  const [requests, setRequests] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const getRequests = async () => {
      const response = await fetch(`${BASE_URL}/requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();

      if (response.ok) console.log(data);
      console.log(data.requests);
      setRequests(data.requests);
    };

    getRequests();
  }, [token]);

   // Helper function to convert a string to title case
   const toTitleCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const commaAdd = (array) => {
    return array.map(toTitleCase).join(", ");
  };

  const maxwidth = '210px'


  return requests.map((request) => {
    return (
      <div className="col-sm-5 col-md-3">

      
        <div
          className="card"
          key={request.title}
          style={{ maxWidth: maxwidth }}
        >
          
          <a
            href={`/request/${request._id}`}
            className="link-offset-2 link-underline link-underline-opacity-0"
          >
            <img
            src={request.image}
            className="img-fluid rounded-start"
            alt="request"
          />
          </a>

          <div className="col-md-12">
                  <div className="text-group g-0">
                    <h5 className="books-title">{request.title}</h5>
      
                    <p className="books-subtitle">{request.author}</p>
      
                    <p className="books-smalltexts">
                      <small className="badge">
                        REQUEST
                      </small>
                    </p>
                  </div>
                </div>

        </div>
        </div>
    );
  });
};

export default RequestCards;
