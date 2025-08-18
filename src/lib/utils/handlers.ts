import type { HandleEndProps, HandleStartProps, NodeAttributes } from "../types"
type AddWallsProps = Pick<HandleStartProps, "grid" | "row" | "col">;

export const cloneGrid = (grid: NodeAttributes[][]) => {
  return grid.map(row => row.map(node => ({...node})));
};


export const addWalls = ({
  grid,
  row,
  col
}: AddWallsProps) => {
  const node = grid[row][col];
  node.isWall = !node.isWall
};

export const handleStart = ({grid, row ,col, startPos,setStartPos}: HandleStartProps) => {
  const [prevRow, prevCol] = startPos;
  grid[row][col].isStart = true;
  grid[prevRow][prevCol].isStart = false;
  setStartPos([row,col]);
};

export const handleEnd = ({grid, row ,col, endPos, setEndPos}: HandleEndProps) => {
  const [prevRow, prevCol] = endPos;
  grid[row][col].isEnd = true;
  grid[prevRow][prevCol].isEnd = false;
  setEndPos([row,col]);
};