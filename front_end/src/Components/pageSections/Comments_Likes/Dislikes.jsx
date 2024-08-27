import React, { useEffect } from 'react'
import { BASE_URL } from '../../../utils/backend_services';

const Dislikes = ({id, token, setLikes, setLikeActive}) => {


    useEffect(() => {
        const bookDislike = async () => {
            try {
              const response = await fetch(`${BASE_URL}/books/dislike/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
              });
        
              if (response.ok) {
                console.log(`Book dislike successful: ${response}`);
                const data = await response.json();
                setLikes(data.likes);
              }
            } catch (error) {
              console.log(`Post failed due to ${error.message}`);
            }
          };
          bookDislike();
    }, [id])


  return (
<>
<button className="like" onClick={() => setLikeActive(true)}
>

<svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-heart-fill"
        viewBox="0 0 16 16"
        style={{ color: "black" }}
        
      >
        <path
          fill-rule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
        />
      </svg>
        </button></>

  )
}

export default Dislikes