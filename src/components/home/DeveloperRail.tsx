"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import type { Developer } from "@/lib/content";
import { SectionIntro } from "@/components/ui/Section";

export function DeveloperRail({ developers }: { developers: Developer[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 520, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-ink py-28 grain md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionIntro
            index="05"
            eyebrow="Developer Alliances"
            title="We choose the builder"
            italic="before the building."
          />
          <div className="flex gap-3">
            <button
              onClick={() => nudge(-1)}
              aria-label="Previous developer"
              className="flex h-12 w-12 items-center justify-center border border-ivory/15 text-ivory/60 transition-colors hover:border-gold hover:text-gold"
            >
              ←
            </button>
            <button
              onClick={() => nudge(1)}
              aria-label="Next developer"
              className="flex h-12 w-12 items-center justify-center border border-ivory/15 text-ivory/60 transition-colors hover:border-gold hover:text-gold"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-4 md:px-12"
      >
        {developers.map((d, i) => (
          <motion.article
            key={d.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-[86vw] shrink-0 snap-start md:w-[560px]"
          >
            <Link href={`/developers/${d.slug}`} className="img-zoom block">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(max-width:768px) 86vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <span className="absolute left-6 top-6 eyebrow text-ivory/70">
                  Est. {d.founded}
                </span>
              </div>
              <div className="pt-7">
                <h3 className="display text-3xl text-ivory transition-colors duration-500 group-hover:text-gold">
                  {d.name}
                </h3>
                <p className="mt-2 nav-type text-ivory/40">{d.descriptor}</p>
                <p className="display mt-6 text-lg italic text-gold/80">
                  {d.headline}
                </p>
                <p className="mt-5 line-clamp-3 text-sm leading-[1.85] text-ivory/50">
                  {d.story[0]}
                </p>
                <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-t border-ivory/10 pt-6">
                  {d.stats.slice(0, 3).map((s) => (
                    <div key={s.label}>
                      <p className="display text-xl text-ivory">{s.value}</p>
                      <p className="mt-1 eyebrow text-[0.55rem] text-ivory/35">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
