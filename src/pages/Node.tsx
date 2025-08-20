import React from "react";

import { ArrowRight, Target } from "lucide-react";

import type { ModeSelection, NodeAttributes, Position } from "@/lib/types";

type Props = {
  node: NodeAttributes;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  mode: ModeSelection;
  startPos: Position;
  endPos: Position;
};

export const Node = React.memo(({ node, onMouseDown, onMouseEnter, mode, startPos, endPos } : Props) => {

  const { row, col, isVisited, isWall, isPath, isGrass, isWater, isMountain } = node;
  const isStart = row === startPos[0] && col === startPos[1];
  const isEnd = row === endPos[0] && col === endPos[1]; 
  const isDraggingStart = mode === "draggingStart" && isStart;
  const isDraggingEnd = mode === "draggingEnd" && isEnd;
  const isHolding = mode === "draggingStart" || mode === "draggingEnd";

  
  let className = "aspect-square h-full flex items-center justify-center border-[0.1px] border-neutral-800 cursor-default";
  if(isStart) className += " bg-yellow-500";
  else if(isEnd) className += " bg-red-600";
  else if(isPath) className += " animate-pathHighlight";
  else if(isWater) className += " animate-waterCell";
  else if(isGrass) className += " animate-grassCell";
  else if(isMountain) className += " animate-mountainCell";
  else if(isWall) className += " animate-wallCell";
  else if(isVisited) className += " animate-visitedCell";
  else className += " bg-neutral-950 hover:bg-neutral-600 hover:scale-125 transition-transform ease-in-out";

  if(isDraggingStart) className += " scale-110 ring-2 ring-green-600 shadow-lg shadow-green-500/40";
  if(isDraggingEnd) className += " scale-110 ring-2 ring-red-400 shadow-lg shadow-red-500/40";
  
  return (
    <button 
      className={`
        ${className}
        ${isHolding && (isStart || isEnd) ? " animate-pulseScale" : ""}
      `}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
      >
      {isStart ? <ArrowRight className=" aspect-square" /> : ""}
      {isEnd ? <Target className=" aspect-square"/> : ""}
    </button>
  );
});
