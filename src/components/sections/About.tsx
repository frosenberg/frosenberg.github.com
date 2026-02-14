import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SITE } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <SectionHeading number="01" title="About" />
        </AnimateOnScroll>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-5">
            <AnimateOnScroll delay={0.1}>
              <p className="text-lg leading-relaxed">
                Currently, I&apos;m the CTO &amp; CIO at{" "}
                <a
                  href="https://www.esko.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary underline underline-offset-2 transition-colors"
                >
                  Esko
                </a>{" "}
                (part of{" "}
                <a
                  href="https://www.veralto.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary underline underline-offset-2 transition-colors"
                >
                  Veralto
                </a>
                ), a global leader in packaging software solutions serving
                CPG and pharmaceutical industries. I lead technology strategy
                across cloud and AI initiatives, direct engineering and IT for
                460+ FTEs across Europe, India, and the US, and champion the
                adoption of modern development practices across the
                organization&apos;s software portfolio.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <p className="text-lg leading-relaxed">
                Before Esko, I was the CTO at{" "}
                <a
                  href="https://www.crayon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary underline underline-offset-2 transition-colors"
                >
                  Crayon
                </a>
                , where I also served as VP for Data &amp; AI and built
                the AI Center of Excellence. Before that, I held various
                leadership positions at IBM in Vienna and New York and
                CSIRO/Data61 in Australia, working on AI/ML services, Cloud, and
                DevOps tooling that resulted in a number of patents.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3}>
              <p className="text-lg leading-relaxed">
                I completed my PhD in June 2009 at{" "}
                <a
                  href="http://www.tuwien.ac.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary underline underline-offset-2 transition-colors"
                >
                  TU Wien
                </a>
                , where I was a member of the{" "}
                <a
                  href="http://dsg.tuwien.ac.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary underline underline-offset-2 transition-colors"
                >
                  Distributed Systems Group
                </a>
                . My focus was on service-oriented architectures &mdash; in
                particular how to engineer resilient applications composed of
                microservices, just that we did not call it microservices back
                then.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.4}>
              <p className="text-lg leading-relaxed text-text-muted">
                In my free time, I enjoy spending time with my kids, being
                outdoors and various kinds of sports like Taekwondo or
                snowboarding.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="md:col-span-2">
            <AnimateOnScroll delay={0.2}>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 text-text-muted mb-4">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm">{SITE.location}</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-text-dim font-mono uppercase tracking-wider">
                      Role
                    </span>
                    <p className="text-text-heading font-medium">
                      {SITE.title}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-text-dim font-mono uppercase tracking-wider">
                      Focus
                    </span>
                    <p className="text-text-heading font-medium">
                      AI/ML, Cloud, Packaging Software
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-text-dim font-mono uppercase tracking-wider">
                      Education
                    </span>
                    <p className="text-text-heading font-medium">
                      PhD, TU Wien
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
