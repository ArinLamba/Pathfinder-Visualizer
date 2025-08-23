import type React from "react";
import { useEffect, useState } from "react";
import { type AlgoSelection, type GridType, type ModeSelection, type ObstacleSelection } from "@/lib/types";

import { Node } from "@/pages/Node";

import { bfs } from "@/algorithms/bfs";
import { dfs } from "@/algorithms/dfs";

import { generateGrid } from "@/lib/utils/generateGrid";
import { addFixedWeights, addGrass, addMountain, addWalls, addWater, cloneGrid } from "@/lib/utils/handlers";
import { END_COL, END_ROW, START_COL, START_ROW } from "@/lib/utils/constants";

import { animateBFS } from "@/animations/animateBFS";
import { animateDFS } from "@/animations/animateDFS";
import { animatePath } from "@/animations/animatePath";
import { dijkstra } from "@/algorithms/dijkstra";
import { animateDijkstra } from "@/animations/animateDijkstra";
import { getPath } from "@/lib/utils/getPath";

type Props = {
  grid: GridType;
  setGrid: (grid: React.SetStateAction<GridType>) => void;
  mode: ModeSelection;
  setMode: (mode: ModeSelection) => void;
  algo: AlgoSelection;
  resetFlag: boolean; // used to trigger grid reset
  isRunning: boolean;
  setIsRunning: (input: boolean) => void;
  visualizerTrigger: number;
  obstacle: ObstacleSelection;
}

export const Grid = ({ grid, setGrid, mode, setMode, algo, resetFlag, isRunning, setIsRunning, visualizerTrigger, obstacle } : Props) => {
  
  const [startPos, setStartPos] = useState<[number,number]>([START_ROW, START_COL]);
  const [endPos, setEndPos] = useState<[number,number]>([END_ROW, END_COL]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isKeyDown, setIsKeyDown] = useState(false);

  const toggleWall = (row:number, col:number) => {
    if(grid[row][col].isStart || grid[row][col].isEnd || isRunning) return;
    addWalls({row, col, setGrid})
  };

  const toggleGrass = (row: number, col: number) => {
    if(grid[row][col].isStart || grid[row][col].isEnd || isRunning) return;
    addGrass({row, col, setGrid});

  };
  const toggleWater = (row: number, col: number) => {
    if(grid[row][col].isStart || grid[row][col].isEnd || isRunning) return;
    addWater({row, col, setGrid});

  };
  const toggleMountain = (row: number, col: number) => {
    if(grid[row][col].isStart || grid[row][col].isEnd || isRunning) return;
    addMountain({row, col, setGrid});

  };

  const toggleFixedWeight = (row: number, col: number) => {
    if(grid[row][col].isStart || grid[row][col].isEnd || isRunning) return;
    addFixedWeights({row, col, setGrid});
  }

  const handleMouseEnter = (row: number, col: number) => {
    if(isRunning || row === startPos[0] && col === startPos[1] || row === endPos[0] && col === endPos[1]) return;

    const cell = grid[row][col];
    // const cellIsTerran = cell.isWall || cell.isGrass || cell.isMountain || cell.isWater || cell.weight === 15;
    
    if(isMouseDown && mode === "draggingStart") {
      if(cell.isEnd) return;
      //TODO: kal ye karna hai alag function mai kyuki walls pr gdbd hori hai vo fir chali jati hai agar ek bar un par start ya end aagya

      // if(cellIsTerran) {
      //   setGrid((prevGrid) => {
      //     const newGrid = [...prevGrid];
      //     const newRow = [...newGrid[row]];
      //     newRow[col] = {... newRow[col], isStart: true, isWater: false, isWall: false, isGrass: false, isMountain: false};
      //     newGrid[row] = newRow;
      //     return newGrid;
      //   })
      // }
      setStartPos([row,col]);
      return;
    }
    if(isMouseDown && mode === "draggingEnd") {
      if(cell.isStart) return;
      //TODO: kal ye karna hai alag function mai kyuki walls pr gdbd hori hai vo fir chali jati hai agar ek bar un par start ya end aagya

      // if(cellIsTerran) {
      //   setGrid((prevGrid) => {
      //     const newGrid = [...prevGrid];
      //     const newRow = [...newGrid[row]];
      //     newRow[col] = {... newRow[col], isEnd: true, isWater: false, isWall: false, isGrass: false, isMountain: false};
      //     newGrid[row] = newRow;
      //     return newGrid;
      //   })
      // }
      setEndPos([row,col]);
      return;
    }

    if(isMouseDown && isKeyDown) {
      toggleFixedWeight(row, col);
      return;
    }

    if(isMouseDown && !isKeyDown) {
      switch (obstacle) {
        case "Wall":
          toggleWall(row,col);
          break;
        case "Grass":
          toggleGrass(row, col);
          break;
        case "Water":
          toggleWater(row,col);
          break;
        case "Mountain":
          toggleMountain(row,col);
          break;
      }
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

    if(isKeyDown) {
      toggleFixedWeight(row, col);
      return;
    }
    // Only toggle cells if not dragging
    if(obstacle === "Wall") toggleWall(row, col);
    if(obstacle === "Grass") toggleGrass(row, col);
    if(obstacle === "Water") toggleWater(row, col);
    if(obstacle === "Mountain") toggleMountain(row, col);
  };
  
  useEffect(() => {
    const run = async () => {

      if(algo === "BFS") {
        setIsRunning(true);
        const newGrid = cloneGrid(grid);
        const visitedNodes = bfs({ newGrid, startPos, endPos });
        const shortestPath = getPath(endPos, newGrid);
        await animateBFS(visitedNodes, setGrid);
        await animatePath(shortestPath, setGrid);
        setIsRunning(false);
        return;
      }
      if(algo === "DFS") {
        setIsRunning(true);
        const dfsPath = dfs({ grid, startPos, endPos });
        await animateDFS(dfsPath, setGrid);
        await animatePath(dfsPath, setGrid);
        setIsRunning(false);
        return;
      }
      if(algo === "DIJKSTRA") {
        setIsRunning(true);
        const newGrid = cloneGrid(grid);
        const visitedNodes = dijkstra({newGrid, startPos, endPos});
        const shortestPath = getPath(endPos, newGrid);
        await animateDijkstra(visitedNodes, setGrid);
        await animatePath(shortestPath, setGrid);
        setIsRunning(false);
        return;
      }
    }
    run();
    
  }, [visualizerTrigger]);
  
  // Whenever resetFlag changes, reset the grid
  useEffect(() => {
    if(isRunning) return;
    setGrid(generateGrid());
    setStartPos([START_ROW,START_COL]);
    setEndPos([END_ROW,END_COL]);
    setIsMouseDown(false);
  }, [resetFlag]);

  return (
    <div className="flex justify-center p-2">
      <div 
        onMouseUp={() => {setIsMouseDown(false); setMode(null), setIsKeyDown(false)}}
        onKeyUp={() => setIsKeyDown(false)}
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
                onKeyDown={(e) => { e.key === "w" && setIsKeyDown(true)}}
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