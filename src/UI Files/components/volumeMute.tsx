import React, { useState, useEffect } from "react";
import { MdVolumeMute, MdVolumeUp } from "react-icons/md";

const MuteButton = ({ sound }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(sound.volume);

  const handleMuteToggle = () => {
    setIsMuted((prevMuted) => !prevMuted);
    setPrevVolume(sound.volume);
    sound.volume = isMuted ? prevVolume : 0;
  };

  useEffect(() => {
    setIsMuted(sound.volume === 0);
  }, [sound.volume]);

  return (
    <button onClick={handleMuteToggle}>
      {isMuted ? <MdVolumeMute size={24} /> : <MdVolumeUp size={24} />}
    </button>
  );
};

export default MuteButton;
