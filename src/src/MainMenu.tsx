import React from "react";
import Heading from "./Heading"
import 'bootstrap/dist/css/bootstrap.css';
import '../src/css/MainMenu.css'

const date = new Date();
let partOfDay:string = "";
console.log(date.getHours());
if(date.getHours() >= 19)
{
    partOfDay = "Good Evening";
}
else if(date.getHours() >= 13)
{
    partOfDay = "Good Afternoon";
}
else if(date.getHours() >= 5 || date.getHours() <=5)
{
    partOfDay = "Good Morning"; 
}

function MainMenu(){
    return(
        <div>
            <div className="container-fluid text-center">
                <div className="row">
                    <div className="col" id = "animation-side">
                    <img src = {require("../src/assets/logo_black_border.png")} alt = "logo" id = "logo"></img>
          </div>
          <div className="col log-side">
            <Heading heading = {partOfDay} ></Heading>
            <a href="html/signIn.html">
            <button type="button" className="btn btn-outline-info btn-colour">Sign in</button></a>
            <a href="html/register.html">
            <button type="button" className="btn btn-link sign-up">Sign up</button></a>
          </div>
        </div>
      </div>
            
        </div>
    )
}

export default MainMenu;