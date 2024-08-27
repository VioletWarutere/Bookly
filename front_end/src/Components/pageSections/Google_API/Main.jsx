import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks("2020 bestseller"); // Fetches bestseller books initially
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      fetchBooks(query);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Google Books Search</h1>
      <form onSubmit={handleSearch} className="mb-4 ">
        <div className="search-bar row">
          <div className="col-md-2"></div>
          <div className=" col-md-8 ">
          <input
            type="text"
            className="form-control col-md-3"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="">
            <button className="btn btn-primary col-md-3 " type="submit">
              Search
            </button>
          </div>
        </div>
          <div className="col-md-2"></div>
        </div>
        
      </form>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {books.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.volumeInfo.title}
              authors={book.volumeInfo.authors?.join(", ")}
              description={book.volumeInfo.description}
              categories={book.volumeInfo.categories}
              image={
                book.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/150"
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksList;
