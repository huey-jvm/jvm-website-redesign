import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "sm" | "md" | "lg";
type Tone = "light" | "dark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-sans font-semibold select-none whitespace-nowrap " +
  "transition-[color,background-color,box-shadow,border-color,transform] duration-150 ease " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] motion-reduce:active:scale-100 " +
  "disabled:cursor-not-allowed disabled:active:scale-100 aria-disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3.5 py-2 text-body-sm",
  md: "min-h-11 px-5 py-3 text-body",
  lg: "min-h-13 px-7 py-3.5 text-lead-sm",
};

const variants: Record<Tone, Record<Variant, string>> = {
  light: {
    primary:
      "bg-ink-950 text-white hover:shadow-[inset_0_-2px_0_0_var(--color-gold-500)] focus-visible:outline-gold-700 " +
      "disabled:bg-ink-100 disabled:text-ink-400 disabled:shadow-none",
    secondary:
      "border-[1.5px] border-ink-950 text-ink-950 bg-transparent hover:bg-cream focus-visible:outline-gold-700 " +
      "disabled:border-transparent disabled:bg-ink-100 disabled:text-ink-400",
    tertiary:
      "text-ink-900 bg-transparent px-1 focus-visible:outline-gold-700 group/tertiary " +
      "disabled:text-ink-400",
  },
  dark: {
    primary:
      "bg-gold-500 text-ink-950 hover:bg-gold-200 focus-visible:outline-gold-500 " +
      "disabled:bg-ink-800 disabled:text-ink-400",
    secondary:
      "border-[1.5px] border-gold-500 text-gold-500 bg-transparent hover:bg-gold-500/12 focus-visible:outline-gold-500 " +
      "disabled:border-transparent disabled:bg-ink-800 disabled:text-ink-400",
    tertiary: "text-cream bg-transparent px-1 focus-visible:outline-gold-500 group/tertiary disabled:text-ink-400",
  },
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  pending?: boolean;
  icon?: ReactNode;
  iconTrailing?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps & Omit<ComponentPropsWithoutRef<"button">, "children"> & { href?: undefined };
type ButtonAsLink = CommonProps & Omit<ComponentPropsWithoutRef<"a">, "children"> & { href: string; external?: boolean };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function Label({ variant, tone, children, icon, iconTrailing, pending }: CommonProps) {
  const underline =
    variant === "tertiary"
      ? cn(
          "link-underline",
          tone === "dark" ? "after:bg-gold-500" : "after:bg-gold-700",
        )
      : undefined;
  const arrowMove = variant === "tertiary" ? "transition-transform duration-150 ease group-hover/tertiary:translate-x-1 motion-reduce:group-hover/tertiary:translate-x-0" : undefined;
  return (
    <>
      {pending ? <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" /> : !iconTrailing && icon ? <span aria-hidden className={cn("inline-flex", arrowMove)}>{icon}</span> : null}
      <span className={underline}>{children}</span>
      {!pending && iconTrailing && icon ? <span aria-hidden className={cn("inline-flex", arrowMove)}>{icon}</span> : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "secondary", size = "md", tone = "light", pending = false, icon, iconTrailing, className, children } = props;
  const classes = cn(base, sizes[size], variants[tone][variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, tone: _t, pending: _p, icon: _i, iconTrailing: _it, className: _c, children: _ch, ...rest } = props;
    void _v; void _s; void _t; void _p; void _i; void _it; void _c; void _ch;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          <Label variant={variant} tone={tone} icon={icon} iconTrailing={iconTrailing} pending={pending}>{children}</Label>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        <Label variant={variant} tone={tone} icon={icon} iconTrailing={iconTrailing} pending={pending}>{children}</Label>
      </Link>
    );
  }

  const { variant: _v, size: _s, tone: _t, pending: _p, icon: _i, iconTrailing: _it, className: _c, children: _ch, disabled, ...rest } = props as ButtonAsButton;
  void _v; void _s; void _t; void _p; void _i; void _it; void _c; void _ch;
  return (
    <button
      type={rest.type ?? "button"}
      className={classes}
      disabled={disabled}
      aria-disabled={pending || undefined}
      aria-busy={pending || undefined}
      {...rest}
      onClick={pending ? undefined : rest.onClick}
    >
      <Label variant={variant} tone={tone} icon={icon} iconTrailing={iconTrailing} pending={pending}>{children}</Label>
    </button>
  );
}
