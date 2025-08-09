import type React from "react";
import type { HandleStartEndProps, NodeAttributes } from "../types"
import { directions, isValid } from "../utils/constants";
import { cloneGrid } from "./gameHandlers";


type Props = Pick<HandleStartEndProps, "grid" | "startPos" | "endPos">;


export const bfs = ({
  grid,
  startPos,
  endPos,
}: Props): [number,number][] => {

  if(startPos === null && endPos === null) return [];

  const [startRow,startCol] = startPos!;
  const [endRow, endCol] = endPos!;
  
  const queue: [number, number][] = [];
  queue.push([startRow, startCol]);
  const cell = grid[startRow][startCol];
  cell.parent = null;
  cell.isVisited = true;

  while(queue.length > 0) {
    const front = queue.shift();
    // ts shit
    if(!front) continue;

    const [row, col] = front;
    if(row === endRow && col === endCol) {
      //TODO: add something or return smallest path
      return getPath(endPos, grid);
    }

    // into four directions 
    for(const [dx, dy] of directions) {
      const nrow = row + dx;
      const ncol = col + dy;
      if(!isValid(nrow, ncol)) continue;
      const neighbour = grid[nrow][ncol];

      if(neighbour.isVisited || neighbour.isWall) continue;
      queue.push([nrow,ncol]);
      neighbour.parent = [row,col];
      neighbour.isVisited = true;
    }
  }
  return [];
};

export const getPath = (endPos: [number,number] | null, grid: NodeAttributes[][]) =>  {
  
  const [endR, endC] = endPos!;
  const path: [number,number][] = [];
  let current: NodeAttributes = grid[endR][endC];

  while(current) {
    path.push([current.row, current.col]);
    if(!current.parent) break; // start node

    const [pr, pc] = current.parent;
    current = grid[pr][pc];
  }

  return path.reverse();
};

export const animatePath = (path: [number,number][] ,setGrid: React.Dispatch<React.SetStateAction<NodeAttributes[][]>>) => {
  path.forEach(([row,col], i) => {
    setTimeout(() => {
      setGrid((prevGrid) => {
        const newGrid = cloneGrid(prevGrid);
        newGrid[row][col].isPath = true;
        return newGrid;
      })
    },100 * i);
  })
};