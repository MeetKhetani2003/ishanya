"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

type View = "editorial" | "index" | "map";

export function CollectionExplorer({ projects }: { projects: Project[] }) {
  const [region, setRegion] = useState("All");
  const [budget, setBudget] = useState("Any");
  const [view, setView] = useState<View>("editorial");
  const [favourites, setFavourites] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.region)))],
    [projects],
  );

  const priceValue = (p: Project) => {
    const m = p.priceFrom.match(/([\d.]+)\s*Cr/);
    return m ? Number(m[1]) : 99;
  };

  const filtered = projects.filter((p) => {
    const regionOk = region === "All" || p.region === region;
    const v = priceValue(p);
    const budgetOk =
      budget === "Any" ||
      (budget === "Under ₹2 Cr" && v < 2) ||
      (budget === "₹2 – 5 Cr" && v >= 2 && v <= 5) ||
      (budget === "₹5 Cr +" && v > 5);
    const q = query.trim().toLowerCase();
    const queryOk =
      !q ||
      [p.name, p.locality, p.developer, p.city, p.subtitle]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return regionOk && budgetOk && queryOk;
  });

  const toggleFav = (slug: string) =>
    setFavourites((f) =>
      f.includes(slug) ? f.filter((s) => s !== slug) : [...f, slug],
    );

  return (
    <section className="bg-ink py-20 grain md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* filter bar */}
        <div className="flex flex-col gap-8 border-y border-ivory/10 py-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`nav-type transition-colors duration-500 ${
                  region === r ? "text-gold" : "text-ivory/45 hover:text-ivory"
                }`}
              >
                {r}
                {region === r && (
                  <motion.span
                    layoutId="region-underline"
                    className="mt-2 block h-px bg-gold"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search address, developer…"
              className="w-56 border-b border-ivory/15 bg-transparent pb-2 text-sm text-ivory placeholder:text-ivory/25 focus:border-gold focus:outline-none"
            />
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="border border-ivory/15 bg-ink px-4 py-2 nav-type text-ivory/70 focus:border-gold focus:outline-none"
            >
              {["Any", "Under ₹2 Cr", "₹2 – 5 Cr", "₹5 Cr +"].map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <div className="flex border border-ivory/15">
              {(["editorial", "index", "map"] as View[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 nav-type capitalize transition-colors duration-500 ${
                    view === v ? "bg-gold text-ink" : "text-ivory/50 hover:text-ivory"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="nav-type text-ivory/35">
            {String(filtered.length).padStart(2, "0")} residences
          </p>
          {favourites.length > 0 && (
            <p className="nav-type text-gold">
              {favourites.length} shortlisted · compare on request
            </p>
          )}
        </div>

        {/* views */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view + region + budget + query}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-14"
          >
            {view === "editorial" && (
              <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
                {filtered.map((p, i) => (
                  <article
                    key={p.slug}
                    className={i % 2 === 1 ? "md:mt-24" : undefined}
                  >
                    <div className="group relative">
                      <Link href={`/projects/${p.slug}`} className="img-zoom block">
                        <div className="relative aspect-[4/5] overflow-hidden md:aspect-[4/4.4]">
                          <Image
                            src={p.cardImage}
                            alt={p.name}
                            fill
                            sizes="(max-width:768px) 100vw, 46vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-8">
                            <p className="eyebrow text-gold/80">
                              {p.locality} · {p.city}
                            </p>
                            <h3 className="display mt-4 text-4xl text-ivory">
                              {p.name}
                            </h3>
                            <p className="display mt-1 text-lg italic text-ivory/55">
                              {p.subtitle}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={() => toggleFav(p.slug)}
                        aria-label="Shortlist"
                        className={`absolute right-6 top-6 flex h-11 w-11 items-center justify-center border backdrop-blur-md transition-colors duration-500 ${
                          favourites.includes(p.slug)
                            ? "border-gold bg-gold/20 text-gold"
                            : "border-ivory/25 text-ivory/70 hover:border-gold hover:text-gold"
                        }`}
                      >
                        ✦
                      </button>
                    </div>
                    <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-ivory/10 pt-6">
                      <div>
                        <dt className="eyebrow text-ivory/30">Developer</dt>
                        <dd className="mt-2 text-sm text-ivory/80">{p.developer}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-ivory/30">From</dt>
                        <dd className="mt-2 text-sm text-gold">{p.priceFrom}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-ivory/30">Status</dt>
                        <dd className="mt-2 text-sm text-ivory/80">{p.status}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            )}

            {view === "index" && (
              <div className="border-t border-ivory/10">
                {filtered.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group grid grid-cols-2 items-center gap-6 border-b border-ivory/10 py-8 transition-colors duration-500 hover:bg-ivory/[0.03] md:grid-cols-[2fr_1fr_1fr_1fr_auto]"
                  >
                    <div>
                      <h3 className="display text-2xl text-ivory transition-colors group-hover:text-gold md:text-3xl">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-sm text-ivory/40">{p.subtitle}</p>
                    </div>
                    <p className="text-sm text-ivory/60">
                      {p.locality}, {p.city}
                    </p>
                    <p className="hidden text-sm text-ivory/60 md:block">
                      {p.developer}
                    </p>
                    <p className="hidden text-sm text-gold md:block">{p.priceFrom}</p>
                    <span className="hidden nav-type text-ivory/40 transition-colors group-hover:text-gold md:block">
                      View →
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {view === "map" && (
              <div className="relative aspect-[16/10] w-full border border-ivory/10 bg-charcoal">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
                  <defs>
                    <pattern
                      id="grid-collection"
                      width="5"
                      height="5"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M5 0H0V5"
                        fill="none"
                        stroke="#e0c68d"
                        strokeOpacity="0.06"
                        strokeWidth="0.12"
                      />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid-collection)" />
                  <path
                    d="M18 6 C24 18, 22 27, 27 35 C32 45, 25 51, 30 59 C35 67, 45 67, 49 75 C53 83, 63 85, 73 93 L100 100 L100 0 Z"
                    fill="#0d0c0b"
                    stroke="#c3a15c"
                    strokeOpacity="0.3"
                    strokeWidth="0.22"
                  />
                </svg>
                {filtered.map((p, i) => {
                  const spots: Record<string, { x: number; y: number }> = {
                    Powai: { x: 34, y: 40 },
                    Parel: { x: 28, y: 52 },
                    Karjat: { x: 58, y: 68 },
                    Panvel: { x: 47, y: 62 },
                    Khalapur: { x: 62, y: 76 },
                    Ulwe: { x: 42, y: 58 },
                  };
                  const pos = spots[p.locality] ?? { x: 30 + i * 6, y: 40 + i * 5 };
                  return (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="group absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    >
                      <span className="relative flex items-center gap-3">
                        <span className="relative flex h-3 w-3 items-center justify-center">
                          <span className="pin-pulse absolute h-3 w-3 rounded-full bg-gold/50" />
                          <span className="block h-2 w-2 rotate-45 bg-gold" />
                        </span>
                        <span className="nav-type whitespace-nowrap text-ivory/60 transition-colors group-hover:text-gold">
                          {p.name}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-24 text-center display text-2xl text-ivory/40">
            No residences match that brief. Our off-market desk usually can.
          </p>
        )}
      </div>
    </section>
  );
}
