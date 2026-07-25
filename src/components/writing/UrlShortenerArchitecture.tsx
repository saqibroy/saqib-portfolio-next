const redirectPath = ['Visitor', 'Redirect service', 'Cache', 'PostgreSQL'];

export function UrlShortenerArchitecture() {
  return <figure className="url-shortener-architecture">
    <figcaption>URL shortener paths</figcaption>
    <div className="url-shortener-create"><strong>Creation</strong><ol><li>Client</li><li>Link API</li><li>PostgreSQL</li></ol></div>
    <div className="url-shortener-redirect"><strong>Redirect</strong><ol>{redirectPath.map((label) => <li key={label}>{label}</li>)}</ol></div>
    <div className="url-shortener-analytics"><strong>Async analytics</strong><span>Click event is processed outside the redirect path.</span></div>
  </figure>;
}
