import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const TEXT_STYLES = "xs:text-xs sm:text-sm md:text-md md:text-xl lg:text-2xl xl:text-3xl text-left text-shadow-lg text-shadow-black/75 text-white/75";

export function Text({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(TEXT_STYLES, className)}>{children}</div>
  );
}