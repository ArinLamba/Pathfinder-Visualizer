import { ArrowRight, Target, Weight } from "lucide-react";

export const Instructions = () => {
   const legendItems = [
    { label: "Start Node", icon: <ArrowRight size={18} className="text-black" />, bg: "#f3d500" },
    { label: "Target Node", icon: <Target size={18} className="text-black" />, bg: "#dc2626" },
    { label : "Weight Node (15)", icon: <Weight size={18}  />},
    { label: "Wall Node", bg: "#d4d4d8" },
    { label: "Shortest Path Node", bg: "#fbbf24" },
    { label: "Visited Node",bg: "#9333ea" },
    { label: "Unvisited Node", bg: "#0a0a0a" },
  ];

  return (
    <div className="mx-2 pt-4 flex flex-wrap md:flex-row gap-4 md:gap-x-12 justify-center items-center text-lg">
      {legendItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-x-3">
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-[2px]`}
            style={{ backgroundColor: item.bg }}
          >
            {item.icon || null}
          </div>
          <p className="dark:text-neutral-200">{item.label}</p>
        </div>
      ))}
    </div>
  );
};
