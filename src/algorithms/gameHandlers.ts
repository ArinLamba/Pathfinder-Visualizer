import type { handleStartEndProps, NodeAttributes } from "../types"

export const cloneGrid = (grid: NodeAttributes[][]) => {
  return grid.map(row => row.map(node => ({...node})));
}


export const handleStartEnd = ({
  mode,
  startPos,
  endPos,
  updateGrid,
  row,
  col,
  setStartPos,
  setEndPos,
}: handleStartEndProps) => {

  const node = updateGrid[row][col];

  if (mode === "start") {
    if (node.isEnd) return; // Don't allow placing start on end

    if (startPos) {
      const [prevRow, prevCol] = startPos;

      // Toggle off if clicking same start node
      if (prevRow === row && prevCol === col) {
        updateGrid[prevRow][prevCol].isStart = false;
        setStartPos(null);
        return;
      }

      updateGrid[prevRow][prevCol].isStart = false;
    }

    node.isStart = true;
    setStartPos([row, col]);
  }

  if (mode === "end") {
    if (node.isStart) return; // Don't allow placing end on start

    if (endPos) {
      const [prevRow, prevCol] = endPos;

      // Toggle off if clicking same end node
      if (prevRow === row && prevCol === col) {
        updateGrid[prevRow][prevCol].isEnd = false;
        setEndPos(null);
        return;
      }

      updateGrid[prevRow][prevCol].isEnd = false;
    }

    node.isEnd = true;
    setEndPos([row, col]);
  }
};
