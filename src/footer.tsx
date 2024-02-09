import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-light text-center my-4">
      <img src={require("./assets/logo-white.png")} alt="Your Logo" className="w-12 h-12 mx-auto mb-4" />
      <p>&copy; 2024 AlTo. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
