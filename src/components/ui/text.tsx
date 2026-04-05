import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const TEXT_STYLES = "bg-slate-950 p-4 rounded-md";

export function Text({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(TEXT_STYLES, className)}>{children}</div>
  );
}