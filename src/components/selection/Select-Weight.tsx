import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import type { AlgoSelection, ObstacleSelection } from "@/lib/types";

import { obstacles } from "@/lib/utils/constants";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useObstacle } from "@/store/use-obstacle";
import { useRunning } from "@/store/use-running";

type Props = {
  selectedAlgo: AlgoSelection;
};

export const WeightSelection = ({ selectedAlgo }: Props) => {
  
  const [selectedWeight, setSelectedWeight] = useState<ObstacleSelection>(null);
  const setObstacle = useObstacle(state => state.setObstacle);
  const isRunning = useRunning(state => state.isRunning);

  const isWeighted = 
    selectedAlgo === "A*" ||
    selectedAlgo === "DIJKSTRA"||
    selectedAlgo === "Greedy Best-First-Search";

  useEffect(() => {
    if (!isWeighted) {
      setSelectedWeight(null);  // reset to null when algo changes
      setObstacle("Wall");
    }
  }, [selectedAlgo]);


  const handleChange = (title: ObstacleSelection) => {
    setSelectedWeight(title);
    setObstacle(title);
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger 
        className="focus:outline-none"
        disabled={isRunning}
        asChild
      >
        <Button
          variant="secondary"
          className={`w-full dark:text-neutral-100 dark:bg-neutral-800 rounded shadow-sm bg-transparent dark:border-b dark:border-b-indigo-400 transition
            ${isRunning ? "opacity-50 cursor-not-allowed" : "hover:bg-black/5 dark:hover:bg-zinc-700/50"} 
            transition`}
            disabled={!isWeighted}
        >
          {selectedWeight ? selectedWeight : "Weight"}
          <ChevronDown className="w-5 h-5 ml-auto"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 text-xs space-y-[2px] font-medium border-white/20 border-2 border-t-0">
        
        {obstacles.map((obstacle) => (
          
          <DropdownMenuItem 
          key={obstacle.title}
          className="dark:text-indigo-400 px-3 py-2 text-sm tracking-wider cursor-pointer"
          onSelect={() => handleChange(obstacle.title as ObstacleSelection)}
          >
            {obstacle.title}
            <div className={`h-5 w-5 ${obstacle.color} rounded ml-auto`}/>
            <span className="text-base">{obstacle.weight}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};