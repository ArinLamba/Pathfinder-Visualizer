import { useEffect, useState } from "react";
import type { SelectionMode } from "../types";

import { Node } from "../components/Node";

import { generateGrid } from "../utils/generateGrid";
import { cloneGrid, handleStartEnd } from "../algorithms/gameHandlers";

type Props = {
  mode: SelectionMode;
  resetFlag: boolean; // used to trigger grid reset
}

export const Grid = ({ mode, resetFlag } : Props) => {
  
  const [grid, setGrid] = useState(generateGrid());
  const [startPos, setStartPos] = useState<[number,number] | null>(null);
  const [endPos, setEndPos] = useState<[number,number] | null>(null);


  const handleClick = (row: number, col: number) => {
    // TODO: add functionality
    if(mode === null || mode === "visualize") return;
    const newGrid = cloneGrid(grid);

    if(mode === "start" || mode === "end") {
      handleStartEnd({mode, startPos, endPos, updateGrid: newGrid, row, col, setStartPos, setEndPos});
    }
    setGrid(newGrid);
    
  };

  // Whenever resetFlag changes, reset the grid
  useEffect(() => {
    setGrid(generateGrid());
    setStartPos(null);
    setEndPos(null);
  },[resetFlag]);

  return (
    <div className="">
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