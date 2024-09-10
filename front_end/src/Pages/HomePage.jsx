import React, { useContext } from "react";
//should have proper background color and structure
//sidebar and main side
//sidebar has profile and navigation links,log out button
//main side has top bar and bottom section
//top bar has logo and search bar
//bottom section has page content
//profile and search bar
import "../cssFiles/Wrapper.css";
import Cookies from "js-cookie";
import { GetBooksContext } from "../context/Getbooks";
import { GetRequestsContext } from "../context/Getrequests";
import BookLikes from "../Components/pageSections/Comments_Likes/BookLikes";

const HomePage = () => {
  //const [books, setBooks] = useState([]);
  //const [requests, setRequests] = useState([]);
  const token = Cookies.get("token");

  const { books } = useContext(GetBooksContext);
  console.log(books);

  

  const { requests } = React.useContext(GetRequestsContext);
  console.log(requests);

if(!books){
    return <h1>Loading...</h1>;
  }
  

  const renderRating = (rating) => {
    switch (rating) {
      case 1:
        return "✨";
      case 2:
        return "✨✨";
      case 3:
        return "✨✨✨";
      case 4:
        return "✨✨✨✨";
      case 5:
        return "✨✨✨✨✨";
      default:
        return "Please type a number between 1 and 5";
    }
  };

  // Helper function to convert a string to title case
  const toTitleCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Function to transform array elements to title case and join them with commas
  const commaAdd = (array) => {
    return array.map(toTitleCase).join(", ");
  };

  const truncateParagraph = (paragraph, wordLimit) => {
    const words = paragraph.split(" ");
    return words.length <= wordLimit
      ? paragraph
      : words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="container m-auto">
      <div className="row m-auto">
        {books.map((book) => {
          return (
            <div className="col-sm-5 col-md-3">
            <div
              className=" card"
              key={book.title}
              style={{ maxWidth: "210px" }}
            >
              <a
                href={`/books/${book._id}`}
                className="link-offset-2 link-underline link-underline-opacity-0 "
              >
                <img
                  src={book.image}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </a>

              <div className="col-md-9">
                
                <div className="text-group g-0 ">
                  <h5 className="books-title">{book.title}</h5>

                  <p className="books-subtitle">{book.author}</p>

                  <p className="books-smalltexts">
                    <small className="text-body-secondary bold sub-texts">
                      {truncateParagraph(commaAdd(book.genre), 8)}
                    </small>
                    <br />
                    <small className="badge">BOOK</small>
                  </p>
                </div>
              </div>
            </div>
            </div>
          );
        })}
        {requests.map((request) => {
          return (
            <div className="col-sm-5 col-md-3">
            <div
              className="card"
              key={request.title}
              style={{ maxWidth: "210px" }}
            >
              <a
                href={`/request/${request._id}`}
                className="link-offset-2 link-underline link-underline-opacity-0"
              >
                <img
                  src={request.image}
                  className="img-fluid rounded-start"
                  alt="request"
                />
              </a>

              <div className="col-md-12">
                <div className="text-group g-0">
                  <h5 className="books-title">{request.title}</h5>

                  <p className="books-subtitle">{request.author}</p>

                  <p className="books-smalltexts">
                    <small className="text-body-secondary bold sub-texts">
                      {truncateParagraph(commaAdd(request.genre), 8)}
                    </small>
                    <br />
                    <small className="badge">REQUEST</small>
                  </p>
                </div>
              </div>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
