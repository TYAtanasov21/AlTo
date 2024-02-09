import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-16 mb-8">AlTo Music</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="button-container mb-8 flex flex-col">
          <button type="button" className="btn btn-outline-info btn-colour mb-2" onClick={() => navigate('SignIn')}>
            Sign In
          </button>
          <button type="button" className="btn btn-link sign-up" onClick={() => navigate('register')}>
            Register
          </button>
        </div>
        <div className="footerMenuContainer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
