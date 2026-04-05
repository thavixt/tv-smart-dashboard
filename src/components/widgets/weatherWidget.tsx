import { useWeather } from "@/hooks/weather";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { Text } from "../../components/ui/text";

export function WeatherWidget({ className, slim = false }: { className?: string, slim?: boolean }) {
  const { data: weatherData, isPending: isLoading } = useWeather();

  if (!weatherData || isLoading) {
    return <div className={cn("flex flex-col", className)}>
      <LoaderCircle className="animate-spin size-20 opacity-50" />
    </div>
  }

  return (
    <div className={cn("flex flex-col items-end p-4 gap-4", { "border": !slim }, className)}>
      <Text className="flex flex-col gap-2 w-fit">
        <span className="font-bold text-xl">
          {weatherData.location.country}, {weatherData.location.region}
        </span>
        <span title="Conditions">{weatherData.current.temp_c}°C - {weatherData.current.condition.text}</span>
      </Text>
      <div className="grid grid-rows-2 grid-cols-2 gap-2">
        <Text className="w-full" title="Heat index">
          <div className="flex justify-between">
            <span>Feels like:</span>
            <span className="pl-4">{weatherData.current.feelslike_c}°C</span>
          </div>
        </Text>
        <Text className="w-full" title="Humidity">
          <div className="flex justify-between">
            <span>Humidity:</span>
            <span className="pl-4">{weatherData.current.humidity}%</span>
          </div>
        </Text>
        <Text className="w-full" title="Wind">
          <div className="flex justify-between">
            <span>Wind:</span>
            <span className="pl-4">{weatherData.current.wind_kph}km/h</span>
          </div>
        </Text>
        <Text className="w-full" title="Precipitation">
          <div className="flex justify-between">
            <span>Precipitation:</span>
            <span className="pl-4">{weatherData.current.precip_mm}mm</span>
          </div>
        </Text>
      </div>
    </div>
  )
}
