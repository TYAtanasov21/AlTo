import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface TopBarItemProps {
  icon: IconType;
  label: string;
}

const TopBarItem: React.FC<TopBarItemProps> = ({ icon, label }) => {
  return (
    <div className={twMerge("flex flex-row items-center gap-x-4 font-medium cursor-pointer hover:text-white transition-colors text-neutral-400 ")}>
      {icon({ size: "1.5em" })}
      <p className="truncate w-full">{label}</p>
    </div>
  );
};

export default TopBarItem;