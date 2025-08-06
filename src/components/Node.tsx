import { ArrowRight, Target } from "lucide-react";
import type { NodeAttributes } from "../types";

type Props = {
  node: NodeAttributes;
  onClick: (e: React.MouseEvent) => void;
}

export const Node = ({ node, onClick } : Props) => {

  const { isStart, isEnd, isVisited, isWall } = node;
  let className = "w-10 h-10 text-2xl flex items-center justify-evenly border border-black cursor-default";
  if(isStart) className += " bg-yellow-500";
  else if(isEnd) className += " bg-red-600";
  else if(isVisited) className += " bg-slate-300"
  else if(isWall) className += " bg-gray-700"
  else className += " bg-white hover:bg-slate-300 hover:scale-125 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transition-transform ease-in-out";
  
  return (
    <button 
      className={className}
      onClick={onClick}
      >
      {isStart ? <ArrowRight size={28} /> : ""}
      {isEnd ? <Target /> : ""}
    </button>
  );
};
