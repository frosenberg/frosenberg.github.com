"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg" />

      <div className="relative max-w-6xl mx-auto px-6 py-32 md:py-0 w-full">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Left content */}
          <div className="md:col-span-3">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-sm text-primary tracking-wider"
            >
              Hi, I&apos;m
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-text-heading mt-2 leading-[0.95]"
            >
              Florian
              <br />
              Rosenberg
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xl md:text-2xl text-text-muted mt-6 font-medium"
            >
              {SITE.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base md:text-lg text-text-dim mt-4 max-w-lg leading-relaxed"
            >
              Builder and technology executive turning AI, cloud, and platform
              strategy into measurable business outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <a
                href="/#experience"
                className="inline-flex items-center px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dim transition-colors"
              >
                View My Work
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center px-6 py-3 border border-border text-text-heading text-sm font-medium rounded-lg hover:border-border-light hover:bg-surface transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-6 mt-12"
            >
              {[
                { value: "50+", label: "Publications" },
                { value: "11", label: "Patents" },
                { value: "100+", label: "AI Projects" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-primary-light">
                    {stat.value}
                  </span>
                  <span className="text-sm text-text-dim">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative">
              {/* Geometric frame */}
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl rotate-3" />
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/images/bio-photo.png"
                  alt="Florian Rosenberg"
                  width={400}
                  height={400}
                  priority
                  className="w-64 h-64 md:w-80 md:h-80 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="/#about"
          className="text-text-dim hover:text-text-muted transition-colors"
          aria-label="Scroll to about section"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
