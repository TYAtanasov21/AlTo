// TopBar.tsx
import React, { useMemo, FormEvent, useState } from "react";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import TopBarItem from "./TopBarItem";
import { useSearchState } from "./searchState";
import { useFilterState } from "./filterState";

interface TopBarProps {
  children: React.ReactNode;
  onSearchSubmit: (search: string) => void;
  onFilterSubmit: (filter: number) => void;
}

const TopBar: React.FC<TopBarProps> = ({ children, onSearchSubmit, onFilterSubmit }) => {
  const { search, setSearch } = useSearchState();
  const {filter, setFilter} = useFilterState();


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
      <div className="flex justify-between w-full">
        <div>
          {choices.map((item) => ( 
            <TopBarItem key={item.label} {...item} />
          ))}
          </div>
          <div>
          <form onSubmit={(event) => {
            event.preventDefault();
            onSearchSubmit(search);
            onFilterSubmit(filter);
          }}> 
           <input
              type="text"
              name="search"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white"
              id="searchbar"
              placeholder="🔍 Search"
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
          <div>
          <form>
            <label htmlFor="filter" className="text-white items-center">
              <select
                name="class"
                id="filter"
                className="text-center w-full ml-2 px-3 py-2 rounded-md focus:outline-none focus:border-neutral-600 bg-neutral-800 text-white appearance-none"
                value={filter}
                onChange={(event) => {
                  const inputValue = event.target.value;
                  setFilter(parseInt(inputValue));

                  if (parseInt(inputValue, 10) === 0) {
                    onFilterSubmit(0);
                  } else {
                    onFilterSubmit(parseInt(inputValue, 10));
                  }
                }}
              >
                <option value="0">Every</option>
                <option value="1">1 Клас</option>
                <option value="2">2 Клас</option>
                <option value="3">3 Клас</option>
                <option value="4">4 Клас</option>
                <option value="5">5 Клас</option>
                <option value="6">6 Клас</option>
                <option value="7">7 Клас</option>
                <option value="8">8 Клас</option>
                <option value="9">9 Клас</option>
                <option value="10">10 Клас</option>
                <option value="11">11 Клас</option>
                <option value="12">12 Клас</option>
              </select>
            </label>
          </form>
          </div>
        </div>
        <div className="text-white">{children}</div>
    </Box>
  );
};

export default TopBar;
