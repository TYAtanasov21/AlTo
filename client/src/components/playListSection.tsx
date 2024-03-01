import React from "react";

interface PlayList{
    title: string;
    url: string;
    imageUrl: string;
}


const PlayList: React.FC<PlayList> = () => {
    return(
        <div className = "p-3 h-full rounded-lg bg-neutral-900 flex flex-auto">
        <p className = "text-xl text-white font-bold">Playlists</p>
        <div>
        </div>
        </div>
    );
}

export default PlayList;