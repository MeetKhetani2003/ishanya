import type { Metadata } from "next";
import { PageHero, GoldRule } from "@/components/ui/Section";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the use of the Ishanaya Realty website.",
};

const SECTIONS = [
  {
    h: "Nature of this website",
    p: "This website is an informational presentation of residences on which Ishanaya Realty advises. Nothing here constitutes an offer, an invitation to offer, or an agreement of any kind.",
  },
  {
    h: "Project information",
    p: "Project names, configurations, carpet areas, amenities and pricing are indicative, sourced from the respective developer and subject to change without notice. Isle of Calm is the project name registered under MahaRERA (P51800077922 / P51800077401). Tower 3 will receive its RERA registration at a later stage. The 3 BHK is a jodi apartment, subject to availability and approvals.",
  },
  {
    h: "Imagery",
    p: "Renders, interiors and landscapes shown are artistic impressions and representative visuals. Actual construction, finishes and views may differ.",
  },
  {
    h: "Pricing and payment plans",
    p: "All prices are exclusive of statutory charges unless expressly stated, are subject to revision by the developer, and are confirmed only in the agreement for sale. Payment plans, including the 25:25:25:25 structure referenced for Isle of Calm, are offered by the developer and may be modified or withdrawn.",
  },
  {
    h: "Advisory relationship",
    p: `Ishanaya Realty acts as a MahaRERA-registered real estate agent (${BRAND.rera}). Any purchase or lease shall be governed solely by the terms of the agreement executed between you and the developer or owner.`,
  },
  {
    h: "Governing law",
    p: "These terms are governed by the laws of India, with exclusive jurisdiction vesting in the courts of Mumbai, Maharashtra.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms"
        italic="of Use"
        copy="The fine print, written to be read."
        image="/images/masterplan.png"
      />
      <section className="bg-paper py-24 text-charcoal md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-0">
          {SECTIONS.map((s, i) => (
            <div key={s.h} className="border-t border-charcoal/15 py-10">
              <div className="flex items-baseline gap-5">
                <span className="eyebrow text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display text-2xl text-charcoal md:text-3xl">{s.h}</h2>
              </div>
              <p className="mt-6 text-[1rem] leading-[1.95] text-graphite">{s.p}</p>
            </div>
          ))}
          <GoldRule className="mt-10 text-charcoal" />
          <p className="mt-10 text-sm text-graphite/70">Last updated: January 2026.</p>
        </div>
      </section>
    </>
  );
}
