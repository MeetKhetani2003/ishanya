"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ProjectsExplorerProps {
  projects: Project[];
}

type ViewMode = "grid" | "table";

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  // Load query params on mount
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [budget, setBudget] = useState("Any");
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [favourites, setFavourites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize search parameters on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("category")) setCategory(params.get("category")!);
      if (params.get("status")) setStatus(params.get("status")!);
      if (params.get("budget")) setBudget(params.get("budget")!);
      if (params.get("q")) setQuery(params.get("q")!);
    }
    // Simulate luxury loader
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const priceValue = (p: Project) => {
    const m = p.priceFrom.match(/([\d.]+)\s*Cr/);
    return m ? Number(m[1]) : 99;
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      // Category filter (mocking commercial as none since Ishanaya is residential, or check configurations)
      const isComm = p.configurations.some(c => c.toLowerCase().includes("office") || c.toLowerCase().includes("commercial") || c.toLowerCase().includes("retail"));
      const isRes = !isComm;
      const categoryOk =
        category === "All" ||
        (category === "Residential" && isRes) ||
        (category === "Commercial" && isComm);

      // Status filter
      const statusOk = status === "All" || p.status === status;

      // Budget filter
      const v = priceValue(p);
      const budgetOk =
        budget === "Any" ||
        (budget === "Under ₹2 Cr" && v < 2) ||
        (budget === "₹2 – 5 Cr" && v >= 2 && v <= 5) ||
        (budget === "₹5 Cr +" && v > 5);

      // Search Query
      const q = query.trim().toLowerCase();
      const queryOk =
        !q ||
        [p.name, p.locality, p.developer, p.city, p.subtitle]
          .join(" ")
          .toLowerCase()
          .includes(q);

      return categoryOk && statusOk && budgetOk && queryOk;
    });
  }, [projects, category, status, budget, query]);

  const toggleFav = (slug: string) => {
    setFavourites((f) =>
      f.includes(slug) ? f.filter((s) => s !== slug) : [...f, slug]
    );
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-ink-soft border-b border-ivory/5 shadow-sm pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ol className="flex items-center gap-2 text-xs eyebrow tracking-wider">
            <li>
              <Link href="/" className="text-ivory/50 hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gold/50">/</li>
            <li className="text-gold font-medium">Projects</li>
          </ol>
        </div>
      </nav>

      {/* Page Hero */}
      <section className="relative overflow-hidden bg-ink py-16 border-b border-ivory/5">
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-4">
            <span className="eyebrow text-gold/75 tracking-[0.3em] text-xs">Exquisite Residences</span>
            <h1 className="display text-4xl md:text-6xl text-ivory leading-tight font-normal">
              The Collection
            </h1>
            <p className="lede max-w-2xl mx-auto text-ivory/60 text-sm">
              A private, audited collection of luxury addresses across Mumbai, Navi Mumbai, and surrounding regions.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Area */}
      <section className="bg-ink border-b border-ivory/5 py-8 sticky top-20 z-40 backdrop-blur-md bg-ink/90">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-4 rounded bg-charcoal border border-ivory/10 text-ivory text-xs focus:border-gold focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-11 px-4 rounded bg-charcoal border border-ivory/10 text-ivory text-xs focus:border-gold focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Completed">Ready to Move</option>
                  <option value="Launching">New Launch</option>
                </select>
              </div>

              <div>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full h-11 px-4 rounded bg-charcoal border border-ivory/10 text-ivory text-xs focus:border-gold focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Any">Any Price</option>
                  <option value="Under ₹2 Cr">Under ₹2 Cr</option>
                  <option value="₹2 – 5 Cr">₹2 – 5 Cr</option>
                  <option value="₹5 Cr +">₹5 Cr +</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by address, developer..."
                  className="w-full h-11 px-4 rounded bg-charcoal border border-ivory/10 text-ivory placeholder:text-ivory/30 text-xs focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 items-center shrink-0">
              {/* View Switcher */}
              <div className="flex border border-ivory/10 rounded overflow-hidden">
                {(["grid", "table"] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 nav-type capitalize text-[0.66rem] transition-colors duration-500 ${
                      viewMode === mode ? "bg-gold text-ink" : "bg-charcoal text-ivory/60 hover:text-ivory"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="eyebrow text-ivory/40 text-[0.6rem]">
              {String(filtered.length).padStart(2, "0")} residences match
            </p>
            {favourites.length > 0 && (
              <p className="eyebrow text-gold text-[0.6rem]">
                {favourites.length} shortlisted
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Catalog Display */}
      <section className="bg-ink-soft py-16 md:py-24 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
              <p className="eyebrow text-gold/60 text-xs">Accessing Private Inventory...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-24 text-center"
                >
                  <p className="display text-2xl text-ivory/40 italic">
                    No residences match that brief.
                  </p>
                  <p className="text-xs text-ivory/30 mt-3 max-w-md mx-auto leading-relaxed">
                    Our off-market acquisition desk has access to private listings not shown publicly. Please contact our concierge.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={viewMode + filtered.length}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {/* Grid View */}
                  {viewMode === "grid" && (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {filtered.map((p) => (
                        <article
                          key={p.slug}
                          className="bg-charcoal border border-ivory/5 rounded-xl overflow-hidden hover:border-gold/30 hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between"
                        >
                          <div className="relative">
                            <Link href={`/projects/${p.slug}`} className="img-zoom block relative aspect-[4/3] overflow-hidden">
                              <Image
                                src={p.cardImage}
                                alt={p.name}
                                fill
                                sizes="(max-width:768px) 100vw, 30vw"
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                              <div className="absolute bottom-6 left-6">
                                <p className="eyebrow text-gold/80 text-[0.6rem]">{p.locality} · {p.city}</p>
                              </div>
                            </Link>

                            <button
                              onClick={() => toggleFav(p.slug)}
                              aria-label="Shortlist"
                              className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center border backdrop-blur-md rounded-full transition-all duration-300 ${
                                favourites.includes(p.slug)
                                  ? "border-gold bg-gold/20 text-gold"
                                  : "border-ivory/20 text-ivory/60 hover:border-gold hover:text-gold"
                              }`}
                            >
                              ✦
                            </button>
                          </div>

                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="display text-2xl text-ivory group-hover:text-gold transition-colors">
                                <Link href={`/projects/${p.slug}`}>{p.name}</Link>
                              </h3>
                              <p className="display text-sm italic text-ivory/50 mt-1 line-clamp-1">{p.subtitle}</p>
                            </div>

                            <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-ivory/5 pt-4 text-xs">
                              <div>
                                <dt className="eyebrow text-[0.55rem] text-ivory/30">Developer</dt>
                                <dd className="mt-1 text-ivory/80 truncate">{p.developer}</dd>
                              </div>
                              <div>
                                <dt className="eyebrow text-[0.55rem] text-ivory/30">From</dt>
                                <dd className="mt-1 text-gold font-medium">{p.priceFrom.replace(/ onwards\*/, "")}</dd>
                              </div>
                              <div>
                                <dt className="eyebrow text-[0.55rem] text-ivory/30">Status</dt>
                                <dd className="mt-1 text-ivory/70 truncate">{p.status}</dd>
                              </div>
                            </dl>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  {/* Table View */}
                  {viewMode === "table" && (
                    <div className="border border-ivory/10 rounded-xl overflow-hidden bg-charcoal">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-ivory/10 bg-ink-soft/50 text-[0.66rem] eyebrow text-gold/80">
                              <th className="p-5 font-semibold">Project</th>
                              <th className="p-5 font-semibold">Location</th>
                              <th className="p-5 font-semibold">Developer</th>
                              <th className="p-5 font-semibold">Price</th>
                              <th className="p-5 font-semibold text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filtered.map((p) => (
                              <tr
                                key={p.slug}
                                className="border-b border-ivory/5 hover:bg-ivory/[0.02] transition-colors"
                              >
                                <td className="p-5">
                                  <Link href={`/projects/${p.slug}`} className="font-medium text-ivory hover:text-gold block display text-lg">
                                    {p.name}
                                  </Link>
                                  <span className="text-xs text-ivory/40 italic block mt-0.5">{p.subtitle}</span>
                                </td>
                                <td className="p-5 text-sm text-ivory/70">
                                  {p.locality}, {p.city}
                                </td>
                                <td className="p-5 text-sm text-ivory/70">
                                  {p.developer}
                                </td>
                                <td className="p-5 text-sm text-gold font-medium">
                                  {p.priceFrom}
                                </td>
                                <td className="p-5 text-right">
                                  <Link
                                    href={`/projects/${p.slug}`}
                                    className="inline-block px-4 py-2 border border-gold/40 hover:bg-gold hover:text-ink text-gold rounded text-xs eyebrow transition-colors"
                                  >
                                    View →
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  );
}
