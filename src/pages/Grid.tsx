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
import { useAfterAlgo } from "@/store/use-after-algo";



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
  const { hasVisualizationRun, setHasVisualizationRun } = useAfterAlgo();


  const placeObstacle = (row: number, col: number) => {
    if (grid[row][col].isStart || grid[row][col].isEnd || isRunning) return;

    switch (obstacle) {
      case "Wall": addWalls({ row, col, setGrid }); break;
      case "Grass": addGrass({ row, col, setGrid }); break;
      case "Water": addWater({ row, col, setGrid }); break;
      case "Mountain": addMountain({ row, col, setGrid }); break;
    }
  };
  const toggleFixedWeight = (row: number, col: number) => {
    if(grid[row][col].isStart || grid[row][col].isEnd || isRunning) return;
    addFixedWeights({row, col, setGrid});
  };
  
  const handleMouseEnter = (row: number, col: number) => {
    if (
      isRunning ||
      (row === startPos[0] && col === startPos[1]) ||
      (row === endPos[0] && col === endPos[1])
    )
      return;

    const cell = grid[row][col];

    if (isMouseDown && mode === "draggingStart" && !cell.isEnd) {
      setCell(row, col, "start", setGrid, async (newGrid) => {
        if (hasVisualizationRun) {
          await handleAlgo({ grid: newGrid, startPos: [row, col], endPos, setGrid, algo, instant: true });
        }
      });
      return;
    }

    if (isMouseDown && mode === "draggingEnd" && !cell.isStart) {
      setCell(row, col, "end", setGrid, async (newGrid) => {
        if (hasVisualizationRun) {
          await handleAlgo({ grid: newGrid, startPos, endPos: [row, col], setGrid, algo, instant: true });
        }
      });
      return;
    }

    if (isMouseDown && isKeyDown) return toggleFixedWeight(row, col);
    
    if (isMouseDown && !isKeyDown) return placeObstacle(row, col);
    
  };


  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true);
    if(row === startPos[0] && col === startPos[1]) return setMode("draggingStart");
    if(row === endPos[0] && col === endPos[1]) return setMode("draggingEnd");

    if(isKeyDown) return toggleFixedWeight(row, col);

    // Only toggle cells if not dragging
    placeObstacle(row, col);
  };

  useEffect(() => {
    const run = async () => {
      setIsRunning(true);
      await handleAlgo({ grid, startPos, endPos, setGrid, algo });
      setIsRunning(false);
      setHasVisualizationRun(true)
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