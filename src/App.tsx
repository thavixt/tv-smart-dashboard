import "./App.css";
import { useRef } from "react";
// import { invoke } from "@tauri-apps/api/core";
import { CurrencyWidget } from "./components/widgets/currencyWidget";
import { CameraWidget } from "./components/widgets/cameraWidget";
import { ClockWidget } from "./components/widgets/clockWidget";
import { RssWidget } from "./components/widgets/rssWidget";
import { WeatherWidget } from "./components/widgets/weatherWidget";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const rssUrl1 = "https://telex.hu/rss/archivum?filters=%7B%22superTagSlugs%22%3A%5B%22belfold%22%5D%2C%22parentId%22%3A%5B%22null%22%5D%7D&perPage=10";
const rssUrl2 = "https://telex.hu/rss/archivum?filters=%7B%22superTagSlugs%22%3A%5B%22kulfold%22%5D%2C%22parentId%22%3A%5B%22null%22%5D%7D&perPage=10";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 12, // 12 hours
      networkMode: 'online',
      retry: 3,
      staleTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

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
        className="relative z-20 w-full h-full grid grid-cols-4 grid-rows-3 gap-12 *:flex *:items-center *:justify-center *:w-full *:h-full text-white"
      >
        <CurrencyWidget className="row-span-1 col-span-1" />
        <ClockWidget className="row-span-1 col-span-2 px-4" />
        <WeatherWidget slim className="row-span-1 col-span-1" />
        {/* <div className="row-span-1 col-span-full" />  */} {/* placeholder grid row */}
        <RssWidget className="row-span-2 col-span-2" rssUrl={rssUrl1} />
        <RssWidget className="row-span-2 col-span-2" rssUrl={rssUrl2} />
        <CameraWidget className="absolute inset-0 size-full -z-10 opacity-100 grayscale-75" />
      </main>
    </QueryClientProvider>
  );
}

export default App;
