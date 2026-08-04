import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, GoldRule } from "@/components/ui/Section";
import { Reveal, SplitHeading } from "@/components/ui/motion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Concierge",
  description:
    "Speak to the Ishanaya Realty concierge — private consultation, site visits, WhatsApp, call or email.",
};

const CHANNELS = [
  {
    label: "Call the desk",
    value: BRAND.phone,
    href: `tel:${BRAND.phoneHref}`,
    note: "Answered by an advisor, never a call centre.",
  },
  {
    label: "WhatsApp",
    value: "Message us",
    href: `https://wa.me/${BRAND.whatsapp}`,
    note: "Floor plans, availability and pricing within the hour.",
  },
  {
    label: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
    note: "For documentation, NRI queries and detailed briefs.",
  },
];

export default function ConciergePage() {
  return (
    <>
      <PageHero
        eyebrow="Concierge"
        title="One number. One advisor."
        italic="No queue."
        copy="Every enquiry is handled by a senior advisor from first message to post-handover. We do not route clients through a sales floor."
        image="/images/concierge.jpeg"
      />

      <section className="bg-ink py-20 grain md:py-28">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid gap-px bg-ivory/10 md:grid-cols-3">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.07}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group block h-full bg-ink p-10 transition-colors duration-700 hover:bg-charcoal"
                >
                  <p className="eyebrow text-gold/70">{c.label}</p>
                  <p className="display mt-7 text-[clamp(1.4rem,2.4vw,2rem)] text-ivory transition-colors group-hover:text-gold">
                    {c.value}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-ivory/45">{c.note}</p>
                  <span className="mt-8 block h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24 text-charcoal md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:px-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-gold-deep">Private consultation</p>
            <SplitHeading
              text="Tell us the brief. We will do the rest."
              className="display mt-6 text-[clamp(1.8rem,3.4vw,3rem)] text-charcoal"
            />
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-md text-[1rem] leading-[1.95] text-graphite">
                Share your requirement and an advisor will respond within one
                working hour with a shortlist, honest commercials and a suggested
                visit sequence.
              </p>
            </Reveal>
            <GoldRule className="mt-12 max-w-xs text-charcoal" />
            <div className="mt-12 space-y-3 text-sm text-graphite">
              <p className="nav-type text-charcoal">Sales Gallery</p>
              <p className="max-w-xs leading-relaxed">{BRAND.address}</p>
              <p>{BRAND.hours}</p>
              <p className="pt-4 text-xs text-graphite/60">{BRAND.rera}</p>
            </div>
          </div>
          <EnquiryForm source="concierge" intent="Consultation" tone="light" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 grain">
        <Image
          src="/images/hero-skyline.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-12">
          <p className="eyebrow text-gold">NRI Desk</p>
          <SplitHeading
            text="Buying from abroad is a different discipline."
            className="display mt-8 text-[clamp(1.7rem,3.4vw,2.8rem)] text-ivory"
          />
          <Reveal delay={0.15}>
            <p className="lede mt-8">
              Remittance structuring, power of attorney, taxation, remote video
              inspection and handover representation — for clients across
              fourteen countries.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
