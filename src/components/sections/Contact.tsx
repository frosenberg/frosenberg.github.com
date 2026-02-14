import { Linkedin, Github } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { socialLinks } from "@/data/social-links";

const linkedIn = socialLinks.find((l) => l.icon === "linkedin");

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <SectionHeading
            number="08"
            title="Get In Touch"
            subtitle="Let's connect"
          />
        </AnimateOnScroll>

        <div className="max-w-2xl">
          <AnimateOnScroll delay={0.1}>
            <Card hover={false} className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                  <Linkedin size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-text-heading font-display font-semibold text-lg mb-1">
                    Let&apos;s connect on LinkedIn
                  </p>
                  <p className="text-sm text-text-muted leading-relaxed">
                    The best way to reach me is via LinkedIn. Whether you want to
                    discuss technology, explore collaboration, or just say hello
                    &mdash; I&apos;d love to hear from you.
                  </p>
                  {linkedIn && (
                    <a
                      href={linkedIn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dim transition-colors"
                    >
                      <Linkedin size={16} />
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-sm text-text-muted mb-4">
                  Also find me on
                </p>
                <div className="flex gap-3">
                  {socialLinks
                    .filter((l) => l.icon !== "linkedin")
                    .map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-bg border border-border rounded-lg text-sm text-text-muted hover:text-text-heading hover:border-border-light transition-colors"
                      >
                        <Github size={16} />
                        {link.platform}
                      </a>
                    ))}
                </div>
              </div>
            </Card>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
