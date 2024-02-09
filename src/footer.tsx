import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-light text-center py-3">
      <div className="container">
        <img src={require("./assets/logo-white.png")} alt="Your Logo" className="mb-3" width = "50px"/>
        <p>&copy; 2024 AlTo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;