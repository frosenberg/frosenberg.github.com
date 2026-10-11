import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";

const linkClass =
  "text-signal underline underline-offset-4 decoration-1 hover:decoration-2";

const titleBlock: { label: string; value: string }[] = [
  { label: "Role", value: "CTO, Truvio" },
  { label: "Based in", value: SITE.location },
  { label: "Education", value: "PhD, TU Wien, 2009" },
  { label: "Focus", value: "AI, cloud, ERP and platform engineering" },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading title="About" />

      <div className="grid lg:grid-cols-[1fr_20rem] gap-12 lg:gap-16 items-start">
        <div className="space-y-5 max-w-[65ch]">
          <p>
            I&apos;m the CTO at{" "}
            <a
              href="https://truvio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Truvio
            </a>
            , where I lead technology across a portfolio of finance,
            operations and commerce software built natively into Microsoft
            Dynamics 365.
          </p>
          <p>
            Before Truvio, I was CTO &amp; CIO at{" "}
            <a
              href="https://www.esko.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Esko
            </a>{" "}
            (part of{" "}
            <a
              href="https://www.veralto.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Veralto
            </a>
            ), leading 460+ engineers and IT staff across Europe, India and the
            US. Before that I was CTO at{" "}
            <a
              href="https://www.crayon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Crayon
            </a>
            , where I also served as VP for Data &amp; AI and built the AI
            Center of Excellence. Earlier, I held various leadership positions
            at IBM in Vienna and New York and CSIRO/Data61 in Australia,
            working on AI/ML services, Cloud, and DevOps tooling that resulted
            in a number of patents.
          </p>
          <p>
            I completed my PhD in June 2009 at{" "}
            <a
              href="http://www.tuwien.ac.at"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              TU Wien
            </a>
            , where I was a member of the{" "}
            <a
              href="http://dsg.tuwien.ac.at"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Distributed Systems Group
            </a>
            . My focus was on service-oriented architectures &mdash; in
            particular how to engineer resilient applications composed of
            microservices, just that we did not call it microservices back
            then.
          </p>
          <p className="text-ink-muted">
            In my free time, I enjoy spending time with my kids, being outdoors
            and various kinds of sports like Taekwondo or snowboarding.
          </p>
        </div>

        {/* Drafting title block */}
        <div className="border-[1.5px] border-ink bg-panel max-w-sm">
          <dl className="text-base">
            {titleBlock.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[6.5rem_1fr] border-b border-line last:border-b-0"
              >
                <dt className="font-cond font-medium text-ink-muted px-3 py-2 border-r border-line">
                  {row.label}
                </dt>
                <dd className="px-3 py-2 font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
