import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience, selected work, education, and CV downloads for Saqib Sohail.',
  alternates: {
    canonical: 'https://ssohail.com/cv',
  },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
