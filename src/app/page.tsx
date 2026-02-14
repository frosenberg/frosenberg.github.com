import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FocusAreas } from "@/components/sections/FocusAreas";
import { Experience } from "@/components/sections/Experience";
import { OpenSource } from "@/components/sections/OpenSource";
import { Patents } from "@/components/sections/Patents";
import { Publications } from "@/components/sections/Publications";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="gradient-line" />
      <About />
      <FocusAreas />
      <div className="gradient-line" />
      <Experience />
      <OpenSource />
      <div className="gradient-line" />
      <Patents />
      <Publications />
      <div className="gradient-line" />
      <Blog />
      <Contact />
    </>
  );
}
