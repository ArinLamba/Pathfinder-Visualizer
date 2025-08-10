import { useEffect, useState } from "react";
import type { AlgoSelection, ModeSelection } from "../types";

import { Node } from "../components/Node";

import { animatePath, bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";

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
  const [endPos, setEndPos] = useState<[number,number] | null>([10,10]);
  const [isMouseDown, setIsMouseDown] = useState(false);


  const toggleWall = (row:number, col:number) => {
    if(grid[row][col].isStart || grid[row][col].isEnd) return;
    const newGrid = cloneGrid(grid);
    addWalls({grid: newGrid, row, col});
    setGrid(newGrid);
  };


  const handleClick = (row: number, col: number) => {
    if(mode === null || inputDisabled) return;
    
    // function to add walls they should be added by default no button is required to toggle them (i am thinking of it rn ) 
    // write your function here 
    if(mode === "wall") {
      toggleWall(row, col);
      return;
    }
    // end function here
    
    const newGrid = cloneGrid(grid);
    if(newGrid[row][col].isVisited) return;

    if(mode === "start" || mode === "end") {
      handleStartEnd({mode, startPos, endPos, grid: newGrid, row, col, setStartPos, setEndPos});
    }
    setGrid(newGrid);
    
  };
  
  // BFS shortest path 
  useEffect(() => {
    if(algo === "BFS") {
      const newGrid = cloneGrid(grid);
      const path = bfs({ grid: newGrid, startPos, endPos });
      setGrid(newGrid);
      animatePath(path, setGrid);
      return;
    }
    if(algo === "DFS") {
      console.log(algo);
      const newGrid = cloneGrid(grid);
      dfs({ grid: newGrid, startPos, endPos, setGrid });
      return;
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
      <div 
        onMouseLeave={() => setIsMouseDown(false)}
        onMouseUp={() => setIsMouseDown(false)}
        className=""
      >
        {grid.map((row, i) => 
          <div key={i} className="flex max-w-fit bg-white">
            {row.map((cell, j) => 
              <Node
                key={`${i}-${j}`}
                node={cell}
                onToggleWall={() => {
                  setIsMouseDown(true);
                  handleClick(i,j);
                }}
                onMouseEnter={() => {
                  if(isMouseDown && mode === "wall") {
                    toggleWall(i, j);
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};