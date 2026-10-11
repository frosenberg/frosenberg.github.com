import { socialLinks } from "@/data/social-links";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-base text-ink-muted">
        <p>&copy; {new Date().getFullYear()} Florian Rosenberg, Vienna</p>
        <ul className="flex gap-6">
          {socialLinks.map((link) => (
            <li key={link.platform}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink underline underline-offset-4 decoration-1"
              >
                {link.platform}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
