import React, { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import axios from "axios";
import '../css/footerControl.css';

interface FooterProps {
  className?: React.ReactNode;
  sound: HTMLAudioElement;
}

const Footer: React.FC<FooterProps> = ({ sound }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);

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

  const handleProgressBarClick = (event: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
    const progressBar = event.currentTarget;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const percentageClicked = (clickPosition / progressBar.clientWidth) * 100;
    const timeClicked = (percentageClicked / 100) * duration;

    sound.currentTime = timeClicked;
  };

  const handleProgressBarHover = (event: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
    const progressBar = event.currentTarget;
    const hoverPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const percentageHovered = (hoverPosition / progressBar.clientWidth) * 100;
    const timeHovered = (percentageHovered / 100) * duration;

    setHoveredTime(timeHovered);
  };

  const handleProgressBarLeave = () => {
    setHoveredTime(null);
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(sound.currentTime);
      setDuration(sound.duration);
      if(sound.currentTime === sound.duration) {
        setIsPlaying(false);
      };
    };

    sound.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      sound.removeEventListener('timeupdate', handleTimeUpdate);
    };

  }, [sound]);

  return (
    <div className="music-player-footer text-white p-4 bg-neutral-900">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">MBT - SUJELAVAM</p>
          </div>
          <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <progress
              className="progress-bar"
              value={currentTime}
              max={duration}
              onClick={handleProgressBarClick}
              onMouseMove={handleProgressBarHover}
              onMouseLeave={handleProgressBarLeave}
            ></progress>
            {hoveredTime !== null && (
              <div className="tooltip">{formatTime(hoveredTime)}</div>
            )}
            <span className="time">{formatTime(duration)}</span>
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

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
};

export default Footer;

