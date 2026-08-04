import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SectionIntro, GoldRule } from "@/components/ui/Section";
import { Counter, MaskReveal, Parallax, Reveal, SplitHeading } from "@/components/ui/motion";
import { ClosingCTA } from "@/components/home/Sections";
import { SERVICES, STATS } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ishanaya Realty is a private luxury real estate advisory representing buyers across the Mumbai Metropolitan Region.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Ishanaya"
        title="We are not brokers."
        italic="We are the buyer's side."
        copy="A private practice built to behave like a family office: research first, inventory second, and a relationship that continues long after handover."
        image="/images/lobby-arrival.png"
      />

      <section className="bg-ivory py-24 text-charcoal md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:px-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionIntro
              index="01"
              eyebrow="Origin"
              title="Founded on a"
              italic="frustration."
              tone="light"
            />
            <Reveal delay={0.15}>
              <p className="mt-9 text-[1.02rem] leading-[1.95] text-graphite">
                India&apos;s finest homes were being sold like commodities —
                photographed badly, explained poorly and pushed by people paid to
                close rather than to advise. We started Ishanaya Realty to invert
                that: a small team, a small collection, and complete alignment
                with the person writing the cheque.
              </p>
              <p className="mt-7 text-[1.02rem] leading-[1.95] text-graphite">
                Fourteen years later we have placed over twelve hundred
                residences, advised on portfolios worth ₹4,300 crore, and
                declined more mandates than we have accepted.
              </p>
            </Reveal>
            <GoldRule className="mt-12 max-w-sm text-charcoal" />
          </div>
          <Parallax distance={40} className="img-zoom overflow-hidden">
            <MaskReveal className="relative aspect-[4/5] w-full">
              <Image
                src="/images/concierge.jpeg"
                alt="Private sales gallery"
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover"
              />
            </MaskReveal>
          </Parallax>
        </div>
      </section>

      <section className="bg-ink py-24 grain md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid gap-10 border-y border-ivory/10 py-14 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <Reveal key={s.label}>
                <div>
                  <p className="display text-[clamp(2.6rem,4.6vw,4rem)] gold-text">
                    {s.value.match(/^[\d.]+$/) ? <Counter value={Number(s.value)} /> : s.value}
                  </p>
                  <p className="mt-4 eyebrow text-ivory/40">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24">
            <SectionIntro index="02" eyebrow="What We Do" title="Six disciplines," italic="one desk." />
            <div className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="group h-full bg-ink p-9 transition-colors duration-700 hover:bg-charcoal">
                    <span className="eyebrow text-gold/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display mt-6 text-2xl text-ivory">{s.title}</h3>
                    <p className="mt-5 text-[0.96rem] leading-[1.9] text-ivory/50">
                      {s.copy}
                    </p>
                    <span className="mt-8 block h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-charcoal md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <Reveal>
            <p className="eyebrow text-gold-deep">Our promise</p>
          </Reveal>
          <SplitHeading
            text="If it is not right for you, we will say so — even when it costs us the fee."
            className="display mt-10 text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.25] text-charcoal"
          />
          <GoldRule className="mt-14 text-charcoal" />
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
