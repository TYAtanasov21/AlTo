import React, { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlayBack, IoPlayForward} from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/footerControl.css';

const audioFile = require("../assets/sound.mp3");

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const sound = new Audio(audioFile);
  const handlePlayPause = () => {
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipBackward = () => {
  };

  const handleSkipForward = () => {
  };
  
  return (
    <div className="music-player-footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <p>Ne e lyubov</p>
          </div>
          <div className="col">
            <div className="d-flex justify-content-center align-items-center buttons">
              <button className="btn btn-light" onClick={handleSkipBackward}>
              <IoPlayBack size = {30}/>
              </button>
              <button className="btn btn-light" onClick={handlePlayPause}>
                {isPlaying ? <FaPause size = {30}/> : <FaPlay size = {30}/>}
              </button>
              <button className="btn btn-light" onClick={handleSkipForward}>
                <IoPlayForward size = {30}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default  Footer;