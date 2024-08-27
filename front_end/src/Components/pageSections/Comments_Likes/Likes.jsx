import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/backend_services";

const Likes = ({ id, token, setLikes, likeActive, setLikeActive }) => {
  useEffect(() => {
    const bookLike = async () => {
      console.log(`Liked book: ${id}`)
      /* try {
        const response = await fetch(`${BASE_URL}/books/like/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          console.log(`Book like successful: ${response}`);
          const data = await response.json();
          setLikes(data.likes);
          //window.location.reload();
        }
      } catch (error) {
        console.log(`Post failed due to ${error.message}`);
      } */
    };
    bookLike();


  }, [id]);
  return (
    <button
      className="like "
      onClick={() => setLikeActive(!likeActive)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-heart-fill"
        viewBox="0 0 16 16"
        style={{ color: "red" }}
        
      >
        <path
          fill-rule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
        />
      </svg>
    </button>
  );
};

export default Likes;
