import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import {
  capabilities,
  contactLinks,
  education,
  experience,
  profile,
  projects,
} from "@/lib/content";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "CV · Senior Full-Stack Engineer",
  description:
    "Saqib Sohail’s verified experience, capabilities, selected projects, education and languages.",
  path: "/cv",
});

export default function CvPage() {
  return (
    <main id="main-content" className="cv-page shell">
      <header className="cv-header">
        <div>
          <p className="kicker">Curriculum vitae / 2026</p>
          <h1>{profile.name}</h1>
          <p className="cv-title">
            {profile.title} · {profile.positioning}
          </p>
        </div>
        <a
          className="button button-primary no-print"
          href="/Saqib_Sohail_CV.pdf"
          download
        >
          Download PDF <ArrowDown aria-hidden="true" size={18} />
        </a>
      </header>

      <div className="cv-contact" aria-label="Contact details">
        <span>
          <MapPin aria-hidden="true" size={15} /> {profile.location}
        </span>
        <a href={`mailto:${profile.email}`}>
          <Mail aria-hidden="true" size={15} /> {profile.email}
        </a>
        <a href="tel:+4915226550321">
          <Phone aria-hidden="true" size={15} /> {profile.phone}
        </a>
        {contactLinks
          .filter((link) => ["LinkedIn", "GitHub"].includes(link.label))
          .map((link) => (
            <a key={link.label} href={link.href}>
              {link.label} <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          ))}
      </div>

      <section className="cv-section cv-summary">
        <h2>Profile</h2>
        <p>{profile.summary}</p>
      </section>

      <section className="cv-section">
        <h2>Experience</h2>
        <div className="cv-timeline">
          {experience.map((role) => (
            <article key={role.company}>
              <div className="cv-role-heading">
                <div>
                  <h3>{role.title ?? role.company}</h3>
                  {role.title ? <p>{role.company}</p> : <p>Earlier experience</p>}
                </div>
                {role.period ? <time>{role.period}</time> : null}
              </div>
              <p>{role.summary}</p>
              <ul>
                {role.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
              <p className="technology-line">{role.technologies.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h2>Capabilities</h2>
        <div className="cv-capabilities">
          {capabilities.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.items.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h2>Selected open-source projects</h2>
        <div className="cv-projects">
          {projects.map((project) => (
            <article key={project.slug}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span>{project.technologies.join(" · ")}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section cv-columns">
        <div>
          <h2>Education</h2>
          {education.map((item) => (
            <article key={item.institution}>
              <h3>{item.qualification}</h3>
              <p>
                {item.institution} · {item.period}
              </p>
              <span>Coursework: {item.coursework.join(", ")}</span>
            </article>
          ))}
        </div>
        <div>
          <h2>Languages</h2>
          <ul className="language-list">
            {profile.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
