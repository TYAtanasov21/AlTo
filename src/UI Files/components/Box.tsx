import React from "react";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
  isTopBar?: boolean;
  isSongContainer?: boolean;
}

const Box: React.FC<BoxProps> = ({ children, className, isTopBar, isSongContainer }) => {
  return (
    <div
      className={`
        rounded-lg
        ${isTopBar && !isSongContainer ? "bg-neutral-900" : ""}
        ${isTopBar ? "bg-neutral-900 p-5 w-full" : ""}
        ${isSongContainer ? "bg-neutral-900 p-4" : ""}
        ${className || ""}
      `}
    >
      {children}
    </div>
  );
};

export default Box;
