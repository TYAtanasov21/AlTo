import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";

function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const emailInput = useRef();
  const navigate = useNavigate();

  const sendData = async () => {
    try {
      const user = { name: username, mail: email, pass: password };
      const response = await axios.post("http://localhost:5000/auth/register", user);

      switch(response.data.code) {
        case 1: 
          setGreeting("Registration successful!");
          navigate('/UI Files/mainApp');
          break;
        case 2: 
          setErrorMessage("This username already exists");
          console.log(1);
          break;
        case 3: 
          setErrorMessage("This email is already taken");
          console.log(2);
          break;
        default:
          setErrorMessage("Unhandled response code");
          console.log(3);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Error during registration:");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-neutral-800 to-neutral-900 text-white">
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-semibold mb-6">Register</h2>
        <form className="bg-neutral-700 p-8 rounded-lg shadow-md w-96">
        {errorMessage && <h2 className = "text-rose-700 font-semibold text-center">{'*'+ errorMessage}</h2>}
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
    </div>
    {greeting && <h1 className = "text-green-500">{greeting}</h1>}
    <div className = "footer">
        <Footer/>
      </div>
      <section>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </section>
  </div>
  );
}

export default Register;
