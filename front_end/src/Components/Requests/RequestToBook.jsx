import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/backend_services";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const RequestToBook = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const newFormData = new FormData()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    rating: "",
    stateOfBook: "",
    personalComments: "",
    image: "",
    file: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


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
      formData.author = data.author
      formData.title = data.title
      formData.genre = data.genre
      formData.description = data?.description
      formData.image = data.image
    };

    getRequest();
  }, [token, id]);

  console.log(request);

  const fulfillRequest = async() => {
    try {
      
      const response = await fetch(`${BASE_URL}/requests/new-book/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `${token}`,
          "Accept": "*"
        },
      });
    
      if(response.ok){
        console.log(`Book fulfillment successful: ${response}`);
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    newFormData.append("title", formData.title);
    newFormData.append("author", formData.author);
    newFormData.append("genre", formData.genre);
    newFormData.append("description", formData.description);
    newFormData.append("rating", formData.rating);
    newFormData.append("stateOfBook", formData.stateOfBook);
    newFormData.append("personalComments", formData.personalComments);
    newFormData.append("image", formData.image);
    newFormData.append("file", formData.file);

    for (let pair of newFormData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
  }

    try {
      
      const response = await fetch(`${BASE_URL}/books`, {
        method: "POST",
        headers: {
          "Authorization": `${token}`,
          "Accept": "*"
          // No need to set 'Content-Type', it will be set automatically by the browser
        },
        body: newFormData,
      });
    
      if (!response.ok) {
        // Handle non-200 responses
        const errorMessage = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorMessage}`);
      }
    
      const responseData = await response.json();
      console.log('Book post successful:', responseData); 
      await fulfillRequest();
      
      // Optional: reload or redirect logic
      window.location.reload();
    } catch (error) {
      console.log(`Post failed due to: ${error.message}`);
    }}

    useEffect(() => {
      fulfillRequest();
    }, []);

    

  return (
    <div className="">
      <h3 className="pageTitle">Post A Book</h3>
      <form action="post" onSubmit={handleSubmit} className="my-4 text-center">
        <div className="row my-2">
          <div className="col-md-6">
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
              />
              <label htmlFor="bookImage">Link book's image</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="file"
                accept=".pdf,.epub"
                className="form-control"
                id="bookFile"
                name="file"
                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
              />
              <label htmlFor="bookImage" className="mb-2">Link book</label>
            </div>
          </div>
          <div className="col-md-6">
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
            <div className="form-floating mb-2">
              <input
                type="number"
                max={5}
                min={1}
                className="form-control"
                id="bookRating"
                placeholder="Rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              />
              <label htmlFor="bookRating">Rating</label>
            </div>
            
            <div className="form-floating mb-2">
              <select
                className="form-select"
                id="bookState"
                aria-label="bookState"
                name="stateOfBook"
                value={formData.stateOfBook}
                onChange={handleChange}
              >
                <option defaultValue >Select the state of the book</option>
                <option value="new">New</option>
                <option value="second-hand(used)">Second-hand</option>
                <option value="digital-copy">Digital Copy</option>
              </select>
            </div>

            
            <div className="form-floating mb-2">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="bookComments"
                style={{ height: "120px" }}
                name="personalComments"
                value={formData.personalComments}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="bookComments">Comments</label>
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

export default RequestToBook;
