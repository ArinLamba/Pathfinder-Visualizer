import { ArrowRight, Target } from "lucide-react";
import type { NodeAttributes } from "../types";

type Props = {
  node: NodeAttributes;
  onClick: () => void;
}

export const Node = ({ node, onClick } : Props) => {

  const { isStart, isEnd } = node;
  let className = "w-10 h-10 text-2xl flex items-center justify-evenly border border-black cursor-default";
  if(isStart) className += " bg-yellow-500";
  else if(isEnd) className += " bg-red-600";
  else className += " bg-white";
  
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
