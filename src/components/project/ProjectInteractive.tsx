"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { AmenityGroup, Project } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ gallery */
export function ProjectGallery({
  gallery,
}: {
  gallery: Project["gallery"];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-12">
        {gallery.map((g, i) => {
          const span =
            i % 5 === 0
              ? "md:col-span-7 aspect-[16/10]"
              : i % 5 === 1
                ? "md:col-span-5 aspect-[16/10]"
                : i % 5 === 2
                  ? "md:col-span-4 aspect-[4/5]"
                  : i % 5 === 3
                    ? "md:col-span-4 aspect-[4/5]"
                    : "md:col-span-4 aspect-[4/5]";
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: EASE }}
              onClick={() => setOpen(i)}
              className={`img-zoom group relative w-full overflow-hidden ${span}`}
            >
              <Image
                src={g.src}
                alt={g.caption}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />
              <span className="absolute bottom-4 left-5 nav-type text-ivory/0 transition-colors duration-500 group-hover:text-ivory/90">
                {g.caption}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/96 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative h-[76vh] w-full max-w-6xl"
            >
              <Image
                src={gallery[open].src}
                alt={gallery[open].caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 nav-type text-ivory/60">
              {gallery[open].caption}
            </p>
            <button
              onClick={() => setOpen(null)}
              className="absolute right-8 top-8 nav-type text-ivory/60 hover:text-gold"
            >
              Close ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => ((o ?? 0) - 1 + gallery.length) % gallery.length);
              }}
              className="absolute left-6 top-1/2 nav-type text-ivory/50 hover:text-gold"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => ((o ?? 0) + 1) % gallery.length);
              }}
              className="absolute right-6 top-1/2 nav-type text-ivory/50 hover:text-gold"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------------------------------------------------------- amenities */
export function AmenityTabs({ groups }: { groups: AmenityGroup[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
      <div className="flex flex-col">
        {groups.map((g, i) => (
          <button
            key={g.group}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`group border-t border-charcoal/15 py-6 text-left transition-colors duration-500 ${
              active === i ? "text-charcoal" : "text-graphite/50 hover:text-charcoal"
            }`}
          >
            <span className="eyebrow text-gold/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="display mt-3 block text-[clamp(1.5rem,2.6vw,2.3rem)]">
              {g.group}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid content-start gap-px self-start bg-charcoal/10 sm:grid-cols-2"
        >
          {groups[active].items.map((item) => (
            <li key={item} className="bg-paper p-7">
              <span className="block h-1 w-1 rotate-45 bg-gold" />
              <p className="mt-5 text-[0.98rem] leading-relaxed text-charcoal">
                {item}
              </p>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------------------------------------------- FAQ */
export function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-ivory/10">
      {faqs.map((f, i) => (
        <div key={f.q} className="border-b border-ivory/10">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-8 py-8 text-left"
          >
            <span className="display text-[clamp(1.1rem,2vw,1.7rem)] text-ivory">
              {f.q}
            </span>
            <span
              className={`text-gold transition-transform duration-500 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              ＋
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="max-w-3xl pb-9 text-[0.98rem] leading-[1.9] text-ivory/55">
                  {f.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- sticky facts */
export function StickyBar({ project }: { project: Project }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY > document.body.scrollHeight - 500;
      setShow(window.scrollY > 900 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-[88] border-t border-ivory/10 bg-ink/92 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-12">
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1">
                <p className="display text-xl text-ivory">{project.name}</p>
                <p className="nav-type text-ivory/40">
                  {project.locality} · {project.configurations.join(" / ")}
                </p>
                <p className="nav-type text-gold">{project.priceFrom}</p>
              </div>
              <a
                href="#book"
                className="border border-gold/60 px-6 py-3 nav-type text-gold transition-colors duration-500 hover:bg-gold hover:text-ink"
              >
                Book a Private Visit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
