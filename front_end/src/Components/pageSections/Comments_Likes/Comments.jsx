import React, { useEffect, useState } from "react";
import "../../../cssFiles/Comments.css";
import { BASE_URL } from "../../../utils/backend_services";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const Comments = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComment, setShowComment] = useState(false);

  console.log(id);

  useEffect(() => {
    const bookComments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/comments/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          console.log(`Book comments received successfully: ${response}`);
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.log(`Post failed due to ${error.message}`);
      }
    };

    bookComments();
  }, [id, token]);

  console.log(comments);

  

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedTime = date.toLocaleString("en-US", options);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${formattedTime} on ${day}${getOrdinalSuffix(
      day
    )} ${month} ${year}`;
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Handle 11th, 12th, 13th, etc.
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const postComment = async () => {
    try {
      const response = await fetch(`${BASE_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          bookId: id,
          comment: newComment,
        }),
      });

      if (response.ok) {
        console.log(`Comment posted successfully: ${response}`);
        const data = await response.json();
        setComments([...comments, data]);
        //setNewComment('');
      }
    } catch (error) {
      console.log(`Post failed due to ${error.message}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postComment();
    setShowComment(false);
  };

  const addComment = () => {
    return (
      <form action="post" onSubmit={handleSubmit}>
        <div data-mdb-input-init class="form-outline mb-4">
          <input
            type="text"
            id="comment"
            className="form-control comment-input"
            placeholder="Type comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <input type="submit" hidden />
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row  ">
          <div className="col-md-8">
            <div className="headings comment-heading mb-3">
              <h5>Comments {comments.length}</h5>
              <div className="addComment">
                <button
                  className="btn primaryButton-outlineDark"
                  onClick={() => setShowComment(true)}
                >
                  Add Comment
                </button>
              </div>
            </div>

            {showComment ? addComment() : ``}

            {comments.map((comment) => {
              return (
                <div className="card card-comment p-3 " key={comment._id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                      <span>
                        <small className="font-weight-bold userName">
                          {comment.user.username}
                        </small>{" "}
                        <small className="font-weight-bold">
                          {comment.comment}
                        </small>
                      </span>
                    </div>

                    <small>{formatDate(comment.createdAt)}</small>
                  </div>

                  <div className=" d-flex justify-content-between mt-2 align-items-center">
                  <Link to={`/delete-comment/${comment._id}`} className="reply">
                  <small
                      className="reply action px-4 fw-medium"
                      style={{ border: "none" }}
                    >
                      <small>Remove</small>
                    </small>
                  </Link>
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
