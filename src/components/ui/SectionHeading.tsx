type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="editorial-rule grid gap-6 pt-7 md:grid-cols-[13rem_1fr]">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cerulean">
        {eyebrow} / {index}
      </p>
      <div className="max-w-4xl">
        <h2 className="font-serif text-4xl leading-[1.08] text-ink md:text-6xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
