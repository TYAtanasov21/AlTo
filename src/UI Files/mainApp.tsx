import "../css/app.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./footerControl";
import TopBar from "./components/TopBar";
import SongContainer from "./components/songContainer";
import { useSearchState, SearchState } from "./components/searchState";
import { Song } from "./components/songState";
import { FilterState, useFilterState } from "./components/filterState";
import { useLocation } from "react-router-dom";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const user = location.state?.user;
  const [songs, setSongs] = useState<{ rows: Song[] }>({ rows: [] });
  const { search, setSearch }: SearchState = useSearchState()
  const {filter, setFilter} : FilterState = useFilterState();
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
  }, [search, filter]);

  const getSongs = async () => {
    console.log(search);
    try {
      if(search === '' && filter == 0){
        const response = await axios.get("http://localhost:5000/api/getSongs");
        console.log("get");
        return {
          rows: response.data.rows
          }
      } 
      else {
        const response = await axios.post("http://localhost:5000/api/getSongsSearch",  { searchValue: search, filterValue: filter });
        console.log("post");
        return {
          rows: response.data.rows
          };
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

  const handleFilterSubmit = (newFilter: number) => {
    setFilter(newFilter);
  }

  const handlePlayButtonClick = (song: Song) => {
    setSong(song);
    console.log("Play button clicked for:", song);
  };



  return (
    <div id = "root" className="flex flex-col">
      <TopBar children onSearchSubmit={handleSearchSubmit} onFilterSubmit={handleFilterSubmit}/>
      {search === '' ? (
      <div className="flex-1 bg-black scrollable-content">
        <h1 className="text-xl text-white font-bold pt-2">Recommended songs</h1>
        <div className="container p-4 w-100vh">
          <div className="song-container-wrapper">
            {songs.rows.map((song, index) => {
              if (index < 4) {
                return (
                  <div className="song-container" key={index}>
                    <SongContainer
                      title={song.title}
                      author={song.author}
                      duration={song.duration}
                      photo_url={song.photo_url}
                      song_url={song.song_url}
                      class_year={song.class_year}
                      onPlayButtonClick={handlePlayButtonClick}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    ) : null}
        <div className="flex-1 bg-black scrollable-content">
        <h1 className="text-xl text-white font-bold pt-2">Our library</h1>
          <div className="container p-4 w-100vh">
            <div className="song-container-wrapper mb-12">
            {songs.rows.map((song, index) => {
                return (
                  <div className="song-container" key={index}>
                    <SongContainer
                      title={song.title}
                      author={song.author}
                      duration={song.duration}
                      photo_url={song.photo_url}
                      song_url={song.song_url}
                      class_year={song.class_year}

                      onPlayButtonClick={handlePlayButtonClick}
                    />
                  </div>
                );
                })}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 w-full">
        <Footer picked_song={song} songs={songs.rows} />
      </div>
    </div>
  );
}