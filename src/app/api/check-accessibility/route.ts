import { NextRequest, NextResponse } from 'next/server';

import {
  ACCESSIBILITY_LIMITS,
  AccessibilityInputError,
  AccessibilityUpstreamError,
  parseAccessibilityResponse,
  parsePublicTargetUrl,
  readJsonWithinLimit,
  rejectPrivateResolution,
} from '@/lib/accessibility-checker';

export const runtime = 'nodejs';

type ErrorResponse = { success: false; error: string };
const error = (message: string, status: number) => NextResponse.json<ErrorResponse>({ success: false, error: message }, { status });

function configuredServiceUrl(): URL {
  const value = process.env.ACCESSIBILITY_MICROSERVICE_URL;
  if (!value) throw new AccessibilityUpstreamError('The scan service is not configured.');
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new AccessibilityUpstreamError('The scan service is not configured.');
  }
  if (url.protocol !== 'https:' || url.username || url.password) throw new AccessibilityUpstreamError('The scan service is not configured.');
  return url;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > ACCESSIBILITY_LIMITS.maxRequestBytes) return error('Request body is too large.', 413);

  let body: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > ACCESSIBILITY_LIMITS.maxRequestBytes) return error('Request body is too large.', 413);
    body = JSON.parse(raw);
  } catch {
    return error('Request body must be valid JSON.', 400);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length !== 1 || !('url' in body)) return error('Request must contain only a URL.', 400);

  try {
    const target = parsePublicTargetUrl((body as { url?: unknown }).url);
    await rejectPrivateResolution(target);
    const service = configuredServiceUrl();
    const endpoint = new URL('/check-accessibility-static', service);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ACCESSIBILITY_LIMITS.timeoutMs);
    let upstream: Response;
    try {
      upstream = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ url: target.toString() }),
        signal: controller.signal,
        redirect: 'error',
      });
    } catch {
      return error('The scan service is unavailable. Please try again later.', 503);
    } finally {
      clearTimeout(timeout);
    }
    if (!upstream.ok) return error('The scan service could not complete the request.', 502);

    const payload = await readJsonWithinLimit(upstream);
    const report = parseAccessibilityResponse(payload, target.toString());
    return NextResponse.json({ success: true, data: report });
  } catch (reason) {
    if (reason instanceof AccessibilityInputError) return error(reason.message, 400);
    if (reason instanceof AccessibilityUpstreamError) return error(reason.message, 502);
    return error('The scan service could not complete the request.', 502);
  }
}

export function GET() {
  return error('Method not allowed.', 405);
}
