"use client";

import { useState } from "react";
import { Entry } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExpandableList } from "@/components/ui/ExpandableList";
import { People } from "@/components/ui/People";
import { cn } from "@/lib/cn";
import { publications } from "@/data/publications";
import type { Publication } from "@/types";

type PubType = Publication["type"];

const tabs: { label: string; type: PubType }[] = [
  { label: "Journals", type: "journal" },
  { label: "Conferences", type: "conference" },
  { label: "Books", type: "book-chapter" },
  { label: "Thesis", type: "thesis" },
];

const linkClass = "underline underline-offset-4 decoration-1 decoration-line hover:decoration-ink";

function PublicationItem({ pub }: { pub: Publication }) {
  return (
    <Entry margin={pub.year}>
      <h3 className="font-semibold leading-snug">
        {pub.pdfPath ? (
          <a href={pub.pdfPath} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {pub.title}
            <span className="sr-only"> (PDF)</span>
          </a>
        ) : (
          pub.title
        )}
      </h3>
      <p className="mt-1 text-base text-ink-muted">
        <People names={pub.authors.split(",")} />
      </p>
      <p className="mt-1 text-base text-ink-muted">
        <em>{pub.venue}</em>
        {pub.awards?.map((award) => (
          <span key={award.label}>
            {", "}
            <span className="font-cond font-semibold text-signal">
              {award.url ? (
                <a
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-1 hover:decoration-2"
                >
                  {award.label}
                </a>
              ) : (
                award.label
              )}
            </span>
          </span>
        ))}
      </p>
    </Entry>
  );
}

export function Publications() {
  const [activeTab, setActiveTab] = useState<PubType>("journal");
  const filtered = publications.filter((p) => p.type === activeTab);
  const counts = tabs
    .map((t) => ({ ...t, count: publications.filter((p) => p.type === t.type).length }))
    .filter((t) => t.count > 0);

  return (
    <section id="publications" className="border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <SectionHeading
          title="Publications"
          subtitle={`${publications.length} publications on service-oriented systems, cloud and machine learning.`}
        />

        <div
          role="tablist"
          aria-label="Publication type"
          className="flex gap-6 border-b border-line mb-2 overflow-x-auto"
        >
          {counts.map((tab) => {
            const selected = activeTab === tab.type;
            return (
              <button
                key={tab.type}
                type="button"
                role="tab"
                id={`tab-${tab.type}`}
                aria-selected={selected}
                aria-controls="publication-list"
                onClick={() => setActiveTab(tab.type)}
                className={cn(
                  "-mb-px py-2 border-b-2 whitespace-nowrap cursor-pointer font-medium",
                  selected
                    ? "border-signal text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                )}
              >
                {tab.label}{" "}
                <span className="figures text-ink-muted">{tab.count}</span>
              </button>
            );
          })}
        </div>

        <div id="publication-list" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
          <ExpandableList key={activeTab} initialCount={5} totalLabel="publications">
            {filtered.map((pub, i) => (
              <PublicationItem key={`${pub.title}-${i}`} pub={pub} />
            ))}
          </ExpandableList>
        </div>

        <p className="mt-10 text-base text-ink-muted">
          Full listings are on{" "}
          <a
            href="http://www.informatik.uni-trier.de/~ley/pers/hd/r/Rosenberg:Florian.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal underline underline-offset-4"
          >
            DBLP
          </a>{" "}
          and{" "}
          <a
            href="http://scholar.google.at/citations?user=KK2le2UAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal underline underline-offset-4"
          >
            Google Scholar
          </a>
          .
        </p>
      </div>
    </section>
  );
}
