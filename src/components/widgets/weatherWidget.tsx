import { useWeather } from "@/hooks/weather";
import { Tile, TileProps } from "../ui/tile";

export function WeatherWidget({ w, h }: TileProps) {
  const { data: weatherData, isPending } = useWeather();

  return (
    <Tile w={w} h={h} loading={isPending}>
      {weatherData ? (
        <>
          <span>{weatherData.current.temp_c}{'°C - '}{weatherData.current.condition.text}</span>
          <br />
          <span>Humidity: {`${weatherData.current.humidity}%`}</span>
          <span>Wind: {`${weatherData.current.wind_kph}km/h`}</span>
          <span>Precipitation: {`${weatherData.current.precip_mm}mm`}</span>
        </>
      ) : null}
    </Tile>
  )
}
