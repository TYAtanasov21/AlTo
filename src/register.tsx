import React, { useState, useRef } from "react";
import "./css/SignIn.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";


function Register() { const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [username, setUsername] = useState('');

const emailInput = useRef();
const navigate = useNavigate();

const sendData = async () => {
  try {
    const user = { name: username, mail: email, pass: password };
    const response = await axios.post("http://localhost:5000/auth/register", user);

    switch(response.data.code) {
      case 1: 
        console.log("Registration successful");
        navigate('/UI Files/mainApp');
        break;
      case 2: 
        console.log("This username already exists");
        break;
      case 3: 
        console.log("This email is already taken");
        break;
      default:
        console.log("Unhandled response code");
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
};


  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="text-light mb-3">Register</h2>
      <form className="my-form p-4 rounded text-light">
        <div className="mb-3">
          <label htmlFor="exampleInputUsername" className="form-label visually-hidden">
            Username
          </label>
          <input
            type="username"
            name="username"
            className="form-control"
            ref={emailInput} // You can use the same ref for username and email
            id="exampleInputUsername"
            placeholder="your_username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label visually-hidden">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            ref={emailInput}
            id="exampleInputEmail"
            placeholder="your_email@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label visually-hidden">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            placeholder="Your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="d-grid gap-2">
          <button onClick={sendData} type="button" className="btn btn-light btn-lg">
            Register
          </button>
        </div>
      </form>
      <div className="footerMenuContainer">
          <Footer />
    </div>
    </div>
  );
}

export default Register;
