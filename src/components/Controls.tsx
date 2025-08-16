import { useState } from 'react';
import type { AlgoSelection, NodeAttributes } from '../types';

import { algorithms } from '../utils/constants';
import { clearVisitedAndPath } from '../utils/generateGrid';


type Props = {
  grid: NodeAttributes[][];
  setGrid: (grid: React.SetStateAction<NodeAttributes[][]>) => void;
  onReset: () => void;
  setAlgo: (algo: AlgoSelection) => void;
  isRunning: boolean;
  setIsRunning: (state: boolean) => void;
  setVisualizerTrigger: (num: React.SetStateAction<number>) => void;
};

export const Controls = ({ 
  grid,
  setGrid,
  onReset, 
  setAlgo,
  isRunning,
  setIsRunning,
  setVisualizerTrigger
}: Props) => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoSelection>(null);

  const baseClass = "text-neutral-100 hover:text-white px-4 py-2 text-md border border-gray-600 rounded-md transition";

  const handleVisualize = () => {
    if(!selectedAlgo || isRunning) return;
    const newGrid = clearVisitedAndPath(grid);
    setGrid(newGrid);

    setVisualizerTrigger(prev => prev + 1);
    setAlgo(selectedAlgo);
    setIsRunning(true);
    
  };

  const handleSelect = (e: any) => {
    setSelectedAlgo(e.target.value as AlgoSelection);
  };

  const handleReset = () => {
    setVisualizerTrigger(0);
    setSelectedAlgo(null);
    onReset();
  };

  return (
    <header className="w-full sticky top-0 z-50 px-6 py-4 bg-neutral-900 shadow-md text-neutral-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold">
          🧭 Pathfinding Visualizer
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Custom Select */}
          <div className="relative inline-block w-44 ">
            <select
              value={selectedAlgo || ''}
              onChange={(e) => handleSelect(e)}
              
              className="appearance-none w-full bg-gray-800 border border-gray-700 text-white text-md rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block px-4 py-2"
            >
              <option value="" disabled>
                Select Algorithm
              </option>
              {algorithms.map((algo) => (
                <option key={algo} value={algo}>
                  {algo}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 mr-2 flex items-center px-2 text-gray-400">
              ▼
            </div>
          </div>
          {/* Visualize Button */}
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-neutral-100 text-md px-4 py-2 rounded-md transition"
            disabled={isRunning}
            onClick={handleVisualize}
          >
            {selectedAlgo ? `Visualize ${selectedAlgo}!` : 'Select an Algorithm'}
          </button>

          {/* Reset Button */}
          <button 
            className={baseClass + " bg-neutral-800"}
            disabled={isRunning}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
};
