import { getApiRequestUrl } from "@/api/utils";
import { useLocation } from "@/lib/location";
import { WeatherCurrentResponse, WeatherForecastResponse } from "@/lib/weather";
import { useQuery } from "@tanstack/react-query";

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export function useWeather() {
  const { data: location, isPending: locationPending } = useLocation();
  const { data, isPending } = useQuery({
    enabled: !locationPending,
    queryFn: async () => {
      const response = await fetch(getApiRequestUrl('weather', { location: location! }), { headers });
      return await response.json() as WeatherCurrentResponse;
    },
    queryKey: ["weather"],
  });
  return { data, isPending };
}

export function useWeatherForecast() {
  const { data: location, isPending: locationPending } = useLocation();
  const { data, isPending } = useQuery({
    enabled: !locationPending && !!location,
    queryFn: async () => {
      const response = await fetch(getApiRequestUrl('weather_forecast', { location: location! }), { headers });
      const json = await response.json() as WeatherForecastResponse;
      return json;
    },
    queryKey: ["weather_forecast"],
  });
  return { data, isPending };
}
