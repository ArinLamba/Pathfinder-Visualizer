

export type NodeAttributes = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isWall: boolean;
  isGrass: boolean;
  isWater: boolean;
  isMountain: boolean;
  weight: number;
  isWeightedVisited?: boolean;
  isPath?: boolean;
  parent?: NodeAttributes | null;

  // For Bidirectional BFS
  parentFront?: NodeAttributes | null;
  parentBack?: NodeAttributes | null;

  // New fields for A* animation
  direction?: "up" | "down" | "left" | "right" | "up-left" | "up-right" | "down-left" | "down-right";
  pathSteps?: string[]; // e.g., ["f", "l", "f"]
};

export type GridType = NodeAttributes[][];
export type ModeSelection = "draggingStart" | "draggingEnd" | null;
export type AlgoSelection = "BFS" | "DFS" | "DIJKSTRA" | "A*" | "Bidirectional BFS" | "Greedy Best-First-Search" | null;
export type ObstacleSelection = "Wall" | "Grass" | "Water" | "Mountain" | null;
export type MazeSelection = "Recursive Division" | "Vertical Skew" | "Horizontal Skew" | null;

export type Position = [number, number];

export type CallProps = {
  grid: GridType;
  startPos: Position;
  endPos: Position;
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  instant?: boolean;
};

export type HandleStartProps = {
  startPos: Position;
  grid: NodeAttributes[][];
  row: number;
  col: number;
  setStartPos: (pos: Position) => void;
};

export type HandleEndProps = {
  endPos: Position;
  grid: NodeAttributes[][];
  row: number;
  col: number;
  setEndPos: (pos: Position) => void;
};
