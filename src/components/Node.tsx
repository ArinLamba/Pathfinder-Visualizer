
import { ArrowRight, Target } from "lucide-react";

import type { NodeAttributes } from "../types";

type Props = {
  node: NodeAttributes;
  onToggleWall: () => void;
  onMouseEnter: () => void;
}

export const Node = ({ node, onToggleWall, onMouseEnter } : Props) => {

  const { isStart, isEnd, isVisited, isWall, isPath } = node;

  let className = "md:w-7 md:h-7 h-5 w-5 text-2xl flex items-center justify-evenly border-[0.1px] rounde border-black cursor-default";
  if(isStart || isPath) className += " bg-yellow-500";
  else if(isEnd) className += " bg-red-600";
  else if(isVisited) className += " bg-[#CC00FF]";
  else if(isWall) className += " bg-gray-700";
  else className += " bg-white hover:bg-slate-500 hover:scale-125 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transition-transform ease-in-out";
  
  return (
    <button 
      className={className}
      onMouseDown={onToggleWall}
      onMouseEnter={onMouseEnter}
      >
      {isStart ? <ArrowRight size={24} /> : ""}
      {isEnd ? <Target size={24} /> : ""}
    </button>
  );
};
