import React, { useEffect } from "react";
import { BASE_URL } from "../../../utils/backend_services";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const DeleteComment = () => {  // Destructure id from props
  const token = Cookies.get("token");
  const { id } = useParams();  // Destructure bookId from useParams

  useEffect(() => {
    const deleteComment = async () => {
      try {
        const response = await fetch(`${BASE_URL}/comments/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          console.log("Comment deleted successfully.");
          setTimeout(() => {
            window.location.replace(`/books/${id}`);
          }, 1000);
          // Show toast or any UI feedback here
        } else {
          console.error(
            `Failed to delete comment: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error(`Delete failed due to: ${error.message}`);
      }
    };

    deleteComment();
  }, [id, token]);

  return (
    <>
     { alert('Comment deleted successfully')}
    </>
  );
};

export default DeleteComment;
