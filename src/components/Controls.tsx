import { useState } from 'react';

import type { AlgoSelection, NodeAttributes, ObstacleSelection } from '@/lib/types';
import { clearTerrains, clearVisitedAndPath, clearWallsAndWeight } from '@/lib/utils/generateGrid';

import { WeightSelection } from './WeightSelection';
import { SelectAlgo } from './SelectAlgo';
import { Button } from './ui/button';
import { Information } from './Information';


type Props = {
  grid: NodeAttributes[][];
  setGrid: (grid: React.SetStateAction<NodeAttributes[][]>) => void;
  onReset: () => void;
  setAlgo: (algo: AlgoSelection) => void;
  isRunning: boolean;
  setVisualizerTrigger: (num: React.SetStateAction<number>) => void;
  setObstacle: (obstacle: ObstacleSelection) => void;
};

export const Controls = ({ 
  grid,
  setGrid,
  onReset, 
  setAlgo,
  isRunning,
  setVisualizerTrigger,
  setObstacle,
}: Props) => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoSelection>(null);

  const handleVisualize = () => {
    if(!selectedAlgo || isRunning) return;

    if(selectedAlgo !== "DIJKSTRA") {
      const newGrid = clearTerrains(grid);
      setGrid(newGrid);
    }else {
      const newGrid = clearVisitedAndPath(grid);
      setGrid(newGrid);
    }

    setVisualizerTrigger(prev => prev + 1);
    setAlgo(selectedAlgo);
    
  };

  const handleClearBoard = () => {
    setSelectedAlgo(null);
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
    <header className="w-full z-50 px-4 py-2 bg-neutral-900 shadow-md text-neutral-100">
      <div className="lg:max-w-[1420px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold flex items-center gap-x-3 flex-shrink-0">
          🧭 Pathfinding Visualizer
          <Information />
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-44 relative inline-block">
            {<WeightSelection 
              selectedAlgo={selectedAlgo} 
              setObstacle={setObstacle}
            />}
          </div>

          {/* Custom Select */}
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
