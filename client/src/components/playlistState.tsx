import { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
export interface Playlist {
    user_id: number | string;
    playlist_id?: number | string;
    playlist_name?: string;
  }
  

  export interface PlaylistsState {
    playlists: Playlist[];
    setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  }
  
  export const usePlaylistsState = (): PlaylistsState => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    return { playlists, setPlaylists };

  };

