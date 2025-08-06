import { useState } from "react";

import { type AlgoSelection, type ModeSelection } from "../types";

import { Controls } from "../components/Controls";
import { Grid } from "../components/Grid";

export const Home = () => {
  
  const [mode, setMode] = useState<ModeSelection>("wall");
  const [algo, setAlgo] = useState<AlgoSelection>(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [resetFlag, setResetFlag] = useState(false); // toggled to reset grid

  const handleReset = () => {
    setResetFlag(prev => !prev);
    setInputDisabled(false);
    setMode('wall');
    setAlgo(null);
  };


  return (
    <div className="min-h-screen">
      <Controls 
        mode={mode}
        setMode={setMode}
        onReset={handleReset}
        setInputDisabled={setInputDisabled}
        setAlgo={setAlgo}
      />
      <div className="">
        <Grid mode={mode} algo={algo} resetFlag={resetFlag} inputDisabled={inputDisabled} />
      </div>
    </div>
  );
};