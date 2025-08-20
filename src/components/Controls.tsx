import { useState } from 'react';

import type { AlgoSelection, NodeAttributes, ObstacleSelection } from '@/lib/types';
import { clearVisitedAndPath } from '@/lib/utils/generateGrid';

import { WeightSelection } from './WeightSelection';
import { SelectAlgo } from './SelectAlgo';
import { Button } from './ui/button';
import { Info } from 'lucide-react';


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
    const newGrid = clearVisitedAndPath(grid);
    setGrid(newGrid);

    setVisualizerTrigger(prev => prev + 1);
    setAlgo(selectedAlgo);
    
  };

  const handleReset = () => {
    setVisualizerTrigger(0);
    setSelectedAlgo(null);
    onReset();
  };

  return (
    <header className="w-full sticky top-0 z-50 px-4 py-2 bg-neutral-900 shadow-md text-neutral-100">
      <div className="lg:max-w-[1420px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold flex items-center gap-x-3 flex-shrink-0">
          🧭 Pathfinding Visualizer
          <Info className="text-cyan-600 hover:cursor-pointer hover:text-cyan-400 transition delay-75 size-6"/>
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
            onClick={handleReset}
          >
            Clear Board
          </Button>
          <Button variant={"ghost"} disabled={isRunning}>
            Clear Walls & Weights
          </Button>
          <Button variant={"ghost"} disabled={isRunning}>
            Clear Path
          </Button>

        </div>
      </div>
    </header>
  );
};
