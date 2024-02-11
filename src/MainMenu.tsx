import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-16 mb-8">AlTo Music</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="button-container mb-8 flex flex-col">
          {/* Styled "Sign In" button */}
          <button
            type="button"
            className="bg-sky-600 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded mb-3"
            onClick={() => navigate('SignIn')}
          >
            Sign In
          </button>
          <button type="button" className="btn btn-link hover:text-indigo-800 hover:underline underline-offset-1 text-indigo-700" onClick={() => navigate('register')}>
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
