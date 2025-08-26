import type { CallProps, GridType, Position } from "@/lib/types";

import { MinHeap } from "@/lib/datastructure/minHeap";
import { BOARD_COLS, BOARD_ROWS, directions, isValid } from "@/lib/utils/constants";

import { cloneGrid } from "@/lib/utils/handlers";
import { generateEmptyGrid } from "@/lib/utils/generateGrid";
import { getPath } from "@/lib/utils/getPath";
import { animatePath } from "@/animations/animatePath";
import { animateAstar } from "@/animations/animateASTAR";



export const callAstar= async ({
  grid,
  startPos,
  endPos,
  setGrid,
} : CallProps) => {
  const newGrid = cloneGrid(grid);
  const visitedNodes = astar({ newGrid, startPos, endPos });
  const shortestPath = getPath(endPos, newGrid);
  await animateAstar(visitedNodes, setGrid);
  await animatePath(shortestPath, setGrid);
};


type Props = {
  newGrid: GridType;
  startPos: Position;
  endPos: Position;
};


export const astar = ({
  newGrid,
  startPos,
  endPos,
} : Props) : Position[] => {

  const tempGrid = generateEmptyGrid();
  const visitedNodes : Position[] = [];
  const visited: boolean[][] = Array.from({ length : BOARD_ROWS }, () => Array.from({ length : BOARD_COLS }, () => false));
  const queue = new MinHeap<[number, number, number]>((a, b) => a[0] - b[0]);  

  const [startRow, startCol] = startPos;
  const [endRow, endCol] = endPos;

  queue.add([0, startRow, startCol]);
  newGrid[startRow][startCol].parent = null;

  tempGrid[startRow][startCol].f = 0;
  tempGrid[startRow][startCol].g = 0;
  tempGrid[startRow][startCol].h = 0;


  while(!queue.isEmpty()) {
    const front = queue.pop();
    if(!front) break;
    
    const [_, row, col] = front;

    if(visited[row][col]) continue;
    visited[row][col] = true;
    visitedNodes.push([row, col]);

    if(row === endRow && col === endCol) {
      // TODO: Return Path of Visited Nodes
      return visitedNodes;
    }

    for(const [dx, dy] of directions) {
      const nrow = row + dx;
      const ncol = col + dy;

      if(!isValid(nrow, ncol) || visited[nrow][ncol]) continue;
      const neighbour = newGrid[nrow][ncol];
      if(neighbour.isWall) continue;

      // check conditions before proceeding further
      // new G will be weight + distance till now ( dist )
      // new H will be calculateHvalue ( Manhatan distance for us -> 4 directions)
      // f = G + H
      
      const newG = tempGrid[row][col].g + neighbour.weight;   // dist is the old g it is just a fancy name for distance
      const newH = calculateHeuristic(nrow, ncol, endRow, endCol);
      const newF = newG + newH;

      const { f } = tempGrid[nrow][ncol];

      if(f === Infinity || newF < f) {
        queue.add([newF, nrow, ncol]);
        tempGrid[nrow][ncol] = {... tempGrid[nrow][ncol], f: newF, g: newG, h: newH};
        neighbour.parent = [row, col];

      }

    }

  }
  return visitedNodes;

};

// Manhattan Distance
const calculateHeuristic = (cellRow: number, cellCol: number, destRow: number, destCol: number) =>  {
  return Math.abs(cellRow - destRow) + Math.abs(cellCol - destCol);
}