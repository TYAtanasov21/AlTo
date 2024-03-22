import { useState, Dispatch, SetStateAction } from "react";

export interface Song {
  title: string;
  author: string;
  duration: number;
  song_url: string;
  photo_url: string;
  class_year: number;
  id: number;
}

export interface SongsState {
  songs: Song[];
  setSongs: Dispatch<SetStateAction<Song[]>>;
}

export const useSongsState = (): SongsState => {
  const [songs, setSongs] = useState<Song[]>([]);
  return { songs, setSongs };
};