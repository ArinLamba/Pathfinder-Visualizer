import { useState } from "react";

import { Controls } from "../components/Controls";
import { Node } from "../components/Node";

import { generateGrid } from "../utils/generateGrid";
import { cloneGrid } from "../algorithms/general";

type SelectionMode = "start" | "end" | "wall" | "visualize" | null;

export const Home = () => {
  
  const [grid, setGrid] = useState(generateGrid());
  const [mode, setMode] = useState<SelectionMode>(null);
  const [startPos, setStartPos] = useState<[number,number] | null>(null);
  const [endPos, setEndPos] = useState<[number,number] | null>(null);


  const handleClick = (row: number, col: number) => {
    // TODO: add functionality
    if(mode === null) return;
    const updateGrid = cloneGrid(grid);
    const node = updateGrid[row][col];


    if(mode === "start") {
      if(startPos) {
        const [prevRow, prevCol] = startPos;
        // to disable click on the end node if we setting start node
        if(node.isEnd) return;
        // if we click on the same cell it will reset it
        if(prevRow === row && prevCol === col) {
          updateGrid[prevRow][prevCol].isStart = !updateGrid[prevRow][prevCol].isStart;
          setGrid(updateGrid);
          return;
        }
        updateGrid[prevRow][prevCol].isStart = false;
      }
      node.isStart = true;
      setStartPos([row, col]);
    }

    else if(mode === "end") {
      if(endPos) {
        const [prevRow, prevCol] = endPos;
        // to disable click on the start node if we setting end node
        if(node.isStart) return;
        // if we click on the same cell it will reset it
        if(prevRow === row && prevCol === col) {
          updateGrid[prevRow][prevCol].isEnd = !updateGrid[prevRow][prevCol].isEnd;
          setGrid(updateGrid);
          return;
        }
        
        updateGrid[prevRow][prevCol].isEnd = false;
      }
      node.isEnd = true;
      setEndPos([row,col]);
    }
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