import "../css/app.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/footerControl";
import TopBar from "../components/topBar";
import SongContainer from "../components/songContainer";
import { useSearchState, SearchState } from "../components/searchState";
import { Song } from "../components/songState";
import { FilterState, useFilterState } from "../components/filterState";
import { useLocation } from "react-router-dom";
import { User } from "../components/user";
import PlayList from "../components/playListSection";
import { Playlist, usePlaylistsState, PlaylistsState} from "../components/playlistState";
import PlayListComponent from "../components/playListComponent";



export default function AppLayout() {
  const location = useLocation();
  const [user, setUser] = useState<User>(null);
  const [songs, setSongs] = useState<{ rows: Song[] }>({ rows: [] });
  const [likedSongs, setLikedSongs] = useState<{ rows: Song[] }>({ rows: [] });
  const { search, setSearch }: SearchState = useSearchState()
  const {filter, setFilter} : FilterState = useFilterState(); 
  const [song, setSong] = useState<Song>();
  const [showDropdown, setShowDropdown] = useState<boolean>(true);
  const {playlists, setPlaylists} : PlaylistsState = usePlaylistsState();



useEffect(() => {
  const setUserAsync = async () => {
    const temp_user = location.state?.user;
    try {
      const response = await axios.post("https://alto-server.vercel.app/user/postUser", {
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



const getPlaylists = async () => {
  try {
    const response = await axios.post("https://alto-server.vercel.app/playlist/getPlaylists", { user_id: user.id });
    const playlistsData: Playlist[] = response.data.playlists || [];
    setPlaylists(playlistsData);
  } catch (error) {
    console.error("Error fetching playlists:", error);
  }
};


useEffect(()=>{
  fetchLikedSongs();
  getPlaylists();
  
}, [user?.id]);


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
        const response = await axios.get("https://alto-server.vercel.app/api/getSongs");
        console.log("get");
        return {
          rows: response.data.rows
          }
      } 
      else {
        const response = await axios.post("https://alto-server.vercel.app/api/getSongsSearch",  { searchValue: search, filterValue: filter });
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
    await axios.post("https://alto-server.vercel.app/user/likeSong", {song: song, user: user});
    fetchLikedSongs();
  }

  const fetchLikedSongs = async () => {
    if (user?.id) {
      try {
        const response = await axios.post("https://alto-server.vercel.app/user/getLikedSongs", { user_id: user.id });
        setLikedSongs(response.data);
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    }
  };



  const addSongToPlaylist = async (song_id, playlist_id) =>{
    const response = await axios.post("https://alto-server.vercel.app/playlist/addSong", {song_id:  song_id , playlist_id: playlist_id});
  };

  const handleAddButtonClick = async (song: Song) => {
    await getPlaylists();
    if (filter !== 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(!showDropdown);
    }
  };



  const [currPlaylist, setCurrPlaylist] = useState<Playlist>();
  const [currPlaylistSongs, setCurrPlaylistSongs] = useState<{ rows: Song[] }>({ rows: [] });
  const onPlaylistPlay = async (playlist_id: number) => {
    try {
      if (playlist_id) {
        // Fetch playlist
        const playlistResponse = await axios.post("https://alto-server.vercel.app/playlist/getPlaylistByID", { playlist_id: playlist_id });
        setCurrPlaylist(playlistResponse.data.playlist);
        console.log(currPlaylist);
  
        // Fetch songs
        const songsResponse = await axios.post("https://alto-server.vercel.app/playlist/getSongsFromPlaylist", { playlist_id: playlist_id });
        setCurrPlaylistSongs({ rows: songsResponse.data.songs });
        console.log(currPlaylistSongs.rows);
      }
    } catch (error) {
      console.error("Error fetching playlist or songs:", error);
    }
  };

  const onPlaylistsChange = async () =>{
    await getPlaylists();
  };

  return (
    <div>
      <TopBar children onSearchSubmit={handleSearchSubmit} onFilterSubmit={handleFilterSubmit}/>
    <div className = "flex flex-row h-screen m-2">
      <div className = "basis-1/5">
        <PlayList user_id = {user?.id} onPlaylistPlay = {onPlaylistPlay} onPlaylistsChange = {onPlaylistsChange}/>
      </div>
      
      <div className="scrollable-content">
      {(currPlaylist !== undefined) ? (
          
          <div className=" bg-black scrollable-content">
          <h1 className="text-xl text-white font-bold pt-2 ml-2">{currPlaylist.playlist_name}</h1>
          <div className="container p-4 w-100vh items-center">
            <div className="song-container-wrapper">
            { currPlaylistSongs.rows && currPlaylistSongs.rows.map((song, index) => {
                  return (
                    <div className="song-container" key={index}>
                      <SongContainer
                        title={song.title}
                        author={song.author}
                        duration={song.duration}
                        photo_url={song.photo_url}
                        song_url={song.song_url}
                        id = {song.id}
                        playlistsProp={playlists}
                        class_year={song.class_year}
                        onPlayButtonClick={handlePlayButtonClick}
                        onLikeButtonClick={handleLikeButtonClick}
                        onPlayListClick={handleAddButtonClick}
                      />
                    </div>
                  );
              })}
            </div>
          </div>
        </div>

        ) : (null)
        } 
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
                      playlistsProp={playlists}
                      onPlayButtonClick={handlePlayButtonClick}
                      onLikeButtonClick={handleLikeButtonClick}
                      onPlayListClick={handleAddButtonClick}
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
        {search === '' && likedSongs.rows.length>0 ? (
      <div className=" bg-black scrollable-content">
        <h1 className="text-xl text-white font-bold pt-2 ml-2">Liked Songs</h1>
        <div className="container p-4 w-100vh items-center">
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
                      playlistsProp={playlists}
                      class_year={song.class_year}
                      onPlayButtonClick={handlePlayButtonClick}
                      onLikeButtonClick={handleLikeButtonClick}
                      onPlayListClick={handleAddButtonClick}
                    />
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    ) : null}


      {/* <div className=" bg-black scrollable-content">
        <h1 className="text-xl text-rose-500 font-bold pt-2 ml-2">Playlist name</h1>
        <div className="container p-4 w-100vh items-center">
          <div className="song-container-wrapper mb-10">
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
                      playlistsProp={playlists}
                      class_year={song.class_year}
                      onPlayButtonClick={handlePlayButtonClick}
                      onLikeButtonClick={handleLikeButtonClick}
                      onPlayListClick={handleAddButtonClick}
                    />
                  </div>
                );
            })}
          </div>
        </div>
      </div> */}
        </div>
      </div>
        <div className="fixed bottom-0 w-full">
        <Footer picked_song={song} songs={songs.rows} />
      </div>
    </div>
  );
}