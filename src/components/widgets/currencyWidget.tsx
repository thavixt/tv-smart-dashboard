import { LoaderCircle } from "lucide-react";
import { useCurrencyExchange } from "../../hooks/currency";
import { cn } from "../../lib/utils";
import { Text } from "../../components/ui/text";

/**
 * @todo settings for currency exchange grid
 */

export function CurrencyWidget({ className }: { className?: string }) {
  const { data, isPending } = useCurrencyExchange("eur");

  if (!data || isPending) {
    return <div className={cn("flex flex-col", className)}>
      <LoaderCircle className="animate-spin size-20 opacity-50" />
    </div>
  }

  return (
    <div className={cn("h-full w-full flex flex-col font-mono p-8 gap-2", className)}>
      <div className="flex justify-start gap-4 w-full">
        <Text>{"eur/huf"}</Text>
        <Text>{data.eur.huf.toFixed(3)}</Text>
      </div>
      <div className="flex justify-start gap-4 w-full">
        <Text>{"eur/usd"}</Text>
        <Text>{data.eur.usd.toFixed(3)}</Text>
      </div>
      <div className="flex justify-start gap-4 w-full">
        <Text>{"eur/btc"}</Text>
        <Text>{data.eur.btc.toFixed(6)}</Text>
      </div>
      <div className="flex justify-start gap-4 w-full">
        <Text>{"eur/eth"}</Text>
        <Text>{data.eur.eth.toFixed(6)}</Text>
      </div>
    </div>
  )
}
