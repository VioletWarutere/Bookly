import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book";
import { Link } from "react-router-dom";

const Recommendations = () => {
  const [books, setBooks] = useState([]);
 
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

  const genres = localStorage.getItem('favorites');
  console.log(genres);

  function getYearRange() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 3;
    return startYear;
    //`${startYear} - ${currentYear}`;
}

const yearRange = getYearRange();
console.log(yearRange); // Outputs something like "2020 - 2024"


  

  useEffect(() => {
    fetchBooks(`${yearRange} ${genres} bestseller`); // Fetches bestseller books initially
    
  }, []);

  

  return (
    <div className="container my-5">

      {
        !genres ? (
        <h1 className="fs-5">Please add your favorite genres on your  
        <Link to={"/recommendations"}>   favorites   </Link>
         
         page</h1>) : (
          loading ? (
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
          )
        )
      }
      
      
    </div>
  );
};

export default Recommendations;
