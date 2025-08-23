import { create } from "zustand";

import type { ObstacleSelection } from "@/lib/types";

type UseObstacleState = {
  obstacle: ObstacleSelection;
  setObstacle: (obstacle: ObstacleSelection) => void;
};

export const useObstacle = create<UseObstacleState>((set) => ({
  obstacle: null,
  setObstacle: (obstacle: ObstacleSelection) => set({obstacle: obstacle}),
}))