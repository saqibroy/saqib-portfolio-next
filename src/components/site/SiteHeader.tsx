import Link from 'next/link';
import type { CSSProperties } from 'react';

import { MobileNavigation } from './MobileNavigation';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/experience', label: 'Experience' },
  { href: '/writing', label: 'Writing' },
];

const brandLetters = Array.from('Saqib Sohail');

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label="Saqib Sohail — home">
          {brandLetters.map((letter, index) => <span key={`${letter}-${index}`} className={`site-brand-letter${index === 0 ? ' site-brand-letter--initial' : ''}`} style={{ '--brand-index': index } as CSSProperties} aria-hidden="true">{letter}</span>)}
        </Link>
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
