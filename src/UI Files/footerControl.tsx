import React, { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import axios from "axios";
import '../css/footerControl.css';

interface FooterProps {
  className?: React.ReactNode;
}

const audioFileUrl = "https://altosongstorage.blob.core.windows.net/songs/MBT%20-%20SUJALQVAM%20(OFFICIAL%20AUDIO).mp3?sp=r&st=2024-02-12T07:01:16Z&se=2024-02-12T15:01:16Z&spr=https&sv=2022-11-02&sr=b&sig=UmHjOL6ElYzLALq07xROCoWvknI9mINM62TetrhzSk8%3D"; // Replace with your Azure Blob Storage URL

interface PlaybackResponse {
  success: boolean;
}

const Footer: React.FC<FooterProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/playback', {
        action: isPlaying ? 'pause' : 'play',
        audioFileUrl,
      });

      if (response.data.success) {
        setIsPlaying(!isPlaying);
      } else {
        console.error('Failed to control playback.');
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
