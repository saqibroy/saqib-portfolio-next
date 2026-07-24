import Layout from '@/components/Layout';
import { portfolioContent } from '@/content/portfolio';

function formatMonth(value: string) {
  const [year, month] = value.split('-');
  return `${month}/${year}`;
}

function formatPeriod(startDate: string, endDate: string) {
  return `${formatMonth(startDate)}–${formatMonth(endDate)}`;
}

export default function CvPage() {
  const { profile, roles, education, capabilities, projects } = portfolioContent;
  const rolesById = new Map(roles.map((role) => [role.id, role]));
  const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));
  const visibleProjects = projects.filter((project) => project.visibility !== 'gated');

  return (
    <Layout>
      <article className="mx-auto w-full max-w-5xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <header className="border-b border-gray-700 pb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Experience</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {profile.positioning}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">{profile.summary}</p>
          <p className="mt-4 text-sm text-gray-400">{profile.location}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={profile.downloads.ats}
              download
              className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Download ATS CV
            </a>
            <a
              href={profile.downloads.visual}
              download
              className="rounded-lg border border-gray-600 px-5 py-3 font-semibold text-white transition-colors hover:border-cyan-300 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Download visual CV
            </a>
          </div>
        </header>

        <section className="py-12" aria-labelledby="capabilities-heading">
          <h2 id="capabilities-heading" className="text-2xl font-bold text-white">Capability areas</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {capabilities.map((capability) => {
              const linkedRoles = capability.relatedRoleIds
                .map((roleId) => rolesById.get(roleId))
                .filter((role): role is NonNullable<typeof role> => Boolean(role));
              const linkedProjects = capability.relatedProjectSlugs
                .map((slug) => projectsBySlug.get(slug))
                .filter((project): project is NonNullable<typeof project> => Boolean(project));

              return (
                <article key={capability.id} className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
                  <h3 className="text-lg font-semibold text-white">{capability.title}</h3>
                  <p className="mt-2 leading-7 text-gray-300">{capability.description}</p>
                  <p className="mt-4 text-sm text-gray-400">Evidence</p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2 text-sm">
                    {linkedRoles.map((role) => (
                      <a
                        key={role.id}
                        href={`#${role.id}`}
                        className="text-cyan-300 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-300"
                      >
                        {role.company}
                      </a>
                    ))}
                    {linkedProjects.map((project) => (
                      <a
                        key={project.slug}
                        href={`#${project.slug}`}
                        className="text-cyan-300 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-300"
                      >
                        {project.title}
                      </a>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-t border-gray-700 py-12" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="text-2xl font-bold text-white">Experience</h2>
          <div className="mt-8 space-y-8">
            {roles.map((role) => (
              <article key={role.id} id={role.id} className="scroll-mt-28 border-l-2 border-cyan-400 pl-5">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{role.title}</h3>
                    <p className="mt-1 text-cyan-300">{role.company}</p>
                  </div>
                  <p className="font-mono text-sm text-gray-400">{formatPeriod(role.startDate, role.endDate)}</p>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  {role.location} · {role.employmentType}
                </p>
                <p className="mt-3 text-sm text-gray-300">{role.technologies.join(' · ')}</p>
                <ul className="mt-4 space-y-3 text-gray-300">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="leading-7">{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-700 py-12" aria-labelledby="selected-work-heading">
          <h2 id="selected-work-heading" className="text-2xl font-bold text-white">Selected work</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {visibleProjects.map((project) => (
              <article key={project.slug} id={project.slug} className="scroll-mt-28 rounded-xl border border-gray-700 bg-gray-900/60 p-5">
                <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
                  {project.visibility === 'private-redacted' ? 'Private / redacted' : 'Public project'}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-2 leading-7 text-gray-300">{project.summary}</p>
                <p className="mt-4 text-sm text-gray-400">{project.technologies.join(' · ')}</p>
                {project.repositoryUrl ? (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-semibold text-cyan-300 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-300"
                  >
                    View repository
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-700 py-12" aria-labelledby="education-heading">
          <h2 id="education-heading" className="text-2xl font-bold text-white">Education and languages</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-5">
              {education.map((item) => (
                <article key={item.id}>
                  <h3 className="font-semibold text-white">{item.credential}</h3>
                  <p className="mt-1 text-cyan-300">{item.institution}</p>
                  <p className="mt-1 text-sm text-gray-400">
                    {formatPeriod(item.startDate, item.endDate)} · {item.location}
                  </p>
                  <p className="mt-2 leading-7 text-gray-300">{item.details}</p>
                </article>
              ))}
            </div>
            <dl className="space-y-3 text-gray-300">
              {profile.languages.map((language) => (
                <div key={language.name} className="flex flex-wrap justify-between gap-2 border-b border-gray-800 pb-3">
                  <dt className="font-semibold text-white">{language.name}</dt>
                  <dd>{language.proficiency}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </article>
    </Layout>
  );
}
