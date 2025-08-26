import { Guide } from "./Guide";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Info } from "lucide-react";
import { ActionTooltip } from "./ActionTooltip";
import { useEffect, useState } from "react";

export const Tutorial = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ActionTooltip>
        <DialogTrigger asChild>
          <Info className="text-cyan-600 hover:cursor-pointer hover:text-cyan-400 transition delay-0 size-6"/>
        </DialogTrigger>
      </ActionTooltip>
      <DialogContent  className="max-w-[920px] p-0">
        <Guide />
      </DialogContent>
      
    </Dialog>
  );
};