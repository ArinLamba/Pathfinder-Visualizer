import type { HandleEndProps, HandleStartProps, NodeAttributes } from "@/lib/types"

type ObstacleProps = Pick<HandleStartProps, "row" | "col"> & {
  setGrid: React.Dispatch<React.SetStateAction<NodeAttributes[][]>>;
};

export const cloneGrid = (grid: NodeAttributes[][]) => {
  return grid.map(row => row.map(node => ({...node})));
};


export const addWalls = ({
  row,
  col,
  setGrid
}: ObstacleProps) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const newRow = [...newGrid[row]];
    const node = newRow[col];
    newRow[col] = { ...newRow[col], isWall: !node.isWall, weight: 99};
    newGrid[row] = newRow;
    return newGrid;
  })
};

export const addGrass = ({
  row,
  col,
  setGrid
}: ObstacleProps) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const newRow = [...newGrid[row]];
    const node = newRow[col];
    
    newRow[col] = node.isGrass ? 
      {...newRow[col], isGrass: false, weight: 1} : 
      {...newRow[col], isGrass: true, weight: 3};
    
    newGrid[row] = newRow;
    return newGrid;
  })
};

export const addWater = ({
  row,
  col,
  setGrid
}: ObstacleProps) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const newRow = [...newGrid[row]];
    const node = newRow[col];
    
    newRow[col] = node.isWater ? 
      {...newRow[col], isWater: false, weight: 1} : 
      {...newRow[col], isWater: true, weight: 6};
    
    newGrid[row] = newRow;
    return newGrid;
  })
};

export const addMountain = ({
  row,
  col,
  setGrid
}: ObstacleProps) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const newRow = [...newGrid[row]];
    const node = newRow[col];
    
    newRow[col] = node.isMountain ? 
      {...newRow[col], isMountain: false, weight: 1} : 
      {...newRow[col], isMountain: true, weight: 9};
    
    newGrid[row] = newRow;
    return newGrid;
  })
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