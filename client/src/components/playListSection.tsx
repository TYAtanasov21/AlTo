import React, { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import axios from "axios";
import PlayListComponent from "./playListComponent";
import { Playlist, usePlaylistsState, PlaylistsState} from "./playlistState";
import { FaTrashAlt } from "react-icons/fa";

interface playlistProps {
  user_id: number | string;
  onPlaylistPlay: (playlist_id: number) => void;
};


const PlayList: React.FC<playlistProps> = ({user_id, onPlaylistPlay}) => {
  const [addPlaylist, setAddPlaylist] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>("");
  const {playlists, setPlaylists} :  PlaylistsState = usePlaylistsState();
  const [removePlaylist, setRemovePlaylist] = useState<boolean>(false);

  const handleAddPlaylist = () => {
    setAddPlaylist(!addPlaylist);
    console.log(removePlaylist);
  };
  
  const handleRemovePlaylist = () => {
    setRemovePlaylist(!removePlaylist);
  }

  const handlePlaylistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  const handleAddPlaylistSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/playlist/createPlaylist", {
        user_id: user_id,
        playlist_name: playlistName,
      });

      setAddPlaylist(false);
      await getPlaylists();
    } catch (error) {
      console.error("Error adding playlist:", error);
    }
  };

  useEffect(()=>{
    getPlaylists();
  }, [user_id]);

  const getPlaylists = async () => {
    try {
      const response = await axios.post("http://localhost:5000/playlist/getPlaylists", { user_id: user_id });
      const playlistsData: Playlist[] = response.data.playlists || [];
      setPlaylists(playlistsData);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };


  return (
    <div className="p-3 h-full rounded-lg bg-neutral-900">
      <div className="flex flex-row justify-between">
        <p className="text-xl text-white font-bold">Playlists</p>
        <div className="text-white bold hover:text-zinc-600 transition:color border-zinc-700">
          <button onClick={handleRemovePlaylist}>
            <FaTrashAlt size="27" />
          </button>
        </div>
        <div className="text-white bold hover:text-zinc-600 transition:color border-zinc-700">
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
              className="mr-2 p-2 rounded-md border border-neutral-400 bg-neutral-600 text-white"
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
      <div>
        {playlists.map((playlist) => (
            <PlayListComponent name={playlist.playlist_name} onPlaylistPlay={onPlaylistPlay} playlist_id={playlist.playlist_id as number}/>
        ))}
        </div>
    </div>
  );
};

export default PlayList;
