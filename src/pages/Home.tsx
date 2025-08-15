import { useState } from "react";

import { type AlgoSelection, type ModeSelection } from "../types";

import { Controls } from "../components/Controls";
import { Grid } from "../components/Grid";
import { Instructions } from "../components/Instructions";

export const Home = () => {
  
  const [mode, setMode] = useState<ModeSelection>("wall");
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
        setMode={setMode}
        onReset={handleReset}
        setAlgo={setAlgo}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
      <Instructions />
      <div className="m-6 p-2 rounded-2xl overflow-x-auto bg-neutral-800">
        <div className="flex justify-center">
          <Grid 
            mode={mode} 
            setMode={setMode}
            algo={algo} 
            resetFlag={resetFlag} 
            isRunning={isRunning}
            setIsRunning={setIsRunning}
          />
        </div>
      </div>
    </div>
  );
};