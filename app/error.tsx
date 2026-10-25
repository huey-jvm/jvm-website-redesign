"use client";

import { RecoverableError } from "@/components/site/RecoverableError";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <RecoverableError reset={reset} />;
}
