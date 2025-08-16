import type React from "react";
import type { NodeAttributes, Position } from "../types"
import { directions, isValid } from "../utils/constants";
import { generateEmptyGrid } from "../utils/generateGrid";

type Props = {
  newGrid: NodeAttributes[][];
  startPos: Position;
  endPos: Position;
};

export const bfs = ({
  newGrid,
  startPos,
  endPos,
}: Props) : Position[] => {

  
  // to keep track of the vistied nodes on separete grid
  const visitedGrid = generateEmptyGrid();
  // to animate the bfs path
  const bfsPath: Position[] = [];


  const [startRow,startCol] = startPos;
  const [endRow, endCol] = endPos;
  
  const queue: Position[] = [];
  queue.push([startRow, startCol]);
  visitedGrid[startRow][startCol].isVisited = true;
  const cell = newGrid[startRow][startCol];
  cell.parent = null;
  // 
  bfsPath.push([startRow, startCol]);

  let head = 0;
  while(head < queue.length) {
    const [row, col] = queue[head++]

    if(row === endRow && col === endCol) {
      // return grid with parent and bfs path
      return bfsPath;
    }

    // into four directions 
    for(const [dx, dy] of directions) {
      const nrow = row + dx;
      const ncol = col + dy;
      if(!isValid(nrow, ncol)) continue;
      const neighbour = newGrid[nrow][ncol];

      if(visitedGrid[nrow][ncol].isVisited || neighbour.isWall) continue;
      queue.push([nrow,ncol]);
      neighbour.parent = [row,col];
      visitedGrid[nrow][ncol].isVisited = true;
      // to track the visited nodes in order to animate them
      bfsPath.push([nrow, ncol]);
    }
  }
  return  bfsPath;
};

export const getPath = (endPos: Position, grid: NodeAttributes[][]) : Position[] =>  {
  
  const [endR, endC] = endPos;
  const path: Position[] = [];
  let current: NodeAttributes = grid[endR][endC];

  while(current) {
    path.push([current.row, current.col]);
    if(!current.parent) break; // start node

    const [pr, pc] = current.parent;
    current = grid[pr][pc];
  }

  return path.reverse();
};

export const animateBFS = (
  bfsPath: Position[],
  setGrid: React.Dispatch<React.SetStateAction<NodeAttributes[][]>>
) => {
  return new Promise<void>(reslove => {
    bfsPath.forEach(([row, col], i) => {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];           // clone outer array
          const newRow = [...newGrid[row]];        // clone the specific row
          newRow[col] = { ...newRow[col], isVisited: true }; // clone the cell
          newGrid[row] = newRow;                   // replace the row
          return newGrid;
        });

        if(i === bfsPath.length - 1) reslove();
      }, 15 * i);
    })
  });
};


export const animatePath = (path: Position[] ,setGrid: React.Dispatch<React.SetStateAction<NodeAttributes[][]>>) => {

  return new Promise<void>(resolve => {
    path.forEach(([row,col], i) => {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];           // clone outer array
          const newRow = [...newGrid[row]];        // clone the specific row
          newRow[col] = { ...newRow[col], isPath: true }; // clone the cell
          newGrid[row] = newRow;                   // replace the row
          return newGrid;
        });

        if(i === path.length - 1) resolve();
      },30 * i );
    })
  })
};