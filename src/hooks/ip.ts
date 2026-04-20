import { useQuery } from "@tanstack/react-query";

export function useIpAddress() {
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch("https://api.ipify.org");
      const ip = await response.text() as string;
      return ip;
    },
    queryKey: ["ip"],
  });
  return { data, isPending };
}