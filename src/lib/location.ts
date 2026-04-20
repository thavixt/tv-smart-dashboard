import { getApiRequestUrl } from "@/api/utils";
import { useIpAddress } from "@/hooks/ip";
import { useQuery } from "@tanstack/react-query";

interface GeolocationResponse {
  country: string,
  city: string;
}

export function useLocation() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const { data: ip, isPending: ipPending } = useIpAddress();
  const { data, isPending } = useQuery({
    enabled: !ipPending,
    queryFn: async () => {
      const response = await fetch(getApiRequestUrl('geolocation', { ip: ip! }), { headers });
      const { country, city } = await response.json() as GeolocationResponse;
      return `${country}, ${city}`;
    },
    queryKey: ["geolocation"],
  });
  return { data, isPending: isPending };
}
