import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { PropsWithChildren } from "react";

export interface TileProps extends PropsWithChildren {
  w: number;
  h: number;
  loading?: boolean;
  className?: string;
}

export function Tile({ w, h, loading, children, className }: TileProps) {
  return (
    <div className={cn(
      getColSpan(w),
      getRowSpan(h),
      "w-full h-full text-center flex flex-col items-center justify-center",
      className,
    )}>
      {loading ? <LoaderCircle className="animate-spin size-20 opacity-50" /> : children}
    </div>
  )
}

const getColSpan = (span: number): string => {
  switch (span) {
    case 1: return 'col-span-1';
    case 2: return 'col-span-2';
    case 3: return 'col-span-3';
    case 4: return 'col-span-4';
    case 5: return 'col-span-5';
    case 6: return 'col-span-6';
    case 7: return 'col-span-7';
    case 8: return 'col-span-8';
    case 9: return 'col-span-9';
    case 10: return 'col-span-10';
    case 11: return 'col-span-11';
    case 12: return 'col-span-12';
    default: return 'col-span-1';
  }
}

const getRowSpan = (span: number): string => {
  switch (span) {
    case 1: return 'row-span-1';
    case 2: return 'row-span-2';
    case 3: return 'row-span-3';
    case 4: return 'row-span-4';
    case 5: return 'row-span-5';
    case 6: return 'row-span-6';
    case 7: return 'row-span-7';
    case 8: return 'row-span-8';
    case 9: return 'row-span-9';
    case 10: return 'row-span-10';
    case 11: return 'row-span-11';
    case 12: return 'row-span-12';
    default: return 'row-span-1';
  }
}