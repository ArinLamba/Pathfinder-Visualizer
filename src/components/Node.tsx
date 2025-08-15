import React from "react";

import { ArrowRight, Target } from "lucide-react";

import type { NodeAttributes } from "../types";

type Props = {
  node: NodeAttributes;
  onToggleWall: () => void;
  onMouseEnter: () => void;
}

export const Node = React.memo(({ node, onToggleWall, onMouseEnter } : Props) => {

  const { isStart, isEnd, isVisited, isWall, isPath } = node;

  let className = "aspect-square h-full rounded-sm flex items-center justify-center border-[0.1px] border-neutral-800 cursor-default";
  if(isStart) className += " bg-yellow-500";
  else if(isEnd) className += " bg-red-600";
  else if(isPath) className += " animate-pathHighlight";
  else if(isVisited) className += " animate-Visit";
  else if(isWall) className += " animate-wallBuild";
  else className += " bg-neutral-950 hover:bg-neutral-600 hover:scale-125 transition-transform ease-in-out";
  
  return (
    <button 
      className={className}
      onMouseDown={onToggleWall}
      onMouseEnter={onMouseEnter}
      >
      {isStart ? <ArrowRight className="aspect-square" /> : ""}
      {isEnd ? <Target className="aspect-square"/> : ""}
    </button>
  );
});
