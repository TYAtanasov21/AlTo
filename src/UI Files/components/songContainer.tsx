import React, { useState } from "react";
import Box from "./Box";
import { Song } from "./songState";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

interface SongContainerProps {
  title: string;
  author: string;
  duration: number;
  photo_url: string;
  song_url: string;
  class_year: number;
  id: number;
  onPlayButtonClick: (song: Song) => void;
  onLikeButtonClick: (song: Song) => void;
}

const SongContainer: React.FC<SongContainerProps> = ({
  title,
  author,
  duration,
  photo_url,
  song_url,
  class_year,
  id,
  onPlayButtonClick,
  onLikeButtonClick,
}: SongContainerProps) => {  
  const handlePlayButtonClick = () => {
    const song: Song = {
      title,
      author,
      duration,
      photo_url,
      song_url,
      class_year,
      id,
    };
    onPlayButtonClick(song);
  };
  const handleLikeButtonClick = () => {
    const song: Song = {
      title,
      author,
      duration,
      photo_url,
      song_url,
      class_year,
      id,
    };
    onLikeButtonClick(song);
  };


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };
  
  return (
    <Box isSongContainer>
      <div className="flex-auto">
        <div className="flex flex-col">
          <img src={photo_url} alt={`${title} cover`} className="w-full h-40 object-cover rounded-md mb-2" />
        </div>
        <div className="text-white text-left">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-400">{author}</p>
          <p className="text-gray-400">{formatTime(duration)}</p>
          <div className="flex justify-between">
            <button
              onClick={handlePlayButtonClick}
              className="mt-2 bg-neutral-700 text-white px-3 py-1 rounded-md hover:bg-neutral-500 focus:outline-none focus:ring focus:border-blue-300"
            >
              Play
            </button>
            <button
              onClick={handleLikeButtonClick}
              className="mt-2 text-white px-3 py-1 hover:text-rose-500 transition:color"
            >
              <IoHeart size = "25"/>
            </button>
          </div>
        </div>
      </div>
    </Box>
  );  
};

export default SongContainer;
