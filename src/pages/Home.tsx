import { useState } from "react";

import { generateGrid } from "@/lib/utils/generateGrid";
import { type ObstacleSelection } from "@/lib/types";

import { Grid } from "@/pages/Grid";
import { Controls } from "@/components/Controls";
import { Instructions } from "@/components/Instructions";
import { Message } from "@/components/Message";
import { useRunning } from "@/store/use-running";

export const Home = () => {
  
  const [grid, setGrid] = useState(generateGrid());
  const [obstacle, setObstacle] = useState<ObstacleSelection>("Wall");
  const [visualizerTrigger, setVisualizerTrigger] = useState(0);
  const [resetFlag, setResetFlag] = useState(false); // toggled to reset grid

  const setIsRunning = useRunning((state) => state.setIsRunning);

  const handleReset = () => {
    setResetFlag(prev => !prev);
    setIsRunning(false);
    setObstacle('Wall');
    setVisualizerTrigger(0);
  };


  return (
    <div className="min-h-screen mb-2 dark:bg-neutral-900">
      <Controls
        grid={grid}
        setGrid={setGrid}
        onReset={handleReset}
        setVisualizerTrigger={setVisualizerTrigger}
      />
      <Instructions />
      <Message />
      <div className="mx-6 my-2 p-2 rounded-lg overflow-x-auto dark:bg-neutral-800 bg-[#E7E7E7] border border-white/20">
        <div className="flex justify-center">
          <Grid
            grid={grid}
            setGrid={setGrid}
            resetFlag={resetFlag} 
            visualizerTrigger={visualizerTrigger}
            obstacle={obstacle}
          />
        </div>
      </div>
    </div>
  );
};