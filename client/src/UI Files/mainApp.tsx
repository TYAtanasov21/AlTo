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
import { User } from "./components/user";





export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [user, setUser] = useState<User>(null);
  const [songs, setSongs] = useState<{ rows: Song[] }>({ rows: [] });
  const [likedSongs, setLikedSongs] = useState<{ rows: Song[] }>({ rows: [] });
  const { search, setSearch }: SearchState = useSearchState()
  const {filter, setFilter} : FilterState = useFilterState(); 
  const [song, setSong] = useState<Song>();

useEffect(() => {
  const setUserAsync = async () => {
    const temp_user = location.state?.user;
    try {
      const response = await axios.post("http://localhost:5000/api/postUser", {
        email: temp_user.email,
        password: temp_user.password
      });
      setUser(response.data as User);
      console.log(user);
    } catch (error) {
      console.error("Error setting user:", error.response?.data || error.message);
    }
  };



  setUserAsync();
}, []);
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

  const handleLikeButtonClick = async (song: Song) => {
    await axios.post("http://localhost:5000/api/likeSong", {song: song, user: user});
  }


  useEffect(() => {
    const fetchLikedSongs = async () => {
      if (user?.id) {
        try {
          const response = await axios.post("http://localhost:5000/api/getLikedSongs", { user_id: user.id });
          setLikedSongs(response.data);
        } catch (error) {
          console.error("Error fetching liked songs:", error);
        }
      }
    };
  
    fetchLikedSongs();
  }, [user?.id, likedSongs.rows]);
  return (
    <div id = "root" className="flex flex-col">
      <TopBar children onSearchSubmit={handleSearchSubmit} onFilterSubmit={handleFilterSubmit}/>
      {search === '' && likedSongs.rows.length>0 ? (
      <div className="flex-1 bg-black scrollable-content">
        <h1 className="text-xl text-white font-bold pt-2 ml-2">Liked Songs</h1>
        <div className="container p-4 w-100vh">
          <div className="song-container-wrapper">
          { likedSongs.rows && likedSongs.rows.map((song, index) => {
                return (
                  <div className="song-container" key={index}>
                    <SongContainer
                      title={song.title}
                      author={song.author}
                      duration={song.duration}
                      photo_url={song.photo_url}
                      song_url={song.song_url}
                      id = {song.id}
                      class_year={song.class_year}
                      onPlayButtonClick={handlePlayButtonClick}
                      onLikeButtonClick={handleLikeButtonClick}
                    />
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    ) : null}
        <div className="flex-1 bg-black scrollable-content">
        <h1 className="text-xl text-white font-bold pt-2 ml-3">Our library</h1>
        {songs.rows.length>0 ? (
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
                      id = {song.id}
                      class_year={song.class_year}
                      onPlayButtonClick={handlePlayButtonClick}
                      onLikeButtonClick={handleLikeButtonClick}
                    />
                  </div>
                );
                })}
            </div>
          </div>
        ) : (
          <div className="items-center justify-center place-self-center">
          <h1 className="text-rose-800 text-xl font-semibold">No found songs</h1>
        </div>
        )}
        </div>
        <div className="fixed bottom-0 w-full">
        <Footer picked_song={song} songs={songs.rows} />
      </div>
    </div>
  );
}