import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { LuxLink } from "@/components/ui/Interactive";
import { Reveal, SplitHeading } from "@/components/ui/motion";
import { GoldRule } from "@/components/ui/Section";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your request has reached the Ishanaya Realty concierge.",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ intent?: string; name?: string }> };

async function Body({ searchParams }: Props) {
  const { intent = "Consultation", name } = await searchParams;
  return (
    <>
      <Reveal>
        <p className="eyebrow text-gold">{intent} requested</p>
      </Reveal>
      <SplitHeading
        as="h1"
        text={name ? `Thank you, ${name}.` : "Thank you."}
        className="display mt-8 text-[clamp(2.4rem,6vw,5rem)] text-ivory"
      />
      <SplitHeading
        text="An advisor is already on it."
        delay={0.1}
        className="display text-[clamp(2.4rem,6vw,5rem)] italic gold-text"
      />
      <Reveal delay={0.2}>
        <p className="lede mx-auto mt-10 max-w-xl">
          You will hear from a senior advisor within one working hour with a
          shortlist, availability and a suggested visit sequence. Nothing is
          automated — a person is reading your brief right now.
        </p>
      </Reveal>
    </>
  );
}

export default function ThankYouPage(props: Props) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink grain vignette">
      <Image
        src="/images/lifestyle-deck.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/70" />
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center md:px-12">
        <Suspense fallback={<p className="eyebrow text-gold">Thank you</p>}>
          <Body {...props} />
        </Suspense>
        <GoldRule className="mx-auto mt-14 max-w-sm text-ivory" />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <LuxLink href="/collection" variant="gold">
            Browse the Collection
          </LuxLink>
          <LuxLink href="/journal" variant="ghost">
            Read the Journal
          </LuxLink>
        </div>
        <p className="mt-12 text-sm text-ivory/40">
          Prefer to speak now?{" "}
          <a href={`tel:${BRAND.phoneHref}`} className="link-underline text-gold">
            {BRAND.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
