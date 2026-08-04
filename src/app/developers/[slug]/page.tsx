import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, GoldRule } from "@/components/ui/Section";
import { MaskReveal, Reveal } from "@/components/ui/motion";
import { ClosingCTA } from "@/components/home/Sections";
import { getDeveloperBySlug, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dev = await getDeveloperBySlug(slug);
  if (!dev) return { title: "Developer" };
  return { title: dev.name, description: dev.headline };
}

export default async function DeveloperPage({ params }: Props) {
  const { slug } = await params;
  const dev = await getDeveloperBySlug(slug);
  if (!dev) notFound();
  const projects = (await getProjects()).filter((p) => p.developerSlug === slug);

  return (
    <>
      <PageHero
        eyebrow={`Developer · Est. ${dev.founded}`}
        title={dev.name}
        italic={dev.headline}
        copy={dev.descriptor}
        image={dev.image}
      />

      <section className="bg-ivory py-24 text-charcoal md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:px-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow text-gold-deep">The Practice</p>
            {dev.story.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className={`mt-8 leading-[1.95] text-graphite ${
                    i === 0 ? "display text-[clamp(1.4rem,2.4vw,2rem)] !text-charcoal !leading-[1.5]" : ""
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}
            <GoldRule className="mt-12 max-w-sm text-charcoal" />
            <div className="mt-10 flex flex-wrap gap-3">
              {dev.verticals.map((v) => (
                <span
                  key={v}
                  className="border border-charcoal/20 px-4 py-2 nav-type text-graphite"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-px bg-charcoal/10">
              {dev.stats.map((s) => (
                <div key={s.label} className="bg-ivory p-7">
                  <p className="display text-2xl text-charcoal">{s.value}</p>
                  <p className="mt-3 eyebrow text-[0.55rem] text-graphite/70">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="eyebrow mt-14 text-gold-deep">Recognition</p>
            <ul className="mt-6 space-y-4">
              {dev.awards.map((a) => (
                <li key={a} className="flex gap-4 text-sm leading-relaxed text-graphite">
                  <span className="mt-2 block h-1 w-1 rotate-45 bg-gold" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="bg-ink py-24 grain md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="eyebrow text-gold">Timeline</p>
          <div className="mt-14 grid gap-px bg-ivory/10 md:grid-cols-4">
            {dev.timeline.map((t) => (
              <Reveal key={t.label}>
                <div className="h-full bg-ink p-8">
                  <p className="display text-3xl gold-text">{t.value}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ivory/55">
                    {t.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* their projects */}
      {projects.length > 0 && (
        <section className="bg-charcoal py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <p className="eyebrow text-gold">Represented Residences</p>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {projects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="img-zoom group">
                  <MaskReveal className="relative aspect-[16/10] w-full">
                    <Image
                      src={p.cardImage}
                      alt={p.name}
                      fill
                      sizes="(max-width:768px) 100vw, 48vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  </MaskReveal>
                  <h3 className="display mt-6 text-3xl text-ivory transition-colors group-hover:text-gold">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-ivory/45">
                    {p.locality}, {p.city} · {p.priceFrom}
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
