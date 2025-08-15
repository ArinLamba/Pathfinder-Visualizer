import { useEffect, useState } from "react";
import type { AlgoSelection, ModeSelection } from "../types";

import { Node } from "../components/Node";

import { animateBFS, animatePath, bfs, getPath } from "../algorithms/bfs";
import { animateDFS, dfs } from "../algorithms/dfs";

import { generateGrid } from "../utils/generateGrid";
import { addWalls, cloneGrid, handleEnd, handleStart } from "../algorithms/gameHandlers";
import { END_COL, END_ROW, START_COL, START_ROW } from "../utils/constants";

type Props = {
  mode: ModeSelection;
  algo: AlgoSelection;
  resetFlag: boolean; // used to trigger grid reset
  inputDisabled: boolean;
  setInputDisabled: (input: boolean) => void;
  isRunning: boolean;
  setIsRunning: (state: boolean) => void;
}

export const Grid = ({ mode, algo, resetFlag, inputDisabled, setInputDisabled, isRunning, setIsRunning } : Props) => {
  
  const [grid, setGrid] = useState(generateGrid());
  const [startPos, setStartPos] = useState<[number,number] >([START_ROW, START_COL]);
  const [endPos, setEndPos] = useState<[number,number] >([END_ROW, END_COL]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  const toggleWall = (row:number, col:number) => {
    if(grid[row][col].isStart || grid[row][col].isEnd) return;
    const newGrid = cloneGrid(grid);
    addWalls({grid: newGrid, row, col});
    setGrid(newGrid);
  };


  const handleClick = (row: number, col: number) => {
    console.log(row,col);
    
    if(mode === null || inputDisabled) return;
    // function to add walls they should be added by default no button is required to toggle them
    // write your function here 
    if(mode === "wall") {
      toggleWall(row, col);
      return;
    }
    // end function here
    
    const newGrid = cloneGrid(grid);
    if(newGrid[row][col].isVisited) return;

    // function to handle start and end button 
    if(mode === "start") {
      handleStart({startPos, grid: newGrid, row, col, setStartPos});
    } else if(mode === "end") {
      handleEnd({endPos, grid: newGrid, row, col, setEndPos});
    }
    // end function here
    setGrid(newGrid);
    
  };
  
  // BFS shortest path 
  useEffect(() => {
    if(algo === "BFS") {
      
      const {newGrid, bfsPath} = bfs({ grid, startPos, endPos });
      const path = getPath(endPos, newGrid);
      // disabled while animation running
      setInputDisabled(true);

      animateBFS(bfsPath, setGrid);
      
      // wait for bfs path to complete
      setTimeout(() => {
        animatePath(path, setGrid);
        setInputDisabled(false);
        setIsRunning(false)
      },15 * bfsPath.length);

      return;
    }

    else if(algo === "DFS") {
      const newGrid = cloneGrid(grid);
      const dfsPath = dfs({ grid: newGrid, startPos, endPos});

      // input is disabled while path is animating
      setInputDisabled(true);
      animateDFS(dfsPath, setGrid);

      // wait for dfs to complete
      setTimeout(() => {
        animatePath(dfsPath, setGrid);
        setInputDisabled(false);
        setIsRunning(false);
      }, 20 * dfsPath.length);

      return;
    }
    
  }, [algo]);
  
  
  // Whenever resetFlag changes, reset the grid
  useEffect(() => {
    
    if(isRunning) return;
    setGrid(generateGrid());
    setStartPos([START_ROW,START_COL]);
    setEndPos([END_ROW,END_COL]);
  }, [resetFlag]);

  return (
    <div className="flex justify-center p-2">
      <div 
        onMouseLeave={() => setIsMouseDown(false)}
        onMouseUp={() => setIsMouseDown(false)}
        className="inline-block"
      >
        {grid.map((row, i) => 
          <div key={i} className="grid" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
            {row.map((cell, j) => 
              <Node
                key={`${i}-${j}`}
                node={cell}
                onToggleWall={() => { 
                  setIsMouseDown(true);
                  handleClick(i,j);
                }}
                onMouseEnter={() => {
                  if(inputDisabled) return;
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