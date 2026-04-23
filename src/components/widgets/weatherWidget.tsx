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
    <div className={cn("flex flex-col items-end p-4 gap-10", { "border": !slim }, className)}>
      <Text className="flex flex-col gap-2 w-fit">
        <span className="font-bold text-xl">
          {weatherData.location.country}, {weatherData.location.region}
        </span>
        <span className="text-xl" title="Conditions">
          {weatherData.current.temp_c}{'°C - '}{weatherData.current.condition.text}
        </span>
      </Text>
      <div className="grid grid-rows-2 grid-cols-2 gap-4">
        <Block title="Feels like" value={`${weatherData.current.feelslike_c}°C`} />
        <Block title="Humidity" value={`${weatherData.current.humidity}%`} />
        <Block title="Wind" value={`${weatherData.current.wind_kph}km/h`} />
        <Block title="Precipitation" value={`${weatherData.current.precip_mm}mm`} />
      </div>
    </div>
  )
}

function Block({ title, value }: { title: string, value: string }) {
  return (
    <Text className="w-full" title={`${title}: ${value}`}>
      <div className="flex flex-col text-left">
        <span>{title}:</span>
        <span>{value}</span>
      </div>
    </Text>
  )
}