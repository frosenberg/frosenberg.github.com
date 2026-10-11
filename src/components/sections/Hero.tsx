import Image from "next/image";
import { CareerGraph } from "@/components/ui/CareerGraph";
import { publications } from "@/data/publications";
import { patents } from "@/data/patents";

export function Hero() {
  const papers = publications.filter((p) => p.type !== "thesis").length;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-none tracking-[-0.02em]">
            Florian Rosenberg
          </h1>
          <p className="mt-6 max-w-[42ch] text-[1.3125rem] md:text-[1.5rem] leading-snug text-ink">
            CTO at{" "}
            <a
              href="https://truvio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              Truvio
            </a>
            . Technology executive with deep technical roots in
            distributed systems, cloud and AI, backed by {papers} publications
            and {patents.length} US patents.
          </p>
        </div>
        <Image
          src="/images/bio-photo.png"
          alt="Florian Rosenberg"
          width={400}
          height={400}
          priority
          className="order-1 md:order-2 size-32 md:size-56 lg:size-72 object-cover border border-line"
        />
      </div>

      <div className="mt-14 md:mt-20">
        <CareerGraph />
      </div>
    </section>
  );
}
