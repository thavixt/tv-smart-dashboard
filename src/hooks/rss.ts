import { useQuery } from "@tanstack/react-query";

export interface RssItem {
  link: string;
  title: string;
  description: string;
  pubDate: Date;
}

export function useRssFeed({ url }: { url: string }) {
  const { data, isLoading } = useQuery(
    {
      queryKey: ["rss-feed", url],
      queryFn: async (): Promise<RssItem[]> => {
        try {
          const response = await fetch(url);
          const data = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, "application/xml");
          const items = xmlDoc.querySelectorAll("item");
          return Array.from(items).map<RssItem>(item => {
            const title = item.querySelector("title")!.textContent as string;
            const link = item.querySelector("link")!.textContent as string;
            const description = item.querySelector("description")!.textContent as string;
            const pubDate = item.querySelector("pubDate")!.textContent as string;
            return {
              title,
              link,
              description,
              pubDate: new Date(pubDate),
            }
          });
        } catch {
          return [];
        }
      },
    }
  );

  return { data, isLoading };
}
