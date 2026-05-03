import { useWeather } from "@/hooks/weather";
import { Clock, getCurrentDate } from "../clock";
import { Tile, TileProps } from "../ui/tile";

export function ClockWidget({ w, h }: TileProps) {
  const date = getCurrentDate({ year: undefined });
  const { data: weatherData, isPending } = useWeather();

  return (
    <Tile w={w} h={h} loading={isPending}>
      <Clock iso className="font-bold text-6xl" />
      <br />
      <span>{date}</span>
      <span>
        {weatherData ? `${weatherData.location.country}, ${weatherData.location.region}` : null}
      </span>
    </Tile>
  );
}
