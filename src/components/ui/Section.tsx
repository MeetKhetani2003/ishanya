import type { ReactNode } from "react";
import { Reveal, SplitHeading } from "@/components/ui/motion";

export function SectionShell({
  children,
  className = "",
  tone = "dark",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "ivory" | "paper";
  id?: string;
}) {
  const tones = {
    dark: "bg-ink text-ivory",
    ivory: "bg-ivory text-charcoal",
    paper: "bg-paper text-charcoal",
  } as const;
  return (
    <section id={id} className={`relative overflow-hidden ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}

export function SectionIntro({
  index,
  eyebrow,
  title,
  italic,
  copy,
  align = "left",
  tone = "dark",
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  italic?: string;
  copy?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const muted = tone === "dark" ? "text-ivory/55" : "text-graphite";
  const strong = tone === "dark" ? "text-ivory" : "text-charcoal";
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      <Reveal>
        <div
          className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
        >
          {index && <span className="eyebrow text-gold/60">{index}</span>}
          <span className="block h-px w-10 bg-gold/40" />
          <span className="eyebrow text-gold">{eyebrow}</span>
        </div>
      </Reveal>
      <SplitHeading
        text={title}
        className={`display mt-7 text-[clamp(2rem,4.6vw,4.2rem)] ${strong}`}
      />
      {italic && (
        <SplitHeading
          text={italic}
          delay={0.12}
          className="display text-[clamp(2rem,4.6vw,4.2rem)] italic gold-text"
        />
      )}
      {copy && (
        <Reveal delay={0.18}>
          <p className={`mt-8 text-[1.02rem] leading-[1.95] ${muted}`}>{copy}</p>
        </Reveal>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  italic,
  copy,
  image,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  copy?: string;
  image: string;
  align?: "left" | "center";
}) {
  return (
    <section className="relative flex min-h-[76svh] items-end overflow-hidden bg-ink grain vignette">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
      <div
        className={`relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 pt-40 md:px-12 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        <Reveal>
          <p className="eyebrow text-gold/80">{eyebrow}</p>
        </Reveal>
        <SplitHeading
          as="h1"
          text={title}
          className="display mt-7 max-w-5xl text-[clamp(2.4rem,6.4vw,6rem)] text-ivory"
        />
        {italic && (
          <SplitHeading
            text={italic}
            delay={0.1}
            className="display max-w-5xl text-[clamp(2.4rem,6.4vw,6rem)] italic gold-text"
          />
        )}
        {copy && (
          <Reveal delay={0.2}>
            <p className={`lede mt-9 max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
              {copy}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="h-px flex-1 bg-current opacity-15" />
      <span className="block h-1 w-1 rotate-45 bg-gold" />
      <span className="h-px flex-1 bg-current opacity-15" />
    </div>
  );
}
