import type { HandleEndProps, HandleStartProps, NodeAttributes } from "../types"
type AddWallsProps = Pick<HandleStartProps, "grid" | "row" | "col">;

export const cloneGrid = (grid: NodeAttributes[][]) => {
  return grid.map(row => row.map(node => ({...node})));
};

export const handleStart = ({
  startPos,
  grid,
  row,
  col,
  setStartPos,
}: HandleStartProps) => {
  const node = grid[row][col];
  // if the node is wall . there is nothing we can do (napolean)
  // Don't allow placing start on end
  if(node.isWall || node.isEnd) return;
  
  const [prevRow, prevCol] = startPos;

  // Toggle off if clicking same start node
  if (prevRow === row && prevCol === col) {
    grid[prevRow][prevCol].isStart = false;
    setStartPos([11,14]);
    return;
  }
  grid[prevRow][prevCol].isStart = false;

  node.isStart = true;
  setStartPos([row, col]);

};
export const handleEnd = ({
  endPos,
  grid,
  row,
  col,
  setEndPos,
}: HandleEndProps) => {

  const node = grid[row][col];
  // if the node is wall . there is nothing we can do (napolean)
  // Don't allow placing end on start
  if(node.isWall || node.isStart) return;

  const [prevRow, prevCol] = endPos;
  // Toggle off if clicking same end node
  if (prevRow === row && prevCol === col) {
    grid[prevRow][prevCol].isEnd = false;
    setEndPos([11,41]);
    return;
  }
  grid[prevRow][prevCol].isEnd = false;

  node.isEnd = true;
  setEndPos([row, col]);
  
};

export const addWalls = ({
  grid,
  row,
  col
}: AddWallsProps) => {
  const node = grid[row][col];
  node.isWall = !node.isWall
};