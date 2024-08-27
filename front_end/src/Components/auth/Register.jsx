import React, { useState } from "react";
import { BASE_URL } from "../../utils/backend_services";



const Register = ({ setShowLoginForm}) => {

  const handleRegister = () => {
    const now = new Date();
    localStorage.setItem('registrationTime', now.toString());
    alert('Registration time saved!');
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
      //window.location.replace('/')
    } catch (error) {
      console.log(`Registration failed due to ${error.message}`);
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
              placeholder="First name"
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
              placeholder="Last name"
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
          <div className="col-sm-4 col-md-6">
            <label htmlFor="password" className="form-label my-1">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
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
          <button type="submit" className="btn btn-dark" onClick={handleRegister}>
            Register
          </button>
        </div>
        <div className="col mt-3 mb-5">
          <a className="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#" onClick={() => setShowLoginForm(true)}>Already,have an account?Login Here</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
