'use client';

import { AlertTriangle, CheckCircle2, ExternalLink, LoaderCircle, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';

type Report = {
  url: string;
  timestamp: string;
  processingTimeMs: number;
  summary: { totalViolations: number; totalPasses: number; totalIncomplete: number };
  violations: Array<{ id: string; impact: 'minor' | 'moderate' | 'serious' | 'critical' | null; description: string; help: string; helpUrl: string; tags: string[]; nodes: Array<{ target: string[]; failureSummary: string }> }>;
  passes: number;
  incomplete: number;
};

export default function AccessibilityCheckerPage() {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setReport(null);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/check-accessibility', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url: url.trim() }) });
      const payload = await response.json() as { success?: boolean; data?: Report; error?: string };
      if (!response.ok || !payload.success || !payload.data) throw new Error(payload.error || 'The scan could not be completed.');
      setReport(payload.data);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The scan could not be completed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return <article className="checker-page">
    <header className="checker-hero">
      <p className="eyebrow">Experimental tool · not indexed</p>
      <h1>Accessibility Checker</h1>
      <p>Run a limited automated scan of a public URL. Results are signals for review, not a compliance certification or a substitute for manual testing.</p>
    </header>

    <section className="checker-panel" aria-labelledby="checker-form-title">
      <h2 id="checker-form-title">Scan a public page</h2>
      <form onSubmit={submit}>
        <label htmlFor="scan-url">Public HTTP(S) URL</label>
        <div className="checker-input-row">
          <input id="scan-url" name="url" type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com" required disabled={isSubmitting} />
          <button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle aria-hidden="true" size={18} /> Scanning</> : 'Run scan'}</button>
        </div>
      </form>
      <p className="checker-note">Local, loopback, link-local, private-network, credentialed, and non-HTTP(S) targets are rejected. Scans time out and responses are size-limited.</p>
      {isSubmitting && <p className="checker-status" role="status"><LoaderCircle aria-hidden="true" size={18} /> Submitting the URL to the scan service. This may take up to 15 seconds.</p>}
      {error && <p className="checker-error" role="alert"><AlertTriangle aria-hidden="true" size={18} /> {error}</p>}
    </section>

    {report && <section className="checker-results" aria-labelledby="checker-results-title">
      <header>
        <p className="eyebrow">Automated scan result</p>
        <h2 id="checker-results-title">Review the findings in context</h2>
        <p>Scanned <a href={report.url} target="_blank" rel="noreferrer">{report.url}<ExternalLink aria-hidden="true" size={15} /></a> in {(report.processingTimeMs / 1000).toFixed(1)} seconds.</p>
      </header>
      <dl className="checker-summary">
        <div><dt>Violations</dt><dd>{report.summary.totalViolations}</dd></div>
        <div><dt>Passes</dt><dd>{report.summary.totalPasses}</dd></div>
        <div><dt>Incomplete</dt><dd>{report.summary.totalIncomplete}</dd></div>
      </dl>
      {report.violations.length === 0 ? <p className="checker-empty"><CheckCircle2 aria-hidden="true" size={20} /> No automated violations were returned. Manual review is still required.</p> : <ol className="checker-violations">
        {report.violations.map((violation) => <li key={violation.id}>
          <p className="checker-impact">{violation.impact ?? 'unknown'} impact</p>
          <h3>{violation.help}</h3>
          <p>{violation.description}</p>
          {violation.helpUrl && <a href={violation.helpUrl} target="_blank" rel="noreferrer">Learn about this rule <ExternalLink aria-hidden="true" size={15} /></a>}
          {violation.nodes.length > 0 && <details><summary>{violation.nodes.length} affected element{violation.nodes.length === 1 ? '' : 's'}</summary><ul>{violation.nodes.map((node, index) => <li key={`${violation.id}-${index}`}><code>{node.target.join(', ') || 'Unspecified target'}</code><span>{node.failureSummary}</span></li>)}</ul></details>}
        </li>)}
      </ol>}
    </section>}

    <aside className="checker-limitations" aria-label="Tool limitations"><ShieldCheck aria-hidden="true" size={22} /><div><h2>Use this as one input, not a verdict</h2><p>The checker cannot verify keyboard workflows, screen-reader comprehension, user experience, or legal conformance. Do not submit sensitive URLs or confidential content.</p></div></aside>
  </article>;
}
