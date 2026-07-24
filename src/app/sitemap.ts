import type { MetadataRoute } from "next";
import { caseStudies, notes } from "@/lib/content";
import { siteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/cv", "/blog"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-07-23"),
    changeFrequency: path === "" ? ("monthly" as const) : ("yearly" as const),
    priority: path === "" ? 1 : path === "/work" ? 0.9 : 0.7,
  }));

  const workRoutes = caseStudies.map((study) => ({
    url: `${siteUrl}/work/${study.slug}`,
    lastModified: new Date("2026-07-23"),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const noteRoutes = notes.map((note) => ({
    url: `${siteUrl}/blog/${note.slug}`,
    lastModified: new Date("2026-07-23"),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...workRoutes, ...noteRoutes];
}

