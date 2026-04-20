import { useQuery } from "@tanstack/react-query";
import { useWeather } from "./weather";
import { askGemini } from "@/api/gemini";

export function useAiGreeting() {
  const { data: weatherData, isPending: weatherLoading } = useWeather();
  const temp = weatherData?.current.temp_c;
  const condition = weatherData?.current.condition.text.toLowerCase();;
  const city = weatherData?.location.name;
  const country = weatherData?.location.country;
  const time = new Date().toLocaleTimeString();
  const date = new Date().toDateString();
  const template = [
    `It's ${time}, ${date} in ${city}, ${country}, the temperature is ${temp} °C, with ${condition} conditions outside.`,
  ].join("\n");

  const { data, isLoading } = useQuery(
    {
      enabled: !weatherLoading,
      queryKey: ["ai-greeting"],
      queryFn: () => askGemini(template),
    }
  );

  return { data, isLoading: isLoading || weatherLoading };
}