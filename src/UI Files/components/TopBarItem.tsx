import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface TopBarItemProps {
  icon: IconType;
  label: string;
}

const TopBarItem: React.FC<TopBarItemProps> = ({ icon, label }) => {
  return (
    <div className={twMerge("flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition-colors text-neutral-400 py-1")}>
      {icon({ size: "1.5em" })}
      <p className="truncate w-full">{label}</p>
    </div>
  );
};

export default TopBarItem;