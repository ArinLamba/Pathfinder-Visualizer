
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Info } from "lucide-react";

export const Tutorial = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="text-cyan-600 hover:cursor-pointer hover:text-cyan-400 transition delay-0 size-6"/>
        </TooltipTrigger>
        <TooltipContent>
          
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
   );
};