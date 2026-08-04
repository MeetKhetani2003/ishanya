"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LuxLink } from "@/components/ui/Interactive";
import { SplitHeading } from "@/components/ui/motion";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/8493717/8493717-uhd_4096_2160_24fps.mp4";

const PARTICLES = [
  { l: 12, t: 22, d: 0 },
  { l: 26, t: 68, d: 1.4 },
  { l: 41, t: 34, d: 2.6 },
  { l: 58, t: 78, d: 0.7 },
  { l: 69, t: 28, d: 3.3 },
  { l: 82, t: 58, d: 1.9 },
  { l: 91, t: 40, d: 2.2 },
  { l: 34, t: 88, d: 4.1 },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink grain vignette"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/hero-skyline.png"
          alt="Luxury skyline at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-skyline.png"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/45 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      </motion.div>

      {/* ambient particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="float-slow absolute h-[3px] w-[3px] rounded-full bg-gold-soft/60"
            style={{
              left: `${p.l}%`,
              top: `${p.t}%`,
              animationDelay: `${p.d}s`,
              boxShadow: "0 0 12px rgba(224,198,141,.65)",
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-24 md:px-12 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
          className="eyebrow text-gold/80"
        >
          Mumbai · Navi Mumbai · Panvel · Karjat
        </motion.p>

        <SplitHeading
          as="h1"
          delay={0.45}
          text="Some addresses are"
          className="display mt-8 max-w-5xl text-[clamp(2.6rem,7.2vw,7.2rem)] text-ivory"
        />
        <SplitHeading
          as="p"
          delay={0.6}
          text="never advertised."
          className="display max-w-5xl text-[clamp(2.6rem,7.2vw,7.2rem)] italic gold-text"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1.2, ease: EASE }}
          className="lede mt-10 max-w-xl"
        >
          Ishanaya Realty is a private advisory for buyers who are not shopping
          for property — they are choosing where the next twenty years of their
          life will happen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 1.1, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <LuxLink href="/collection" variant="gold">
            View the Collection
          </LuxLink>
          <LuxLink href="/book-visit" variant="ghost">
            Book a Private Visit
          </LuxLink>
        </motion.div>
      </motion.div>

      {/* mouse / scroll indicator */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="relative flex h-9 w-[22px] justify-center rounded-full border border-ivory/30 pt-2">
          <span className="scroll-dot block h-1.5 w-1.5 rounded-full bg-gold" />
        </span>
        <span className="eyebrow text-[0.55rem] text-ivory/40">Scroll</span>
      </motion.div>
    </section>
  );
}

export function Ticker() {
  const items = [
    "Isle of Calm · Powai",
    "GHP Group",
    "25 : 25 : 25 : 25 Payment Plan",
    "The Cloisters · Karjat",
    "Atal Setu Corridor",
    "NAINA · Panvel",
    "Atelier One · Parel",
    "Private Acquisition Desk",
  ];
  return (
    <div className="relative overflow-hidden border-y border-ivory/8 bg-ink py-5">
      <div className="marquee-track flex w-max gap-14 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="nav-type flex items-center gap-14 text-ivory/40">
            {t}
            <span className="h-1 w-1 rounded-full bg-gold/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
