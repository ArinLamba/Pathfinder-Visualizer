import { ArrowRight, Target } from "lucide-react";
import type { NodeAttributes } from "../types";

type Props = {
  node: NodeAttributes;
  onMouseDown: () => void;
  onMouseEnter: () => void;
}

export const Node = ({ node, onMouseDown, onMouseEnter } : Props) => {

  const { isStart, isEnd, isVisited, isWall, isPath } = node;
  let className = "md:w-8 md:h-8 h-5 w-5 text-2xl flex items-center justify-evenly border rounded border-black cursor-default";
  if(isStart || isPath) className += " bg-yellow-500";
  else if(isEnd) className += " bg-red-600";
  else if(isVisited) className += " bg-slate-300"
  else if(isWall) className += " bg-gray-700"
  else className += " bg-white hover:bg-slate-300 hover:scale-125 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transition-transform ease-in-out";
  
  return (
    <button 
      className={className}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}

      >
      {isStart ? <ArrowRight size={28} /> : ""}
      {isEnd ? <Target /> : ""}
    </button>
  );
};
