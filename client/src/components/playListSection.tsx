import React, { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import axios from "axios";
import PlayListComponent from "./playListComponent";

interface Playlist {
  userId: number | string;
}

const PlayList: React.FC<Playlist> = ({ userId }) => {
  const [addPlaylist, setAddPlaylist] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [playlists, setPlaylists] = useState<string[]>([]);

  const handleAddPlaylist = () => {
    setAddPlaylist(!addPlaylist);
  };

  const handlePlaylistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  const handleAddPlaylistSubmit = async () => {
      await axios.post("http://localhost:5000/playlist/createPlaylist", {
        user_id: userId,
        playlist_name: playlistName,
      });

      setAddPlaylist(false);
  };

  const getPlaylists = async () => {
    try {
      const response = await axios.post("http://localhost:5000/playlist/getPlaylists", { user_id: userId });
      const playlistsData = response.data.playlists || [];
      setPlaylists(playlistsData);
    } 
    catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };
  return (
    <div className="p-3 h-full rounded-lg bg-neutral-900">
      <div className="flex flex-row justify-between">
        <p className="text-xl text-white font-bold">Playlists</p>
        <div className="text-white bold">
          <button onClick={handleAddPlaylist}>
            <GoPlus size="35" />
          </button>
        </div>
      </div>

      {addPlaylist && (
        <div className="flex justify-end">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddPlaylistSubmit();
            }}
          >
            <input
              type="text"
              placeholder="Enter playlist name"
              value={playlistName}
              onChange={handlePlaylistNameChange}
              className="mr-2 p-2 rounded-md border border-neutral-400  bg-neutral-600 text-white"
            />
            <button
              type="submit"
              className="bg-neutral-600 hover:bg-neutral-500 text-white font-bold py-2 px-3 rounded-md mb-3 mt-2 transition-colors"
            >
              Add Playlist
            </button>
          </form>
        </div>
      )}
      <div className = "flex flex-col">
      <div className = "bg-neutral-500 p-6 justify-start ml-0 mr-auto rounded-md">
      <PlayListComponent name = "playlist 1" userID = {userId}/>
      </div> 
      <PlayListComponent name = "component 2" userID = {userId}/>
      <PlayListComponent name = "component 3" userID = {userId}/>
      <PlayListComponent name = "component 4" userID = {userId}/>
      </div>
    </div>
  );
};

export default PlayList;
