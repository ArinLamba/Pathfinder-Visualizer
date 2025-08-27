
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  children: React.ReactNode;
};

export function ActionTooltip({ children } : Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-neutral-800 text-neutral-100">
          <p className="text-sm">Click to View Tutorial</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
