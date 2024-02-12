import React, { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import axios from "axios";
import '../css/footerControl.css';

interface FooterProps {
  className?: React.ReactNode;
  sound: HTMLAudioElement
}


interface PlaybackResponse {
  success: boolean;
}

const Footer: React.FC<FooterProps> = ({sound}) => {
  const [isPlaying, setIsPlaying] = useState(false);


  const handlePlayPause = async () => {
    try {
      if (!sound.paused) {
        sound.pause();
        setIsPlaying(false);
      } else {
        await sound.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error sending playback request:', error);
    }
  };

  const handleSkipBackward = async () => {
    // Implement your logic for skipping backward
  };

  const handleSkipForward = async () => {
    // Implement your logic for skipping forward
  };

  return (
    <div className="music-player-footer text-white p-4 bg-neutral-900">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">Ne e lyubov</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="btn btn-light" onClick={handleSkipBackward}>
              <IoPlayBack size={20} />
            </button>
            <button className="btn btn-light" onClick={handlePlayPause}>
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button className="btn btn-light" onClick={handleSkipForward}>
              <IoPlayForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
