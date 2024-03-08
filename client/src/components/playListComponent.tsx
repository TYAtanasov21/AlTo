import React from "react";

interface PlayListComponent{
    name: string;
    userID: string | number;
};

const PlayListComponent: React.FC<PlayListComponent> = ({
    name,
    userID
}) => {
    
    return(
        <div className= "text-white flex flex-col">
            <h1>{name}</h1>
            <h3>{userID}</h3>
        </div>
    );
}

export default PlayListComponent;