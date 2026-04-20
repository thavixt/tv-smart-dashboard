import { LoaderCircle } from "lucide-react";
import { useRssFeed } from "../../hooks/rss";
import { cn } from "../../lib/utils";
import { RotatingText } from "../ui/rotating-text";
import { TEXT_STYLES } from "../../components/ui/text";

const TEXT_SLIDE_MS = 30 * 1000;

export function RssWidget({ className, rssUrl }: { className?: string; rssUrl: string }) {
  const { data, isLoading } = useRssFeed({ url: rssUrl })

  if (!data || isLoading) {
    return <div className={cn("flex flex-col", className)}>
      <LoaderCircle className="animate-spin size-20 opacity-50" />
    </div>
  }

  const items = data.map(article => `${article.title} — ${new Date(article.pubDate).toLocaleTimeString()} — ${article.description}`);

  return (
    <div className={cn("w-full h-full flex flex-col items-center justify-end! p-8", className)}>
      <RotatingText
        className={`${TEXT_STYLES} italic text-ellipsis break-all`}
        duration={TEXT_SLIDE_MS}
        text={items}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  )
}