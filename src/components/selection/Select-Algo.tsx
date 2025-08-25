import { algorithms } from '@/lib/utils/constants';
import { type AlgoSelection } from '@/lib/types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"

import { ChevronDown } from "lucide-react"


type Props = {
  selectedAlgo: AlgoSelection;
  setSelectedAlgo: (algo: AlgoSelection) => void;
}

export function SelectAlgo({ setSelectedAlgo }: Props) {
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className="focus:outline-none"
        asChild
      >
        <Button 
          variant="secondary" 
          className="w-full dark:text-neutral-100 bg-transparent dark:bg-neutral-800 rounded dark:border-b dark:hover:bg-zinc-700/50 hover:bg-black/5 dark:border-b-indigo-400 transition"
        >
          Algorithm
          <ChevronDown className="w-5 h-4 ml-auto"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 space-y-[2px] font-medium dark:border-white/20 shadow-md border-2 border-t-0" align="start">
        {algorithms.map((algorithm) => (
          <DropdownMenuItem
            className="dark:text-indigo-500 px-3 py-2 text-sm cursor-pointer"
            onSelect={() => setSelectedAlgo(algorithm)}
          >
            {algorithm}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
