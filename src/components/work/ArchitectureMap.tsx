import { ProjectSystemVisual } from '@/components/home/ProjectSystemVisuals';

const visualByTitle = {
  'AI-Assisted Contract Workflow': 'ai',
  'Jobs Tracker Bot': 'jobs',
  'Tactical Tech Platform Modernisation': 'content',
  'Web Crawler Dashboard': 'crawler',
} as const;

export function ArchitectureMap({ title }: { title: keyof typeof visualByTitle }) {
  return <div className="architecture-map"><ProjectSystemVisual variant={visualByTitle[title]} size="expanded" /></div>;
}
