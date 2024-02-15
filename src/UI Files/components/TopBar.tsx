// TopBar.tsx
import React, { useMemo, FormEvent, useState } from "react";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import TopBarItem from "./TopBarItem";
import { useSearchState } from "./searchState";

interface TopBarProps {
  children: React.ReactNode;
  onSearchSubmit: (search: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ children, onSearchSubmit }) => {
  const { search, setSearch } = useSearchState();

  const choices = useMemo(
    () => [
      {
        label: "AlTO Music",
        icon: HiHome,
      },
    ],
    []
  );

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Box isTopBar>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex gap-4">
          {choices.map((item) => ( 
            <TopBarItem key={item.label} {...item} />
          ))}
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              name="search"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white"
              id="searchbar"
              placeholder="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                if(event.target.value.trim() === "")
                 onSearchSubmit('');
                else onSearchSubmit(event.target.value);
              }}
            />
          </form>
        </div>
        <div className="text-white">{children}</div>
      </div>
    </Box>
  );
};

export default TopBar;
