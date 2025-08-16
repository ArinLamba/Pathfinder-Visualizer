import { useState } from "react";

import { type AlgoSelection, type ModeSelection } from "../types";

import { Controls } from "../components/Controls";
import { Grid } from "../components/Grid";
import { Instructions } from "../components/Instructions";
import { generateGrid } from "../utils/generateGrid";

export const Home = () => {
  
  const [grid, setGrid] = useState(generateGrid());
  const [mode, setMode] = useState<ModeSelection>("wall");
  const [visualizerTrigger, setVisualizerTrigger] = useState(0);
  const [algo, setAlgo] = useState<AlgoSelection>(null);
  const [resetFlag, setResetFlag] = useState(false); // toggled to reset grid
  const [isRunning, setIsRunning] = useState(false);
  
  const handleReset = () => {
    setResetFlag(prev => !prev);
    setIsRunning(false);
    setMode('wall');
    setAlgo(null);
  };


  return (
    <div className="min-h-screen mb-2 bg-neutral-900">
      <Controls
        grid={grid}
        setGrid={setGrid}
        onReset={handleReset}
        setAlgo={setAlgo}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setVisualizerTrigger={setVisualizerTrigger}
      />
      <Instructions />
      <div className="m-6 p-2 rounded-2xl overflow-x-auto bg-neutral-800">
        <div className="flex justify-center">
          <Grid
            grid={grid}
            setGrid={setGrid}
            mode={mode} 
            setMode={setMode}
            algo={algo} 
            resetFlag={resetFlag} 
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            visualizerTrigger={visualizerTrigger}
          />
        </div>
      </div>
    </div>
  );
};