import React, {useState, useEffect} from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaP, FaPlay } from "react-icons/fa6";

interface PlayListComponent{
    playlist_id: number;
    name: string;
    onPlaylistPlay : (playlist_id: number) => void;
    onPlaylistDelete : (playlist_id: number) => void;
    removePlaylist : boolean;
};

const PlayListComponent: React.FC<PlayListComponent> = ({
    playlist_id,
    name,
    onPlaylistPlay,
    onPlaylistDelete,
    removePlaylist
}) => {
   
    useEffect(()=>{
        console.log(removePlaylist);
    });


    return(
        <div className= "flex flex-row text-white bg-neutral-700 p-2 m-1 ml-0 mr-auto rounded-md w-full justify-between">
            <h1 className = "text-lg font-bold">{name}</h1>
            <div className = "hover:text-zinc-800 transition:color border-zinc-800">
            {!removePlaylist ? (
            <button onClick={()=>{onPlaylistPlay(playlist_id)}}><FaPlay size = "28"/></button>
            ) : (
            <button onClick={()=>{onPlaylistDelete(playlist_id)}}><FaTrashAlt size = "28"/></button>
            )}
            </div>
        </div>
    );
}

export default PlayListComponent;