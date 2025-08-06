import { useState } from "react";
import type { SelectionMode } from "../types";

import { Controls } from "../components/Controls";
import { Node } from "../components/Node";

import { generateGrid } from "../utils/generateGrid";
import { cloneGrid, handleStartEnd } from "../algorithms/gameHandlers";

export const Home = () => {
  
  const [grid, setGrid] = useState(generateGrid());
  const [mode, setMode] = useState<SelectionMode>(null);
  const [startPos, setStartPos] = useState<[number,number] | null>(null);
  const [endPos, setEndPos] = useState<[number,number] | null>(null);


  const handleClick = (row: number, col: number) => {
    // TODO: add functionality
    if(mode === null || mode === "visualize") return;
    const updateGrid = cloneGrid(grid);
    
    handleStartEnd({mode, startPos, endPos, updateGrid: updateGrid, row, col, setStartPos, setEndPos})
    setGrid(updateGrid);
    
  };

  const resetGrid = () => {
    setGrid(generateGrid());
    setMode(null);
    setStartPos(null);
    setEndPos(null);
  };


  return (
    <div className="min-h-screen">
      <Controls 
        setMode={setMode}
        mode={mode}
        onReset={resetGrid}
      />
      <div className="">

      
        {grid.map((row, i) => 
          <div key={i} className="flex">
            {row.map((cell, j) => 
              <Node
                key={`${i}-${j}`}
                node={cell}
                onClick={() => handleClick(i, j)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};