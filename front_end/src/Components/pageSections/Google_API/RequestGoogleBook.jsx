import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../utils/backend_services";

const RequestGoogleBook = () => {
  const { id } = useParams();  // Get the book id from the URL params
  const token = Cookies.get("token");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const book = response.data.volumeInfo;

        // Populate the form with the book details
        setFormData({
          title: book.title,
          author: book.authors?.join(", "),
          genre: book.categories?.join(", "),
          description: book.description,
          image: book.imageLinks?.thumbnail,
        });
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetail();
  }, [id]); // Fetch data when the component mounts

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      console.log(`Book request successful: ${response}`);
      window.location.replace('/books/requests');
    } catch (error) {
      console.log(`Request failed due to ${error.message}`);
      alert(error.message);
    }
  };

  return (
    <div className="sticky-content">
      <h3 className="pageTitle fw-bold">Request For A Book</h3>

      <form onSubmit={handleSubmit} className="my-4 text-center">
        <div className="row my-2">
          <div className="col-md-8">
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <label htmlFor="bookTitle">Title</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="bookAuthor"
                placeholder="Author"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
              <label htmlFor="bookAuthor">Author</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="bookGenres"
                placeholder="Genres"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />
              <label htmlFor="bookGenres">Genres</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="bookImage"
                placeholder="Image link to the book"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
              <label htmlFor="bookImage">Link book's image</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="bookDescription"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <label htmlFor="bookDescription">Description</label>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestGoogleBook;
