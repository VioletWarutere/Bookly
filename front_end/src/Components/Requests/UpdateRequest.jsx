import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/backend_services";

import Cookies from "js-cookie";

const UpdateRequest = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  // console.log(`Book: ${id}`);
  const [request, setRequest] = useState({});
  const [title, setTitle] = useState(``);
  const [author, setAuthor] = useState(null);
  const [genre, setGenre] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getRequest = async () => {
      const response = await fetch(`${BASE_URL}/requests/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();

      if (response.ok) console.log(data);
      setRequest(data);
      setTitle(data.title);
      setAuthor(data.author);
      setGenre(data.genre);
      setDescription(data.description);
      setImage(data.image);
    };

    getRequest();
  }, [token, id]);

  //console.log(request);

  const formData = {
    title: title,
    author: author,
    genre: genre,
    description: description,
    image: image
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${BASE_URL}/requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      console.log(`Request update successful: ${response}`);
      window.location.replace(`/books/requests`);
      console.log(formData);
    } catch (error) {
      console.log(`Update failed due to ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h3 className="pageTitle ">Edit This Book Request</h3>
      <div className=" g-3 flex-it">
      <div className="col-md-2 mx-4">
        <img src={image} alt="request" style={{'maxWidth': '250px'}} />
      </div>
      <form action="post" onSubmit={handleSubmit} className="my-2 px-4 col-md-9">
        <div className="row my-2">
          <div className="col-md-8">
            <div className="mb-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control py-2"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control py-2"
                id="author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className=" mb-2">
              <label htmlFor="genre">Genres</label>
              <input
                type="text"
                className="form-control py-2"
                id="genre"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="bookImage"
                placeholder="Image link to the book"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <label htmlFor="bookImage">Link request's image</label>
            </div>
            
            <div className=" mb-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control py-2"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="text-center mt-2">
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default UpdateRequest;
