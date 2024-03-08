import React from "react";
import { FaP, FaPlay } from "react-icons/fa6";

interface PlayListComponent{
    name: string;
};

const PlayListComponent: React.FC<PlayListComponent> = ({
    name
}) => {
    
    return(
        <div className= "flex flex-row text-white bg-neutral-700 p-2 m-1 ml-0 mr-auto rounded-md w-full justify-between">
            <h1 className = "text-lg font-bold">{name}</h1>
            <div className = "hover:text-zinc-800 transition:color border-zinc-800">
            <button><FaPlay size = "28"/></button>
            </div>
        </div>
    );
}

export default PlayListComponent;