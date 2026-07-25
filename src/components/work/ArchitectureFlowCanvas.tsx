'use client';

import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMemo, useState } from 'react';

import type { ArchitectureEdge, ArchitectureNode } from '@/content/caseStudies';

type FlowNodeData = {
  label: React.ReactNode;
  source: ArchitectureNode;
};

function buildLayout(nodes: readonly ArchitectureNode[], edges: readonly ArchitectureEdge[]) {
  const depth = new Map<string, number>();
  nodes.filter((node) => node.kind === 'source').forEach((node) => depth.set(node.id, 0));
  if (depth.size === 0 && nodes[0]) depth.set(nodes[0].id, 0);

  for (let pass = 0; pass < nodes.length; pass += 1) {
    for (const edge of edges) {
      const sourceDepth = depth.get(edge.source);
      if (sourceDepth !== undefined && depth.get(edge.target) === undefined) {
        depth.set(edge.target, sourceDepth + 1);
      }
    }
  }
  nodes.forEach((node, index) => {
    if (depth.get(node.id) === undefined) depth.set(node.id, index);
  });

  const layers = new Map<number, ArchitectureNode[]>();
  nodes.forEach((node) => {
    const layer = depth.get(node.id) ?? 0;
    layers.set(layer, [...(layers.get(layer) ?? []), node]);
  });

  const flowNodes: Node<FlowNodeData>[] = [];
  [...layers.entries()].forEach(([layer, layerNodes]) => {
    const rowGroup = Math.floor(layer / 4);
    const localColumn = layer % 4;
    const visualColumn = rowGroup % 2 === 0 ? localColumn : 3 - localColumn;
    layerNodes.forEach((node, row) => {
      flowNodes.push({
        id: node.id,
        position: {
          x: visualColumn * 245,
          y: rowGroup * 240 + row * 118 - ((layerNodes.length - 1) * 118) / 2,
        },
        data: {
          source: node,
          label: (
            <span className="architecture-node-content">
              <small>{node.kind}</small>
              <strong>{node.label}</strong>
            </span>
          ),
        },
        className: `architecture-node architecture-node--${node.kind}`,
        ariaLabel: `${node.label}, ${node.kind}${node.detail ? `: ${node.detail}` : ''}`,
        draggable: false,
        connectable: false,
        selectable: true,
      });
    });
  });

  const flowEdges: Edge[] = edges.map((edge, index) => ({
    id: `${edge.source}-${edge.target}-${index}`,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#46bdd0' },
    style: { stroke: '#46bdd0', strokeWidth: 1.4 },
    labelStyle: { fill: 'currentColor', fontSize: 11 },
  }));

  return { flowNodes, flowEdges };
}

export function ArchitectureFlowCanvas({
  nodes,
  edges,
  title,
}: {
  nodes: readonly ArchitectureNode[];
  edges: readonly ArchitectureEdge[];
  title: string;
}) {
  const { flowNodes, flowEdges } = useMemo(() => buildLayout(nodes, edges), [edges, nodes]);
  const [selectedId, setSelectedId] = useState(nodes[0]?.id);
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];
  const handleNodeClick: NodeMouseHandler<Node<FlowNodeData>> = (_, node) => setSelectedId(node.id);

  return (
    <>
      <div
        className="architecture-flow-canvas"
        role="group"
        aria-label={`${title} interactive architecture map`}
        onKeyDownCapture={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          const node = (event.target as HTMLElement).closest<HTMLElement>('.react-flow__node');
          if (!node?.dataset.id) return;
          event.preventDefault();
          setSelectedId(node.dataset.id);
        }}
      >
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          onNodeClick={handleNodeClick}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.32}
          maxZoom={1.5}
          nodesDraggable={false}
          nodesConnectable={false}
          edgesFocusable={false}
          panOnScroll={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Lines} gap={28} size={0.65} />
          <Controls showInteractive={false} position="bottom-right" />
        </ReactFlow>
      </div>
      {selected ? (
        <section className="architecture-selection" aria-live="polite">
          <span>{selected.kind}</span>
          <h3>{selected.label}</h3>
          {selected.detail ? <p>{selected.detail}</p> : <p>This boundary is represented in the ordered architecture flow below.</p>}
        </section>
      ) : null}
    </>
  );
}
