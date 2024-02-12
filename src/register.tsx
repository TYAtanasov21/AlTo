import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";

function Register() {
  const [email, setEmail] = useState('');
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
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-neutral-800 to-neutral-900 text-white">
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-semibold mb-6">Register</h2>
        <form className="bg-neutral-700 p-8 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <label htmlFor="exampleInputUsername" className="text-gray-300 block mb-2">
            Username
          </label>
          <input
            type="username"
            name="username"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white"
            ref={emailInput}
            id="exampleInputUsername"
            placeholder="Your Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputEmail" className="text-gray-300 block mb-2">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white"
            ref={emailInput}
            id="exampleInputEmail"
            placeholder="Your Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPassword" className="text-gray-300 block mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white"
            id="exampleInputPassword"
            placeholder="Your Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="d-grid gap-2">
          <button
            onClick={sendData}
            type="button"
            className="bg-neutral-600 text-white py-2 px-4 rounded-md hover:bg-neutral-700 focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
      <div className="footerMenuContainer mt-8">
        <Footer />
      </div>
    </div>
  </div>
  );
}

export default Register;
