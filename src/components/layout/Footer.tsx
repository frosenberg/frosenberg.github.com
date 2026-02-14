import { Linkedin, Github } from "lucide-react";
import { socialLinks } from "@/data/social-links";

const iconMap: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  github: Github,
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Florian Rosenberg
        </p>
        <p className="text-sm text-text-dim">
          Built with Next.js &amp; Tailwind CSS
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="text-text-muted hover:text-text-heading transition-colors"
              >
                {Icon && <Icon size={18} />}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
