import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import axios from "axios";

interface Playlist {
  userId: string; 
}

const PlayList: React.FC<Playlist> = ({
    userId
}) => {
  const [addPlaylist, setAddPlaylist] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>("");

  const handleAddPlaylist = () => {
    setAddPlaylist(!addPlaylist);
  };

  const handlePlaylistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };



  const handleAddPlaylistSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/playlist/createPlaylist", {
        user_id: userId,
        playlist_name: playlistName
      });
      setAddPlaylist(false);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error adding playlist:", error);
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
         <form onSubmit={handleAddPlaylistSubmit}>
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
    </div>
  );
};

export default PlayList;