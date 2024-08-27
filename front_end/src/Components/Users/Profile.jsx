import React, { useEffect, useState } from "react";
import '../../cssFiles/SideBar.css'
import { BASE_URL } from "../../utils/backend_services";
import Cookies from 'js-cookie'



const Profile = (req, res) => {
  const [ username, setUsername ] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [role, setRole] = useState('');
  //const [favorites, setFavorites] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const getUser = async(req, res) => {
      const response = await fetch(`${BASE_URL}/users/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }});
        const data = await response.json();
        console.log(data);
        setUsername(data.username);
        setRole(data.role);
        setProfilePicture(data.profilePicture);
        
        localStorage.setItem('favorites', data.favoriteGenres);
    }

    getUser();
  }, [token])

  
  return (
    <a className="profileLink px-4 py-1" href='/profilePage'>
      <img 
      src={profilePicture}
      alt='profile'
      className="profileImage"
      />
      <div className="">
       <div className="userName py-2">
        <h1  className="fw-normal py-2 userName" >Welcome, {username}</h1>
      </div>
      
      </div>
      
    </a>
  );
};

export default Profile;
