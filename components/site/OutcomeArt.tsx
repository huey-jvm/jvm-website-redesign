import { outcomeIllustrationId } from "@/content/assets";
import { Slot } from "./Slot";

export function OutcomeArt({ outcomeId }: { outcomeId: string }) {
  return (
    <Slot id={outcomeIllustrationId(outcomeId)} className="h-full w-full" imgClassName="object-contain" sizes="(min-width: 768px) 224px, 112px" />
  );
}
