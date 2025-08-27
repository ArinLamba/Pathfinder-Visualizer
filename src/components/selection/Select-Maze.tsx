import { useState } from "react";

import { MAZES } from "@/lib/utils/constants";
import type { GridType, MazeSelection, Position } from "@/lib/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"

import { ChevronDown } from "lucide-react"
import { recursiveDivision } from "@/algorithms/mazes/recursive-division";
import { animateMaze } from "@/animations/animateMaze";
import { generateGrid } from "@/lib/utils/generateGrid";
import { useRunning } from "@/store/use-running";

type Props = {
  setGrid: (grid: React.SetStateAction<GridType>) => void;
};
export const SelectMaze = ({ setGrid }: Props) => {
  
  const [selectedMaze, setSelectedMaze] = useState<MazeSelection>(null);
  
  const { isRunning, setIsRunning } = useRunning();
  
  const handleClick = async (maze: MazeSelection) => {

    if (isRunning) return;
    
    setSelectedMaze(maze);
    setGrid(generateGrid()); // reset grid before drawing maze
    let mazeConstructionPath: Position[] = [];
    
    switch (maze) {
      case "Recursive Division":
        setIsRunning(true);
        mazeConstructionPath = recursiveDivision();
        break;
      case "Vertical Skew":
        setIsRunning(true);
        mazeConstructionPath = recursiveDivision("verticalSkew");
        break;
      case "Horizontal Skew":
        setIsRunning(true);
        mazeConstructionPath = recursiveDivision("horizontalSkew");
        break;
      
      default:
        break;
    }
    await animateMaze(mazeConstructionPath, setGrid);
    setIsRunning(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className="focus:outline-none"
        asChild
      >
        <Button 
          variant="secondary"
          disabled={isRunning}
          className="w-full dark:text-neutral-100  dark:bg-neutral-800 rounded shadow-sm bg-trnasparent dark:border-b dark:border-b-indigo-400 hover:bg-black/5 dark:hover:bg-zinc-700/50 transition"
        >
          {selectedMaze ? selectedMaze : "Maze and Patterns"}
          <ChevronDown className="w-5 h-4 ml-auto"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 text-xs space-y-[2px] font-medium border-white/20 border-2 border-t-0">
        {MAZES.map((maze) => (

          <DropdownMenuItem
            key={maze}
            className="dark:text-indigo-500 px-3 py-2 text-sm cursor-pointer "
            onClick={() => handleClick(maze as MazeSelection)}
          >
            {maze}
          </DropdownMenuItem>

        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
