import type { ArchitectureDefinition } from '@/content/caseStudies';

type PositionedNode = { x: number; y: number };
type Boundary = { label: string; x: number; y: number; width: number; height: number };
type Layout = { width: number; height: number; nodes: Record<string, PositionedNode>; boundaries: Boundary[] };

const nodeWidth = 150;
const nodeHeight = 70;

const layouts: Record<string, Layout> = {
  'AI-Assisted Contract Workflow': {
    width: 890, height: 410,
    boundaries: [{ label: 'Public-site framework', x: 175, y: 45, width: 220, height: 320 }, { label: 'Application services', x: 420, y: 45, width: 410, height: 320 }],
    nodes: {
      'contract-user': { x: 20, y: 170 }, 'react-chatbot': { x: 205, y: 105 }, 'react-configurator': { x: 205, y: 245 },
      'django-application': { x: 450, y: 170 }, 'editing-sessions': { x: 450, y: 285 }, 'fastapi-ai': { x: 650, y: 95 }, 'stripe': { x: 650, y: 260 },
    },
  },
  'Jobs Tracker Bot': {
    width: 960, height: 410,
    boundaries: [{ label: 'Jobs Tracker Bot', x: 225, y: 45, width: 545, height: 320 }],
    nodes: {
      'ats-boards': { x: 20, y: 95 }, 'curated-feeds': { x: 20, y: 250 }, 'scan-scheduler': { x: 255, y: 100 },
      'source-adapters': { x: 425, y: 100 }, 'filter-score': { x: 425, y: 255 }, 'sqlite-store': { x: 600, y: 255 },
      'alert-router': { x: 600, y: 100 }, 'notification-channels': { x: 790, y: 175 },
    },
  },
  'Tactical Tech Platform Modernisation': {
    width: 990, height: 410,
    boundaries: [{ label: 'Content platform', x: 190, y: 45, width: 400, height: 320 }, { label: 'Public delivery', x: 610, y: 45, width: 190, height: 320 }],
    nodes: {
      editors: { x: 20, y: 170 }, 'decap-cms': { x: 220, y: 95 }, 'git-content': { x: 220, y: 245 },
      'content-api': { x: 420, y: 170 }, 'public-sites': { x: 630, y: 95 }, 'central-search': { x: 630, y: 245 }, visitors: { x: 820, y: 170 },
    },
  },
  'Web Crawler Dashboard': {
    width: 890, height: 410,
    boundaries: [{ label: 'Crawler application', x: 175, y: 45, width: 650, height: 320 }],
    nodes: {
      'authenticated-user': { x: 20, y: 170 }, 'react-dashboard': { x: 205, y: 105 }, 'gin-api': { x: 405, y: 105 },
      'crawl-lifecycle': { x: 605, y: 105 }, gorm: { x: 405, y: 260 }, mysql: { x: 605, y: 260 },
    },
  },
};

const kindLabels = {
  source: 'External actor / system', interface: 'Web application', boundary: 'Application boundary', service: 'Service', decision: 'Application component', data: 'Data store', delivery: 'External channel',
} as const;

function labelLines(label: string) {
  const words = label.split(' ');
  if (words.length === 1) return [label];
  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')];
}

function connection(source: PositionedNode, target: PositionedNode) {
  const sourceCenter = { x: source.x + nodeWidth / 2, y: source.y + nodeHeight / 2 };
  const targetCenter = { x: target.x + nodeWidth / 2, y: target.y + nodeHeight / 2 };
  const dx = targetCenter.x - sourceCenter.x;
  const dy = targetCenter.y - sourceCenter.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    return {
      path: `M ${dx >= 0 ? source.x + nodeWidth : source.x} ${sourceCenter.y} L ${dx >= 0 ? target.x : target.x + nodeWidth} ${targetCenter.y}`,
      labelX: (sourceCenter.x + targetCenter.x) / 2,
      labelY: (sourceCenter.y + targetCenter.y) / 2 - 8,
    };
  }

  return {
    path: `M ${sourceCenter.x} ${dy >= 0 ? source.y + nodeHeight : source.y} L ${targetCenter.x} ${dy >= 0 ? target.y : target.y + nodeHeight}`,
    labelX: (sourceCenter.x + targetCenter.x) / 2,
    labelY: (sourceCenter.y + targetCenter.y) / 2 - 8,
  };
}

export function ArchitectureMap({ title, visual }: { title: string; visual: ArchitectureDefinition }) {
  const layout = layouts[title];
  if (!layout) return null;
  const markerId = `architecture-arrow-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return <div className="architecture-map">
    <svg viewBox={`0 0 ${layout.width} ${layout.height}`} role="img" aria-hidden="true">
      <defs><marker id={markerId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" /></marker></defs>
      {layout.boundaries.map((boundary) => <g key={boundary.label} className="architecture-map-boundary"><rect x={boundary.x} y={boundary.y} width={boundary.width} height={boundary.height} rx="8" /><text x={boundary.x + 14} y={boundary.y + 22}>{boundary.label}</text></g>)}
      {visual.edges.map((edge) => {
        const source = layout.nodes[edge.source];
        const target = layout.nodes[edge.target];
        if (!source || !target) return null;
        const line = connection(source, target);
        return <path key={`${edge.source}-${edge.target}`} d={line.path} markerEnd={`url(#${markerId})`} />;
      })}
      {visual.nodes.map((node) => {
        const position = layout.nodes[node.id];
        if (!position) return null;
        const lines = labelLines(node.label);
        return <g key={node.id} className={`architecture-map-node architecture-map-node--${node.kind}`}><rect x={position.x} y={position.y} width={nodeWidth} height={nodeHeight} rx="7" /><text x={position.x + nodeWidth / 2} y={lines.length === 1 ? position.y + 29 : position.y + 23} textAnchor="middle">{lines.map((line, index) => <tspan key={line} x={position.x + nodeWidth / 2} dy={index === 0 ? 0 : 16}>{line}</tspan>)}</text><text className="architecture-map-node-type" x={position.x + nodeWidth / 2} y={position.y + 57} textAnchor="middle">{kindLabels[node.kind]}</text></g>;
      })}
      {visual.edges.map((edge) => {
        const source = layout.nodes[edge.source];
        const target = layout.nodes[edge.target];
        if (!source || !target || !edge.label) return null;
        const line = connection(source, target);
        return <text key={`${edge.source}-${edge.target}-label`} className="architecture-map-edge-label" x={line.labelX} y={line.labelY} textAnchor="middle">{edge.label}</text>;
      })}
    </svg>
  </div>;
}
