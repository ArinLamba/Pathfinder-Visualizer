import type React from "react";
import { useEffect, useState } from "react";
import { type AlgoSelection, type ModeSelection, type NodeAttributes } from "../types";

import { Node } from "../components/Node";

import { animateBFS, animatePath, bfs, getPath } from "../algorithms/bfs";
import { animateDFS, dfs } from "../algorithms/dfs";

import { generateGrid } from "../utils/generateGrid";
import { addWalls, cloneGrid } from "../algorithms/handlers";
import { END_COL, END_ROW, START_COL, START_ROW } from "../utils/constants";

type Props = {
  grid: NodeAttributes[][];
  setGrid: (grid: React.SetStateAction<NodeAttributes[][]>) => void;
  mode: ModeSelection;
  setMode: (mode: ModeSelection) => void;
  algo: AlgoSelection;
  resetFlag: boolean; // used to trigger grid reset
  isRunning: boolean;
  setIsRunning: (input: boolean) => void;
  visualizerTrigger: number;
}

export const Grid = ({ grid, setGrid, mode, setMode, algo, resetFlag, isRunning, setIsRunning, visualizerTrigger } : Props) => {
  
  const [startPos, setStartPos] = useState<[number,number]>([START_ROW, START_COL]);
  const [endPos, setEndPos] = useState<[number,number]>([END_ROW, END_COL]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const toggleWall = (row:number, col:number) => {
    if(grid[row][col].isStart || grid[row][col].isEnd || isRunning) return;
    const newGrid = cloneGrid(grid);
    addWalls({grid: newGrid, row, col});
    setGrid(newGrid);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if(isRunning || row === startPos[0] && col === startPos[1] || row === endPos[0] && col === endPos[1]) return;

    const cell = grid[row][col];
    
    if(isMouseDown && mode === "draggingStart") {
      if(cell.isWall || cell.isEnd) return;
      setStartPos([row,col]);
      return;
    }
    if(isMouseDown && mode === "draggingEnd") {
      if(cell.isWall || cell.isStart) return;
      setEndPos([row,col]);
      return;
    }
    if(isMouseDown && mode === "wall") {
      toggleWall(row, col);
      return;
    }
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true);
    if(row === startPos[0] && col === startPos[1]) {
      setMode("draggingStart");
      return;
    }
    if(row === endPos[0] && col === endPos[1]) {
      setMode("draggingEnd");
      return;
    }
    if(mode === "wall") {
      toggleWall(row,col);
      return;
    }
  };
  
  useEffect(() => {  
    if(algo === "BFS") {
      const run = async () => {
        setIsRunning(true);
        const newGrid = cloneGrid(grid)
        const bfsPath = bfs({ newGrid, startPos, endPos });
        const shortestPath = getPath(endPos, newGrid);
        await animateBFS(bfsPath, setGrid);
        await animatePath(shortestPath, setGrid);
        setIsRunning(false);
      }
      run();
      return;
    }
    else if(algo === "DFS") {
      const run = async () => {
        setIsRunning(true);
        const dfsPath = dfs({ grid, startPos, endPos });
        await animateDFS(dfsPath, setGrid);
        await animatePath(dfsPath, setGrid);
        setIsRunning(false);
      }
      run();
      return;
    }
    
  }, [visualizerTrigger]);
  
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
        onMouseUp={() => setIsMouseDown(false)}
        className="inline-block"
      >
        {grid.map((row, i) => 
          <div key={i} className="grid" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
            {row.map((cell, j) => 
              <Node
                key={`${i}-${j}`}
                node={cell}
                onMouseDown={() => handleMouseDown(i, j)}
                onMouseEnter={() => handleMouseEnter(i,j)}
                onMouseUp={() => setMode("wall")} // TODO: set previous mode (later)
                mode={mode}
                startPos={startPos}
                endPos={endPos}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};