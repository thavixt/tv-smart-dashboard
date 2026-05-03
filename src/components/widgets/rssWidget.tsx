import { useRssFeed } from "../../hooks/rss";
import { RotatingText } from "../ui/rotating-text";
import { Tile, TileProps } from "../ui/tile";

const TEXT_SLIDE_MS = 30 * 1000;

interface RssWidgetProps extends TileProps {
  url: string
}

export function RssWidget({ url, w, h }: RssWidgetProps) {
  const { data, isLoading } = useRssFeed({ url })

  const items = data?.map(article => {
    const ts = new Date(article.pubDate).toLocaleTimeString();
    return [
      `<${ts}> ${article.title}`,
      `\n${article.description}`
    ].join("\n");
  });

  return (
    <Tile w={w} h={h} loading={isLoading} className="p-4">
      <RotatingText
        className="text-ellipsis whitespace-break-spaces"
        duration={TEXT_SLIDE_MS}
        text={items ?? []}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </Tile>
  )
}