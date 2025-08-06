
export const generateGrid = () => {
  return Array.from({length: 15}, (_, i) =>
    Array.from({length: 15}, (_, j) => ({
      row: i,
      col: j,
      isStart:false,
      isEnd: false,
      isWall: false,
      isVisited: false,
    }))
  );
};