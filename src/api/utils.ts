type ApiEndpoint =
  | 'gemini'
  | 'weather'
  | 'weather_forecast'
  | 'ping';

const apiUrl = "http://localhost:8080/api";
// const apiUrl = "https://personal.komlosidev.net/api";
// const apiUrl = "https://corsproxy.io/?url=https://personal.komlosidev.net/api";

const getApi = () => {
  // if (import.meta.env.MODE === "development") {
  //   return localApi;
  // }
  return apiUrl;
}

export function getApiRequestUrl(endpoint: ApiEndpoint, query: Record<string, string> = {}) {
  const queryString = new URLSearchParams(query).toString();
  return `${getApi()}/${endpoint}${queryString ? `?${queryString}` : ''}`;
}