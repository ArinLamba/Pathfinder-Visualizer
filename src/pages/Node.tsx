import React from "react";
import { ChevronLeft, ChevronRight, Target, Weight } from "lucide-react";
import type { ModeSelection, NodeAttributes, Position } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  node: NodeAttributes;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  mode: ModeSelection;
  startPos: Position;
  endPos: Position;
  onKeyDown: (e: React.KeyboardEvent) => void;
};

export const Node = React.memo(
  ({ node, onMouseDown, onMouseEnter, mode, startPos, endPos, onKeyDown }: Props) => {
    const { row, col, isVisited, isWall, isPath, isGrass, isWater, isMountain, weight, isWeightedVisited } = node;

    const isStart = row === startPos[0] && col === startPos[1];
    const isEnd = row === endPos[0] && col === endPos[1];
    const facingRight = startPos[1] - endPos[1] < 1;
    

    // dragging flags
    const isDragging = mode === "draggingStart" || mode === "draggingEnd";
    const isDraggingStart = mode === "draggingStart" && isStart;
    const isDraggingEnd = mode === "draggingEnd" && isEnd;

    // skip animation while dragging or if node is marked to skip animation
    const skipAnimation = isDragging

    let className = "aspect-square relative h-full flex items-center justify-center border-[0.1px] border-sky-300/60 dark:border-neutral-800 cursor-default";

    if (isStart) className += " bg-yellow-500";
    else if (isEnd) className += " bg-red-600";
    else if (isWall) className += skipAnimation ? " bg-[#0D0D0D] dark:bg-[#d4d4d8]" : " dark:animate-wallCell animate-LightWallCell";
    else if (isPath) className += skipAnimation ? " bg-[#fbbf24]" : " animate-pathHighlight";
    else if (weight === 15) className += " animate-weightedVisitedCell dark:text-white bg-background";
    else if (isWater) className += skipAnimation ? " bg-[#1d4ed8]" : " animate-waterCell";
    else if (isGrass) className += skipAnimation ? " bg-[#15803d]" : " animate-grassCell z-50";
    else if (isMountain) className += skipAnimation ? " bg-[#8b5e3c]" : " animate-mountainCell";
    else if (isVisited) className += skipAnimation ? " bg-[#9333ea]" : " dark:animate-visitedCell animate-LightVisitedCell";
    else className += " dark:bg-neutral-950 bg-white dark:hover:bg-neutral-800 hover:bg-white/10 transition ease-in-out";
    
    if (isDraggingStart) className += " scale-110 ring-1 ring-green-600 shadow-lg shadow-green-500/40";
    if (isDraggingEnd) className += " scale-110 ring-1 ring-red-400 shadow-lg shadow-red-500/40";
    if (isWeightedVisited) className += " pulseOverlay";

    return (
      <button
        className={cn(
          className,
          isDragging && (isStart || isEnd) ? " animate-pulseScale" : "",
        )}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onKeyDown={onKeyDown}
      >
        {isStart && (facingRight ? <ChevronRight className="aspect-square bg-yellow-500" color="black" /> : <ChevronLeft className="aspect-square bg-yellow-500" color="black" />)}
        {isEnd && <Target className="aspect-square bg-red-600" color="black" />}
        {!isStart && !isEnd && weight === 15 && <Weight className="aspect-square" />}
      </button>
    );
  }
);