import React from "react";
import Box from "./Box";
import { Song } from "./songState";

interface SongContainerProps {
  title: string;
  author: string;
  duration: number; // Assuming duration is in the format 'mm:ss'
  photo_url : string;
  song_url : string;
  onPlayButtonClick: (song: Song) => void;
}

const SongContainer: React.FC<SongContainerProps> = ({
  title,
  author,
  duration,
  photo_url,
  song_url,
  onPlayButtonClick,
}: SongContainerProps) => {
  const handlePlayButtonClick = () => {
    const song: Song = {
      title,
      author,
      duration,
      photo_url,
      song_url,
    };
    onPlayButtonClick(song);
  };

  
  return (
    <Box isSongContainer>
      <div className="flex flex-col">
        <img src={photo_url} alt={`${title} cover`} className="w-full h-40 object-cover rounded-md mb-2" />
        <div className="text-white">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-400">{author}</p>
          <p className="text-gray-400">{duration}</p>
          <button onClick={handlePlayButtonClick}>
            Play
          </button>
        </div>
      </div>
    </Box>
  );
};

export default SongContainer;
