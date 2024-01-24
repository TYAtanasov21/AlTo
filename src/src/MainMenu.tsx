import React from "react";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import "./css/MainMenu.css"

// import SignIn from "./SignIn";
// import Register from "./register";

function GetPartOfTheDay() {
  const date = new Date();
  let partOfDay = "";
  if (date.getHours() >= 19) {
    partOfDay = "Good Evening";
  } else if (date.getHours() >= 13) {
    partOfDay = "Good Afternoon";
  } else if (date.getHours() >= 5 || date.getHours() <= 5) {
    partOfDay = "Good Morning";
  }
  return partOfDay;
}

function MainMenu() {
    const navigate = useNavigate();
    return (
      <div>
        <div className="container-fluid text-center">
          <div className="row">
            <div className="col" id="animation-side">
              <img
                src={require("../src/assets/logo_black_border.png")}
                alt="logo"
                id="logo"
              />
            </div>
            <div className="col log-side">
              <h1>{GetPartOfTheDay()}</h1>
              <button type = "button" className = "btn btn-outline-info btn-colour"onClick={()=> navigate('SignIn')}>Sign In</button>
              <button type = "button" className = "btn btn-link sign-up" onClick={()=> navigate('register')}>Register</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default MainMenu;