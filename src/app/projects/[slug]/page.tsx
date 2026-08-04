import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaskReveal, Parallax, Reveal, SplitHeading } from "@/components/ui/motion";
import { GoldRule, SectionIntro } from "@/components/ui/Section";
import { LuxLink } from "@/components/ui/Interactive";
import {
  AmenityTabs,
  FAQ,
  ProjectGallery,
  StickyBar,
} from "@/components/project/ProjectInteractive";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { getDeveloperBySlug, getProjectBySlug, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return { title: "Residence" };
  return {
    title: `${p.name}, ${p.locality}`,
    description: `${p.subtitle} — ${p.name} by ${p.developer}. ${p.configurations.join(", ")} from ${p.priceFrom}.`,
    openGraph: { images: [p.heroImage] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const developer = await getDeveloperBySlug(project.developerSlug);
  const others = (await getProjects()).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <StickyBar project={project} />

      {/* ---------------------------------------------------------- hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink grain vignette">
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/70" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 pt-40 md:px-12">
          <Reveal>
            <p className="eyebrow text-gold/80">
              {project.developer} · {project.locality}, {project.city}
            </p>
          </Reveal>
          <SplitHeading
            as="h1"
            text={project.name}
            className="display mt-7 text-[clamp(3rem,10vw,9rem)] text-ivory"
          />
          <SplitHeading
            text={project.subtitle}
            delay={0.12}
            className="display text-[clamp(1.3rem,3vw,2.4rem)] italic gold-text"
          />

          <div className="mt-14 grid gap-y-8 border-t border-ivory/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {project.highlights.slice(0, 4).map((h, i) => (
              <Reveal key={h.label} delay={0.1 + i * 0.06}>
                <div>
                  <p className="eyebrow text-ivory/35">{h.label}</p>
                  <p className="display mt-3 text-xl text-ivory">{h.value}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-5">
            <LuxLink href="#book" variant="gold">
              Book a Private Visit
            </LuxLink>
            <LuxLink href="#gallery" variant="ghost">
              View the Gallery
            </LuxLink>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- story */}
      <section className="bg-ivory py-24 text-charcoal md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:px-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-gold-deep">01 — The Story</p>
            <GoldRule className="mt-8 max-w-[10rem] text-charcoal" />
            <p className="mt-8 nav-type text-graphite/70">{project.status}</p>
            <p className="mt-2 nav-type text-graphite/70">{project.possession}</p>
          </div>
          <div>
            {project.story.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className={
                    i === 0
                      ? "display text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.45] text-charcoal"
                      : "mt-8 text-[1.02rem] leading-[1.95] text-graphite"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- architecture */}
      <section className="bg-paper py-24 text-charcoal md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <SectionIntro
            index="02"
            eyebrow="Architecture"
            title="Designed around what you"
            italic="cannot photograph."
            tone="light"
          />
          <div className="mt-16 grid gap-px bg-charcoal/10 md:grid-cols-3">
            {project.architecture.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="h-full bg-paper p-9">
                  <span className="eyebrow text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-6 text-2xl text-charcoal">{a.title}</h3>
                  <p className="mt-5 text-[0.96rem] leading-[1.9] text-graphite">
                    {a.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- gallery */}
      <section id="gallery" className="bg-ink py-24 grain md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <SectionIntro index="03" eyebrow="Gallery" title="The residence," italic="frame by frame." />
          <div className="mt-14">
            <ProjectGallery gallery={project.gallery} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------- configurations & plan */}
      <section className="bg-charcoal py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <SectionIntro
            index="04"
            eyebrow="Configurations"
            title="Choose the plan,"
            italic="then the floor."
          />

          <div className="mt-16 border-t border-ivory/12">
            {project.plans.map((c) => (
              <Reveal key={c.type}>
                <div className="grid grid-cols-2 items-center gap-6 border-b border-ivory/12 py-8 md:grid-cols-4">
                  <p className="display text-2xl text-ivory md:text-3xl">{c.type}</p>
                  <p className="text-sm text-ivory/55">{c.carpet}</p>
                  <p className="text-sm text-gold">{c.price}</p>
                  <p className="hidden text-sm text-ivory/40 md:block">{c.note ?? "—"}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {project.paymentPlan && (
            <div className="mt-20 grid gap-12 border border-gold/25 p-8 md:p-14 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="eyebrow text-gold">Payment</p>
                <h3 className="display mt-6 text-[clamp(1.8rem,3.4vw,3rem)] text-ivory">
                  {project.paymentPlan.title}
                </h3>
                <p className="mt-6 max-w-sm text-[0.98rem] leading-[1.9] text-ivory/55">
                  {project.paymentPlan.copy}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-ivory/10 sm:grid-cols-4">
                {project.paymentPlan.steps.map((s, i) => (
                  <div key={s.label} className="bg-charcoal p-6 text-center">
                    <p className="display text-4xl gold-text">{s.value}</p>
                    <p className="mt-4 text-[0.7rem] leading-relaxed text-ivory/45">
                      {s.label}
                    </p>
                    <p className="mt-4 eyebrow text-[0.5rem] text-ivory/25">
                      Stage {i + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ----------------------------------------------------- amenities */}
      <section className="bg-paper py-24 text-charcoal md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <SectionIntro
            index="05"
            eyebrow="Amenities"
            title="A private club that"
            italic="happens to be home."
            tone="light"
          />
          <div className="mt-16">
            <AmenityTabs groups={project.amenities} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------ masterplan & floorplans */}
      <section className="bg-ivory py-24 text-charcoal md:py-32">
        <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 md:px-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Parallax distance={36} className="img-zoom overflow-hidden">
            <MaskReveal className="relative aspect-[4/3] w-full">
              <Image
                src="/images/masterplan.png"
                alt={`${project.name} masterplan`}
                fill
                sizes="(max-width:1024px) 100vw, 55vw"
                className="object-cover"
              />
            </MaskReveal>
          </Parallax>
          <div>
            <p className="eyebrow text-gold-deep">06 — Masterplan</p>
            <SplitHeading
              text="The plan behind the calm."
              className="display mt-6 text-[clamp(1.8rem,3.4vw,3rem)] text-charcoal"
            />
            <Reveal delay={0.1}>
              <p className="mt-7 text-[1rem] leading-[1.95] text-graphite">
                {project.masterplanNote}
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {project.plans.map((c) => (
                <div key={c.type} className="border border-charcoal/15 p-5">
                  <p className="nav-type text-graphite/70">Floor plan</p>
                  <p className="display mt-3 text-xl text-charcoal">{c.type}</p>
                  <p className="mt-1 text-sm text-graphite">{c.carpet}</p>
                  <Link
                    href="#book"
                    className="mt-4 inline-block nav-type link-underline text-gold-deep"
                  >
                    Request plan
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------- connectivity & investment */}
      <section className="bg-ink py-24 grain md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-gold">07 — Connectivity</p>
              <SplitHeading
                text="Measured in minutes."
                className="display mt-6 text-[clamp(1.8rem,3.4vw,3rem)] text-ivory"
              />
              <div className="mt-10 border-t border-ivory/10">
                {project.connectivity.map((c) => (
                  <Reveal key={c.label}>
                    <div className="flex items-baseline justify-between gap-6 border-b border-ivory/10 py-5">
                      <p className="text-sm text-ivory/65">{c.label}</p>
                      <p className="display text-xl text-gold">{c.value}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow text-gold">08 — Investment</p>
              <SplitHeading
                text={project.investment.headline}
                className="display mt-6 text-[clamp(1.6rem,3vw,2.6rem)] text-ivory"
              />
              <div className="mt-10 grid gap-px bg-ivory/10 sm:grid-cols-2">
                {project.investment.points.map((p) => (
                  <div key={p.label} className="bg-ink p-7">
                    <p className="display text-2xl gold-text">{p.value}</p>
                    <p className="mt-3 eyebrow text-[0.55rem] text-ivory/40">
                      {p.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/investment"
                className="mt-10 inline-block nav-type link-underline text-gold"
              >
                Investment Intelligence
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- timeline & developer */}
      <section className="bg-charcoal py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="eyebrow text-gold">09 — Construction Timeline</p>
          <div className="mt-14 grid gap-px bg-ivory/10 md:grid-cols-5">
            {project.timeline.map((t) => (
              <Reveal key={t.label}>
                <div className="h-full bg-charcoal p-7">
                  <p className="display text-2xl gold-text">{t.value}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ivory/50">
                    {t.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {developer && (
            <div className="mt-24 grid items-center gap-12 border-t border-ivory/10 pt-16 lg:grid-cols-[0.9fr_1.1fr]">
              <MaskReveal className="relative aspect-[4/3] w-full">
                <Image
                  src={developer.image}
                  alt={developer.name}
                  fill
                  sizes="(max-width:1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </MaskReveal>
              <div>
                <p className="eyebrow text-gold">10 — The Developer</p>
                <h3 className="display mt-6 text-[clamp(1.9rem,3.4vw,3rem)] text-ivory">
                  {developer.name}
                </h3>
                <p className="mt-3 nav-type text-ivory/40">{developer.descriptor}</p>
                <p className="mt-8 max-w-xl text-[0.98rem] leading-[1.9] text-ivory/55">
                  {developer.story[0]}
                </p>
                <Link
                  href={`/developers/${developer.slug}`}
                  className="mt-9 inline-block nav-type link-underline text-gold"
                >
                  Developer profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------ FAQ */}
      <section className="bg-ink py-24 grain md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <SectionIntro index="11" eyebrow="Questions" title="Answered before" italic="you ask." />
          <div className="mt-14">
            <FAQ faqs={project.faqs} />
          </div>
          <p className="mt-12 max-w-4xl text-xs leading-relaxed text-ivory/30">
            MahaRERA: {project.rera.join(" · ")}. {project.reraNote ?? ""} Images are
            representative. This page does not constitute an offer or agreement.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- book */}
      <section id="book" className="relative overflow-hidden bg-ivory py-24 text-charcoal md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:px-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-gold-deep">12 — Private Visit</p>
            <SplitHeading
              text={`See ${project.name} the way it deserves to be seen.`}
              className="display mt-6 text-[clamp(1.8rem,3.4vw,3rem)] text-charcoal"
            />
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-md text-[1rem] leading-[1.95] text-graphite">
                A private appointment at the sales gallery: scale model, material
                library, live inventory and a candid conversation about
                commercials. Chauffeur pickup can be arranged.
              </p>
            </Reveal>
            <GoldRule className="mt-12 max-w-xs text-charcoal" />
          </div>
          <EnquiryForm
            source={`project:${project.slug}`}
            interest={`${project.name}, ${project.locality}`}
            intent="Private Visit"
            tone="light"
          />
        </div>
      </section>

      {/* ---------------------------------------------------------- more */}
      <section className="bg-ink py-24 grain md:py-28">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="eyebrow text-gold">Continue the collection</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {others.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="img-zoom group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.cardImage}
                    alt={p.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                </div>
                <h3 className="display mt-6 text-2xl text-ivory transition-colors group-hover:text-gold">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-ivory/45">
                  {p.locality} · {p.priceFrom}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
