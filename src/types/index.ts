export type NodeAttributes = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath?: boolean;
  parent?: [number, number] | null;
};
export type ModeSelection = "start" | "end" | "wall" | "visualize";
export type AlgoSelection = "BFS" | "DFS" | "DIJAKSTRA" | "A*" | null;

export type Position = [number, number] | null;

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

