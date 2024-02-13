// AppLayout.tsx
import React from "react";
import Footer from "./footerControl";
import TopBar from "./components/TopBar";
import SongContainer from "./components/songContainer";
import "../css/app.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const audioFileUrl = "https://altosongstorage.blob.core.windows.net/songs/MBT%20-%20SUJALQVAM%20(OFFICIAL%20AUDIO).mp3?sp=r&st=2024-02-12T19:03:27Z&se=2024-02-13T03:03:27Z&spr=https&sv=2022-11-02&sr=b&sig=Fj%2Bsb2STuPUOljsYEzLhFXpujwYBexdVbyBs%2FpOtjK0%3D";

  const sound = new Audio();
  sound.src = audioFileUrl;

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar children/>
      <div className="flex-1 bg-black">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <SongContainer
              title="Song Title 1"
              artist="Artist 1"
              label="Label 1"
              duration="03:45"
              image="https://picsum.photos/200"
              sourceLink="https://example.com/song1"
            />
            <SongContainer
              title="Song Title 2"
              artist="Artist 2"
              label="Label 2"
              duration="04:30"
              image="https://picsum.photos/200"
              sourceLink="https://example.com/song2"
            />
            {/* Add more SongContainers as needed */}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer sound={sound} />
      </div>
    </div>
  );
}
