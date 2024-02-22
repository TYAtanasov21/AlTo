import { useState, Dispatch, SetStateAction } from "react";

export interface SearchState {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const useSearchState = (): SearchState => {
  const [search, setSearch] = useState('');
  return { search, setSearch };
};