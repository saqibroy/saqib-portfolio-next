'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import type { ArchitectureEdge, ArchitectureNode } from '@/content/caseStudies';

const ArchitectureFlowCanvas = dynamic(
  () => import('./ArchitectureFlowCanvas').then((module) => module.ArchitectureFlowCanvas),
  { ssr: false },
);

export function ArchitectureMap({
  nodes,
  edges,
  title,
}: {
  nodes: readonly ArchitectureNode[];
  edges: readonly ArchitectureEdge[];
  title: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="architecture-map" data-loaded={ready ? 'true' : 'false'}>
      {ready ? (
        <ArchitectureFlowCanvas nodes={nodes} edges={edges} title={title} />
      ) : (
        <div className="architecture-map-placeholder" aria-hidden="true">
          {nodes.slice(0, 6).map((node) => <span key={node.id} />)}
        </div>
      )}
    </div>
  );
}
