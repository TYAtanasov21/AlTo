import React from 'react'
// import Heading from '../Heading'
import Footer from './footerControl'
import TopBar from './components/TopBar';
import "../css/app.css"


export default function AppLayout({children}: {children:React.ReactNode}) {
    
const audioFileUrl = "https://altosongstorage.blob.core.windows.net/songs/MBT%20-%20SUJALQVAM%20(OFFICIAL%20AUDIO).mp3?sp=r&st=2024-02-12T07:01:16Z&se=2024-02-12T15:01:16Z&spr=https&sv=2022-11-02&sr=b&sig=UmHjOL6ElYzLALq07xROCoWvknI9mINM62TetrhzSk8%3D"; // Replace with your Azure Blob Storage URL
  
  const sound = new Audio();
  sound.src = audioFileUrl;
    return (
        <div>
            <TopBar>{children}</TopBar>
            <div className = "bg-black-900">
            <Footer sound={sound}></Footer>
            </div>
        </div>
    )
};