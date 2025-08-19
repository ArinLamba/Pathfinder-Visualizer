import { useState } from "react";
import { ChevronDown } from "lucide-react";

import type { ObstacleSelection } from "@/lib/types";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";


// const obstacles = [
//   { title: "Wall", weight: "0", color: "bg-purple-800" },
//   { title: "Grass", weight: "3", color: "bg-emerald-500"},
//   { title: "Water", weight: "5", color: "bg-blue-500" },
//   { title: "Mountain", weight: "8", color: "bg-slate-400"},
// ];

type Props = {
  setObstacle: (obstacle: ObstacleSelection) => void;
};

export const WeightSelection = ({ setObstacle }: Props) => {
  
  const [selectedWeight, setselectedWeight] = useState<ObstacleSelection>(null);

  const handleChange = (title: ObstacleSelection) => {
    setselectedWeight(title);
    setObstacle(title);
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger 
        className="focus:outline-none"
        asChild
      >
        <button
          className="w-full text-md font-semibold px-3 flex items-center h-9 bg-zinc-800 border-neutral-300 border-b-2 hover:bg-zinc-700/50 transition"
          >
          {selectedWeight ? selectedWeight : "Select Weight"}
          <ChevronDown className="w-5 h-5 ml-auto"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 text-xs border-0 border-zinc-60 shadow-none font-medium bg-black space-y-[2px]">
        <DropdownMenuItem 
          className="text-indigo-400 px-3 py-2 text-sm cursor-pointer focus:bg-black focus:text-indigo-500"
          onSelect={() => handleChange("Wall")}
        >
          Wall
          <div className="h-5 w-5 bg-purple-800 rounded ml-auto"/>
          <span className="text-base">99</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-indigo-400 px-3 py-2 text-sm cursor-pointer focus:bg-black focus:text-indigo-500"
          onClick={() => handleChange("Grass")}  
        >
          Grass
          <div className="h-5 w-5 bg-emerald-500 rounded ml-auto"/>
          <span className="text-base">3</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-indigo-400 px-3 py-2 text-sm cursor-pointer focus:bg-black focus:text-indigo-500"
          onSelect={() => handleChange("Water")}
        >
          Water
          <div className="h-5 w-5 bg-blue-500 rounded ml-auto"/>
          <span className="text-base">5</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-indigo-400 px-3 py-2 text-sm cursor-pointer focus:bg-black focus:text-indigo-500"
          onSelect={() => handleChange("Mountain")}
        >
          Mountain
          <div className="h-5 w-5 bg-slate-400 rounded ml-auto"/>
          <span className="text-base">8</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};