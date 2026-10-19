"use client";

import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contact, routeKeys, type RouteKey } from "@/content/contact";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<
  Record<"name" | "email" | "message" | "route", string>
>;

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const Turnstile = lazy(() =>
  import("./Turnstile").then((m) => ({ default: m.Turnstile })),
);

export function ContactForm({
  initialRoute,
  compact = false,
  tone = "light",
  autoFocus = false,
}: {
  initialRoute?: RouteKey;
  compact?: boolean;
  tone?: "light" | "dark";
  autoFocus?: boolean;
}) {
  const [route, setRoute] = useState<RouteKey | undefined>(initialRoute);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [simulated, setSimulated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const returningRef = useRef(false);
  const sendingRef = useRef(false);
  const id = useId();
  const tokenRef = useRef<string | undefined>(undefined);
  const resetRef = useRef<(() => void) | undefined>(undefined);
  const resetTurnstile = () => {
    tokenRef.current = undefined;
    resetRef.current?.();
  };

  const routeInfo = route ? contact.routes[route] : undefined;
  const dark = tone === "dark";

  useEffect(() => {
    if (Object.values(errors).some(Boolean) || status === "error")
      summaryRef.current?.focus();
  }, [errors, status]);
  useEffect(() => {
    if (status === "success") doneRef.current?.focus();
    else if (status === "idle" && returningRef.current) {
      returningRef.current = false;
      (
        formRef.current?.querySelector<HTMLInputElement>(
          'input[name="route"]:checked',
        ) ??
        formRef.current?.querySelector<HTMLInputElement>('input[name="route"]')
      )?.focus();
    }
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current) return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      route,
      name: String(fd.get("name") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      turnstileToken: tokenRef.current,
    };
    const next: FieldErrors = {};
    if (!route) next.route = "Choose who you are so we can route your message.";
    if (payload.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim()))
      next.email = "Please enter a valid email address.";
    if (payload.message.trim().length < 10)
      next.message = "Please tell us a little more, at least ten characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      return;
    }
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
      setServerMessage("This preview of the site cannot send messages yet.");
      setStatus("error");
      return;
    }
    sendingRef.current = true;
    setStatus("submitting");
    setServerMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        simulated?: boolean;
        errors?: FieldErrors;
      };
      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setServerMessage(
          data.message ?? "We could not send your message just now.",
        );
        resetTurnstile();
        setStatus("error");
        return;
      }
      resetTurnstile();
      setSimulated(Boolean(data.simulated));
      setStatus("success");
    } catch {
      setServerMessage("We could not reach the server.");
      resetTurnstile();
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  }

  if (status === "success" && routeInfo) {
    return (
      <div
        aria-labelledby={`${id}-done`}
        className={cn(
          compact ? "rounded-control" : "rounded-container",
          "border p-6",
          dark ? "border-ink-800 bg-ink-900" : "border-ink-200 bg-white",
        )}
      >
        <CheckCircle2 aria-hidden className="size-8 text-success transition-[opacity,scale] duration-250 ease-enter starting:scale-50 starting:opacity-0 motion-reduce:starting:scale-100" />
        <h3
          id={`${id}-done`}
          ref={doneRef}
          tabIndex={-1}
          className={cn("mt-3 text-h3 transition-[opacity,translate] delay-75 duration-200 ease-enter starting:translate-y-1 starting:opacity-0 motion-reduce:starting:translate-y-0", dark ? "text-cream" : "text-ink-950")}
        >
          Message sent
        </h3>
        <p
          className={cn(
            "mt-2 text-body transition-[opacity,translate] delay-115 duration-200 ease-enter starting:translate-y-1 starting:opacity-0 motion-reduce:starting:translate-y-0",
            dark ? "text-ink-200" : "text-ink-700",
          )}
        >
          Your message has reached {routeInfo.reads}. You can expect a reply
          within {contact.responseTime}. A copy has been sent to your email
          address.
        </p>
        {simulated ? (
          <p
            className={cn(
              "mt-2 text-body-sm",
              dark ? "text-ink-300" : "text-ink-500",
            )}
          >
            Development mode. Email delivery is not configured, so this message
            was logged rather than sent.
          </p>
        ) : null}
        <Button
          variant="tertiary"
          tone={tone}
          className="mt-4"
          onClick={() => {
            returningRef.current = true;
            setStatus("idle");
            setErrors({});
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  const inputBase = cn(
    "block w-full min-h-11 rounded-control border px-3 py-2.5 text-body transition-colors duration-150 ease-hover focus-visible:transition-none",
    dark
      ? "border-ink-400 bg-ink-900 text-cream placeholder:text-ink-400 focus-visible:outline-gold-500"
      : "border-ink-400 bg-white text-ink-900 placeholder:text-ink-400 focus-visible:outline-gold-700",
  );
  const labelBase = cn(
    "mb-1.5 block text-body-sm font-medium",
    dark ? "text-ink-200" : "text-ink-900",
  );
  const errText = "mt-1.5 flex items-start gap-1 text-body-sm text-error";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="space-y-5"
      aria-describedby={`${id}-reads`}
    >
      {Object.values(errors).some(Boolean) || status === "error" ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className={cn(
            compact ? "rounded-control" : "rounded-container",
            "border border-error/40 p-4",
            dark ? "bg-ink-900" : "bg-white",
          )}
        >
          {Object.values(errors).some(Boolean) ? (
            <>
              <p className="text-body font-medium text-error">
                Please check the highlighted fields.
              </p>
              <ul className="mt-2 space-y-1 text-body-sm">
                {Object.entries(errors)
                  .filter(([, message]) => Boolean(message))
                  .map(([field, message]) => (
                    <li key={field}>
                      <a
                        href={`#${id}-${field}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(`${id}-${field}`)?.focus();
                        }}
                        className="link-underline text-error after:bg-current"
                      >
                        {message}
                      </a>
                    </li>
                  ))}
              </ul>
            </>
          ) : null}
          {status === "error" ? (
            <div
              className={cn(
                "rounded-control border border-error/40 p-4",
                dark ? "bg-ink-900" : "bg-white",
              )}
            >
              <p className="flex items-start gap-2 text-body text-error">
                <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
                {serverMessage ?? "We could not send your message."}
              </p>
              <p
                className={cn(
                  "mt-2 text-body-sm",
                  dark ? "text-ink-300" : "text-ink-700",
                )}
              >
                Your message was not lost. You can send it directly instead.
              </p>
              <Button
                href={`mailto:${routeInfo?.to ?? contact.emails.general}`}
                variant="secondary"
                tone={tone}
                size="sm"
                className="mt-3"
              >
                Email us directly
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
      <fieldset aria-describedby={`${id}-reads`}>
        <legend className={labelBase}>
          Who are you?{" "}
          <span className={dark ? "text-ink-300" : "text-ink-500"}>
            (required)
          </span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {routeKeys.map((key) => {
            const r = contact.routes[key];
            const selected = route === key;
            return (
              <label
                key={key}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center rounded-pill border px-4 text-body-sm font-medium transition-[color,background-color,border-color,scale] duration-150 ease-hover active:scale-[0.98] motion-reduce:active:scale-100 has-focus-visible:transition-none has-focus-visible:outline-2 has-focus-visible:outline-offset-2",
                  dark
                    ? "has-focus-visible:outline-gold-500"
                    : "has-focus-visible:outline-gold-700",
                  selected
                    ? dark
                      ? "border-gold-500 bg-gold-500 text-ink-950"
                      : "border-ink-950 bg-ink-950 text-white"
                    : dark
                      ? "border-ink-400 text-ink-200 hover:bg-ink-800 has-focus-visible:bg-ink-800"
                      : "border-ink-400 text-ink-900 hover:bg-cream has-focus-visible:bg-cream",
                )}
              >
                <input
                  id={key === routeKeys[0] ? `${id}-route` : undefined}
                  aria-describedby={
                    errors.route ? `${id}-route-err` : undefined
                  }
                  type="radio"
                  name="route"
                  value={key}
                  checked={selected}
                  onChange={() => {
                    setRoute(key);
                    setErrors((e) => ({ ...e, route: undefined }));
                  }}
                  className="sr-only"
                  autoFocus={autoFocus && key === routeKeys[0]}
                />
                {r.label}
              </label>
            );
          })}
        </div>
        {errors.route ? (
          <p id={`${id}-route-err`} className={errText}>
            <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
            {errors.route}
          </p>
        ) : null}
        <p
          id={`${id}-reads`}
          className={cn(
            "mt-2 min-h-5 text-body-sm",
            dark ? "text-ink-300" : "text-ink-500",
          )}
        >
          {routeInfo ? null : "Pick a route and we will show you where it goes."}
        </p>
      </fieldset>

      <div
        className={cn(
          "grid gap-4",
          compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2",
        )}
      >
        <div>
          <label htmlFor={`${id}-name`} className={labelBase}>
            Name{" "}
            <span className={dark ? "text-ink-300" : "text-ink-500"}>
              (required)
            </span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={cn(inputBase, errors.name && "border-error")}
          />
          {errors.name ? (
            <p id={`${id}-name-err`} className={errText}>
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor={`${id}-org`} className={labelBase}>
            Organisation
          </label>
          <input
            id={`${id}-org`}
            name="organisation"
            type="text"
            autoComplete="organization"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelBase}>
            Email{" "}
            <span className={dark ? "text-ink-300" : "text-ink-500"}>
              (required)
            </span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            className={cn(inputBase, errors.email && "border-error")}
          />
          {errors.email ? (
            <p id={`${id}-email-err`} className={errText}>
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
              {errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={labelBase}>
            Phone
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className={labelBase}>
          Message{" "}
          <span className={dark ? "text-ink-300" : "text-ink-500"}>
            (required)
          </span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={compact ? 4 : 6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-msg-err` : undefined}
          className={cn(
            inputBase,
            "resize-y",
            errors.message && "border-error",
          )}
        />
        {errors.message ? (
          <p id={`${id}-msg-err`} className={errText}>
            <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {siteKey ? (
        <Suspense fallback={null}>
          <Turnstile
            siteKey={siteKey}
            tokenRef={tokenRef}
            resetRef={resetRef}
          />
        </Suspense>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <Button
          type="submit"
          variant="primary"
          tone={tone}
          pending={status === "submitting"}
          className="shrink-0 whitespace-nowrap"
        >
          Send message
        </Button>
        <p
          className={cn("text-caption", dark ? "text-ink-300" : "text-ink-500")}
        >
          Replies within {contact.responseTime}.
        </p>
      </div>
    </form>
  );
}
