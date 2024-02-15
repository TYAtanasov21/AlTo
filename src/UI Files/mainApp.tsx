import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./footerControl";
import TopBar from "./components/TopBar";
import SongContainer from "./components/songContainer";
import "../css/app.css";
import { useSearchState, SearchState } from "./components/searchState";
import { Song } from "./components/songState";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [songs, setSongs] = useState<{ rows: Song[] }>({ rows: [] });
  const { search, setSearch }: SearchState = useSearchState(); // Corrected destructuring
  const [song, setSong] = useState<Song>();
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsData = await getSongs();
        setSongs(songsData);
      } catch (error) {
        console.error("Error setting songs:", error);
      }
    };

    fetchSongs();
  }, [search]);

  const getSongs = async () => {
    console.log(search);
    try {
      if(search === ''){
        const response = await axios.get("http://localhost:5000/api/getSongs");
        console.log("get");
        return {
          rows: response.data.rows
          }; // Assuming response.data is an array of songs
      } 
      else {
        const response = await axios.post("http://localhost:5000/api/getSongsSearch",  { searchValue: search });
        console.log("post");
        console.log(search);
        return {
          rows: response.data.rows
          }; // Assuming response.data is an array of songs
      }
  }catch (error)
     {
      console.error("Error fetching songs:", error);
      return { rows: [] };
    }
  };

  const handleSearchSubmit = (newSearchTerm: string) => {
    setSearch(newSearchTerm);
  };

  const handlePlayButtonClick = (song: Song) => {
    setSong(song);
    console.log("Play button clicked for:", song);
  };

  return (
    <div id = "root" className="flex flex-col">
      <TopBar children onSearchSubmit={handleSearchSubmit}/>
      <div className="flex-1 bg-black scrollable-content">
        <h1 className="text-xl text-white font-bold pt-2">Recommended songs</h1>
        <div className="container p-4 w-100vh">
          <div className="song-container-wrapper">
            {songs.rows.map((song, index) => (
              <div className = "song-container" key = {index}>
              <SongContainer
                title={song.title}
                author={song.author}
                duration={song.duration}
                photo_url={song.photo_url}
                song_url={song.song_url}
                onPlayButtonClick={handlePlayButtonClick}
              />
              </div>
            ))}
          </div>
        </div>
        </div>
        <div className="fixed bottom-0 w-full">
        <Footer song={song} />
      </div>
    </div>
  );
}