// hooks/useDebouncedBfs.ts
import { useRef } from "react";
import { callBfs } from "@/algorithms/bfs";
import type { GridType, Position } from "@/lib/types";

export const useDebouncedBfs = (delay = 50) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const runBfs = (
    grid: GridType,
    startPos: Position,
    endPos: Position,
    setGrid: React.Dispatch<React.SetStateAction<GridType>>
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      callBfs({ grid, startPos, endPos, setGrid, instant: true });
    }, delay);
  };

  return runBfs;
};
