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

  const navigate = useNavigate();

  const sendData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/signIn", user);
      if (response.data.signedIn) {
        navigate('/UI Files/mainApp');
      } else console.log("Wrong credentials");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-neutral-800 to-neutral-900 text-white">
      <h2 className="text-3xl font-semibold mb-6">Sign In</h2>
      <form className="bg-neutral-700 p-8 rounded-lg shadow-md w-96">
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
        <div className="mb-4">
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
        <div className="mb-4">
          <input
            type="checkbox"
            id="rememberMe"
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-gray-300">
            Remember me
          </label>
        </div>
        <button
          type="button"
          onClick={sendData}
          className="bg-neutral-600 text-white py-2 px-4 rounded-md hover:bg-neutral-800 focus:outline-none"
        >
          Sign In
        </button>
      </form>
      <div className="footerMenuContainer mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default SignIn;
