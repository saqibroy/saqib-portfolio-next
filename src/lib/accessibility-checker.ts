import { lookup } from 'node:dns/promises';
import net from 'node:net';

export const ACCESSIBILITY_LIMITS = {
  maxRequestBytes: 2_048,
  maxUrlLength: 2_048,
  maxResponseBytes: 1_000_000,
  timeoutMs: 15_000,
  maxViolations: 100,
  maxNodesPerViolation: 50,
} as const;

export type SafeViolation = {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical' | null;
  description: string;
  help: string;
  helpUrl: string;
  tags: string[];
  nodes: Array<{ target: string[]; failureSummary: string }>;
};

export type SafeAccessibilityReport = {
  url: string;
  timestamp: string;
  processingTimeMs: number;
  summary: { totalViolations: number; totalPasses: number; totalIncomplete: number };
  violations: SafeViolation[];
  passes: number;
  incomplete: number;
};

export class AccessibilityInputError extends Error {}
export class AccessibilityUpstreamError extends Error {}

const privateIpv4Ranges = [
  /^127\./,
  /^10\./,
  /^0\./,
  /^169\.254\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
];

function isPrivateAddress(address: string): boolean {
  const family = net.isIP(address);
  if (family === 4) return privateIpv4Ranges.some((range) => range.test(address));
  if (family === 6) {
    const normalized = address.toLowerCase();
    return normalized === '::1' || normalized === '::' || normalized.startsWith('fc') || normalized.startsWith('fd') || normalized.startsWith('fe80:') || normalized.startsWith('::ffff:127.');
  }
  return true;
}

export function parsePublicTargetUrl(value: unknown): URL {
  if (typeof value !== 'string' || value.length === 0 || value.length > ACCESSIBILITY_LIMITS.maxUrlLength) {
    throw new AccessibilityInputError('Provide a valid public URL.');
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new AccessibilityInputError('Provide a valid public URL.');
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || !url.hostname) {
    throw new AccessibilityInputError('Only public HTTP(S) URLs without credentials are supported.');
  }

  const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || (net.isIP(hostname) !== 0 && isPrivateAddress(hostname))) {
    throw new AccessibilityInputError('Private, loopback, and local network targets are not supported.');
  }

  return url;
}

export async function rejectPrivateResolution(url: URL): Promise<void> {
  let addresses: Array<{ address: string }>;
  try {
    addresses = await lookup(url.hostname, { all: true, verbatim: true });
  } catch {
    throw new AccessibilityInputError('The target host could not be resolved.');
  }

  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new AccessibilityInputError('Private, loopback, and local network targets are not supported.');
  }
}

function readString(value: unknown, limit = 2_000): string {
  return typeof value === 'string' ? value.slice(0, limit) : '';
}

function readNonNegativeInteger(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : undefined;
}

function readImpact(value: unknown): SafeViolation['impact'] {
  return value === 'minor' || value === 'moderate' || value === 'serious' || value === 'critical' ? value : null;
}

function safeHelpUrl(value: unknown): string {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : '';
  } catch {
    return '';
  }
}

export function parseAccessibilityResponse(value: unknown, expectedUrl: string): SafeAccessibilityReport {
  if (!value || typeof value !== 'object') throw new AccessibilityUpstreamError('The scan service returned an invalid report.');
  const payload = value as { success?: unknown; data?: unknown };
  if (payload.success !== true || !payload.data || typeof payload.data !== 'object') {
    throw new AccessibilityUpstreamError('The scan service could not complete the request.');
  }

  const data = payload.data as Record<string, unknown>;
  const summary = data.summary as Record<string, unknown> | undefined;
  const totalViolations = readNonNegativeInteger(summary?.totalViolations);
  const totalPasses = readNonNegativeInteger(summary?.totalPasses);
  const totalIncomplete = readNonNegativeInteger(summary?.totalIncomplete);
  const processingTimeMs = readNonNegativeInteger(data.processingTimeMs);
  if (totalViolations === undefined || totalPasses === undefined || totalIncomplete === undefined || processingTimeMs === undefined || !Array.isArray(data.violations)) {
    throw new AccessibilityUpstreamError('The scan service returned an invalid report.');
  }

  const violations = data.violations.slice(0, ACCESSIBILITY_LIMITS.maxViolations).flatMap((item): SafeViolation[] => {
    if (!item || typeof item !== 'object') return [];
    const violation = item as Record<string, unknown>;
    const id = readString(violation.id, 120);
    const description = readString(violation.description);
    const help = readString(violation.help);
    const helpUrl = safeHelpUrl(readString(violation.helpUrl, 2_048));
    if (!id || !description || !help) return [];
    const tags = Array.isArray(violation.tags) ? violation.tags.filter((tag): tag is string => typeof tag === 'string').slice(0, 20).map((tag) => tag.slice(0, 120)) : [];
    const nodes = Array.isArray(violation.nodes) ? violation.nodes.slice(0, ACCESSIBILITY_LIMITS.maxNodesPerViolation).flatMap((node) => {
      if (!node || typeof node !== 'object') return [];
      const entry = node as Record<string, unknown>;
      const target = Array.isArray(entry.target) ? entry.target.filter((part): part is string => typeof part === 'string').slice(0, 10).map((part) => part.slice(0, 500)) : [];
      const failureSummary = readString(entry.failureSummary);
      return failureSummary ? [{ target, failureSummary }] : [];
    }) : [];
    return [{ id, impact: readImpact(violation.impact), description, help, helpUrl, tags, nodes }];
  });

  return {
    url: expectedUrl,
    timestamp: typeof data.timestamp === 'string' && !Number.isNaN(Date.parse(data.timestamp)) ? data.timestamp : new Date().toISOString(),
    processingTimeMs,
    summary: { totalViolations, totalPasses, totalIncomplete },
    violations,
    passes: readNonNegativeInteger(data.passes) ?? 0,
    incomplete: Array.isArray(data.incomplete) ? data.incomplete.length : 0,
  };
}

export async function readJsonWithinLimit(response: Response): Promise<unknown> {
  const contentLength = Number(response.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > ACCESSIBILITY_LIMITS.maxResponseBytes) {
    throw new AccessibilityUpstreamError('The scan service response was too large.');
  }

  if (!response.body) throw new AccessibilityUpstreamError('The scan service returned an empty response.');
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > ACCESSIBILITY_LIMITS.maxResponseBytes) throw new AccessibilityUpstreamError('The scan service response was too large.');
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  try {
    return JSON.parse(new TextDecoder().decode(Buffer.concat(chunks)));
  } catch {
    throw new AccessibilityUpstreamError('The scan service returned invalid JSON.');
  }
}
