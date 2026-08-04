import type { Metadata } from "next";
import { PageHero, GoldRule } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/motion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ishanaya Realty — Powai sales gallery, phone, WhatsApp and email.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come to the gallery,"
        italic="or we will come to you."
        image="/images/lobby-arrival.png"
      />

      <section className="bg-ivory py-24 text-charcoal md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:px-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-gold-deep">Sales Gallery</p>
            <p className="display mt-7 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug text-charcoal">
              {BRAND.address}
            </p>
            <p className="mt-6 text-sm text-graphite">{BRAND.hours}</p>
            <GoldRule className="my-10 max-w-xs text-charcoal" />
            <div className="space-y-4">
              <a
                href={`tel:${BRAND.phoneHref}`}
                className="block display text-2xl text-charcoal hover:text-gold-deep"
              >
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="block text-sm text-graphite hover:text-gold-deep"
              >
                {BRAND.email}
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-graphite hover:text-gold-deep"
              >
                WhatsApp the concierge
              </a>
            </div>
            <p className="mt-12 text-xs text-graphite/60">{BRAND.rera}</p>

            <Reveal delay={0.15}>
              <div className="mt-12 aspect-[4/3] w-full border border-charcoal/15 bg-paper p-8">
                <p className="eyebrow text-gold-deep">Finding us</p>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-graphite">
                  <p>Two minutes from the Powai Lake promenade.</p>
                  <p>Valet parking at the Galleria forecourt.</p>
                  <p>Nearest metro: Powai (Line 6, opening phase).</p>
                  <p>22 minutes from CSMIA International Terminal.</p>
                </div>
                <div className="mt-8 h-px w-full bg-charcoal/10" />
                <p className="mt-6 display text-lg italic text-gold-deep">
                  Appointments preferred — walk-ins welcomed.
                </p>
              </div>
            </Reveal>
          </div>

          <EnquiryForm source="contact" intent="Enquiry" tone="light" heading="Send a message" />
        </div>
      </section>
    </>
  );
}
