import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer, {Song} from "./footerControl";
import TopBar from "./components/TopBar";
import SongContainer from "./components/songContainer";
import "../css/app.css";

const getSongs = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/getSongs");
    return { rows: response.data.rows }; // Assuming response.data is an array of songs
  } catch (error) {
    console.error("Error fetching songs:", error);
    return { rows: [] };
  }
};
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [songs, setSongs] = useState<{ rows: Song[] }>({ rows: [] });

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsData = await getSongs();
        setSongs(songsData);
        console.log("songs.rows:", songs.rows);

      } catch (error) {
        console.error("Error setting songs:", error);
        // Handle the error as needed
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar children />
      <div className="flex-1 bg-black">
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
      <div className="fixed bottom-0 w-full">
        <Footer songs={songs} />
      </div>
    </div>
  );
}
