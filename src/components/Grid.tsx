import { useEffect, useState } from "react";
import type { AlgoSelection, ModeSelection } from "../types";

import { Node } from "../components/Node";

import { animateBFS, animatePath, bfs, getPath } from "../algorithms/bfs";
import { animateDFS, dfs } from "../algorithms/dfs";

import { generateGrid } from "../utils/generateGrid";
import { addWalls, cloneGrid, handleEnd, handleStart } from "../algorithms/gameHandlers";

type Props = {
  mode: ModeSelection;
  algo: AlgoSelection;
  resetFlag: boolean; // used to trigger grid reset
  inputDisabled: boolean;
}

export const Grid = ({ mode, algo, resetFlag, inputDisabled } : Props) => {
  
  const [grid, setGrid] = useState(generateGrid());
  const [startPos, setStartPos] = useState<[number,number] >([11,14]);
  const [endPos, setEndPos] = useState<[number,number] >([11,41]);
  const [isMouseDown, setIsMouseDown] = useState(false);


  const toggleWall = (row:number, col:number) => {
    if(grid[row][col].isStart || grid[row][col].isEnd) return;
    const newGrid = cloneGrid(grid);
    addWalls({grid: newGrid, row, col});
    setGrid(newGrid);
  };


  const handleClick = (row: number, col: number) => {
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
      animateBFS(bfsPath, setGrid);
      const path = getPath(endPos, newGrid);
      
      // wait for bfs path to complete
      setTimeout(() => {
        animatePath(path, setGrid);
      },15 * bfsPath.length);
      return;
    }
    else if(algo === "DFS") {
      const newGrid = cloneGrid(grid);
      const dfsPath = dfs({ grid: newGrid, startPos, endPos});
      animateDFS(dfsPath, setGrid);

      // wait for dfs to complete
      setTimeout(() => {
        animatePath(dfsPath, setGrid);
      }, 15 * dfsPath.length);
      return;
    }
    
  }, [algo]);
  
  
  // Whenever resetFlag changes, reset the grid
  useEffect(() => {
    setGrid(generateGrid());
    setStartPos([11,14]);
    setEndPos([11,41]);
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