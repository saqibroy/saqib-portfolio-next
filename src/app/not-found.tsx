import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="state-page shell">
      <p className="kicker">404 / Boundary not found</p>
      <h1>This route is outside the current system.</h1>
      <p>
        The page may have moved during the portfolio rebuild, or the address may be
        incorrect.
      </p>
      <Link className="button button-primary" href="/">
        <ArrowLeft aria-hidden="true" size={18} /> Return home
      </Link>
    </main>
  );
}
