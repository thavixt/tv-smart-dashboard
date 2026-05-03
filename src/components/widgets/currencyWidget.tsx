import { useCurrencyExchange } from "../../hooks/currency";
import { Tile, TileProps } from "../ui/tile";

export function CurrencyWidget({ w, h }: TileProps) {
  const { data, isPending } = useCurrencyExchange("eur");

  return <Tile w={w} h={h} loading={isPending}>
    <span>{`eur/huf ${data?.eur.huf.toFixed(2)}`}</span>
    <span>{`eur/usd ${data?.eur.usd.toFixed(2)}`}</span>
    <span>{`eur/btc ${data?.eur.btc.toFixed(6)}`}</span>
    <span>{`eur/eth ${data?.eur.eth.toFixed(6)}`}</span>
  </Tile>;
}
