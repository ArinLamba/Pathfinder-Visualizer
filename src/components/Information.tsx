
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Instructions } from "./Instructions";
import { Info } from "lucide-react";

export const Information = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="text-cyan-600 hover:cursor-pointer hover:text-cyan-400 transition delay-0 size-6"/>
        </TooltipTrigger>
        <TooltipContent>
          <Instructions />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
   );
};