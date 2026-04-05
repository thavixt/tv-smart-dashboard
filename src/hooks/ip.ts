import { getApiRequestUrl } from "@/api/utils";
import { useQuery } from "@tanstack/react-query";

export function useIpAddress() {
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(getApiRequestUrl('ip'));
      const ip = await response.text() as string;
      return ip;
    },
    queryKey: ["ip"],
    staleTime: 10 * 60 * 1000,
  });
  return { data, isPending };
}