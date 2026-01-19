
import { LoaderCircle } from "lucide-react";
import { useAiGreeting } from "../../hooks/gemini";
import { cn } from "../../lib/utils";
import { Text } from "../../components/ui/text";

export function AiGreetingWidget({ className }: { className?: string }) {
  const { data, isLoading } = useAiGreeting();

  if (!data || isLoading) {
    return <div className={cn("flex flex-col", className)}>
      <LoaderCircle className="animate-spin size-20 opacity-50" />
    </div>
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {data ? (
        <Text className="whitespace-pre-wrap w-full italic px-4 text-center">{data}</Text>
      ) : (
        <>
          <LoaderCircle className="animate-spin size-14" />
          <Text className="whitespace-pre-wrap">Loading ...</Text>
        </>
      )}
    </div>
  )
}