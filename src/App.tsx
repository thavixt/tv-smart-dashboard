import "./App.css";
import { useRef } from "react";
import { CameraWidget } from "./components/widgets/cameraWidget";
import { ClockWidget } from "./components/widgets/clockWidget";
import { RssWidget } from "./components/widgets/rssWidget";
import { WeatherWidget } from "./components/widgets/weatherWidget";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CurrencyWidget } from "./components/widgets/currencyWidget";
import { Tile } from "./components/ui/tile";

/**
 * @todo move apis to tauri/rust backend
 */
// import { invoke } from "@tauri-apps/api/core";

const rssUrl1 = "https://telex.hu/rss/archivum?filters=%7B%22superTagSlugs%22%3A%5B%22belfold%22%5D%2C%22parentId%22%3A%5B%22null%22%5D%7D&perPage=10";
const rssUrl2 = "https://telex.hu/rss/archivum?filters=%7B%22superTagSlugs%22%3A%5B%22kulfold%22%5D%2C%22parentId%22%3A%5B%22null%22%5D%7D&perPage=10";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'online',
      retry: 1,
      refetchInterval: 10 * 60 * 1000,
    },
  },
});

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient

function App() {
  const ref = useRef<HTMLDivElement>(null);
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <main
        ref={ref}
        id="fullscreenDashboard"
        className="relative z-20 w-full h-full grid grid-cols-12 grid-rows-12 gap-4 text-white text-3xl p-12"
      >
        <CameraWidget />

        <CurrencyWidget w={4} h={4} />
        <ClockWidget w={4} h={4} />
        <WeatherWidget w={4} h={4} />

        <Tile w={12} h={3} />

        <RssWidget w={6} h={5} url={rssUrl1} />
        <RssWidget w={6} h={5} url={rssUrl2} />
      </main>
    </QueryClientProvider>
  );
}

export default App;