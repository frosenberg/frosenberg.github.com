import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialLinks } from "@/data/social-links";

const linkedIn = socialLinks.find((l) => l.icon === "linkedin");
const others = socialLinks.filter((l) => l.icon !== "linkedin");

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading title="Contact" />

      <p className="max-w-[48ch] text-[1.3125rem] leading-snug">
        LinkedIn is the best way to reach me, whether it&apos;s about
        technology, a collaboration or just to say hello.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        {linkedIn && (
          <a
            href={linkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-3 bg-signal-fill text-white font-medium hover:bg-signal-fill-hover transition-colors"
          >
            Message me on LinkedIn
          </a>
        )}
        {others.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 decoration-1 hover:decoration-2"
          >
            {link.platform}
          </a>
        ))}
      </div>
    </Section>
  );
}
