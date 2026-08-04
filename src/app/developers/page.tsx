import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, SectionIntro } from "@/components/ui/Section";
import { MaskReveal, Reveal } from "@/components/ui/motion";
import { ClosingCTA } from "@/components/home/Sections";
import { getDevelopers, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "The development houses we represent — GHP Group, Sanctum Developers, Aureus Estates and Verdana Group.",
};

export default async function DevelopersPage() {
  const [developers, projects] = await Promise.all([getDevelopers(), getProjects()]);

  return (
    <>
      <PageHero
        eyebrow="Developer Alliances"
        title="A building is a promise"
        italic="someone has to keep."
        copy="We audit delivery records, structural consultants, escrow discipline and maintenance philosophy before we represent a developer. Four houses have cleared it."
        image="/images/lobby-arrival.png"
      />

      <section className="bg-ink py-24 grain md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <SectionIntro
            index="01"
            eyebrow="The Houses"
            title="Four practices, four"
            italic="temperaments."
          />

          <div className="mt-20 space-y-24">
            {developers.map((d, i) => {
              const theirs = projects.filter((p) => p.developerSlug === d.slug);
              return (
                <article
                  key={d.slug}
                  className="grid gap-12 border-t border-ivory/10 pt-14 lg:grid-cols-[1fr_1.2fr]"
                >
                  <div className={i % 2 ? "lg:order-2" : ""}>
                    <Link href={`/developers/${d.slug}`} className="img-zoom block">
                      <MaskReveal className="relative aspect-[4/3] w-full">
                        <Image
                          src={d.image}
                          alt={d.name}
                          fill
                          sizes="(max-width:1024px) 100vw, 45vw"
                          className="object-cover"
                        />
                      </MaskReveal>
                    </Link>
                  </div>

                  <div>
                    <Reveal>
                      <p className="eyebrow text-gold/70">
                        {String(i + 1).padStart(2, "0")} · Est. {d.founded}
                      </p>
                      <h2 className="display mt-5 text-[clamp(2rem,4vw,3.4rem)] text-ivory">
                        {d.name}
                      </h2>
                      <p className="mt-3 nav-type text-ivory/40">{d.descriptor}</p>
                      <p className="display mt-8 text-2xl italic gold-text">
                        {d.headline}
                      </p>
                      <p className="mt-6 max-w-xl text-[0.98rem] leading-[1.9] text-ivory/55">
                        {d.story[0]}
                      </p>
                    </Reveal>

                    <div className="mt-10 grid grid-cols-2 gap-8 border-t border-ivory/10 pt-8 sm:grid-cols-4">
                      {d.stats.slice(0, 4).map((s) => (
                        <div key={s.label}>
                          <p className="display text-xl text-gold">{s.value}</p>
                          <p className="mt-2 eyebrow text-[0.5rem] text-ivory/35">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {theirs.length > 0 && (
                      <div className="mt-9 flex flex-wrap gap-3">
                        {theirs.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/projects/${p.slug}`}
                            className="border border-ivory/15 px-4 py-2 nav-type text-ivory/60 transition-colors duration-500 hover:border-gold hover:text-gold"
                          >
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/developers/${d.slug}`}
                      className="mt-10 inline-block nav-type link-underline text-gold"
                    >
                      Full profile
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
