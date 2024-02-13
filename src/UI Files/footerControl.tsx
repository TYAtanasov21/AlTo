import React, { useState, useEffect, useRef } from "react";
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
  const [dragging, setDragging] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const progressBarRef = useRef<HTMLProgressElement | null>(null);

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
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const percentageClicked = (clickPosition / progressBar.clientWidth);
    const timeClicked = percentageClicked * duration;

    sound.currentTime = timeClicked;
  };

  const handleProgressBarHover = (event: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
    if (dragging) {
      const progressBar = progressBarRef.current;
      if (!progressBar) return;

      const hoverPosition = event.clientX - progressBar.getBoundingClientRect().left;
      const percentageHovered = (hoverPosition / progressBar.clientWidth);
      const timeHovered = percentageHovered * duration;

      setHoveredTime(timeHovered);
    }
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY, 
    });
  };

  const handleProgressBarLeave = () => {
    setHoveredTime(null);
  };

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleKeyDownEvent = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      // Toggle isPlaying when space bar is pressed
      handlePlayPause();
    }
  };
  
  const handleMouseMove = (event: React.MouseEvent) => {
    if (dragging) {
      const progressBar = progressBarRef.current;
      if (!progressBar) return;


      const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
      const percentageClicked = (clickPosition / progressBar.clientWidth);
      const timeClicked = percentageClicked * duration;

      sound.currentTime = timeClicked;
    }
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      // ... (your existing time update logic)
    };
  
    sound.addEventListener('timeupdate', handleTimeUpdate);
    window.addEventListener('keydown', handleKeyDownEvent);
  
    return () => {
      sound.removeEventListener('timeupdate', handleTimeUpdate);
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [sound]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="music-player-footer text-white p-4 bg-neutral-900">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">Ne e lyubov</p>
          </div>
          <div
            className="progress-container"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <span className="time">{formatTime(currentTime)}</span>
            <progress
              ref={progressBarRef}
              className="progress-bar"
              value={currentTime}
              max={duration}
              onClick={handleProgressBarClick}
              onMouseMove={handleProgressBarHover}
              onMouseLeave={handleProgressBarLeave}
              onMouseDown={handleMouseDown}
            ></progress>
            {hoveredTime !== null && (
              <div
                className="tooltip"
                style={{ transform: `translate(${tooltipPosition.x}px, ${tooltipPosition.y}px)` }}
              >
                {formatTime(hoveredTime)}
              </div>
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

export default Footer;
