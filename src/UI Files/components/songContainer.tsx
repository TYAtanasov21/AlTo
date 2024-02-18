import React from "react";
import Box from "./Box";
import { Song } from "./songState";

interface SongContainerProps {
  title: string;
  author: string;
  duration: number;
  photo_url: string;
  song_url: string;
  class_year: number;
  onPlayButtonClick: (song: Song) => void;
}

const SongContainer: React.FC<SongContainerProps> = ({
  title,
  author,
  duration,
  photo_url,
  song_url,
  class_year,
  onPlayButtonClick,
}: SongContainerProps) => {
  const handlePlayButtonClick = () => {
    const song: Song = {
      title,
      author,
      duration,
      photo_url,
      song_url,
      class_year,
    };
    onPlayButtonClick(song);
  };


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };
  
  return (
    <Box isSongContainer>
      <div className="flex flex-col">
        <img src={photo_url} alt={`${title} cover`} className="w-full h-40 object-cover rounded-md mb-2" />
        <div className="text-white">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-400">{author}</p>
          <p className="text-gray-400">{formatTime(duration)}</p>
          <button
            onClick={handlePlayButtonClick}
            className="mt-2 bg-neutral-700 text-white px-3 py-1 rounded-md hover:bg-neutral-500 focus:outline-none focus:ring focus:border-blue-300"
          >
            Play
          </button>
        </div>
      </div>
    </Box>
  );
};

export default SongContainer;
