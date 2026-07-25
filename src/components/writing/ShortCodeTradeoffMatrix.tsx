const strategies = [
  ['Random Base62', 'Large, shareable namespace; database constraint handles collisions.', 'Retry on an unlikely collision.'],
  ['Database sequence + Base62', 'Simple uniqueness and compact codes.', 'Sequential codes are easier to enumerate.'],
  ['Hash of original URL', 'Deterministic for a given input.', 'Truncation can collide; identical URLs need not share a link.'],
] as const;

export function ShortCodeTradeoffMatrix() {
  return <div className="short-code-tradeoff-matrix"><table><caption>Short-code strategy trade-offs</caption><thead><tr><th scope="col">Strategy</th><th scope="col">Strength</th><th scope="col">Trade-off</th></tr></thead><tbody>{strategies.map(([strategy, strength, tradeoff]) => <tr key={strategy}><th scope="row">{strategy}</th><td>{strength}</td><td>{tradeoff}</td></tr>)}</tbody></table></div>;
}
