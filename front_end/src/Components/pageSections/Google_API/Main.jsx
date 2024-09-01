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
      <form onSubmit={handleSearch} className="mb-4">
  <div className="search-bar row justify-content-center">
    <div className="col-md-8 d-flex">
      <input
        type="text"
        className="form-control"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          backgroundColor: '#F5F5DC', // Beige-like background color
          borderColor: '#8B4513', // SaddleBrown border color
          color: '#5A3E36', // Dark brown text color
          borderRadius: '5px 0 0 5px', // Rounded corners on the left
        }}
      />
      <button
        className="btn"
        type="submit"
        style={{
          backgroundColor: '#8B4513', // SaddleBrown button color
          color: '#FFF', // White text color
          borderRadius: '0 5px 5px 0', // Rounded corners on the right
          border: 'none',
        }}
      >
        Search
      </button>
    </div>
  </div>
</form>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="sr-only">Loading...</span>
        </div>
        <div className="ml-3">
          <span className="text-muted">Please wait while we load the content...</span>
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
