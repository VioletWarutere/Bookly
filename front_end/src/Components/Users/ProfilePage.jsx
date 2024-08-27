import React,{useEffect, useState} from 'react'
import { BASE_URL } from '../../utils/backend_services'
import Cookies from 'js-cookie'

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    profile_picture: 'https://example.com/johndoe.jpg',
    role: ''
  })

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
        setUser(data);
        
    }

    getUser();
  }, [token])

  return (
   
         <div>
      <div className="card mb-3 mt-0 g-3 ">
        <div className="row g-0">
          
          <div className="col-md-12 g-3">
            <div className="card-body ">
              <h5 className='display-1'>Name: {`${user.firstName} ${user.lastName}`}</h5>
              <h6 ></h6>

              <p >
                <small className="text-body-secondary fs-3">Username: {user.username}</small>
              </p>
              <p className="book-desc"></p>
              <div className="py-3" >
                <p className="">Email: {user.email}</p>
               
              </div>

              
            </div>
            <div className="btn btn-light" onClick={() => window.location.replace('/recommendations')}>
              Set Genre Favorites
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ProfilePage