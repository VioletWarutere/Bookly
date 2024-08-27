import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/backend_services";

import Cookies from "js-cookie";

const UpdateBook = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const newFormData = new FormData();
 // console.log(`Book: ${id}`);
  const [book, setBook] = useState({});
  const [title, setTitle] = useState(``);
  const [author, setAuthor] = useState(null);
  const [genre, setGenre] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(null);
  const [stateOfBook, setStateOfBook] = useState(null);
  const [statusOfBook, setStatusOfBook] = useState(null);
  const [personalComments, setPersonalComments] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      const response = await fetch(`${BASE_URL}/books/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();

      if (response.ok) console.log(data);
      setBook(data);
      setTitle(data.title);
      setAuthor(data.author);
      setGenre(data.genre);
      setDescription(data.description);
      setImage(data.image);
      setRating(data.rating);
      setStateOfBook(data.stateOfBook);
      setStatusOfBook('available');
      setPersonalComments(data.personalComments);
      setFile(data.file);
    };

    getBook();
  }, [token]);

 console.log(book);

  const handleSubmit = async (e) => {
    e.preventDefault();
    newFormData.append("title", title);
    newFormData.append("author", author);
    newFormData.append("genre", genre);
    newFormData.append("description", description);
    newFormData.append("rating", rating);
    newFormData.append("stateOfBook", stateOfBook);
    newFormData.append("statusOfBook", statusOfBook);
    newFormData.append("personalComments", personalComments);
    newFormData.append("image", image);
    newFormData.append("file", file);
    try {
      console.log(newFormData);
      const response = await fetch(`${BASE_URL}/books/${id}`, {
        method: "PATCH",
        headers: {
          "Accept": "*",
          Authorization: token,
        },
        body: newFormData,
      });

      console.log(`Book post successful: ${response}`);
      window.location.replace('/contributions');
      console.log(newFormData);
    } catch (error) {
      console.log(`Post failed due to ${error.message}`);
    }
  };

  return (
    <div className="">
      <h3 className="pageTitle">Update A Book</h3>

      <form action="post" onSubmit={handleSubmit} className="my-4 text-center">
        <div className="row my-2">
          <div className="col-md-6">
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                name="title"
                value={title}
               onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="bookTitle">Title</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="author"
                placeholder="Author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <label htmlFor="bookAuthor">Author</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="genre"
                placeholder="Genres"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
              <label htmlFor="bookGenres">Genres</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="Image link to the book"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <label htmlFor="bookImage">Link book's image</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="file"
                accept="*"
                className="form-control"
                id="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="bookImage" className="mb-2">
                Link book
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="bookDescription">Description</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="number"
                max={5}
                min={1}
                className="form-control"
                id="rating"
                placeholder="Rating"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="bookRating">Rating</label>
            </div>

            <div className="form-floating mb-2">
              <select
                className="form-select"
                id="state"
                aria-label="bookState"
                name="stateOfBook"
                value={stateOfBook}
                onChange={(e) => setStateOfBook(e.target.value)}
              >
                <option defaultValue>Select the state of the book</option>
                <option value="new">New</option>
                <option value="second-hand(used)">Second-hand</option>
                <option value="digital-copy">Digital Copy</option>
              </select>
            </div>

            <div className="form-floating mb-2">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="personalComments"
                style={{ height: "120px" }}
                name="personalComments"
                value={personalComments}
                onChange={(e) => setPersonalComments(e.target.value)}
              ></textarea>
              <label htmlFor="personalComments">Comments</label>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
