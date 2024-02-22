import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="font-semibold text-center text-black">
      <img src={require("./assets/logo-black.png")} alt="Your Logo" className="w-12 h-12 mx-auto mb-3" />
      <p>&copy; 2024 AlTo. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
