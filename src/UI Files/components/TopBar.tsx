import React, { useMemo } from "react";
import {HiHome} from "react-icons/hi"
import {BiSearch} from "react-icons/bi"
import Box from "./Box";

interface TopBarProps{
    children: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({children}) =>{
    const choice = useMemo(()=> [
        {
            label: "AlTO Music",
            icon: HiHome,
        },
        {
            label: "Search",
            icon: BiSearch,
        }
    ], [])

    return (
        <div className = "flex h-full">
            <div className="
            hidden
            md:flex
            flex-col
            gap-y-2
            bg-black
            h-full
            w-[600px]
            p-2
            ">
                <Box>
                    Topbar box
                </Box> 
            </div>
        </div>
    );
}

export default TopBar;