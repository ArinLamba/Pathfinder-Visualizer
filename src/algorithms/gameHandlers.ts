import type { HandleStartEndProps, NodeAttributes } from "../types"

type AddWallsProps = Pick<HandleStartEndProps, "grid" | "row" | "col">;

export const cloneGrid = (grid: NodeAttributes[][]) => {
  return grid.map(row => row.map(node => ({...node})));
};


export const handleStartEnd = ({
  mode,
  startPos,
  endPos,
  grid,
  row,
  col,
  setStartPos,
  setEndPos,
}: HandleStartEndProps) => {

  const node = grid[row][col];
  // if the node is wall . there is nothing we can do (napolean)
  if(node.isWall) return;

  if (mode === "start") {
    if (node.isEnd) return; // Don't allow placing start on end

    if (startPos) {
      const [prevRow, prevCol] = startPos;

      // Toggle off if clicking same start node
      if (prevRow === row && prevCol === col) {
        grid[prevRow][prevCol].isStart = false;
        setStartPos(null);
        return;
      }

      grid[prevRow][prevCol].isStart = false;
    }

    node.isStart = true;
    setStartPos([row, col]);
  }

  else if (mode === "end") {
    if (node.isStart) return; // Don't allow placing end on start

    if (endPos) {
      const [prevRow, prevCol] = endPos;

      // Toggle off if clicking same end node
      if (prevRow === row && prevCol === col) {
        grid[prevRow][prevCol].isEnd = false;
        setEndPos(null);
        return;
      }

      grid[prevRow][prevCol].isEnd = false;
    }

    node.isEnd = true;
    setEndPos([row, col]);
  }
};

export const addWalls = ({
  grid,
  row,
  col
}: AddWallsProps) => {
  const node = grid[row][col];
  node.isWall = !node.isWall
};