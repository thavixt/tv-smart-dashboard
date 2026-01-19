import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const TEXT_STYLES = "bg-gray-950 p-2 rounded-md";

interface TextProps {
  children: ReactNode;
  className?: string;
}

export function Text({ children, className }: TextProps) {
  return (
    <div className={cn(TEXT_STYLES, className)}>{children}</div>
  );
}