import { useState } from 'react';
import type { AlgoSelection, ModeSelection } from '../types';

import { algorithms } from '../utils/constants';


type Props = {
  setMode: (state: ModeSelection) => void;
  onReset: () => void;
  setAlgo: (algo: AlgoSelection) => void;
  isRunning: boolean;
  setIsRunning: (state: boolean) => void;
}

export const Controls = ({ 
  setMode, 
  onReset, 
  setAlgo,
  isRunning,
  setIsRunning
}: Props) => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoSelection>(null);

  const baseClass = "text-gray-300 hover:text-white px-4 py-2 border border-gray-600 rounded-md transition";


  const handleVisualize = () => {
    if(!selectedAlgo) return;
    setIsRunning(true);
    setAlgo(selectedAlgo);
    setMode("wall");
    // TODO: thinking of adding auto reset the grid except the wall cells in case of user added more walls and then compute again the algo
  }

  const handleSelect = (e: any) => {
    setSelectedAlgo(e.target.value as AlgoSelection);
  };


  return (
    <header className="w-full px-6 py-4 bg-neutral-900 shadow-md text-neutral-100">
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
              
              className="appearance-none w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block px-4 py-2"
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
            onClick={handleVisualize}
            disabled={isRunning}
          >
            {selectedAlgo ? `Visualize ${selectedAlgo}!` : 'Select an Algorithm'}
          </button>

          {/* Reset Button */}
          <button 
            className={baseClass + " bg-neutral-800"}
            onClick={onReset}
            disabled={isRunning}
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
};
