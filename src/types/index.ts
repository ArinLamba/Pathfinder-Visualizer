export type NodeAttributes = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
};
export type ModeSelection = "start" | "end" | "wall" | "visualize";
export type AlgoSelection = "BFS" | "DFS" | "DIJAKSTRA" | "A*" | null;

type Position = [number, number];

export type HandleStartEndProps = {
  mode: SelectionMode;
  startPos: Position | null;
  endPos: Position | null;
  grid: NodeAttributes[][];
  row: number;
  col: number;
  setStartPos: (pos: Position | null) => void;
  setEndPos: (pos: Position | null) => void;
};

