import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './MainMenu';
import SignIn from './signIn';
import Register from './register';
import Home from './UI Files/mainApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/UI Files/mainApp" element = {<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;

//map, filter, reduce