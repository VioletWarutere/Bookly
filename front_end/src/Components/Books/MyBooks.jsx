import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/backend_services";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";


const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const getMyBooks = async () => {
      const response = await fetch(`${BASE_URL}/myBooks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) return console.error("Error fetching books");
      const data = await response.json();

      console.log(data);

      if (response.ok) setMyBooks(data);
      else console.log("Error fetching books");
    };
    getMyBooks();
  }, [token]);

  console.log(myBooks);

  const renderRating = (rating) => {
    switch (rating) {
      case 1:
        return "✨";
      case 2:
        return "✨✨";
      case 3:
        return "✨✨✨";
      case 4:
        return "✨✨✨✨";
      case 5:
        return "✨✨✨✨✨";
      default:
        return "Please type a number between 1 and 5";
    }
  };

  // Helper function to convert a string to title case
  const toTitleCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Function to transform array elements to title case and join them with commas
  const commaAdd = (array) => {
    return array.map(toTitleCase).join(", ");
  };

  const [isBlock, setIsBlock] = useState(false);

  const toggleDisplay = () => {
    setIsBlock(!isBlock);
  };

  return myBooks.map((book) => {
    console.log(book.title);
    return (
      <div className="col-md-3">
        
          <div
            className="card pt-3"
            key={book._id}
            style={{ maxWidth: "210px" , position: "relative" }}
          >
            <Link
          to={`/books/${book.book._id}`}
          className="link-offset-2 link-underline link-underline-opacity-0 "
        >
            <img
              src={book.book.image}
              className="img-fluid rounded-start"
              alt="..."
            />
              </Link>
              <div
            className="buttongroup"
           
          >
            <button
              type="submit"
              className="badge-delete-collection"
              onClick={() => {
                setTimeout(() => {
                  alert("Deleting Request in 1,2,3...");
                }, 1000);
                window.location.replace(`/delete-myBook/${book._id}`);
              }}
            >
              Delete
            </button>
          </div>
          </div>
          
          <div className="col-md-6">
            <div className="text-group g-0">
              <h5 className="books-title">{book.book.title}</h5>

              <p className="books-subtitle">{book.book.author}</p>

              <p className="books-smalltexts">
                <small className="text-body-secondary bold sub-texts">
                  {book.book.genre}
                </small>
                <br />
                <small className="text-body-secondary sub-texts">
                  {renderRating(book.book.rating)}
                </small>
              </p>
            </div>
          </div>
      
      </div>
    );
  });
};

export default MyBooks;
