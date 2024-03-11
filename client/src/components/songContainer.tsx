import React, { useEffect, useState } from "react";
import Box from "./box";
import { Song } from "./songState";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { Playlist, usePlaylistsState, PlaylistsState} from "./playlistState";
import axios from "axios";

interface SongContainerProps {
  title: string;
  author: string;
  duration: number;
  photo_url: string;
  song_url: string;
  class_year: number;
  id: number;
  playlistsProp: Playlist[],
  onPlayButtonClick: (song: Song) => void;
  onLikeButtonClick: (song: Song) => void;
  onPlayListClick: (song: Song) => void;
}

const SongContainer: React.FC<SongContainerProps> = ({
  title,
  author,
  duration,
  photo_url,
  song_url,
  class_year,
  id,
  playlistsProp,
  onPlayButtonClick,
  onLikeButtonClick,
  onPlayListClick
}: SongContainerProps) => {  
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

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

  const handlePlaylistClick = () => {
    const song: Song = {
      title,
      author,
      duration,
      photo_url,
      song_url,
      class_year,
      id,
    };
    onPlayListClick(song); 
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };
  
  const addSongToPlaylist = async (song_id, playlist_id) =>{
    const response = await axios.post("https://alto-server.vercel.app/playlist/addSong", {song_id:  song_id , playlist_id: playlist_id});
  };


  const renderDropdown = () => {
    return (
            <form>
              <label htmlFor="filter" className="text-white items-center">
                <select
                  name="class"
                  id="playlistSelection"
                  className="text-center w-full ml-2 px-3 py-2 rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white appearance-none"
                  onChange={(event) => {
                    const selectedplaylist_id = parseInt(event.target.value);
                    console.log(playlistsProp[0].playlist_id); 
                    addSongToPlaylist(id, selectedplaylist_id); 
                    handlePlaylistClick();
                  }}
                >
                  <option value="0">Pick a playlist</option>
                  {playlistsProp.map((playlist) => (
                    <option key={playlist.playlist_id} value={playlist.playlist_id}>
                      {playlist.playlist_name}
                    </option>
                  ))}
                </select>
              </label>
            </form>
              );
            };

  return (
    <Box isSongContainer>
      <div className="flex-auto">
        <div className="flex flex-col">
          <img src={photo_url} alt={`${title} cover`} className="w-full h-40 object-cover rounded-md mb-1" />
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
              onClick={() => {handlePlaylistClick(); setShowDropdown(!showDropdown);}}
              className="mt-2 text-white px-3 py-1 hover:text-neutral-700 transition:color"
            >
              <GoPlus size='30' />
            </button>
            <button
              onClick={handleLikeButtonClick}
              className="mt-2 text-white px-3 py-1 hover:text-rose-500 transition:color"
            >
              <IoHeart size="25" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 ">
      <div className={`dropdown ${showDropdown ? 'visible' : 'hidden'}`}>
        {renderDropdown()}
      </div>
      </div>
    </Box>
  );  
};

export default SongContainer;