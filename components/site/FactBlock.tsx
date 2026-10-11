import { TitleFigures } from "@/components/ui/TitleFigures";
import { breakableEmail } from "@/lib/email-address";
import type { ReactNode } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/cn";

export type Fact = {
  label: string;
  value: string;
  copy?: boolean;
  note?: ReactNode;
  href?: string;
};

export function FactBlock({
  facts,
  tone = "light",
  className,
  title,
  headingLevel: Tag = "h3",
}: {
  facts: Fact[];
  tone?: "light" | "dark";
  className?: string;
  title?: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "@container rounded-container border",
        tone === "dark"
          ? "border-ink-800 bg-ink-900"
          : "border-ink-200 bg-white",
        className,
      )}
    >
      <div className="p-4 @[20rem]:p-6 @[35rem]:p-8">
        {title ? (
          <Tag
            title={title}
            className={cn(
              "mb-4 truncate text-h4",
              tone === "dark" ? "text-cream" : "text-ink-950",
            )}
          >
            <TitleFigures>{title}</TitleFigures>
          </Tag>
        ) : null}
        <dl className="grid grid-cols-1 gap-y-4 @[35rem]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] @[35rem]:gap-x-4 @[35rem]:gap-y-2">
          {facts.map((f) => (
            <div
              key={f.label}
              className="group/fact flex min-w-0 flex-col gap-1 @[35rem]:contents"
            >
              <dt
                className={cn(
                  "text-body-sm @[35rem]:flex @[35rem]:min-h-11 @[35rem]:items-center @[35rem]:self-start",
                  tone === "dark" ? "text-ink-300" : "text-ink-500",
                )}
              >
                {f.label}
              </dt>
              <dd
                className={cn(
                  "flex min-w-0 items-center justify-between gap-2 min-h-11 text-body font-medium font-sans tabular",
                  tone === "dark" ? "text-cream" : "text-ink-950",
                )}
              >
                <span className="min-w-0" data-figure>
                  {f.href ? (
                    <a
                      href={f.href}
                      className={cn(
                        "link-underline inline-flex min-h-11 items-center after:bg-current",
                        tone === "dark"
                          ? "hover:text-gold-500 focus-visible:text-gold-500"
                          : "hover:text-gold-700 focus-visible:text-gold-700",
                      )}
                    >
                      {breakableEmail(f.value)}
                    </a>
                  ) : f.value.includes("@") ? (
                    breakableEmail(f.value)
                  ) : (
                    f.value
                  )}
                  {f.note ? (
                    <span
                      className={cn(
                        "block text-body-sm font-normal",
                        tone === "dark" ? "text-ink-300" : "text-ink-500",
                      )}
                    >
                      {f.note}
                    </span>
                  ) : null}
                </span>
                {f.copy ? (
                  <CopyButton value={f.value} label={f.label} tone={tone} />
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
