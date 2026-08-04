import type { Metadata } from "next";
import Image from "next/image";
import { GoldRule } from "@/components/ui/Section";
import { Reveal, SplitHeading } from "@/components/ui/motion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BRAND } from "@/lib/content";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Private Visit",
  description:
    "Reserve a private appointment at the sales gallery — scale model, material library, live inventory and candid commercials.",
};

const INCLUDES = [
  "Chauffeur pickup within Mumbai on request",
  "Scale model and material library walkthrough",
  "Live inventory, floor-by-floor availability",
  "Candid commercials and payment plan modelling",
  "No sales floor, no pressure, no follow-up spam",
];

export default async function BookVisitPage() {
  const projects = await getProjects();

  return (
    <section className="relative min-h-screen bg-ink grain">
      <div className="grid lg:grid-cols-2">
        {/* left — cinematic panel */}
        <div className="relative hidden min-h-[100svh] lg:block">
          <Image
            src="/images/concierge.jpeg"
            alt="Private sales gallery"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/40" />
          <div className="absolute inset-x-0 bottom-0 p-14">
            <p className="eyebrow text-gold">The Private Visit</p>
            <SplitHeading
              text="Ninety minutes that decide the next twenty years."
              className="display mt-7 max-w-md text-[clamp(2rem,3.2vw,3rem)] text-ivory"
            />
            <ul className="mt-10 space-y-4">
              {INCLUDES.map((i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-ivory/60">
                  <span className="mt-2 block h-1 w-1 shrink-0 rotate-45 bg-gold" />
                  {i}
                </li>
              ))}
            </ul>
            <GoldRule className="mt-12 max-w-xs text-ivory" />
            <p className="mt-8 text-sm text-ivory/45">
              {BRAND.address} · {BRAND.hours}
            </p>
          </div>
        </div>

        {/* right — form */}
        <div className="flex items-center px-6 pb-24 pt-36 md:px-14 lg:pt-40">
          <div className="w-full max-w-xl">
            <Reveal>
              <p className="eyebrow text-gold">Reserve your appointment</p>
              <h1 className="display mt-7 text-[clamp(2.2rem,4.6vw,3.6rem)] text-ivory">
                Book a private visit
              </h1>
              <p className="mt-6 text-[0.98rem] leading-[1.9] text-ivory/55">
                Select a residence and a preferred date. An advisor will confirm
                within one working hour.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-3">
              {projects.slice(0, 6).map((p) => (
                <span
                  key={p.slug}
                  className="border border-ivory/12 px-4 py-2 nav-type text-ivory/45"
                >
                  {p.name}
                </span>
              ))}
            </div>

            <div className="mt-12">
              <EnquiryForm source="book-visit" intent="Private Visit" tone="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
