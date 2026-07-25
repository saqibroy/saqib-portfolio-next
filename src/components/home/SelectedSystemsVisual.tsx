const systems = [
  ['React editor', 'Django', 'FastAPI'],
  ['ATS adapters', 'Rules', 'Alerts'],
  ['Decap CMS', 'Next / Nuxt', 'Users'],
] as const;

export function SelectedSystemsVisual() {
  return (
    <figure className="selected-systems-visual" aria-labelledby="selected-systems-title">
      <figcaption id="selected-systems-title">Selected systems</figcaption>
      <ol>
        {systems.map((system) => (
          <li key={system.join('-')}>
            {system.map((label, index) => (
              <span key={label} className={index === system.length - 1 ? undefined : 'selected-systems-node'}>
                {label}
              </span>
            ))}
          </li>
        ))}
      </ol>
    </figure>
  );
}
