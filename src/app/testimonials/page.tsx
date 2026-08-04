import type { Metadata } from "next";
import { PageHero, SectionIntro } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/motion";
import { ClosingCTA } from "@/components/home/Sections";
import { getTestimonials } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Stories",
  description:
    "Investors, families and NRI buyers on working with the Ishanaya Realty advisory desk.",
};

const JOURNEY = [
  { n: "01", t: "The brief", c: "Ninety minutes. Holding period, family shape, travel patterns, risk appetite." },
  { n: "02", t: "The shortlist", c: "Three to five residences, each with a written thesis and an exit view." },
  { n: "03", t: "The private visit", c: "Sales gallery, scale model, live inventory, chauffeur arranged." },
  { n: "04", t: "Diligence & terms", c: "Eleven-point protocol, commercials negotiated, payment plan structured." },
  { n: "05", t: "After handover", c: "Interiors, tenanting, maintenance oversight and resale advisory." },
];

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHero
        eyebrow="Client Stories"
        title="Sixty-eight percent of our work"
        italic="comes from people we already know."
        copy="A record of the relationships behind the transactions."
        image="/images/concierge.jpeg"
      />

      <section className="bg-ivory py-24 text-charcoal md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="columns-1 gap-8 md:columns-2 lg:columns-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.08}>
                <figure className="mb-8 break-inside-avoid border border-charcoal/12 bg-paper p-9">
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <span key={s}>✦</span>
                    ))}
                  </div>
                  <blockquote className="display mt-7 text-[1.35rem] leading-[1.5] text-charcoal">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 border-t border-charcoal/12 pt-6">
                    <p className="nav-type text-charcoal">{t.name}</p>
                    <p className="mt-2 text-sm text-graphite">{t.role}</p>
                    <p className="mt-1 text-sm text-gold-deep">{t.project}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 grain md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <SectionIntro index="02" eyebrow="The Client Journey" title="Five stages," italic="one relationship." />
          <div className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-5">
            {JOURNEY.map((s) => (
              <Reveal key={s.n}>
                <div className="h-full bg-ink p-8">
                  <p className="display text-3xl text-gold">{s.n}</p>
                  <h3 className="display mt-6 text-xl text-ivory">{s.t}</h3>
                  <p className="mt-4 text-sm leading-[1.85] text-ivory/50">{s.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
