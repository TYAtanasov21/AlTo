import React, { useMemo } from "react";
import {HiHome} from "react-icons/hi"
import {BiSearch} from "react-icons/bi"
import Box from "./Box";
import TopBarItem from "./TopBarItem";

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
            gap-y-4
            bg-black
            h-full
            w-3/4
            p-2
            rounded-md
            ">
                <Box>
                    <div className="
                    flex
                    flex-row
                    gap-y-4
                    px-5
                    py-4
                    ">
                        {choice.map((item) => (
                            <TopBarItem
                            key= {item.label}
                            {...item}
                            />
                        ))}
                    </div>
                </Box> 
            </div>
        </div>
    );
}

export default TopBar;