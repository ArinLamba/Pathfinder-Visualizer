import type React from "react";
import { useEffect, useState } from "react";
import { useRunning } from "@/store/use-running";

import { type GridType, type ModeSelection } from "@/lib/types";

import { Node } from "@/pages/Node";

import { generateGrid } from "@/lib/utils/generateGrid";
import { addFixedWeights, addGrass, addMountain, addWalls, addWater, handleAlgo, setCell } from "@/lib/utils/handlers";

import { useAlgorithm } from "@/store/use-algorithm";
import { useObstacle } from "@/store/use-obstacle";
import { useStart } from "@/store/use-start";
import { useEnd } from "@/store/use-end";
import { END_COL, END_ROW, START_COL, START_ROW } from "@/lib/utils/constants";
// import { useAfterAlgo } from "@/store/use-after-algo";
// import { bfsAfter } from "@/algorithms/bfsAfter";

type Props = {
  grid: GridType;
  setGrid: (grid: React.SetStateAction<GridType>) => void;
  resetFlag: boolean; // used to trigger grid reset
  visualizerTrigger: number;
}

export const Grid = ({ grid, setGrid, resetFlag, visualizerTrigger } : Props) => {
  
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [mode, setMode] = useState<ModeSelection>(null);

  const { isRunning, setIsRunning } = useRunning();
  const obstacle = useObstacle(state => state.obstacle);
  const algo = useAlgorithm(state => state.algo);
  const { startPos, setStartPos } = useStart();
  const { endPos, setEndPos } = useEnd();
  // const { afterAlgoTrigger, increment } = useAfterAlgo();

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
    
    if (isMouseDown && mode === "draggingStart") {
      if (cell.isEnd) return;
      setCell(row, col, "start", setGrid);
      // if(afterAlgoTrigger >= 1) {
      //   bfsAfter({ grid, startPos, endPos, setGrid});
      // }
      return;
    }

    if(isMouseDown && mode === "draggingEnd") {
      if(cell.isStart) return;
      setCell(row, col, "end", setGrid);
      // if(afterAlgoTrigger >= 1) {
      //   bfsAfter({ grid, startPos, endPos, setGrid});
      // }
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
  
  // useEffect(() => {
    
  // },[afterAlgoTrigger])

  useEffect(() => {
    const run = async () => {
      setIsRunning(true);
      await handleAlgo({ grid, startPos, endPos, setGrid, algo});
      setIsRunning(false);
      // increment();
    }
    run();
    
  }, [visualizerTrigger]);
  
  // Whenever resetFlag changes, reset the grid
  useEffect(() => {
    if(isRunning) return;
    setGrid(generateGrid());
    setStartPos([START_ROW, START_COL]);
    setEndPos([END_ROW, END_COL])
    setIsMouseDown(false);
    setIsKeyDown(false);
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