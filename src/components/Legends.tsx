import { ArrowRight, Target, Weight } from "lucide-react";

export const Legends = () => {
   const legendItems = [
    { label: "Start Node", icon: <ArrowRight size={18} className="text-black" />, bg: "bg-[#f3d500]" },
    { label: "Target Node", icon: <Target size={18} className="text-black" />, bg: "bg-[#dc2626]" },
    { label : "Weight Node (15)", icon: <Weight size={18}  />},
    { label: "Wall Node", bg: "dark:bg-[#d4d4d8] bg-[#0D0D0D]" },
    { label: "Shortest Path Node", bg: "bg-[#fbbf24]" },
    { label: "Visited Node",bg: "bg-[#9333ea]" },
    { label: "Unvisited Node", bg: "dark:bg-[#0a0a0a] bg-white dark:border-none border border-sky-500 " },
  ];

  return (
    <div className="mx-2 pt-4 flex flex-wrap md:flex-row gap-4 md:gap-x-12 justify-center items-center text-lg">
      {legendItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-x-3">
          <div
            className={`w-5 h-5 flex items-center ${item.bg} justify-center rounded-[2px]`}
          >
            {item.icon || null}
          </div>
          <p className="dark:text-neutral-200">{item.label}</p>
        </div>
      ))}
    </div>
  );
};
