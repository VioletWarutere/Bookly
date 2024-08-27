import "./cssFiles/App.css";
import Auth from "./Components/auth/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Wrapper from "./Components/pageSections/Wrapper";
import HomePage from "./Pages/HomePage";
import ViewBook from "./Components/Books/ViewBook";
import PostBook from "./Components/Books/PostBook";
import RequestPage from "./Components/Requests/RequestPage";
import PostRequest from "./Components/Requests/PostRequest";
import RequestToBook from "./Components/Requests/RequestToBook";
import MyCollection from "./Components/Books/MyCollection";
import UpdateBook from "./Components/Books/UpdateBook";
import Contributions from "./Pages/Contributions";
import DeleteBook from "./Components/Books/DeleteBook";
import DeleteRequest from "./Components/Requests/DeleteRequest";
import ViewRequest from "./Components/Requests/ViewRequest";
import UpdateRequest from "./Components/Requests/UpdateRequest";
import Books from "./Components/Books/Books";
import ProfilePage from "./Components/Users/ProfilePage";
import Favorites from "./Pages/Favorites";
import LandingPage from "./Pages/LandingPage";
import BookDetail from "./Components/pageSections/Google_API/BookDetail";
import PostGoogleBook from "./Components/pageSections/Google_API/PostGoogleBook";
import BooksList from "./Components/pageSections/Google_API/Main";
import DeleteComment from "./Components/pageSections/Comments_Likes/DeleteComment";
import Likes from "./Components/pageSections/Comments_Likes/Likes";
import DeleteMyBook from "./Components/Books/DeleteMyBook";

function App() {
  const token = Cookies.get("token");

  return (
    <div className="App">
      <>
        {token ? (
          <Wrapper>
            <Router>
              <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="/auth" exact element={<Auth />} />
                <Route path="/recommendations" exact element={<Favorites />} />
                <Route path="/profilePage" exact element={<ProfilePage />} />
                <Route path="/books" exact element={<Books />} />
                <Route path="/books/:id" element={<ViewBook />} />
                <Route path="/books/likes/:id" element={<Likes />} />
                <Route path="/books/post" element={<PostBook />} />
                <Route path="/books/update/:id" element={<UpdateBook />} />
                <Route path="/books/delete/:id" element={<DeleteBook />} />
                <Route path="/books/myBooks" element={<MyCollection />} />
                <Route path="/delete-myBook/:id" element={<DeleteMyBook />} />
                <Route path="/books/requests" element={<RequestPage />} />
                <Route path="/requests/post" element={<PostRequest />} />
                <Route path="/request/:id" element={<ViewRequest />} />
                <Route
                  path="/request-to-book/:id"
                  element={<RequestToBook />}
                />
                <Route path="/contributions" element={<Contributions />} />
                <Route path="/delete-book" element={<DeleteBook />} />
                <Route path="/delete-comment/:id" element={<DeleteComment />} />
                <Route path="/delete-request/:id" element={<DeleteRequest />} />
                <Route path="/update-request/:id" element={<UpdateRequest />} />
                <Route path="/update-request/:id" element={<UpdateRequest />} />

                <Route path="/google-book/:id" element={<BookDetail />} />
                <Route path="/google-books" element={<BooksList />} />
                <Route path="/post-book/:id" element={<PostGoogleBook />} />
              </Routes>
            </Router>
          </Wrapper>
        ) : (
          <>
            <Router>
              <Routes>
                <Route path="/" exact element={<LandingPage />} />
                <Route path="/auth" exact element={<Auth />} />
              </Routes>
            </Router>
          </>
        )}
      </>
    </div>
  );
}

export default App;
