import React from 'react';
import {Link} from "react-router-dom"
const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col justify-center font-semibold text-center text-black">
      <img src={require("../assets/logo-black.png")} alt="Your Logo" className="w-12 h-12 mx-auto mb-1" />
      <p>&copy; 2024 AlTo. All rights reserved.</p>
      <label className="flex items-center"><Link to="/termsOfUse" className="text-neutral-950 hover:underline font-semibold">Terms of Use</Link></label>
    </footer>
  );
};

export default Footer;
