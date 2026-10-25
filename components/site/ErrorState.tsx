import { FileQuestionMark, Home, RotateCw, Unplug, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ContourArt } from "./ContourArt";

export type ErrorKind = "missing" | "unavailable" | "offline";

const messages = {
  missing: {
    title: "Let’s get you back on track",
    description: "This page may have moved, or the link may no longer be available.",
    icon: FileQuestionMark,
  },
  unavailable: {
    title: "A brief interruption",
    description: "We couldn’t open this page. Please try again in a moment.",
    icon: Unplug,
  },
  offline: {
    title: "Let’s reconnect",
    description: "Your connection appears to be offline. Check it, then try again.",
    icon: WifiOff,
  },
};

export function ErrorState({ kind = "missing", retry }: { kind?: ErrorKind; retry?: () => void }) {
  const { title, description, icon: Icon } = messages[kind];
  return (
    <section className="error-state" aria-labelledby="error-title">
      <div className="error-state-art" aria-hidden><ContourArt /></div>
      <div className="error-state-content container-content">
        <div className="error-state-symbol" aria-hidden><Icon strokeWidth={1.25} /></div>
        <h1 id="error-title" className="font-medium">{title}</h1>
        <p className="mx-auto mt-5 max-w-[60rem] text-lead-sm text-ink-700">{description}</p>
        <div className="mt-8">
          {retry ? (
            <Button variant="primary" onClick={retry} icon={<RotateCw className="size-4" />}>Try again</Button>
          ) : (
            <Button href="/" variant="primary" icon={<Home className="size-4" />}>Back to home</Button>
          )}
        </div>
      </div>
    </section>
  );
}
