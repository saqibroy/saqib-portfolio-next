import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className="group inline-flex items-center gap-2 border-b border-cerulean pb-1 text-sm font-semibold text-ink no-underline transition-colors hover:text-cerulean"
      href={href}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        size={17}
        className="transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}
