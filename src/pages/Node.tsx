import React from "react";

import { ArrowRight, Target, Weight } from "lucide-react";

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
    const isDraggingStart = mode === "draggingStart" && isStart;
    const isDraggingEnd = mode === "draggingEnd" && isEnd;
    const isHolding = mode === "draggingStart" || mode === "draggingEnd";

    let className =
      "aspect-square relative h-full flex items-center justify-center border-[0.1px] border-sky-300/60 dark:border-neutral-800 cursor-default";

    if (isStart) className += " bg-yellow-500";
    else if (isEnd) className += " bg-red-600";
    else if (isPath) className += " bg-yellow-500 animate-pathHighlight";
    else if (isVisited) className += " bg-purple-600 dark:animate-visitedCell animate-LightVisitedCell";
    if (isWeightedVisited) className += " pulseOverlay";
    else if (weight === 15) className += " animate-weightedVisitedCell dark:text-white bg-background";
    else if (isWater) className += " animate-waterCell";
    else if (isGrass) className += " animate-grassCell";
    else if (isMountain) className += " animate-mountainCell";
    else if (isWall) className += " dark:animate-wallCell animate-LightWallCell";
    else className += " dark:bg-neutral-950 bg-white dark:hover:bg-neutral-800 hover:bg-white/10 transition ease-in-out";

    if (isDraggingStart) className += " scale-110 ring-1 ring-green-600 shadow-lg shadow-green-500/40";
    if (isDraggingEnd) className += " scale-110 ring-1 ring-red-400 shadow-lg shadow-red-500/40";

    return (
      <button
        className={cn(
          className, 
          isHolding && (isStart || isEnd) ? " animate-pulseScale" : "",
        )}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onKeyDown={onKeyDown}
      >
        {isStart && <ArrowRight className="aspect-square bg-yellow-500" color="black" />}
        {isEnd && <Target className="aspect-square bg-red-600" color="black" />}
        {!isStart && !isEnd && weight === 15 && <Weight className="aspect-square" />}
        
      </button>
    );
  }
);

