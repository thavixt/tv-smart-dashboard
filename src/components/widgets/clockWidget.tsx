import { CalendarDaysIcon } from "lucide-react";
import { AiGreetingWidget } from "./aiGreetingWidget";
import { cn } from "../../lib/utils";
import { Clock, getCurrentDate } from "../clock";
import { Text } from "../../components/ui/text";

export function ClockWidget({ className }: { className?: string }) {
  const date = getCurrentDate({ year: undefined });
  const [d1, d2] = date.split(", ");
  return (
    <div className={cn("flex flex-col md:flex-row gap-4 items-center justify-between pt-16", className)}>
      <div className="flex flex-col gap-8">
        <Text>
          <div className="inline"><span>{d1}, {d2}</span></div>{" "}
          <CalendarDaysIcon size="48" className="inline" />{" "}
          <Clock className="text-7xl inline" iso />
        </Text>
        <AiGreetingWidget className="row-span-2 col-span-2" />
      </div>
    </div>
  )
}
