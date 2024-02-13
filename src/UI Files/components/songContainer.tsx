import React from "react";
import Box from "./Box";

interface SongContainerProps {
  title: string;
  artist: string;
  label: string;
  duration: string; // Assuming duration is in the format 'mm:ss'
  image: string;
  sourceLink: string;
}

const SongContainer: React.FC<SongContainerProps> = (props: SongContainerProps) => {
  return (
    <Box isSongContainer>
      <div className="flex flex-col">
        <img src={props.image} alt={`${props.title} cover`} className="w-full h-40 object-cover rounded-md mb-2" />
        <div className="text-white">
          <h3 className="text-lg font-semibold">{props.title}</h3>
          <p className="text-gray-400">{props.artist}</p>
          <p className="text-gray-400">{props.label}</p>
          <p className="text-gray-400">{props.duration}</p>
          <a href={props.sourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Source Link
          </a>
        </div>
      </div>
    </Box>
  );
};

export default SongContainer;
