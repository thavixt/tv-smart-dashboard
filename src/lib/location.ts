import { getApiRequestUrl } from "@/api/utils";
import { useIpAddress } from "@/hooks/ip";
import { useQuery } from "@tanstack/react-query";

export async function getCurrentLocation(): Promise<string> {
  return new Promise((resolve) => {
    const fallback = async (error?: GeolocationPositionError | Error) => {
      console.log(error);
      console.warn("Using fallback geolocation");
    }
    console.log(!!navigator.geolocation.getCurrentPosition)
    try {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve(`${coords.latitude},${coords.longitude}`);
        },
        fallback,
      );
    } catch (ex) {
      return fallback(ex as Error);
    }
  })
}

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
      try {
        // const location = await getCurrentLocation();
        // return location;
        throw new Error("Simulated Geolocation error");
      } catch (ex) {
        // NOTE: using an API to get location instead in built-in browser geolocation API,
        // since it's not enabled on some debian/ubuntu disto's default browsers...
        console.warn("Using fallback geolocation API");
        const response = await fetch(getApiRequestUrl('geolocation', { ip: ip! }), { headers });
        const { country, city } = await response.json() as GeolocationResponse;
        return `${country}, ${city}`;
      }
    },
    queryKey: ["geolocation"],
    staleTime: 10 * 60 * 1000,
  });
  return { data, isPending: isPending };
}
