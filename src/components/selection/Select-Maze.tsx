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
import { animateMaze } from "@/animations/animateMaze";
import { generateGrid } from "@/lib/utils/generateGrid";
import { useRunning } from "@/store/use-running";

type Props = {
  setGrid: (grid: React.SetStateAction<GridType>) => void;
};

export const SelectMaze = ({ setGrid }: Props) => {

  const [selectedMaze, setSelectedMaze] = useState<MazeSelection>(null);
  const [mazeTrigger, setMazeTrigger] = useState(0);

  const { isRunning, setIsRunning } = useRunning();

  useEffect(() => {
    if(isRunning) return;
    const run = async () => {
      switch (selectedMaze) {
        case "Recursive Division":
          setIsRunning(true);
          setGrid(generateGrid());
          const mazeConstructionPath = recursiveDivision();
          await animateMaze(mazeConstructionPath, setGrid);
          setIsRunning(false);
          break;
        
        default:
          break;
      }
    }
    run();
  },[mazeTrigger]);

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
            className="dark:text-indigo-500 px-3 py-2 text-sm cursor-pointer "
            onSelect={() => {setSelectedMaze(maze as MazeSelection); setMazeTrigger(prev => prev + 1)}}
          >
            {maze}
          </DropdownMenuItem>

        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
