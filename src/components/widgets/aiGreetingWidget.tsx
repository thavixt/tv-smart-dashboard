
import { LoaderCircle } from "lucide-react";
import { useAiGreeting } from "../../hooks/gemini";
import { cn } from "../../lib/utils";
import { Text } from "../../components/ui/text";

export function AiGreetingWidget({ className }: { className?: string }) {
  const { data: greeting, isLoading } = useAiGreeting();

  if (!greeting || isLoading) {
    return <div className={cn("flex items-center justify-center w-full", className)}>
      <LoaderCircle className="animate-spin size-20 opacity-50" />
    </div>
  }

  return (
    <div className={cn("flex flex-col items-center justify-center w-full", className)}>
      <Text className="whitespace-pre-wrap italic px-4 text-center w-full max-w-100">{greeting}</Text>
    </div>
  )
}