import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css';
import "./css/MainMenu.css"

// import SignIn from "./SignIn";
// import Register from "./register";

function GetPartOfTheDay() {
  const date = new Date();
  let partOfDay:string = '';
  if (date.getHours() >= 19) {
    partOfDay = "Good Evening";
  } else if (date.getHours() >= 13) {
    partOfDay = "Good Afternoon";
  } else if (date.getHours() >= 5 || date.getHours() <= 5) {
    partOfDay = "Good Morning";
  }
  return partOfDay;
}


function GenerateText() {
  const [text, setText] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      console.log(response);
      setText(response.data.content);
    } catch (error) {
      console.log("Samo CSKA");
    }
  };

  return (
    <div>
      <button type="button" className="btn btn-link sign-up" onClick={fetchData}>
        Generate
      </button>
      {text ? <p>{text}</p> : null}
    </div>
  );
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
              <button type = "button" className = "btn btn-link sign-up" onClick={()=> navigate('register')}>Register</button><br/>
              <GenerateText />
            </div>
          </div>
        </div>
      </div>
    );
  }

export default MainMenu;