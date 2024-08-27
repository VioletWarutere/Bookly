import React, { useState } from "react";
import axios from 'axios';
import { BASE_URL } from "../utils/backend_services";
import Cookies from 'js-cookie';

const Favorites = () => {
  const token = Cookies.get('token');
    const [clicked, setClicked] = useState(false);
  
    const genres = [
      "Fiction",
      "Non-Fiction",
      "Fantasy",
      "Science Fiction",
      "Mystery",
      "Thriller",
      "Romance",
      "Horror",
      "Historical Fiction",
      "Biography",
      "Self-Help",
      "Graphic Novel",
      "Poetry",
      "Young Adult",
      "Children's Literature",
      "Adventure",
      "Dystopian",
      "Memoir",
      "Literary Fiction",
      "Crime",
      "Contemporary",
      "Urban Fantasy",
      "Magical Realism",
      "Paranormal Romance",
      "Psychological Thriller",
      "New Adult",
      
      "Historical Romance",
      "True Crime",
      
      "Humor",
      "Short Stories",
      
      "Spirituality",
      "Travel",
      
      "Military Fiction",
      "Cyberpunk",
      "Political Fiction"
  ];
  
    

  const favoriteGenres = [];

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       const response = await fetch(`${BASE_URL}/users/recommendations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            genres: favoriteGenres
          }),
        });

        if(response.ok){
          console.log("Recommendations fetched successfully!");
          console.log(response.json());
          window.location.replace('/');
        }
        
    } catch (error) {
        console.error('Error updating genres:', error);
        
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    console.log(e.target.value);
    favoriteGenres.push(e.target.value);
    console.log(favoriteGenres);
    setClicked(false);
  }

  return (
    <div className="" >
      <div>
            <h1 className="fw-bold fs-4">Pick Your Favorite Genres</h1>
          </div>
      <form action="" onSubmit={handleSubmit} className="text-center">
        <div className="row ">
          {genres.map((genre) => {
            return (
            <div className="col-md-2 col-sm-3 m-2" key={genre}>
              <input
                className="form-control"
                type="text"
                id={genre}
                value={genre}
                aria-label="readOnly input example"
                readOnly
                name={genre}
                onClick={handleClick}
              />
              
            </div>
            );
          })}
        </div>
        <button className="btn btn-dark my-2" >
            Submit preferences
        </button>
      </form>
    </div>
  );
};

export default Favorites;
