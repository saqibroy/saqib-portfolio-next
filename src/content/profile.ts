import type { Education, ExternalLink } from "./types";

export const profile = {
  name: "Saqib Sohail",
  title: "Senior Full-Stack Engineer",
  positioning: "Frontend-leaning full-stack engineer",
  location: "Berlin, Germany",
  experience: "8+ years",
  email: "saqib@ssohail.com",
  phone: "+49 1522 6550321",
  website: "ssohail.com",
  summary:
    "Saqib has delivered production web applications across civic-tech, nonprofit and early-stage product environments. His strongest frontend technologies are React, Next.js and TypeScript. He has hands-on backend experience in Django, FastAPI, Node.js and Ruby on Rails. He has experience modernising legacy systems, improving accessibility and performance, and owning AI-assisted product features from interface and API design through deployment.",
  hero: {
    headline:
      "I design and build web products across interfaces, services and AI workflows.",
    supporting:
      "Senior frontend-leaning full-stack engineer with 8+ years of experience turning complex product and research requirements into accessible, maintainable systems.",
    roleLine:
      "Berlin, Germany · Senior Full-Stack, Senior Frontend and Product Engineering",
  },
  languages: [
    "English — professional working proficiency",
    "German — B1 certified",
    "Urdu — native",
    "Punjabi — native",
  ],
} as const;

export const contactLinks = [
  { label: "Email", href: "mailto:saqib@ssohail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/saqibroy" },
  { label: "GitHub", href: "https://github.com/saqibroy" },
  { label: "Website", href: "https://ssohail.com" },
  { label: "Phone", href: "tel:+4915226550321" },
] as const satisfies readonly ExternalLink[];

export const education = [
  {
    institution: "Technische Universität Berlin",
    qualification: "Graduate coursework in Computer Science",
    period: "04/2017–12/2020",
    coursework: [
      "Machine Learning",
      "Database Systems",
      "Computer Graphics",
      "Advanced Web Development",
    ],
  },
  {
    institution: "GIFT University",
    qualification: "B.Sc. Computer Science",
    period: "09/2011–10/2015",
    coursework: [
      "Object-Oriented Programming",
      "Data Structures",
      "Database Systems",
      "Web Programming",
      "Software Engineering",
    ],
  },
] as const satisfies readonly Education[];

