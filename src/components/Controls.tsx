import { useState } from 'react';

import type { AlgoSelection, GridType } from '@/lib/types';
import { clearTerrains, clearVisitedAndPath, clearWallsAndWeight } from '@/lib/utils/generateGrid';

import { WeightSelection } from './selection/Select-Weight';
import { SelectAlgo } from './selection/Select-Algo';
import { Button } from './ui/button';

import { SelectMaze } from './selection/Select-Maze';
import { ModeToggle } from './ui/mode-toggle';
import { Tutorial } from './Tutorial';

import { useRunning } from "@/store/use-running"
import { useAlgorithm } from '@/store/use-algorithm';


type Props = {
  grid: GridType;
  setGrid: (grid: React.SetStateAction<GridType>) => void;
  onReset: () => void;
  setVisualizerTrigger: (num: React.SetStateAction<number>) => void;
};

export const Controls = ({ 
  grid,
  setGrid,
  onReset, 
  setVisualizerTrigger,
}: Props) => {

  const [selectedAlgo, setSelectedAlgo] = useState<AlgoSelection>(null);

  const isRunning = useRunning((state) => state.isRunning);
  const setAlgo = useAlgorithm((state) => state.setAlgo);

  const handleVisualize = () => {
    if(!selectedAlgo || isRunning) return;

    const isWeighted = 
      selectedAlgo === "A*" || 
      selectedAlgo === "DIJKSTRA" || 
      selectedAlgo === "Greedy Best-First-Search";
      
    if(isWeighted) {
      const newGrid = clearVisitedAndPath(grid);
      setGrid(newGrid);
    }else {
      const newGrid = clearTerrains(grid);
      setGrid(newGrid);
    }

    setVisualizerTrigger(prev => prev + 1);
    setAlgo(selectedAlgo);
    
  };

  const handleClearBoard = () => {
    setSelectedAlgo(null);
    setAlgo(null);
    onReset();
  };

  const handleClearPath = () => {
    const newGrid = clearVisitedAndPath(grid);
    setGrid(newGrid);
  };

  const handleClearWallsWeights = () => {
    const newGrid = clearWallsAndWeight(grid);
    setGrid(newGrid);
  };

  return (
    <header className="w-full flex z-50 px-4 py-2 shadow-md dark:text-neutral-100 bg-zinc-50 dark:bg-neutral-900">
      {/* Side bar goes here if ever needed in future */}
      <div className="lg:max-w-[1650px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold flex items-center gap-x-3 flex-shrink-0">
          <img src="/Logo.png" alt="logo" className='size-5'/> Pathfinding Visualizer
          <Tutorial />
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <ModeToggle />
          
          {/* Custom Maze Select */}
          <div className="relative inline-block w-44">
            <SelectMaze setGrid={setGrid}/>
          </div>
          
          {/* Weight Selection */}
          <div className="w-44 relative inline-block">
            {<WeightSelection 
              selectedAlgo={selectedAlgo}
            />}
          </div>

          {/* Custom Algorithm Select */}
          <div className="relative inline-block w-44">
            <SelectAlgo 
              selectedAlgo={selectedAlgo} 
              setSelectedAlgo={setSelectedAlgo}
            />
          </div>
          
          {/* Visualize Button */}
          <Button
            variant={"visualize"}
            className="tracking-wide rounded"
            disabled={isRunning}
            onClick={handleVisualize}
          >
            {selectedAlgo ? `Visualize ${selectedAlgo}!` : 'Select an Algorithm'}
          </Button>

          {/* Reset Button */}
          <Button variant="ghost"
            disabled={isRunning}
            onClick={handleClearBoard}
          >
            Clear Board
          </Button>
          <Button 
            variant={"ghost"}
            disabled={isRunning}
            onClick={handleClearWallsWeights}
          >
            Clear Walls & Weights
          </Button>

          <Button 
            variant={"ghost"} 
            disabled={isRunning}
            onClick={handleClearPath}
          >
            Clear Path
          </Button>

        </div>
      </div>
    </header>
  );
};
