import type { ReactNode } from 'react';

/**
 * Temporary compatibility boundary for routes migrated before the shared root
 * shell existed. It is deliberately server-only and adds no markup or client
 * JavaScript; routes will shed it as their Phase 5–9 redesigns land.
 */
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
