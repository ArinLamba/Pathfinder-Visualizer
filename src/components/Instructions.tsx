import { ArrowRight, Target } from "lucide-react";

export const Instructions = () => {
   const legendItems = [
    { label: "Start Node", icon: <ArrowRight size={20} className="text-black" />, bg: "#f3d500" },
    { label: "Target Node", icon: <Target size={20} className="text-black" />, bg: "#dc2626" },

    { label: "Wall Node", bg: "#d4d4d8", subtitle:"Hold and Drag to draw walls" },
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
            {item.icon || null}
          </div>
          <p className="text-neutral-200">{item.label}</p>
          {/* <span>{item.subtitle || null}</span> */}
        </div>
      ))}
    </div>
  );
};
