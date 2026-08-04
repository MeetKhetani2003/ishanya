import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, GoldRule } from "@/components/ui/Section";
import { MaskReveal, Reveal, SplitHeading } from "@/components/ui/motion";
import { ClosingCTA } from "@/components/home/Sections";
import { getLocationBySlug, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) return { title: "Location" };
  return { title: loc.name, description: loc.headline };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) notFound();
  const projects = (await getProjects()).filter(
    (p) => p.region === loc.region || p.locality === loc.name,
  );

  return (
    <>
      <PageHero
        eyebrow={`Location · ${loc.region}`}
        title={loc.name}
        italic={loc.headline}
        image={loc.image}
      />

      <section className="bg-ivory py-24 text-charcoal md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:px-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow text-gold-deep">The Growth Story</p>
            {loc.story.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className={
                    i === 0
                      ? "display mt-8 text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.5] text-charcoal"
                      : "mt-7 text-[1rem] leading-[1.95] text-graphite"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
            <GoldRule className="mt-12 max-w-sm text-charcoal" />
          </div>
          <div className="grid grid-cols-3 gap-px self-start bg-charcoal/10">
            {loc.growth.map((g) => (
              <div key={g.label} className="bg-ivory p-6">
                <p className="display text-2xl text-gold-deep">{g.value}</p>
                <p className="mt-3 eyebrow text-[0.5rem] text-graphite/70">
                  {g.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 grain md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:px-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Infrastructure</p>
            <SplitHeading
              text="What is being built."
              className="display mt-6 text-[clamp(1.7rem,3vw,2.6rem)] text-ivory"
            />
            <ul className="mt-10 border-t border-ivory/10">
              {loc.infrastructure.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-5 border-b border-ivory/10 py-5 text-sm text-ivory/65"
                >
                  <span className="block h-1 w-1 rotate-45 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-gold">Lifestyle</p>
            <SplitHeading
              text="What is already there."
              className="display mt-6 text-[clamp(1.7rem,3vw,2.6rem)] text-ivory"
            />
            <ul className="mt-10 border-t border-ivory/10">
              {loc.lifestyle.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-5 border-b border-ivory/10 py-5 text-sm text-ivory/65"
                >
                  <span className="block h-1 w-1 rotate-45 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="bg-charcoal py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <p className="eyebrow text-gold">Residences here</p>
            <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="img-zoom group">
                  <MaskReveal className="relative aspect-[4/3] w-full">
                    <Image
                      src={p.cardImage}
                      alt={p.name}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </MaskReveal>
                  <h3 className="display mt-6 text-2xl text-ivory transition-colors group-hover:text-gold">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-ivory/45">
                    {p.developer} · {p.priceFrom}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCTA />
    </>
  );
}
