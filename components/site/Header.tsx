import { Eyebrow } from "@/components/ui/Eyebrow";
import { ChevronDown } from "lucide-react";
import { leadEyebrow } from "@/content/services";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import type { NavGroup } from "@/content/navigation";
import { contact } from "@/content/contact";
import { HeaderClient } from "./HeaderClient";

export function Header({ nav }: { nav: NavGroup[] }) {
  return (
    <HeaderClient
      nav={nav}
      desktop={<DesktopNavigation nav={nav} />}
      logo={
        <Link
          href="/"
          className="inline-flex shrink-0 items-center rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"
          aria-label="JVM Solutions, home"
        >
          <Image
            src="/images/brand/jvm-logo-480.png"
            alt="JVM Solutions"
            width={480}
            height={222}
            priority
            className="h-auto w-30"
          />
        </Link>
      }
      utility={
        <div className="jvm-utility hidden border-b border-ink-200 bg-cream lg:block">
          <div className="container-content flex h-9 items-center justify-end gap-6 text-caption text-ink-700"><span className="mr-auto font-semibold uppercase tracking-widest">Veteran-led. Mission-focused.</span>
            <a
              href={contact.office.phoneHref}
              className="inline-flex min-h-11 items-center gap-2 hover:text-ink-950 focus-visible:text-ink-950"
            >
              <Phone aria-hidden className="size-4" />
              {contact.office.phone}
            </a>
            <a
              href={`mailto:${contact.emails.general}`}
              className="inline-flex min-h-11 items-center gap-2 hover:text-ink-950 focus-visible:text-ink-950"
            >
              <Mail aria-hidden className="size-4" />
              {contact.emails.general}
            </a>
          </div>
        </div>
      }
    />
  );
}

function DesktopNavigation({ nav }: { nav: NavGroup[] }) {
  const trigger =
    "relative inline-flex h-11 items-center gap-1 rounded-control px-3 text-body-sm font-medium text-ink-900 transition-colors duration-150 ease-hover focus-visible:transition-none hover:bg-ink-50 focus-visible:bg-ink-50 active:bg-ink-100 after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-150 after:ease-hover hover:after:scale-x-100 focus-visible:after:scale-x-100 focus-visible:after:transition-none active:after:scale-x-100 data-[current=true]:after:scale-x-100 data-[current=true]:after:transition-none motion-reduce:after:transition-none";
  return (
    <ul className="flex items-center gap-1">
      {nav.map((group, i) =>
        group.href ? (
          <li key={group.label}>
            <Link
              href={group.href}
              data-nav-href={group.href}
              className={trigger}
            >
              {group.label}
            </Link>
          </li>
        ) : (
          <li
            key={group.label}
            data-menu={group.label}
            className="group/menu relative"
          >
            <button
              type="button"
              data-menu-trigger
              className={trigger}
              aria-expanded="false"
              aria-controls={"desktop-menu-" + i}
            >
              {group.label}
              <ChevronDown
                aria-hidden
                className="size-4 transition-transform duration-150 ease-hover group-data-[open=true]/menu:rotate-180 group-data-[instant=true]/menu:transition-none motion-reduce:transition-none"
              />
            </button>
            <div
              id={"desktop-menu-" + i}
              data-menu-panel
              inert
              className="pointer-events-none invisible absolute left-0 top-full z-50 w-[26rem] origin-top-left scale-95 pt-1 opacity-0 transition-[opacity,scale,visibility] duration-150 ease-enter group-data-[open=true]/menu:pointer-events-auto group-data-[open=true]/menu:visible group-data-[open=true]/menu:scale-100 group-data-[open=true]/menu:opacity-100 group-data-[open=true]/menu:duration-200 group-data-[instant=true]/menu:transition-none motion-reduce:scale-100"
            >
              <div className="rounded-container border border-ink-200 bg-white p-2 shadow-float">
                <ul className="space-y-2">
                  {(group.items ?? []).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        data-nav-href={item.href}
                        className={
                          "flex min-h-11 flex-col justify-center gap-1 rounded-control border px-4 py-3 hover:bg-cream focus-visible:bg-cream active:bg-gold-200 focus-visible:outline-2 focus-visible:outline-gold-700 data-[current=true]:border-gold-700 data-[current=true]:bg-cream " +
                          (item.lead
                            ? "border-ink-200 bg-ink-50"
                            : "border-transparent")
                        }
                      >
                        {item.lead ? (
                          <Eyebrow as="span" tone="light">
                            {leadEyebrow}
                          </Eyebrow>
                        ) : null}
                        <span className="text-body font-medium text-ink-950">
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="text-body-sm text-ink-500">
                            {item.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ),
      )}
    </ul>
  );
}
