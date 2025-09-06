// import type { CallProps, Position } from "@/lib/types";
// import { directions, isValid } from "@/lib/utils/constants";
// import { getPath } from "@/lib/utils/getPath";
// import { startTransition } from "react";

// // --- reset helper (faster than clone) ---
// const resetGridForAfterAlgo = (grid: any) => {
//   for (let row of grid) {
//     for (let cell of row) {
//       cell.isVisited = false;
//       cell.isPath = false;
//       cell.parent = null;
//     }
//   }
// };

// // --- debounce helper ---
// let bfsTimeout: NodeJS.Timeout | null = null;

// export const bfsAfter = ({
//   grid,
//   startPos,
//   endPos,
//   setGrid,
// }: CallProps) => {
//   if (bfsTimeout) clearTimeout(bfsTimeout);

//   bfsTimeout = setTimeout(() => {
//     // reset instead of deep clone
//     resetGridForAfterAlgo(grid);

//     const [startRow, startCol] = startPos;
//     const [endRow, endCol] = endPos;

//     const queue: Position[] = [];
//     queue.push([startRow, startCol]);
//     grid[startRow][startCol].parent = null;
//     grid[startRow][startCol].isVisited = true;

//     let head = 0;
//     while (head < queue.length) {
//       const [row, col] = queue[head++];

//       if (row === endRow && col === endCol) break;

//       for (const [dx, dy] of directions) {
//         const nrow = row + dx;
//         const ncol = col + dy;

//         if (!isValid(nrow, ncol)) continue;
//         const neighbour = grid[nrow][ncol];
//         if (neighbour.isWall || neighbour.isVisited) continue;

//         neighbour.isVisited = true;
//         neighbour.parent = grid[row][col];
//         queue.push([nrow, ncol]);
//       }
//     }

//     // reconstruct shortest path
//     const shortestPath = getPath(endPos, grid);
//     for (const [row, col] of shortestPath) {
//       grid[row][col].isPath = true;
//     }

//     // batch update to avoid blocking UI
//     startTransition(() => {
//       setGrid([...grid]); // spread for shallow re-render
//     });
//   }, 60); // debounce 60ms
// };
