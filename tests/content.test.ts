import { describe, expect, it } from "vitest";
import {
  caseStudies,
  contactLinks,
  education,
  experience,
  notes,
  profile,
  projects,
} from "@/lib/content";

describe("approved portfolio content", () => {
  it("keeps canonical profile facts in one source", () => {
    expect(profile.name).toBe("Saqib Sohail");
    expect(profile.title).toBe("Senior Full-Stack Engineer");
    expect(profile.location).toBe("Berlin, Germany");
    expect(profile.email).toBe("saqib@ssohail.com");
    expect(profile.phone).toBe("+49 1522 6550321");
    expect(contactLinks.find((link) => link.label === "LinkedIn")?.href).toBe(
      "https://linkedin.com/in/saqibroy",
    );
  });

  it("keeps the verified role and education dates", () => {
    expect(experience[0].period).toBe("08/2025–05/2026");
    expect(experience[1].period).toBe("08/2019–04/2025");
    expect(education[0].period).toBe("04/2017–12/2020");
    expect(education[1].period).toBe("09/2011–10/2015");
  });

  it("restricts prominent projects to the three approved entries", () => {
    expect(projects.map((project) => project.title)).toEqual([
      "Jobs Tracker Bot",
      "Web Crawler Dashboard",
      "Accessibility Microservice",
    ]);
  });

  it("provides every required case-study section", () => {
    expect(caseStudies).toHaveLength(3);
    for (const study of caseStudies) {
      expect(study.context.length).toBeGreaterThan(20);
      expect(study.problem.length).toBeGreaterThan(20);
      expect(study.constraints.length).toBeGreaterThan(0);
      expect(study.responsibility.length).toBeGreaterThan(0);
      expect(study.boundaries.length).toBeGreaterThan(0);
      expect(study.architecture.nodes.length).toBeGreaterThan(2);
      expect(study.architecture.edges.length).toBeGreaterThan(1);
      expect(study.decisions.length).toBeGreaterThan(0);
      expect(study.tradeoffs.length).toBeGreaterThan(0);
      expect(study.quality.length).toBeGreaterThan(0);
      expect(study.outcome.length).toBeGreaterThan(0);
      expect(study.next.length).toBeGreaterThan(0);
      expect(study.technologies.length).toBeGreaterThan(0);
    }
  });

  it("uses unique route slugs", () => {
    const slugs = [
      ...caseStudies.map((study) => `work/${study.slug}`),
      ...notes.map((note) => `blog/${note.slug}`),
    ];
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("does not publish known unsupported claim language", () => {
    const publishedContent = JSON.stringify({
      profile,
      experience,
      projects,
      caseStudies,
      notes,
    }).toLowerCase();
    const prohibited = [
      "agentic workflow",
      "multi-agent",
      "self-correction",
      "microservice architecture",
      "kubernetes",
      "millions of users",
      "520+ tests",
      "organic search traffic",
      "software architect",
      "solution architect",
      "staff engineer",
      "principal engineer",
    ];

    for (const phrase of prohibited) {
      expect(publishedContent, `unexpected phrase: ${phrase}`).not.toContain(phrase);
    }
  });
});

