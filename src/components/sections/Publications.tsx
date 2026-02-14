"use client";

import { useState } from "react";
import { FileText, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ExpandableList } from "@/components/ui/ExpandableList";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { Publication } from "@/types";

// We'll import publications lazily to keep the component focused
import { publications } from "@/data/publications";

type PubType = Publication["type"];

const tabs: { label: string; type: PubType }[] = [
  { label: "Journals", type: "journal" },
  { label: "Conferences", type: "conference" },
  { label: "Books", type: "book-chapter" },
  { label: "Thesis", type: "thesis" },
];

function highlightAuthor(authors: string) {
  return authors.replace(
    /F\.\s*Rosenberg/g,
    '<strong class="text-text-heading">F. Rosenberg</strong>'
  );
}

function PublicationItem({ pub }: { pub: Publication }) {
  return (
    <div className="border-b border-border py-4 last:border-0">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-text-heading leading-snug text-sm">
            {pub.pdfPath ? (
              <a
                href={pub.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-light transition-colors"
              >
                {pub.title}
              </a>
            ) : (
              pub.title
            )}
          </h4>
          <p
            className="text-xs text-text-muted mt-1"
            dangerouslySetInnerHTML={{
              __html: highlightAuthor(pub.authors),
            }}
          />
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs text-text-dim">{pub.venue}</span>
            <span className="font-mono text-xs text-text-dim">
              ({pub.year})
            </span>
            {pub.award && (
              <Badge variant="accent">
                <span className="flex items-center gap-1">
                  <Award size={10} />
                  {pub.award}
                </span>
              </Badge>
            )}
          </div>
        </div>
        {pub.pdfPath && (
          <a
            href={pub.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-dim hover:text-primary-light transition-colors shrink-0 mt-0.5"
            aria-label={`Download PDF: ${pub.title}`}
          >
            <FileText size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

export function Publications() {
  const [activeTab, setActiveTab] = useState<PubType>("journal");
  const filtered = publications.filter((p) => p.type === activeTab);
  const counts = tabs.map((t) => ({
    ...t,
    count: publications.filter((p) => p.type === t.type).length,
  }));

  return (
    <section id="publications" className="py-24 md:py-32 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <SectionHeading
            number="06"
            title="Publications"
            subtitle={`${publications.length} peer-reviewed publications across top venues`}
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
            {counts.map((tab) => (
              <button
                key={tab.type}
                onClick={() => setActiveTab(tab.type)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer",
                  activeTab === tab.type
                    ? "bg-primary/15 text-primary-light"
                    : "text-text-muted hover:text-text-heading hover:bg-surface"
                )}
              >
                {tab.label}{" "}
                <span className="text-xs opacity-60">({tab.count})</span>
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <div className="bg-surface border border-border rounded-lg px-6">
            <ExpandableList
              key={activeTab}
              initialCount={5}
              totalLabel="publications"
            >
              {filtered.map((pub, i) => (
                <PublicationItem key={`${pub.title}-${i}`} pub={pub} />
              ))}
            </ExpandableList>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <p className="mt-6 text-sm text-text-dim">
            Full listings also available on{" "}
            <a
              href="http://www.informatik.uni-trier.de/~ley/pers/hd/r/Rosenberg:Florian.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-light hover:text-primary underline underline-offset-2 transition-colors"
            >
              DBLP
            </a>{" "}
            and{" "}
            <a
              href="http://scholar.google.at/citations?user=KK2le2UAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-light hover:text-primary underline underline-offset-2 transition-colors"
            >
              Google Scholar
            </a>
            .
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
