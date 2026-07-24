"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="state-page shell">
      <p className="kicker">Unexpected error</p>
      <h1>The page could not be completed.</h1>
      <p>Try the request once more. No submitted content is retained by this page.</p>
      <button className="button button-primary" type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
