import type { CallProps, GridType, NodeAttributes, Position } from "@/lib/types";
import { MinHeap } from "@/lib/datastructure/minHeap";
import { directions, isValid } from "@/lib/utils/constants";

import { generateEmptyGrid } from "@/lib/utils/generateGrid";
import { getPath } from "@/lib/utils/getPath";
import { cloneGrid } from "@/lib/utils/handlers";
import { animateDijkstra } from "@/animations/animateDijkstra";
import { animatePath } from "@/animations/animatePath";

export const callDijkstra= async ({
  grid,
  startPos,
  endPos,
  setGrid,
} : CallProps) => {
  const newGrid = cloneGrid(grid);
  const visitedNodes  = dijkstra({newGrid, startPos, endPos});
  const shortestPath = getPath(endPos, newGrid);
  await animateDijkstra(visitedNodes, setGrid);
  await animatePath(shortestPath, setGrid);
};


type Props = {
  newGrid: GridType;
  startPos: Position;
  endPos: Position
};

export const dijkstra = ({
  newGrid,
  startPos,
  endPos,
}: Props): Position[] => {
  const [startRow, startCol] = startPos;
  const [endRow, endCol] = endPos;

  const visitedGrid = generateEmptyGrid();
  const visitedNodes: Position[] = [];  // final path to return for animation
  const dist: number[][] = Array.from({length : newGrid.length}, () => Array(newGrid[0].length).fill(Infinity));
  const cell = newGrid[startRow][startCol];

  const queue = new MinHeap<[number, number, number]>((a, b) => a[0] - b[0]);  // [dist, row, col]
  
  queue.add([0, startRow, startCol]);
  dist[startRow][startCol] = 0;
  cell.parent = null;

  while(!queue.isEmpty()) {
    const front = queue.pop();
    if(!front) break;

    const [distance, row, col] = front;
    if (distance > dist[row][col]) continue;
    if(visitedGrid[row][col].isVisited) continue;

    visitedGrid[row][col].isVisited = true;
    visitedNodes.push([row,col]);

    if(row === endRow && col === endCol) {
      return visitedNodes;
    }
    
    for(const [dx, dy] of directions) {
      const nrow = row + dx;
      const ncol = col + dy;

      if(!isValid(nrow, ncol)) continue;
      const neighbour = newGrid[nrow][ncol];
      const distTillNow = distance + neighbour.weight;

      if(isBlocked(neighbour)) continue;

      if(distTillNow < dist[nrow][ncol]) {
        dist[nrow][ncol] = distTillNow;
        queue.add([dist[nrow][ncol], nrow, ncol]);
        neighbour.parent = [row, col];
      }
    }
  }
  return visitedNodes;
};

function isBlocked(node: NodeAttributes): boolean {
  return node.isWall; // Walls are always blocked, terrains are never blocked anymore
}
