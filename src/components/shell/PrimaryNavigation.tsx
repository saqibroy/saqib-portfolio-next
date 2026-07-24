"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dialog } from "radix-ui";

const items = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/cv", label: "CV" },
  { href: "/blog", label: "Notes" },
] as const;

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function PrimaryNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden md:block" aria-label="Primary navigation">
        <ul className="flex list-none items-center gap-7 p-0 font-mono text-[0.72rem] uppercase tracking-[0.13em] text-ink-muted">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                className="relative py-2 no-underline transition-colors hover:text-ink aria-[current=page]:text-cerulean"
                href={item.href}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="grid size-10 place-items-center border border-rule bg-paper text-ink md:hidden"
            aria-label="Open navigation"
          >
            <Menu aria-hidden="true" size={20} />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-navy/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-y-0 right-0 z-[70] flex w-[min(24rem,88vw)] flex-col bg-paper p-7 shadow-[-20px_0_60px_rgba(6,27,38,0.18)]">
            <div className="flex items-center justify-between border-b border-rule pb-5">
              <Dialog.Title className="font-serif text-2xl text-ink">
                Navigation
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="grid size-10 place-items-center border border-rule text-ink"
                  aria-label="Close navigation"
                >
                  <X aria-hidden="true" size={20} />
                </button>
              </Dialog.Close>
            </div>
            <nav className="mt-8" aria-label="Mobile navigation">
              <ul className="list-none divide-y divide-rule p-0">
                {items.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      className="flex items-center justify-between py-5 font-serif text-3xl text-ink no-underline aria-[current=page]:text-cerulean"
                      href={item.href}
                      aria-current={
                        isCurrent(pathname, item.href) ? "page" : undefined
                      }
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-ink-muted">
                        0{index + 1}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              className="mt-auto bg-cerulean px-5 py-4 text-center font-semibold text-white no-underline"
              href="mailto:saqib@ssohail.com"
            >
              saqib@ssohail.com
            </a>
            <Dialog.Description className="sr-only">
              Links to the portfolio home, selected work, CV and engineering notes.
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
