// TopBar.tsx
import React, {useMemo} from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import TopBarItem from "./TopBarItem";

interface TopBarProps {
  children: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ children }) => {
  const choices = useMemo(
    () => [
      {
        label: "AlTO Music",
        icon: HiHome,
      },
      {
        label: "Search",
        icon: BiSearch,
      },
    ],
    []
  );

  return (
    <Box isTopBar>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex gap-4">
          {choices.map((item) => (
            <TopBarItem key={item.label} {...item} />
          ))}
        </div>
        <div className="text-white">{children}</div>
      </div>
    </Box>
  );
};

export default TopBar;
