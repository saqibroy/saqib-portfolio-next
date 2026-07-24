import Link from 'next/link';

import { MobileNavigation } from './MobileNavigation';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Writing' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-brand">Saqib Sohail</Link>
        <nav className="site-navigation" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="site-actions">
          <a className="button button-secondary" href="/downloads/saqib-sohail-cv-ats.pdf">Download CV</a>
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
