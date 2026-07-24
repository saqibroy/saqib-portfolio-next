'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Writing' },
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mobile-navigation">
      <button type="button" className="icon-button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        <span className="sr-only">{open ? 'Close navigation' : 'Open navigation'}</span>
      </button>
      {open && (
        <nav id="mobile-navigation" className="mobile-navigation-menu" aria-label="Mobile navigation">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <a href="mailto:saqib@ssohail.com" onClick={() => setOpen(false)}>Contact</a>
        </nav>
      )}
    </div>
  );
}
