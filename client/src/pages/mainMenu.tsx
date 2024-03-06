import '../css/mainMenu.css'
import React from 'react';
import { useNavigate} from 'react-router-dom';
import Footer from '../components/footer';
import { BackgroundBeams } from '../components/backgroundBeams';
import { Analytics } from "@vercel/analytics/react";
const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen text-white">
      <div className="flex flex-col items-center justify-center h-1/2">
        <div className="content button-container flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-stone-400 to-stone-500 text-transparent bg-clip-text">AlTo Music</h1>
          <button
            type="button"
            className="bg-neutral-600 hover:bg-neutral-500 text-white font-bold py-2 px-3 rounded mb-3 mt-2 transition-colors"
            onClick={() => navigate('SignIn')}
          >
            Sign In
          </button>
          <button
            type="button"
            className="btn btn-link hover:text-zinc-500 hover:underline underline-offset-1 text-white transition-colors"
            onClick={() => navigate('register')}
          >
            Register
          </button>
        </div>
      </div>
      <div className = "footer">
      <Footer/>
      </div>
      <section>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </section>
      <BackgroundBeams/>
      <Analytics/>
    </div>
  );
};

export default MainMenu;
