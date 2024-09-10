import React, { useState } from "react";
import { BASE_URL } from "../../utils/backend_services";
import { Link } from "react-router-dom";



const Register = ({ setShowLoginForm}) => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const newFormData = new FormData();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    username: "",
    profilePicture: "",
  });

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    newFormData.append("firstName", formData.firstName);
    newFormData.append("lastName", formData.lastName);
    newFormData.append("email", formData.email);
    newFormData.append("password", formData.password);
    newFormData.append("phoneNumber", formData.phoneNumber);
    newFormData.append("username", formData.username);
    //newFormData.append("profilePicture", formData.profilePicture);

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Accept": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(`Registration successful: ${response}`);
      alert('Registration successful.Kindly Login.');
      setShowLoginForm(true);
    } catch (error) {
      console.log(`Registration failed due to ${error.message}`);
      console.log(`Registration failed due to ${error}`);
    }
  };

  return (
    <div className=" my-sm-2 my-4 scrollable-content">
      <h1 className="display-5 mb-4 text-center">Register Here</h1>
      <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center mb-4'>
        <div className="row my-2 mx-2">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="first_name" className="form-label my-1">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
             
              aria-label="First name"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className=" col-sm-12 col-md-6">
            <label htmlFor="last_name" className="form-label my-1">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              
              aria-label="Last name"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row my-2 mx-2">
          <div className="col-sm-4 col-md-6">
            <label htmlFor="email" className="form-label my-1">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="example@gmail.com"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group position-relative col-sm-4 col-md-6">
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
        </div>
        <div className="row my-2 mx-2">
          <div className="col-sm-4 col-md-6">
            <label htmlFor="phoneNumber" className="form-label my-1">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              placeholder="0768790878"
              required
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-4 col-md-6">
            <label htmlFor="username" className="form-label my-1">
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
          {/* <div className="row my-2">
          <div className="col-sm-4 col-md-6 py-2">
            <label htmlFor="profilePicture" className="form-label my-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="profilePicture"
              placeholder=""
              name="profilePicture"
              onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })}
            />
          </div>
          </div> */}
        </div>

        <div className="col mt-4 ">
          <button type="submit" className="btn btn-dark" onClick={() => alert(`Please wait a moment as we process your registration.`)}>
            Register
          </button>
        </div>
        <div className="col mt-3 mb-5">
          <Link className="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" onClick={() => setShowLoginForm(true)}>Already,have an account?Login Here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
