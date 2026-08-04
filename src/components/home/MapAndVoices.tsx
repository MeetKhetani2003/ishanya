"use client";

import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { LocationEntry, Testimonial } from "@/lib/content";
import { SectionIntro } from "@/components/ui/Section";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------- region map */
export function RegionMap({ locations }: { locations: LocationEntry[] }) {
  const pins = locations.filter((l) => l.slug !== "mumbai");

  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-ivory grain md:py-36">
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-gold/5 blur-[150px]" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionIntro
          index="06"
          eyebrow="Locations"
          title="Seven addresses we know"
          italic="street by street."
        />

        <div className="mt-16 flex snap-x snap-mandatory overflow-x-auto pb-12 gap-6 hide-scrollbar">
          {pins.map((loc) => (
            <div
              key={loc.slug}
              className="flex w-[85vw] shrink-0 snap-center flex-col justify-start sm:w-[50vw] lg:w-[28vw]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-ivory/10">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  sizes="(max-width:1024px) 85vw, (max-width:1280px) 50vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
              </div>
              <p className="eyebrow mt-8 text-gold/70">{loc.region}</p>
              <h3 className="display mt-4 text-3xl text-ivory">{loc.name}</h3>
              <p className="display mt-3 text-base italic text-ivory/50 line-clamp-2">
                {loc.headline}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-ivory/10 pt-6">
                {loc.growth.map((g) => (
                  <div key={g.label}>
                    <p className="display text-lg text-gold">{g.value}</p>
                    <p className="mt-1 eyebrow text-[0.45rem] text-ivory/35">
                      {g.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href={`/locations/${loc.slug}`}
                className="mt-8 nav-type link-underline w-fit text-gold text-sm"
              >
                Explore {loc.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- testimonials */
export function Voices({ testimonials }: { testimonials: Testimonial[] }) {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (d: number) =>
    setI((prev) => (prev + d + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-ink py-28 grain md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionIntro
          index="08"
          eyebrow="Client Stories"
          title="What our clients say"
          italic="when we are not listening."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative min-h-[320px] border-t border-ivory/10 pt-12">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="display text-[clamp(1.6rem,3.2vw,2.9rem)] leading-[1.35] text-ivory">
                  <span className="text-gold">“</span>
                  {t.quote}
                  <span className="text-gold">”</span>
                </p>
                <footer className="mt-10">
                  <p className="nav-type text-gold">{t.name}</p>
                  <p className="mt-2 text-sm text-ivory/45">{t.role}</p>
                  <p className="mt-1 text-sm text-ivory/30">{t.project}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-12 flex items-center gap-4">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory/60 transition-colors hover:border-gold hover:text-gold"
              >
                ←
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory/60 transition-colors hover:border-gold hover:text-gold"
              >
                →
              </button>
              <span className="ml-4 nav-type text-ivory/35">
                {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px self-start bg-ivory/10">
            {[
              { v: "4.9", l: "Google rating" },
              { v: "312", l: "Verified reviews" },
              { v: "68%", l: "Repeat or referred" },
              { v: "14", l: "Countries served" },
            ].map((s) => (
              <div key={s.l} className="bg-ink p-8">
                <p className="display text-3xl gold-text">{s.v}</p>
                <p className="mt-3 eyebrow text-[0.55rem] text-ivory/40">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
