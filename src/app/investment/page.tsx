import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, SectionIntro, GoldRule } from "@/components/ui/Section";
import { Counter, MaskReveal, Reveal, SplitHeading } from "@/components/ui/motion";
import { AppreciationChart } from "@/components/home/Charts";
import { ClosingCTA } from "@/components/home/Sections";
import { INFRASTRUCTURE } from "@/lib/content";
import { getLocations } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Investment Intelligence",
  description:
    "Airport, Atal Setu, Metro, Bullet Train, NAINA and Mumbai 3.0 — how six infrastructure programmes are re-pricing the Mumbai Metropolitan Region.",
};

const THESIS = [
  {
    n: "01",
    t: "Time, not distance",
    c: "Value follows the minute saved. Every recommendation starts with a travel-time model built on committed — not proposed — infrastructure.",
  },
  {
    n: "02",
    t: "Two-speed portfolio",
    c: "Established micro-markets compound steadily and let quickly. Corridors compound faster with a longer horizon. Hold both, in known proportion.",
  },
  {
    n: "03",
    t: "Exit before entry",
    c: "We model resale liquidity — buyer depth, floor-plate demand, comparable velocity — before you sign the allotment letter.",
  },
];

export default async function InvestmentPage() {
  const locations = await getLocations();

  return (
    <>
      <PageHero
        eyebrow="Investment Intelligence"
        title="Infrastructure does not create value."
        italic="It relocates it."
        copy="Six programmes are landing inside one decade. This is where they land, what they change, and how we position capital around them."
        image="/images/infra-atal-setu.png"
      />

      {/* thesis */}
      <section className="bg-ivory py-24 text-charcoal md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <SectionIntro
            index="01"
            eyebrow="Our Thesis"
            title="Three rules we never"
            italic="break."
            tone="light"
          />
          <div className="mt-16 grid gap-px bg-charcoal/10 md:grid-cols-3">
            {THESIS.map((t, i) => (
              <Reveal key={t.n} delay={i * 0.08}>
                <div className="h-full bg-ivory p-9">
                  <p className="display text-4xl text-gold">{t.n}</p>
                  <h3 className="display mt-7 text-2xl text-charcoal">{t.t}</h3>
                  <p className="mt-5 text-[0.96rem] leading-[1.9] text-graphite">
                    {t.c}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* infrastructure timeline */}
      <section className="bg-ink py-24 grain md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <SectionIntro index="02" eyebrow="The Programmes" title="Six bets," italic="one decade." />
          <div className="mt-16 space-y-0 border-t border-ivory/10">
            {INFRASTRUCTURE.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04}>
                <div className="group grid gap-6 border-b border-ivory/10 py-10 transition-colors duration-700 hover:bg-ivory/[0.03] md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12">
                  <p className="eyebrow text-gold/70 md:w-28">{item.year}</p>
                  <div>
                    <h3 className="display text-[clamp(1.5rem,2.8vw,2.4rem)] text-ivory">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-[0.96rem] leading-[1.9] text-ivory/50">
                      {item.copy}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="display text-3xl gold-text">{item.metric}</p>
                    <p className="mt-2 eyebrow text-[0.5rem] text-ivory/35">
                      {item.metricLabel}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* chart */}
      <section className="bg-charcoal py-24 text-ivory md:py-32">
        <div className="mx-auto grid max-w-[1600px] items-center gap-16 px-6 md:px-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="eyebrow text-gold">03 — Capital Appreciation</p>
            <SplitHeading
              text="Two speeds, one region."
              className="display mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] text-ivory"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-[1rem] leading-[1.95] text-ivory/55">
                Indexed to 100 in 2019. Powai is the stability line — constrained
                supply, deep rental demand. Panvel is the velocity line — priced
                against infrastructure that is still arriving.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-ivory/10 pt-8">
              <div>
                <p className="display text-3xl text-gold">
                  <Counter value={9.4} decimals={1} suffix="%" />
                </p>
                <p className="mt-2 eyebrow text-[0.5rem] text-ivory/35">Powai CAGR</p>
              </div>
              <div>
                <p className="display text-3xl text-gold">
                  <Counter value={17.8} decimals={1} suffix="%" />
                </p>
                <p className="mt-2 eyebrow text-[0.5rem] text-ivory/35">Panvel CAGR</p>
              </div>
              <div>
                <p className="display text-3xl text-gold">
                  <Counter value={4.2} decimals={1} suffix="%" />
                </p>
                <p className="mt-2 eyebrow text-[0.5rem] text-ivory/35">Yield, corridor</p>
              </div>
            </div>
          </div>
          <AppreciationChart />
        </div>
      </section>

      {/* corridor cards */}
      <section className="bg-paper py-24 text-charcoal md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <SectionIntro
            index="04"
            eyebrow="Where We Are Positioned"
            title="Seven markets, ranked by"
            italic="conviction."
            tone="light"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.05}>
                <Link href={`/locations/${l.slug}`} className="img-zoom group block">
                  <MaskReveal className="relative aspect-[4/3] w-full">
                    <Image
                      src={l.image}
                      alt={l.name}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </MaskReveal>
                  <div className="flex items-baseline justify-between border-b border-charcoal/15 pb-4 pt-6">
                    <h3 className="display text-2xl text-charcoal transition-colors group-hover:text-gold-deep">
                      {l.name}
                    </h3>
                    <p className="display text-xl text-gold-deep">{l.appreciation}</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-graphite">
                    {l.headline}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <GoldRule className="mt-20 text-charcoal" />
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-graphite/70">
            Figures are indicative, compiled from public registration data,
            developer disclosures and our own transaction record. Real estate
            returns are not guaranteed. This page is informational and does not
            constitute investment advice.
          </p>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
