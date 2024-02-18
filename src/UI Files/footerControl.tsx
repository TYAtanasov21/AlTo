import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import '../css/footerControl.css';
import { Song, useSongsState } from "./components/songState";
import MuteButton from "./components/volumeMute";

interface FooterProps {
  className?: React.ReactNode;
  picked_song: Song;
  songs: Song[];
}

const Footer: React.FC<FooterProps> = ({
  picked_song, songs
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const progressBarRef = useRef<HTMLProgressElement | null>(null);
  const [sound, setSound] = useState(new Audio());
  const [song, setSong] = useState<Song>(picked_song);
  const [volume, setVolume] = useState<number>(100);
  const volumeBarRef = useRef<HTMLProgressElement | null>(null);

  useEffect(() => {
    if (volumeBarRef.current) {
      volumeBarRef.current.value = volume;
    }
  }, [volume]);

  useEffect(()=>{
    setSong(picked_song);
  }, [picked_song]);

  const handleVolumeBarClick = (event: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
    const volumeBar = volumeBarRef.current;
    if (!volumeBar) return;

    const clickPosition = event.clientX - volumeBar.getBoundingClientRect().left;
    const percentageClicked = clickPosition / volumeBar.clientWidth;
    const newVolume = Math.round(percentageClicked * 100);

    setVolume(newVolume);
    sound.volume = newVolume / 100;
  };


  useEffect(() => {
    if (song && song.song_url) {
      setSoundUrl(song.song_url);
    }
  }, [song]);

  const [soundUrl, setSoundUrl] = useState(song && song.song_url ? song.song_url : '');

  useEffect(() => {
    sound.src = soundUrl;
    handlePlayPause();
  }, [soundUrl]);


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

  const findSongIndex = () => {
    let index = 0;
    for (const s of songs) {
      if (s.title == song.title) {
        return index;
      }
      index++;
    }
    return -1; // Return -1 if the song is not found in the array
  };

  const handleSkipBackward = () => {
    const index = findSongIndex();

      if(sound.currentTime<5){
        if(index>0)
          setSong(songs[index-1]);
      }
      else sound.currentTime = 0;

  };

  const handleSkipForward = () => {
    const index = findSongIndex();
    if(index<songs.length)
      setSong(songs[index+1]);
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
      const newDuration = sound.duration;
    
      if (!isNaN(newDuration) && isFinite(newDuration)) {
        setDuration(newDuration);
      }
    
      setCurrentTime(sound.currentTime);
    
      if (sound.currentTime === newDuration) {
        if(findSongIndex()<songs.length){
          handleSkipForward();
        }
        else {
          setIsPlaying(false);
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDownEvent);
    sound.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      sound.removeEventListener('timeupdate', handleTimeUpdate);
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [sound]);

  const handleVolumeBarDragStart = (event: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleVolumeBarDragEnd = () => {
    setDragging(false);
  };

  const handleVolumeBarDrag = (event: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
    if (dragging) {
      handleVolumeBarClick(event);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };
  
  const getFooterImg = () => {
    if(song?.song_url){
      return (
        <img
        src={song?.photo_url ? song.photo_url : "Not selected"}
        className="footer-img"

      />
      );
    }
  }

  return (
    <div className="music-player-footer text-white pt-2 bg-neutral-900">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getFooterImg()}
            <h2 className="font-bold text-white ml-2"> {song?.title ? song.title : "Not selected"}</h2>
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
          <progress
            ref={volumeBarRef}
            className="volume-bar"
            value={volume}
            max={100}
            onClick={handleVolumeBarClick}
            onMouseDown={handleVolumeBarDragStart}
            onMouseMove={handleVolumeBarDrag}
            onMouseUp={handleVolumeBarDragEnd}
          ></progress>
            <MuteButton sound = {sound}></MuteButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;