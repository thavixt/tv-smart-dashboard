import { useWeather } from "@/hooks/weather";
import { cn } from "@/lib/utils";
import { LoaderCircle, LoaderPinwheel } from "lucide-react";
import { Text } from "../../components/ui/text";

export function WeatherWidget({ className, slim = false }: { className?: string, slim?: boolean }) {
  const { data: weatherData, isPending: isLoading } = useWeather();

  if (!weatherData || isLoading) {
    return <div className={cn("flex flex-col", className)}>
      <LoaderCircle className="animate-spin size-20 opacity-50" />
    </div>
  }

  return (
    <div className={cn("flex flex-col items-center justify-center relative rounded-md p-4", { "border": !slim }, className)}>
      {(weatherData && !isLoading) ? (
        <div className="flex flex-col gap-2 items-center *:w-64">
          <Text className="flex flex-col">
            <span className=" font-bold text-xl">
              {weatherData.location.country}, {weatherData.location.region}
            </span>
            <span title="Conditions">{weatherData.current.temp_c}°C - {weatherData.current.condition.text}</span>
          </Text>
          <Text className="w-full flex justify-between gap-2">
            <small title="Wind">
              Wind: {weatherData.current.wind_kph}km/h
            </small>
            <small title="Heat index">
              Heat index: {weatherData.current.heatindex_c}°C
            </small>
          </Text>
          <Text className="w-full flex justify-between gap-2">
            <small title="Precipitation">
              Precipitation: {weatherData.current.precip_mm}mm
            </small>
            <small title="Humidity">
              Humidity: {weatherData.current.humidity}%
            </small>
          </Text>
        </div>
      ) : (
        <div className="animate-pulse flex items-center justify-center h-40 gap-2">
          <span>Loading ...</span>
          <LoaderPinwheel className={cn({ 'animate-spin': isLoading })} />
        </div>
      )}
    </div>
  )
}
