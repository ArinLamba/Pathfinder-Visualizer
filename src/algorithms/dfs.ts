import type { NodeAttributes, Position } from "../lib/types"
import { BOARD_COLS, BOARD_ROWS, directions, isValid } from "../lib/utils/constants";

type Props = {
  grid: NodeAttributes[][];
  startPos: Position;
  endPos: Position;
};

export const dfs = ({
  grid,
  startPos,
  endPos,
} : Props) : Position[] => {

  const visited: boolean[][] = Array.from({ length: BOARD_ROWS}, () => Array.from({ length: BOARD_COLS } , () => false));

  const [startRow, startCol] = startPos;
  const [endRow, endCol] = endPos;

  let stopPropogation: boolean = false;
  const dfsPath: Position[] = [];

  function dfsTraversal(row: number, col: number) {
    visited[row][col]= true;
    dfsPath.push([row,col]);
    if(row === endRow && col === endCol){
      stopPropogation = true;
      return;
    } 

    for(const [dx, dy] of directions) {
      const nrow = row + dx;
      const ncol = col + dy;
      // if we find the target no need to go any further
      if(stopPropogation) break;

      if(!isValid(nrow,ncol)) continue;
      const neighbour = grid[nrow][ncol];
      if(visited[nrow][ncol] || neighbour.isWall) continue;

      dfsTraversal(nrow, ncol);
    }
  }
  dfsTraversal(startRow, startCol);
  return dfsPath;
};