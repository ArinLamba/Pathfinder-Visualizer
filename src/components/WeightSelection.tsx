import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import type { AlgoSelection, ObstacleSelection } from "@/lib/types";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { obstacles } from "@/lib/utils/constants";
import { Button } from "./ui/button";

type Props = {
  selectedAlgo: AlgoSelection;
  setObstacle: (obstacle: ObstacleSelection) => void;
};

export const WeightSelection = ({ setObstacle, selectedAlgo }: Props) => {
  
  const [selectedWeight, setSelectedWeight] = useState<ObstacleSelection>(null);
  const disabled = selectedAlgo !== "DIJKSTRA";

  useEffect(() => {
    if (disabled) {
      setSelectedWeight("Wall");  // reset to wall when algo changes
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
        disabled={disabled}
        asChild
      >
        <Button
          variant="secondary"
          className={`w-full text-neutral-100 rounded font-semibold tracking-wider border-b border-b-indigo-700 transition
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-700/50"} 
            transition`}
            disabled={disabled}
        >
          {selectedWeight ? selectedWeight : "Wall"}
          <ChevronDown className="w-5 h-5 ml-auto"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44 text-xs bg-black space-y-[2px] font-medium border-white/20 border-2 border-t-0">
        
        {obstacles.map((obstacle) => (
          
          <DropdownMenuItem 
          className="text-indigo-400 px-3 py-2 text-sm tracking-wider cursor-pointer focus:bg-neutral-900 focus:text-indigo-500"
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