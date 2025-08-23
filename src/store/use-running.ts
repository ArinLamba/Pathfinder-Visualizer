import { create } from "zustand";

type UseRunningState = {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
};

export const useRunning = create<UseRunningState>((set) => ({
  isRunning: false,
  setIsRunning: (state) => set({isRunning: state})
}));