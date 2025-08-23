import { useEffect, useState } from "react";

import { MAZES } from "@/lib/utils/constants";
import type { GridType, MazeSelection } from "@/lib/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"

import { ChevronDown } from "lucide-react"
import { recursiveDivision } from "@/algorithms/mazes/recursive-division";

type Props = {
  grid: GridType;
  setGrid: (grid: React.SetStateAction<GridType>) => void;
};

export const SelectMaze = ({ grid, setGrid }: Props) => {

  const [selectedMaze, setSelectedMaze] = useState<MazeSelection>(null);

  useEffect(() => {
    switch (selectedMaze) {
      case "Recursive Division":
        const newGrid = recursiveDivision(grid);
        setGrid(newGrid);
        break;
    
      default:
        break;
    }
  },[selectedMaze]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className="focus:outline-none"
        asChild
      >
        <Button 
          variant="secondary"
          className="w-full dark:text-neutral-100 dark:bg-neutral-800 rounded shadow-sm bg-trnasparent dark:border-b dark:border-b-indigo-400 hover:bg-black/5 dark:hover:bg-zinc-700/50 transition"
        >
          {selectedMaze ? selectedMaze : "Maze and Patterns"}
          <ChevronDown className="w-5 h-4 ml-auto"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 text-xs space-y-[2px] font-medium border-white/20 border-2 border-t-0">
        {MAZES.map((maze) => (

          <DropdownMenuItem
            className="dark:text-indigo-500 px-3 py-2 text-sm cursor-pointer "
            onSelect={() => setSelectedMaze(maze as MazeSelection)}
          >
            {maze}
          </DropdownMenuItem>

        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
