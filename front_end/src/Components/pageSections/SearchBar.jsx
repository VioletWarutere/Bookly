import React, { useState, useContext } from "react";
import { BASE_URL } from "../../utils/backend_services";
import { GetBooksContext } from "../../context/Getbooks";
import { GetRequestsContext } from "../../context/Getrequests";

import Cookies from 'js-cookie';




const SearchBar = () => {
  
  const [search, setSearch] =useState(``);
  const { setRequests } = useContext(GetRequestsContext);
  const { setBooks } = useContext(GetBooksContext);
   const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    try {
      const getBooks = async() => {
      const response = await fetch(`${BASE_URL}/books?search=${search}`, {
        method : `GET`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get('token'),
        }
      })

      const data = await response.json();
      
      console.log(data);
      setBooks(data.books);
    }
    getBooks();
    
    const getRequests = async() => {
      const response = await fetch(`${BASE_URL}/requests?search=${search}`, {
        method : `GET`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get('token'),
        }
      })

      const data = await response.json();
      
      console.log(data);
     setRequests(data.requests); 
    }
    getRequests();
      
      
    } catch (error) {
      console.log(`Search failed: ${error.message}`);
      alert('An error occurred during search. Please try again later.');
      
    }
  }; 

 

  return (
    <form className=" search px-2" role="search" onSubmit={handleSearch} >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={search}
        onChange={(e) => 
          setSearch(e.target.value)
        }
        style={{backgroundColor: '#F9F3EE', color: '#674F2C'}}
      />
      <input className="btn primaryButton-outline" type="submit" hidden/>
    </form>
  );
};

export default SearchBar;
