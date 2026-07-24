import { Github, Linkedin, Mail } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>© {new Date().getFullYear()} Saqib Sohail</p>
        <nav aria-label="Contact links">
          <a href="https://github.com/saqibroy" rel="noreferrer"><Github aria-hidden="true" size={18} /><span className="sr-only">GitHub</span></a>
          <a href="https://linkedin.com/in/saqibroy" rel="noreferrer"><Linkedin aria-hidden="true" size={18} /><span className="sr-only">LinkedIn</span></a>
          <a href="mailto:saqib@ssohail.com"><Mail aria-hidden="true" size={18} /><span className="sr-only">Email</span></a>
        </nav>
      </div>
    </footer>
  );
}
