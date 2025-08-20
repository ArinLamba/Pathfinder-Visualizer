import { ArrowRight, BrickWall, Leaf, MountainSnow, Target, Waves } from "lucide-react";

export const Instructions = () => {
   const legendItems = [
    { label: "Start Node", icon: <ArrowRight size={20} className="text-black" />, bg: "#f3d500" },
    { label: "Target Node", icon: <Target size={20} className="text-black" />, bg: "#dc2626" },
    { label: "Water Node", icon: <Waves  size={20} className="text-black" />, bg: "#22d3ee"},
    { label: "Grass Node", icon: <Leaf  size={20} className="text-black" />, bg: "#a3e635"},
    { label: "Mountain Node", icon: <MountainSnow  size={20} className="text-black" />, bg: "#a78bfa"},
    { label: "Wall Node", icon: <BrickWall  size={20} className="text-black" />, bg: "#ef4444", subtitle:"Hold and Drag to draw walls" },
    { label: "Shortest Path Node", bg: "#fbbf24" },
    { label: "Visited Node",bg: "#9333ea" },
    { label: "Unvisited Node", bg: "#0a0a0a" },
  ];

  return (
    <div className="mx-2 pt-4 flex flex-wrap md:flex-row gap-4 md:gap-x-12 justify-center items-center text-neutral-100 text-lg">
      {legendItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-x-3">
          <div
            className="w-7 h-7 flex items-center justify-center rounded-sm"
            style={{ backgroundColor: item.bg }}
          >
            
          </div>
          <p className="text-neutral-200">{item.label}</p>
          {/* <span>{item.subtitle || null}</span> */}
        </div>
      ))}
    </div>
  );
};
