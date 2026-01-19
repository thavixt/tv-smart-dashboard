import { getCurrentLocation } from "@/lib/location";
import { WeatherCurrentResponse, WeatherForecastResponse } from "@/lib/weather";
import { getApiRequestUrl } from "./utils";

const headers = new Headers();
headers.append('Content-Type', 'application/json');

/**
 * @deprecated
 */
export async function getCurrentWeather() {
  const location = await getCurrentLocation();
  const response = await fetch(getApiRequestUrl('weather', { location }), { headers });
  const json = await response.json() as WeatherCurrentResponse;
  return json;
}

/**
 * @deprecated
 */
export async function getWeatherForecast() {
  const location = await getCurrentLocation();
  const response = await fetch(getApiRequestUrl('weather_forecast', { location }), { headers });
  const json = await response.json() as WeatherForecastResponse;
  return json;
}
