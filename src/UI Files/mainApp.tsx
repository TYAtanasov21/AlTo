import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer, {Song} from "./footerControl";
import TopBar from "./components/TopBar";
import SongContainer from "./components/songContainer";
import "../css/app.css";
import { useSearchState, SearchState } from "./components/searchState";


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [songs, setSongs] = useState<{ rows: Song[] }>({ rows: [] });
  const { search, setSearch }: SearchState = useSearchState(); // Corrected destructuring

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

  return (
    <div id = "root" className="flex flex-col">
      <TopBar children onSearchSubmit={handleSearchSubmit}/>
      <div className = "scrollable-content">
      <div className="flex-1 bg-black">
        <h1 className="text-xl text-white font-bold pt-2">Recommended songs</h1>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {songs.rows.map((song, index) => (
              <SongContainer
                key={index}
                title={song.title}
                author={song.author}
                duration={`${song.duration}`}
                image={song.photo_url}
                sourceLink={song.song_url}
              />
            ))}
          </div>
        </div>
        </div>
        <div className="flex-1 bg-black overflow-y-auto">
        <h1 className="text-xl text-white font-bold pt-2">Recommended songs</h1>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {songs.rows.map((song, index) => (
              <SongContainer
                key={index}
                title={song.title}
                author={song.author}
                duration={`${song.duration}`}
                image={song.photo_url}
                sourceLink={song.song_url}
              />
            ))}
          </div>
        </div>
        </div>
        <div className="flex-1 bg-black overflow-y-auto">
        <h1 className="text-xl text-white font-bold pt-2">Recommended songs</h1>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {songs.rows.map((song, index) => (
              <SongContainer
                key={index}
                title={song.title}
                author={song.author}
                duration={`${song.duration}`}
                image={song.photo_url}
                sourceLink={song.song_url}
              />
            ))}
          </div>
        </div>
        </div>
        </div>
        <div className="fixed bottom-0 w-full">
        <Footer songs={songs} />
      </div>
    </div>
  );
}