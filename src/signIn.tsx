import "./css/signIn.css"
import React, { useState } from "react";
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
  let [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const sendData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/signIn", user);
      if (response.data.signedIn) {
        navigate('/UI Files/mainApp', {state: {user}});
      }
      else
      {
        setErrorMessage("Wrong email or password")
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("Error during sign-in");
    }
  };

  return (
    <div className="content flex flex-col items-center justify-center h-screen bg-gradient-to-r from-neutral-800 to-neutral-900 text-white">
      <h2 className="text-3xl font-semibold mb-5">Sign In</h2>
        <form className="bg-neutral-700 p-8 rounded-lg shadow-md w-96">
          {errorMessage && <h2 className = "text-rose-700 font-semibold text-center">{'*'+ errorMessage}</h2>}
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-300 block mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="text-gray-300 block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white"
          />
        </div>
        <button
          type="button"
          onClick={sendData}
          className="bg-neutral-600 text-white py-2 px-4 rounded-md hover:bg-neutral-800 focus:outline-none"
        >
          Sign In
        </button>
      </form>
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
};

export default SignIn;