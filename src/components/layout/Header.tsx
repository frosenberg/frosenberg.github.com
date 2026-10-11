"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";

const sectionIds = NAV_ITEMS.map((item) => item.href.replace("/#", ""));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (href: string) =>
    cn(
      "font-cond font-medium transition-colors",
      activeSection === href.replace("/#", "")
        ? "text-signal underline underline-offset-[6px] decoration-2"
        : "text-ink-muted hover:text-ink"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-sheet/95 backdrop-blur-sm border-b transition-colors",
        scrolled || mobileOpen ? "border-line" : "border-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"
      >
        <a
          href="/"
          className={cn(
            "font-semibold text-[1.0625rem] transition-opacity",
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          tabIndex={scrolled ? 0 : -1}
        >
          Florian Rosenberg
        </a>

        <div className="flex items-center gap-7">
          <ul className="hidden md:flex items-center gap-7 text-[1.0625rem]">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass(item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden -mr-2 p-2 text-ink"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <ul id="mobile-menu" className="md:hidden px-4 pb-4 space-y-1 text-lg">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn("block py-1.5", linkClass(item.href))}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
