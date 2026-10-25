"use client";

import "./globals.css";
import localFont from "next/font/local";
import { RecoverableError } from "@/components/site/RecoverableError";

// This boundary replaces the root layout, including its font variables.
const inter = localFont({
  src: [{ path: "./fonts/inter-latin-variable.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <title>Page unavailable | JVM Solutions</title>
        <main id="main" className="global-error"><RecoverableError reset={reset} /></main>
      </body>
    </html>
  );
}
