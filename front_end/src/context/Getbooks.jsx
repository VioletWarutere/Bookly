import React, { useState, useEffect, createContext } from "react";
import { BASE_URL } from "../utils/backend_services";
import Cookies from "js-cookie";


export const GetBooksContext = createContext();

export const GetBooksProvider = ({children}) => {
  const [books, setBooks] = useState([]);
  const token = Cookies.get("token");


  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(`${BASE_URL}/books`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();

      if (response.ok) console.log(data);
      console.log(data.books);
      setBooks(data.books);
    };

    getBooks();
  }, [token]);

  

  return (
    <GetBooksContext.Provider value={{books, setBooks}}>
       {children}
    </GetBooksContext.Provider>
  )
}
