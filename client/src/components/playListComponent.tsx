import React from "react";

interface PlayListComponent{
    name: string;
};

const PlayListComponent: React.FC<PlayListComponent> = ({
    name}) => {
    
    return(
        <div className= "text-white flex flex-col">
            <h1>{name}</h1>
        </div>
    );
}

export default PlayListComponent;