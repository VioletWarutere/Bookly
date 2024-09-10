import React, { useState ,useEffect } from 'react';
import Cookies from 'js-cookie'; // Ensure you have js-cookie installed and imported
import { BASE_URL } from '../../utils/backend_services'; // Replace with the actual path to your BASE_URL
import { Link } from 'react-router-dom';


const Login = ({setShowLoginForm }) => {

  //const navigate = useNavigate();  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const now = new Date();
  const threeHoursLater = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 hours in milliseconds

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  



 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Cookies.set('token', data.token, { expires: threeHoursLater }); // Set the token to expire in 3 hours
        
        window.location.replace('/');
        
      } else {
        alert(`Please confirm your username and password then try again.`);
      }
    } catch (error) {
      console.log(`Login failed: ${error.message}`);
      alert('An error occurred during login.Ensure you have registered');
    }
  };

  return (
    <div className="my-4">
      <h1 className="display-5 mb-4 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
      <div className="col-8 mb-2">
            <label htmlFor="username" className="form-label my-1 text-start">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="LauraSwapped"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        <div className="form-group position-relative col-8">
            <label htmlFor="password" className="form-label my-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Link
        onClick={togglePasswordVisibility}
        style={{
          position: "absolute",
          top: "25px",
          right: "-5px",
          cursor: "pointer"
        }}
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-eye-slash"
            viewBox="0 0 16 16"
          >
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
          </svg>
        )}
      </Link>
          </div>
        <div className="col mt-4 text-center">
          <button type="submit" className="btn btn-dark ">
            Sign In
          </button>
        </div>
        <div className="col mt-3 text-center">
          <a className="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#" onClick={() => setShowLoginForm(false)}>Don't have an account? Register Here</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
