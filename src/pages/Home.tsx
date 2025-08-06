import { useState } from "react";

import type { SelectionMode } from "../types";

import { Controls } from "../components/Controls";
import { Grid } from "../components/Grid";

export const Home = () => {
  
  const [mode, setMode] = useState<SelectionMode>(null);
  const [resetFlag, setResetFlag] = useState(false); // toggled to reset grid

  const handleReset = () => {
    setResetFlag(prev => !prev);
    setMode(null);
  };


  return (
    <div className="min-h-screen">
      <Controls 
        setMode={setMode}
        mode={mode}
        onReset={handleReset}
      />
      <div className="">
        <Grid mode={mode} resetFlag={resetFlag} />
     
      </div>
    </div>
  );
};