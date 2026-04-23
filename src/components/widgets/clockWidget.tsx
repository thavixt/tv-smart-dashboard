import { CalendarDaysIcon } from "lucide-react";
import { AiGreetingWidget } from "./aiGreetingWidget";
import { cn } from "../../lib/utils";
import { Clock, getCurrentDate } from "../clock";
import { Text } from "../../components/ui/text";

export function ClockWidget({ className }: { className?: string }) {
  const date = getCurrentDate({ year: undefined });
  const [d1, d2] = date.split(", ");
  return (
    <div className={cn("flex flex-col md:flex-row gap-4 items-center justify-between", className)}>
      <div className="flex gap-2">
        <Text className="flex flex-col gap-4 text-4xl items-center justify-center">
          <div><CalendarDaysIcon size="48" /></div>
          <div><span>{d1}, {d2}</span></div>
          <Clock className="p-4 text-7xl" iso />
        </Text>
        <AiGreetingWidget className="row-span-2 col-span-2" />
      </div>
    </div>
  )
}
