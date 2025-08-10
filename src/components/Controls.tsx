import { useState } from 'react';
import type { AlgoSelection, ModeSelection } from '../types';

import { algorithms } from '../utils/constants';


type Props = {
  mode: ModeSelection;
  setMode: (state: ModeSelection) => void;
  onReset: () => void;
  setInputDisabled: (input: boolean) => void;
  setAlgo: (algo: AlgoSelection) => void;
}

export const Controls = ({ 
  mode, 
  setMode, 
  onReset, 
  setInputDisabled,
  setAlgo 
}: Props) => {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoSelection>(null);

  // Inside your component
  const isStartActive = mode === "start";
  const isEndActive = mode === "end";

  const baseClass = "text-gray-300 hover:text-white px-4 py-2 border border-gray-600 rounded-md transition";

  // For Start Button
  const startBtnClass = baseClass + (isStartActive ? " bg-fuchsia-600 text-white" : " text-gray-300");

  // For End Button
  const endBtnClass = baseClass + (isEndActive ? " bg-fuchsia-600 text-white" : " text-gray-300");


  const handleVisualize = () => {
    if(!selectedAlgo) return;
    setAlgo(selectedAlgo);
    setInputDisabled(true);
    setMode("wall");
    // TODO: thinking of adding auto reset the grid except the wall cells in case of user added more walls and then compute again the algo
  }

  const handleStart = () => {
    setMode(isStartActive ? "wall" : "start");
    setInputDisabled(false);
    setAlgo(null);
  };

  const handleEnd = () => {
    setMode(isEndActive ? "wall" : "end");
    setInputDisabled(false);
    setAlgo(null);
  };

  const handleSelect = (e: any) => {
    // setInputDisabled(false);
    setSelectedAlgo(e.target.value as AlgoSelection);
  };


  return (
    <header className="w-full px-6 py-4 bg-gray-900 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">
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

          {/* Set Start Button */}
          <button 
            className={startBtnClass}
            onClick={handleStart}
          >
            {isStartActive ? "Cancel Start" : "Set Start"}
          </button>
          {/* Set End Button */}
          <button 
            className={endBtnClass}
            onClick={handleEnd}
          >
            {isEndActive ? "Cancel End" : "Set End"}
          </button>
          {/* Visualize Button */}
          <button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition"
            onClick={handleVisualize}
          >
            {selectedAlgo ? `Visualize ${selectedAlgo}!` : 'Select an Algorithm'}
          </button>

          {/* Reset Button */}
          <button 
            className={baseClass}
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
};
