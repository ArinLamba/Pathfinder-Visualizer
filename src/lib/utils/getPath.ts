import type { NodeAttributes } from "@/lib/types";

export const getPath = (endNode: NodeAttributes): NodeAttributes[] => {
  const path: NodeAttributes[] = [];
  let current: NodeAttributes | null = endNode;

  while (current) {
    path.push(current);
    current = current.parent ?? null;
  }

  return path.reverse();
};
