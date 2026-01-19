import { LoaderCircle } from "lucide-react";
import { useRssFeed } from "../../hooks/rss";
import { cn } from "../../lib/utils";
import { RotatingText } from "../ui/rotating-text";
import { TEXT_STYLES } from "../../components/ui/text";

const TEXT_SLIDE_MS = 10 * 1000;

export function RssWidget({ className, rssUrl }: { className?: string; rssUrl: string }) {
  const { data, isLoading } = useRssFeed({ url: rssUrl })

  if (!data || isLoading) {
    return <div className={cn("flex flex-col", className)}>
      <LoaderCircle className="animate-spin size-20 opacity-50" />
    </div>
  }

  const titles = data.map(article => article.title);
  const descriptions = data.map(article => `${article.description}`);

  return (
    <div className={cn("w-full h-full flex flex-col items-center justify-end! gap-2 p-8", className)}>
      <RotatingText
        className={TEXT_STYLES}
        duration={TEXT_SLIDE_MS}
        style={{ fontWeight: "bold", fontSize: "1.35rem" }}
        text={titles}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <RotatingText
        className={TEXT_STYLES}
        duration={TEXT_SLIDE_MS}
        style={{ fontStyle: "italic" }}
        text={descriptions}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  )
}