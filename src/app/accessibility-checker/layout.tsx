import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Accessibility Checker',
  description: 'An experimental automated accessibility scan for public URLs.',
  robots: { index: false, follow: false },
};

export default function AccessibilityCheckerLayout({ children }: { children: ReactNode }) {
  return children;
}
