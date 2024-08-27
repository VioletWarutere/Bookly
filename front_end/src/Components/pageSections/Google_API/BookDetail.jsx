import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data.volumeInfo);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetail();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <>
      {/* <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={book.imageLinks?.thumbnail}
              className="img-fluid"
              alt={book.title}
            />
          </div>
          <div className="col-md-8">
            <h2>{book.title}</h2>
            <h5>by {book.authors?.join(", ")}</h5>
            <p>
              <strong>Categories: </strong>
              {book.categories?.join(", ")}
            </p>
            <p>
              <strong>Rating: </strong>
              {book.averageRating || "Not Rated"}
            </p>
            <p>{book.description}</p>
            <a
              href={book.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View on Google Books
            </a>
            <Link to={`/post-book/${id}`} className="btn btn-secondary ml-3">
              Add to Database
            </Link>
          </div>
        </div>
      </div> */}

      <div>
        <div className="card mb-3 mt-0 g-3 " key={book._id}>
          <div className="row g-0">
            <div className="col-md-1 my-4 sticky-content">
              <img
                src={book.imageLinks?.thumbnail}
                className="img-fluid rounded-start"
                alt="..."
              />
              <p className="book-text ">
                <small className="text-body-secondary ">
                  Rating: {book.averageRating || "Not Rated"}
                </small>
              </p>
            </div>
            <div className="col-md-6 mx-4 g-3 scrollable-content mb-5">
              <div className="card-body ">
                <h5 className="book-title pb-2">{book.title}</h5>
                <h6 className="book-author pb-1">{book.authors?.join(", ")}</h6>

                <p id="book-text" style={{ display: "block" }}>
                  <small className="text-body-secondary">
                    {book.categories?.join(", ")}
                  </small>
                </p>

                <p className="book-desc">{book.description}</p>

                <div
                  className="py-3"
                  id="user-info"
                  
                >
                  <Link
                    to={`/post-book/${id}`}
                    className="btn secondaryButton ml-3"
                  >
                    Add This Book
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
