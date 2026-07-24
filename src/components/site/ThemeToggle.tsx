'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';
  const label = mounted ? (isDark ? 'Switch to light theme' : 'Switch to dark theme') : 'Toggle theme';

  return (
    <button
      type="button"
      className="icon-button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
    </button>
  );
}
