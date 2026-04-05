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
    "Tell me a relevant, funny or snarky greeting to start my day with in a single sentence.",
  ].join("\n");

  const { data, isLoading } = useQuery(
    {
      queryKey: ["ai-greeting"],
      queryFn: () => askGemini(template),
      staleTime: 30 * 60 * 1000, // 60min
      enabled: !weatherLoading
    }
  );

  return { data, isLoading: isLoading || weatherLoading };
}