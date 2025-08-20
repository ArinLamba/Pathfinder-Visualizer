import { algorithms } from '@/lib/utils/constants';
import { type AlgoSelection } from '@/lib/types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"

import { ChevronDown } from "lucide-react"


type Props = {
  selectedAlgo: AlgoSelection;
  setSelectedAlgo: (algo: AlgoSelection) => void;
}

export function SelectAlgo({ selectedAlgo, setSelectedAlgo }: Props) {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className="focus:outline-none"
        asChild
      >
        <Button 
          variant="secondary" 
          className="w-full text-neutral-100 rounded font-semibold tracking-wider border-b border-b-indigo-700 transition"
        >
          {selectedAlgo ? `${selectedAlgo}` : 'Select Algorithm'}
          <ChevronDown className="w-5 h-4 ml-auto"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 text-xs bg-black space-y-[2px] font-medium border-white/20 border-2 border-t-0" align="start">
        {algorithms.map((algorithm) => (
          <DropdownMenuItem
            className="text-indigo-500 px-3 py-2 text-sm tracking-wider cursor-pointer focus:bg-neutral-800 focus:text-indigo-300"
            onSelect={() => setSelectedAlgo(algorithm)}
          >
            {algorithm}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
