import { useEffect, useState } from "react";
import type { AlgoSelection, ModeSelection } from "../types";

import { Node } from "../components/Node";

import { bfs } from "../algorithms/bfs";
import { generateGrid } from "../utils/generateGrid";
import { addWalls, cloneGrid, handleStartEnd } from "../algorithms/gameHandlers";

type Props = {
  mode: ModeSelection;
  algo: AlgoSelection;
  resetFlag: boolean; // used to trigger grid reset
  inputDisabled: boolean;
}

export const Grid = ({ mode, algo, resetFlag, inputDisabled } : Props) => {
  
  const [grid, setGrid] = useState(generateGrid());
  const [startPos, setStartPos] = useState<[number,number] | null>(null);
  const [endPos, setEndPos] = useState<[number,number] | null>(null);


  const handleClick = (row: number, col: number) => {
    // TODO: add functionality

    const newGrid = cloneGrid(grid);
    // function to add walls they should be added by default no button is required to toggle them (i am thinking of it rn )

    // write your function here 
    if(mode === "wall") {
      addWalls({grid: newGrid, row, col});
      setGrid(newGrid);
    }

    // end function here
    if(mode === null || inputDisabled) return;
    if(newGrid[row][col].isVisited) return;

    if(mode === "start" || mode === "end") {
      handleStartEnd({mode, startPos, endPos, grid: newGrid, row, col, setStartPos, setEndPos});
    }
    setGrid(newGrid);
    
  };


  // BFS TODO : have to optimize for getting back shortest path
  useEffect(() => {
    if(algo === "BFS") {
      const newGrid = cloneGrid(grid);
      bfs({grid: newGrid, startPos, endPos});
      setGrid(newGrid);
    }
    
  }, [algo]);
  
  
  // Whenever resetFlag changes, reset the grid
  useEffect(() => {
    setGrid(generateGrid());
    setStartPos(null);
    setEndPos(null);
  }, [resetFlag]);

  return (
    <div className="">
      <div className="">
        {grid.map((row, i) => 
          <div key={i} className="flex ">
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