import type { HandleStartEndProps } from "../types"
import { directions, isValid } from "../utils/constants";


type Props = Pick<HandleStartEndProps, "grid" | "startPos" | "endPos">;


export const bfs = ({
  grid,
  startPos,
  endPos
}: Props) => {

  if(startPos === null&& endPos === null) return;

  const [startRow,startCol] = startPos!;
  const [endRow, endCol] = endPos!;
  
  const queue: [number, number][] = [];
  queue.push([startRow, startCol]);
  const cell = grid[startRow][startCol];
  cell.isVisited = true;

  while(queue.length > 0) {
    const front = queue.shift();
    // ts shit
    if(!front) continue;

    const [row, col] = front;
    if(row === endRow && col === endCol) {
      //TODO: add something or return smallest path
      break;

    }

    // into four directions 
    for(const [dx, dy] of directions) {
      const nrow = row + dx;
      const ncol = col + dy;
      if(!isValid(nrow, ncol)) continue;
      const neighbour = grid[nrow][ncol];

      if(neighbour.isVisited || neighbour.isWall) continue;
      queue.push([nrow,ncol]);
      neighbour.isVisited = true;
    }
  }
};