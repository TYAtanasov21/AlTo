import React, { useState } from "react";
import "./css/SignIn.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const navigate = useNavigate();                                                                                                                                      
  const sendData = async () => {
    try {
      const response = await axios.post("https://alto-server.azurewebsites.net/auth/signIn", user);
      if(response.data.signedIn) {
        navigate('/UI Files/mainApp');
      } 
      else console.log("Wrong credentials");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="text-light mb-3">Sign In</h2>
      <form className="my-form p-4 rounded text-light">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button onClick={sendData} type="button" className="btn btn-light">
          Submit
        </button>
      </form>
        <div className="footerMenuContainer">
          <Footer />
    </div>
  </div>
  );
};

export default SignIn;
