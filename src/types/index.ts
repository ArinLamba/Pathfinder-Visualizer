export type NodeAttributes = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
};

// will see if there is any need
export type NodeProps = {
  node: NodeAttributes;
  onClick: () => void;
};


