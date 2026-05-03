
import { useAiGreeting } from "../../hooks/gemini";
import { Tile } from "../ui/tile";

export function AiGreetingWidget() {
  const { data: greeting, isLoading } = useAiGreeting();

  return (
    <Tile w={4} h={2} loading={isLoading}>
      {greeting}
    </Tile>
  )
}