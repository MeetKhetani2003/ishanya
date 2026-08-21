"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import type { Project, Post } from "@/lib/content";
import { BRAND } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ================================================================= HeroSlider */
interface HeroSliderProps {
  projects: Project[];
}

export function HeroSlider({ projects }: HeroSliderProps) {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (!featured.length) return null;

  const next = () => setIndex((prev) => (prev + 1) % featured.length);
  const prev = () => setIndex((prev) => (prev - 1 + featured.length) % featured.length);

  return (
    <section className="relative h-[65vh] sm:h-[70vh] md:h-[600px] lg:h-[650px] w-full overflow-hidden bg-ink grain vignette">
      <div className="relative h-full w-full">
        {featured.map((p, idx) => (
          <div
            key={p.slug}
            className={`absolute inset-0 transition-all duration-[1200ms] ${idx === index ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
          >
            <Link href={`/projects/${p.slug}`} className="absolute inset-0 z-10" aria-label={`View ${p.name}`}>
              <div className="absolute inset-0 bg-ink/30 z-10" />
              <Image
                src={p.heroImage}
                alt={p.name}
                fill
                priority={idx === 0}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent z-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent z-20" />

              <div className="absolute bottom-16 left-6 right-6 md:bottom-20 md:left-12 max-w-2xl z-30">
                <p className="eyebrow text-gold-soft mb-3">{p.locality} · {p.city}</p>
                <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-ivory leading-none">
                  {p.name}
                </h2>
                <p className="display text-lg sm:text-xl italic text-ivory/60 mt-3">
                  {p.subtitle}
                </p>
              </div>
            </Link>
          </div>
        ))}

        {/* Navigation Buttons */}
        {featured.length > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between pointer-events-none px-4 md:px-8">
            <button
              onClick={prev}
              type="button"
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink/40 border border-ivory/10 text-ivory/70 hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300 backdrop-blur-xs"
              aria-label="Previous banner"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              type="button"
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink/40 border border-ivory/10 text-ivory/70 hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300 backdrop-blur-xs"
              aria-label="Next banner"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {/* Carousel indicators */}
        {featured.length > 1 && (
          <div className="absolute bottom-6 right-6 md:right-12 z-30 flex gap-2">
            {featured.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === index ? "w-8 bg-gold" : "w-2 bg-ivory/30"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ================================================================= QuickSearch */
export function QuickSearch() {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [budget, setBudget] = useState("Any");
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (status !== "All") params.set("status", status);
    if (budget !== "Any") params.set("budget", budget);
    if (query.trim()) params.set("q", query.trim());
    window.location.href = `/projects?${params.toString()}`;
  };

  return (
    <section className="relative z-40 -mt-10 mx-auto max-w-[1200px] px-4">
      <form
        onSubmit={handleSearch}
        className="bg-charcoal border border-gold/20 rounded-xl shadow-2xl p-6 md:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="space-y-2">
            <label className="eyebrow text-gold/70 text-[0.6rem] block">Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 px-4 rounded bg-ink border border-ivory/10 text-ivory text-sm focus:border-gold focus:outline-none appearance-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="holiday homes">holiday homes</option>

              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-soft pointer-events-none">▼</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="eyebrow text-gold/70 text-[0.6rem] block">Status</label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-12 px-4 rounded bg-ink border border-ivory/10 text-ivory text-sm focus:border-gold focus:outline-none appearance-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Completed">Ready to Move</option>
                <option value="Launching">New Launch</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-soft pointer-events-none">▼</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="eyebrow text-gold/70 text-[0.6rem] block">Budget</label>
            <div className="relative">
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-12 px-4 rounded bg-ink border border-ivory/10 text-ivory text-sm focus:border-gold focus:outline-none appearance-none cursor-pointer"
              >
                <option value="Any">Any Price</option>
                <option value="Under ₹2 Cr">Under ₹2 Cr</option>
                <option value="₹2 – 5 Cr">₹2 – 5 Cr</option>
                <option value="₹5 Cr +">₹5 Cr +</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-soft pointer-events-none">▼</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="eyebrow text-gold/70 text-[0.6rem] block">Search Input</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project, developer..."
              className="w-full h-12 px-4 rounded bg-ink border border-ivory/10 text-ivory placeholder:text-ivory/30 text-sm focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto h-12 px-10 rounded bg-gold hover:bg-gold-soft text-ink font-semibold text-sm transition-all duration-300 transform active:scale-98 shadow-lg hover:shadow-gold/25"
          >
            Search Collection
          </button>
        </div>
      </form>
    </section>
  );
}

/* =========================================================== FeaturedShowcase */
export function FeaturedShowcase() {
  return (
    <section className="bg-ink py-20 md:py-28 border-b border-ivory/5">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <p className="eyebrow text-gold/70">Featured Curation</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-ivory leading-tight">
              Isle of Calm, <br /><span className="gold-text italic">A distinctly different Powai</span>
            </h2>
            <div className="space-y-5 text-ivory/60 leading-relaxed text-md max-w-xl">
              <p>
                Nestled on the shore of Powai Lake, GHP Group&apos;s Isle of Calm represents a masterclass in modern architectural restraint. Surrounded by lush, protected greenery, the residences offer panoramic water frontage that makes the bustle of Mumbai feel worlds away.
              </p>
              <p>
                Advised by Ishanaya Realty under an exclusive partnership structure, our clients gain access to early allocation priority, custom payment schedules (including a structured 25:25:25:25 configuration), and complete transparency down to registry logistics.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/projects/isle-of-calm"
                className="inline-block border border-gold/60 hover:bg-gold-soft px-8 py-3.5 nav-type text-gold hover:text-ink transition-all duration-500 shadow-md"
              >
                Explore Residence
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden border border-gold/15 shadow-2xl group bg-charcoal">
              <video
                src="/aboutvideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6">
                <span className="eyebrow text-[0.6rem] text-gold/80">Lake frontage view</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== FiveBenefits */
export function FiveBenefits() {
  const benefits = [
    {
      num: "01",
      title: "Verified Addresses",
      desc: "Every residence in our collection undergoes a rigorous 11-point legal, structural, and commercial audit before list inclusion.",
    },
    {
      num: "02",
      title: "Bespoke Process",
      desc: "Streamlined registration, structural decibel testing, and tailored contract renegotiation handled by our legal desk.",
    },
    {
      num: "03",
      title: "Negotiated Value",
      desc: "Direct coordination with developer sales boards ensures preferred commercial terms and transparent pricing.",
    },
    {
      num: "04",
      title: "Post-Handover Desk",
      desc: "Comprehensive support for registry, interior designer consultation, procurement coordination, and lease management.",
    },
    {
      num: "05",
      title: "Capital Protection",
      desc: "Advising solely on premium micro-markets backed by commuting times, zoning laws, and infrastructure forecasting.",
    },
  ];

  return (
    <section className="bg-ink-soft py-20 md:py-28 border-b border-ivory/5">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="eyebrow text-gold/70">The Ishanaya Advantage</p>
          <h2 className="display text-4xl sm:text-5xl font-bold text-ivory mt-4">
            Benefits of Choosing Us
          </h2>
          <p className="lede mt-4 max-w-2xl mx-auto">
            Experience real estate advisory scaled to protect your capital and respect your time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {benefits.map((b) => (
            <div
              key={b.num}
              className="bg-charcoal border border-ivory/5 p-6 rounded-xl hover:border-gold/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <span className="eyebrow text-gold/40 text-[0.66rem] group-hover:text-gold transition-colors">{b.num}</span>
                <h3 className="display text-xl text-ivory mt-6 group-hover:text-gold-soft transition-colors">{b.title}</h3>
                <p className="mt-4 text-xs leading-relaxed text-ivory/50">
                  {b.desc}
                </p>
              </div>
              <span className="mt-8 block h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================== SimpleProcess */
export function SimpleProcess() {
  const steps = [
    {
      num: "01",
      title: "Map Your Goals",
      desc: "Whether residential placement or commercial investment, we outline requirements, commute constraints, and budget brackets.",
    },
    {
      num: "02",
      title: "Curated Matching",
      desc: "Our private advisory selects matching options exclusively from our examined off-market and pre-vetted inventory.",
    },
    {
      num: "03",
      title: "Guided Inspection",
      desc: "Detailed property visits paired with local micro-market analysis, infrastructure developments, and noise evaluations.",
    },
    {
      num: "04",
      title: "Due Diligence",
      desc: "End-to-end legal verification, MahaRERA registration audits, booking oversight, and customized commercial structuring.",
    },
    {
      num: "05",
      title: "Possession & Beyond",
      desc: "Registry support, interior construction coordination, design introductions, and optional leasing channel placement.",
    },
  ];

  return (
    <section className="bg-ink py-20 md:py-28 border-b border-ivory/5 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <p className="eyebrow text-gold/70">Our Protocol</p>
          <h2 className="display text-4xl sm:text-5xl font-bold text-ivory mt-4">
            How We Make Property Purchase Simple
          </h2>
          <p className="lede mt-4 max-w-2xl mx-auto">
            A comprehensive, client-first structure guiding you from initial inquiry to long past registry handover.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {steps.map((s, idx) => (
            <div
              key={s.num}
              className="bg-charcoal border border-ivory/5 p-6 rounded-xl hover:border-gold/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 w-full sm:w-[calc(50%-12px)] lg:w-[calc(20%-20px)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold text-xs font-semibold eyebrow">
                    {s.num}
                  </span>
                  {idx < steps.length - 1 && (
                    <span className="hidden lg:block text-gold/20 font-light text-xl">➔</span>
                  )}
                </div>
                <h3 className="display text-lg text-ivory mt-6 group-hover:text-gold-soft transition-colors">{s.title}</h3>
                <p className="mt-4 text-xs leading-relaxed text-ivory/55">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================ PodcastCard */
export function PodcastCard() {
  return (
    <section className="bg-ink-soft py-20 md:py-28 border-b border-ivory/5 overflow-hidden relative">
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-gold/10 rounded-full text-gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19v3M19 10v2a7 7 0 0 1-14 0v-2" />
                  <rect x="9" y="2" width="6" height="13" rx="3" />
                </svg>
              </span>
              <span className="eyebrow text-gold/80 text-[0.66rem]">Now Streaming</span>
            </div>

            <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-ivory leading-tight">
              Ishanaya Insights <br /><span className="gold-text italic">Address &amp; Value</span>
            </h2>

            <p className="lede max-w-xl">
              Join our advisory team as we sit down with micro-market analysts, legal experts, structural engineers, and design partners to break down the mechanics of private acquisition and real estate preservation.
            </p>

            <div className="pt-6 flex flex-wrap gap-4">
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-gold-soft text-ink font-semibold px-6 py-3 rounded text-xs eyebrow transition-colors duration-300 inline-flex items-center gap-2"
              >
                Listen on Spotify
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ivory/20 hover:border-gold hover:text-gold text-ivory/80 font-semibold px-6 py-3 rounded text-xs eyebrow transition-colors duration-300 inline-flex items-center gap-2"
              >
                Watch on YouTube
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs aspect-square border border-gold/15 bg-charcoal rounded-2xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-radial-gradient" />
              <div className="flex justify-between items-start z-10">
                <span className="eyebrow text-[0.6rem] text-gold-soft">Ep. 24 · COMMUTE INDEX</span>
                <span className="text-gold">✦</span>
              </div>

              <div className="z-10">
                <h3 className="display text-2xl text-ivory mb-2">Analyzing the Atal Setu Corridor</h3>
                <p className="text-xs text-ivory/50 leading-relaxed">
                  How commute models shift real estate values in Panvel, NAINA, and Karjat over the next decade.
                </p>
              </div>

              <div className="flex items-center gap-4 z-10 pt-4 border-t border-ivory/10">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-ink text-xs">
                  ▶
                </div>
                <div className="flex-1 h-1 bg-ivory/10 rounded overflow-hidden">
                  <div className="h-full bg-gold w-1/3" />
                </div>
                <span className="text-[10px] text-ivory/45">18:42</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== JourneyForm */
export function JourneyForm() {
  return (
    <section className="bg-ink py-20 md:py-28 border-b border-ivory/5">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16">
          <div className="space-y-8">
            <p className="eyebrow text-gold/70">Engage</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory leading-tight">
              Ready to Start <br /><span className="gold-text italic">Your Journey?</span>
            </h2>
            <p className="lede max-w-md">
              Whether you are looking to place a residence, diversify a commercial portfolio, or seek a remote due diligence audit, our desk is structured to assist.
            </p>

            <div className="space-y-6 pt-4 border-t border-ivory/10 max-w-sm">
              <div>
                <p className="eyebrow text-[0.6rem] text-gold/70">Direct Contact</p>
                <a
                  href={`tel:${BRAND.phoneHref}`}
                  className="display mt-2 block text-2xl text-ivory hover:text-gold transition-colors"
                >
                  {BRAND.phone}
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-1 block text-sm text-ivory/55 hover:text-gold transition-colors"
                >
                  {BRAND.email}
                </a>
              </div>

              <div>
                <p className="eyebrow text-[0.6rem] text-gold/70">Visit Our Gallery</p>
                <p className="mt-2 text-sm text-ivory/60 leading-relaxed">
                  {BRAND.address}
                </p>
                <p className="mt-1 text-xs text-ivory/40">
                  {BRAND.hours}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-charcoal border border-gold/15 p-8 rounded-xl shadow-2xl">
            <h3 className="display text-2xl text-ivory mb-8">Send a Private Mandate</h3>
            <EnquiryForm source="homepage" intent="Enquiry" tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== LatestBlogs */
interface LatestBlogsProps {
  posts: Post[];
}

export function LatestBlogs({ posts }: LatestBlogsProps) {
  const featuredPosts = posts.slice(0, 3);
  if (!featuredPosts.length) return null;

  return (
    <section className="bg-ink-soft py-20 md:py-28 border-b border-ivory/5">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className="eyebrow text-gold/70">Intelligence</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory mt-4">Latest Insights</h2>
          </div>
          <Link
            href="/journal"
            className="nav-type text-gold hover:text-gold-soft mt-4 md:mt-0 transition-colors link-underline"
          >
            Go to Journal →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((p) => (
            <article
              key={p.slug}
              className="bg-charcoal border border-ivory/5 rounded-xl overflow-hidden hover:border-gold/30 hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
            >
              <Link href={`/journal/${p.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-103"
                />
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex gap-3 items-center">
                    <span className="eyebrow text-[0.55rem] text-gold/75">{p.category}</span>
                    <span className="text-[10px] text-ivory/30">·</span>
                    <span className="eyebrow text-[0.55rem] text-ivory/40">{p.readTime}</span>
                  </div>
                  <h3 className="display text-xl text-ivory mt-4 group-hover:text-gold transition-colors leading-snug">
                    <Link href={`/journal/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ivory/50 line-clamp-3">
                    {p.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-ivory/5 flex justify-between items-center text-xs">
                  <span className="text-ivory/40">{p.date}</span>
                  <Link href={`/journal/${p.slug}`} className="text-gold group-hover:text-gold-soft font-semibold transition-colors">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================== FAQAccordion */
export function FAQAccordion() {
  const faqs = [
    {
      q: "Who is Ishanaya Realty?",
      a: "Ishanaya Realty is a private luxury real estate advisory representing buyers across prime corridors in Mumbai and Navi Mumbai. We operate as a buy-side practice, meaning we represent the buyer—never the transaction.",
    },
    {
      q: "What services do you provide?",
      a: "We offer project discovery, 11-point legal and structural due diligence, site analysis, negotiated pricing, documentation support, home loan coordination, and post-purchase management including registry, leasing, and interior setup.",
    },
    {
      q: "Is there a consultation fee for buyers?",
      a: "No, our advisory and curation services are completely free for buyers. We are compensated by developer channels on standard terms, without affecting your final purchase price or choices.",
    },
    {
      q: "Which locations do you specialize in?",
      a: "We specialize in premium corridors across Mumbai, Navi Mumbai, and surrounding regions, including Powai, Hiranandani Gardens, Parel, Panvel (NAINA), Ulwe, Karjat, and Khalapur.",
    },
    {
      q: "How do you verify projects?",
      a: "Every project must pass our strict 11-point audit. This includes verifying builder title clearances, checking MahaRERA registration compliance, performing physical construction quality reviews, analyzing historical micro-market pricing, and evaluating commute and infrastructure forecasts.",
    },
  ];

  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[900px] px-6">
        <div className="text-center mb-16">
          <p className="eyebrow text-gold/70">Support</p>
          <h2 className="display text-4xl sm:text-5xl font-bold text-ivory mt-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = active === idx;
            return (
              <div
                key={idx}
                className="bg-charcoal border border-ivory/8 rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="display text-lg sm:text-xl text-ivory hover:text-gold transition-colors">
                    {faq.q}
                  </span>
                  <span className={`text-gold transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-ivory/5 text-sm leading-relaxed text-ivory/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
