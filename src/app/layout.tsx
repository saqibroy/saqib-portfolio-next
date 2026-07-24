import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { profile } from "@/lib/content";
import { createMetadata, siteUrl } from "@/lib/seo/metadata";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...createMetadata({
    title: "Saqib Sohail — Senior Full-Stack Engineer",
    description:
      "Senior frontend-leaning full-stack engineer designing web products across interfaces, services and AI workflows.",
    path: "/",
  }),
  title: {
    default: "Saqib Sohail — Senior Full-Stack Engineer",
    template: "%s — Saqib Sohail",
  },
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f3ef",
  colorScheme: "light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  jobTitle: profile.title,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  sameAs: [
    "https://linkedin.com/in/saqibroy",
    "https://github.com/saqibroy",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Django",
    "FastAPI",
    "Node.js",
    "Ruby on Rails",
    "Web accessibility",
    "Frontend performance",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Saqib Sohail — Systems notebook",
  url: siteUrl,
  description:
    "Selected product engineering work, case studies, CV and engineering notes.",
  author: {
    "@type": "Person",
    name: profile.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isVercelDeployment = Boolean(process.env.VERCEL);

  return (
    <html lang="en">
      <body
        className={`${sourceSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {isVercelDeployment ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
