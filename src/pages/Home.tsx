import { useState } from "react";

import { generateGrid } from "@/lib/utils/generateGrid";
import { type ObstacleSelection, type AlgoSelection, type ModeSelection } from "@/lib/types";

import { Grid } from "@/components/Grid";
import { Controls } from "@/components/Controls";
import { Instructions } from "@/components/Instructions";

export const Home = () => {
  
  const [grid, setGrid] = useState(generateGrid());
  const [mode, setMode] = useState<ModeSelection>(null);
  const [obstacle, setObstacle] = useState<ObstacleSelection>("Wall");
  const [visualizerTrigger, setVisualizerTrigger] = useState(0);
  const [algo, setAlgo] = useState<AlgoSelection>(null);
  const [resetFlag, setResetFlag] = useState(false); // toggled to reset grid
  const [isRunning, setIsRunning] = useState(false);
  
  const handleReset = () => {
    setResetFlag(prev => !prev);
    setIsRunning(false);
    setObstacle('Wall');
    setAlgo(null);
    setVisualizerTrigger(0);
  };


  return (
    <div className="min-h-screen mb-2 bg-neutral-900">
      <Controls
        grid={grid}
        setGrid={setGrid}
        onReset={handleReset}
        setAlgo={setAlgo}
        isRunning={isRunning}
        setVisualizerTrigger={setVisualizerTrigger}
        setObstacle={setObstacle}
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
            obstacle={obstacle}
          />
        </div>
      </div>
    </div>
  );
};