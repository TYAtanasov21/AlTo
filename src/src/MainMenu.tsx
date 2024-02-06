import React from 'react';
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './css/footerControl.css'
import "./css/MainMenu.css"
import Head from "./Heading";
import Footer from "./footer";

const MainMenu: React.FC = () => {
    const navigate = useNavigate();
    return (
      <div>
        <div className="container-fluid text-center">
          <div className="row">
            <div className="col" id="animation-side">
              <img
                src={require("../src/assets/logo-black.png")}
                alt="logo"
                id="logo"
              />
            </div>
            <div className="col log-side">
              <div className="container-fill">
                <div className="getStarted">
                  <Head heading="Get started" />
                </div>
                  <button type="button" className="btn btn-outline-info btn-colour" onClick={() => navigate('SignIn')}>Sign In</button>
                  <button type="button" className="btn btn-link sign-up" onClick={() => navigate('register')}>Register</button>
              </div>
              <div className="col">
                <div className="footerMenuContainer">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default MainMenu;