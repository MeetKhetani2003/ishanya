import Image from "next/image";
import Link from "next/link";
import { Counter, MaskReveal, Parallax, Reveal, SplitHeading } from "@/components/ui/motion";
import { LuxLink } from "@/components/ui/Interactive";
import { GoldRule, SectionIntro } from "@/components/ui/Section";
import { BRAND, INFRASTRUCTURE, STATS, type Post, type Project } from "@/lib/content";
import { AppreciationChart } from "./Charts";

/* ------------------------------------------------------------------ ethos */
export function Ethos() {
  const beliefs = [
    {
      n: "I",
      title: "We represent the buyer",
      copy: "Not the listing, not the developer, not the transaction. Our loyalty has a single direction and it never changes mid-deal.",
    },
    {
      n: "II",
      title: "Scarcity over inventory",
      copy: "We carry fewer than a dozen projects at any time. Each one has survived an eleven-point legal, structural and commercial protocol.",
    },
    {
      n: "III",
      title: "Time is the real asset",
      copy: "Every recommendation begins with a travel-time model and a holding-period thesis — never with a price list.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-ivory py-28 text-charcoal md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro
              index="01"
              eyebrow="The House"
              title="A quiet practice in a loud"
              italic="industry."
              tone="light"
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-[1.02rem] leading-[1.95] text-graphite">
                Ishanaya Realty was founded on a single frustration: the finest
                homes in India were being sold like commodities. We built a
                practice that behaves like a private office — research first,
                inventory second, and a relationship that continues long after
                the keys change hands.
              </p>
            </Reveal>
            <div className="mt-12">
              <LuxLink href="/about" variant="ink">
                Our Philosophy
              </LuxLink>
            </div>
          </div>

          <div className="space-y-0">
            {beliefs.map((b, i) => (
              <Reveal key={b.n} delay={i * 0.08}>
                <div className="group grid grid-cols-[auto_1fr] gap-8 border-t border-charcoal/12 py-9 transition-colors duration-700 hover:border-gold">
                  <span className="display text-2xl text-gold">{b.n}</span>
                  <div>
                    <h3 className="display text-2xl text-charcoal md:text-3xl">
                      {b.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-[0.98rem] leading-[1.9] text-graphite">
                      {b.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-charcoal/12 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div>
                <p className="display text-[clamp(2.4rem,4vw,3.6rem)] text-charcoal">
                  {s.value.match(/^[\d.]+$/) ? (
                    <Counter value={Number(s.value)} />
                  ) : (
                    s.value
                  )}
                </p>
                <p className="mt-3 eyebrow text-graphite/70">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- collection */
export function CollectionEditorial({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <section className="relative bg-ink py-28 grain md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionIntro
            index="02"
            eyebrow="The Collection"
            title="Fewer projects."
            italic="Deeper conviction."
          />
          <Reveal>
            <Link
              href="/collection"
              className="nav-type link-underline text-gold whitespace-nowrap"
            >
              All Residences ({projects.length})
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 space-y-28 md:space-y-40">
        {featured.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={p.slug} className="mx-auto max-w-[1600px] px-6 md:px-12">
              <div
                className={`grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] ${
                  flip ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link href={`/projects/${p.slug}`} className="img-zoom group block">
                  <MaskReveal className="relative aspect-[16/11] w-full overflow-hidden">
                    <Image
                      src={p.heroImage}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <span className="absolute bottom-6 left-6 nav-type text-ivory/80">
                      {p.status}
                    </span>
                  </MaskReveal>
                </Link>

                <div className={flip ? "lg:pr-6" : "lg:pl-6"}>
                  <Reveal>
                    <p className="eyebrow text-gold/70">
                      {String(i + 1).padStart(2, "0")} · {p.locality}, {p.city}
                    </p>
                  </Reveal>
                  <SplitHeading
                    text={p.name}
                    className="display mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)] text-ivory"
                  />
                  <Reveal delay={0.1}>
                    <p className="display mt-2 text-xl italic text-ivory/50">
                      {p.subtitle}
                    </p>
                    <p className="mt-7 max-w-md text-[0.98rem] leading-[1.9] text-ivory/55">
                      {p.story[0]}
                    </p>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <dl className="mt-9 grid grid-cols-2 gap-y-6 border-t border-ivory/10 pt-7">
                      <div>
                        <dt className="eyebrow text-ivory/35">Developer</dt>
                        <dd className="mt-2 text-sm text-ivory/85">{p.developer}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-ivory/35">From</dt>
                        <dd className="mt-2 text-sm text-gold">{p.priceFrom}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-ivory/35">Configurations</dt>
                        <dd className="mt-2 text-sm text-ivory/85">
                          {p.configurations.join(" · ")}
                        </dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-ivory/35">Possession</dt>
                        <dd className="mt-2 text-sm text-ivory/85">{p.possession}</dd>
                      </div>
                    </dl>
                  </Reveal>

                  <div className="mt-10">
                    <LuxLink href={`/projects/${p.slug}`} variant="gold">
                      Enter the Experience
                    </LuxLink>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- intelligence */
export function Intelligence() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-ivory grain md:py-40">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[38rem] w-[38rem] rounded-full bg-gold/6 blur-[140px]" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionIntro
          index="03"
          eyebrow="Investment Intelligence"
          title="The map of Mumbai is being"
          italic="redrawn."
          copy="Six infrastructure programmes are landing inside a single decade. Together they reset travel time, employment geography and — inevitably — price."
        />

        <div className="mt-20 grid gap-px border border-ivory/10 bg-ivory/10 md:grid-cols-2 lg:grid-cols-3">
          {INFRASTRUCTURE.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <div className="group h-full bg-charcoal p-9 transition-colors duration-700 hover:bg-ink">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-gold/70">{item.year}</span>
                  <span className="eyebrow text-ivory/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="display mt-8 text-[clamp(1.9rem,3vw,2.6rem)] gold-text">
                  {item.metric}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ivory/40">
                  {item.metricLabel}
                </p>
                <h3 className="display mt-8 text-xl text-ivory">{item.title}</h3>
                <p className="mt-4 text-sm leading-[1.85] text-ivory/50">{item.copy}</p>
                <span className="mt-8 block h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <p className="eyebrow text-gold/70">Capital appreciation index</p>
              <h3 className="display mt-6 text-[clamp(1.8rem,3.2vw,3rem)] text-ivory">
                Indexed to 100 in 2019.
              </h3>
              <p className="mt-6 max-w-md text-[0.98rem] leading-[1.9] text-ivory/55">
                Mumbai&apos;s established micro-markets compound steadily. The
                infrastructure corridors compound faster — with a different risk
                profile. A balanced portfolio holds both.
              </p>
            </Reveal>
            <div className="mt-10">
              <LuxLink href="/investment" variant="ghost">
                Read the Intelligence
              </LuxLink>
            </div>
          </div>
          <Reveal delay={0.12}>
            <AppreciationChart />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- lifestyle */
export function Lifestyle() {
  const blocks = [
    {
      img: "/images/lobby-arrival.png",
      eyebrow: "Arrival",
      title: "The first ninety seconds",
      copy: "A residence is judged before the front door. Porte-cochère, lobby light, the acoustics of a marble floor — we assess the arrival sequence of every project we represent.",
    },
    {
      img: "/images/interior-living.png",
      eyebrow: "Interiors",
      title: "Rooms that hold silence",
      copy: "Slab thickness, glazing laminate, decoupled service shafts. The luxury you feel but cannot photograph is engineered years before handover.",
    },
    {
      img: "/images/lifestyle-deck.png",
      eyebrow: "Amenity",
      title: "Hospitality, permanently",
      copy: "The best amenity decks are run like hotels — staffed, maintained and programmed. We ask who operates it, not just who designed it.",
    },
  ];

  return (
    <section className="bg-paper py-28 text-charcoal md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionIntro
          index="04"
          eyebrow="Featured Lifestyle"
          title="Luxury is a sequence of"
          italic="small certainties."
          tone="light"
        />
      </div>

      <div className="mt-20 space-y-24 md:space-y-32">
        {blocks.map((b, i) => (
          <div
            key={b.title}
            className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 md:px-12 lg:grid-cols-2"
          >
            <Parallax
              distance={40}
              className={`${i % 2 ? "lg:order-2" : ""} img-zoom overflow-hidden`}
            >
              <MaskReveal className="relative aspect-[4/3] w-full">
                <Image
                  src={b.img}
                  alt={b.title}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </MaskReveal>
            </Parallax>
            <div className={i % 2 ? "lg:pr-10" : "lg:pl-10"}>
              <Reveal>
                <p className="eyebrow text-gold">{b.eyebrow}</p>
              </Reveal>
              <SplitHeading
                text={b.title}
                className="display mt-6 text-[clamp(1.9rem,3.6vw,3.2rem)] text-charcoal"
              />
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-md text-[1rem] leading-[1.95] text-graphite">
                  {b.copy}
                </p>
              </Reveal>
              <GoldRule className="mt-10 max-w-xs text-charcoal" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- journal */
export function JournalStrip({ posts }: { posts: Post[] }) {
  return (
    <section className="bg-ivory py-28 text-charcoal md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionIntro
            index="07"
            eyebrow="The Journal"
            title="Notes from the"
            italic="advisory desk."
            tone="light"
          />
          <Reveal>
            <Link href="/journal" className="nav-type link-underline text-gold-deep">
              All Writing
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-charcoal/10 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/journal/${p.slug}`}
                className="img-zoom group flex h-full flex-col bg-ivory p-8 transition-colors duration-700 hover:bg-paper"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="eyebrow mt-7 text-gold-deep">{p.category}</p>
                <h3 className="display mt-4 text-2xl leading-snug text-charcoal">
                  {p.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-[1.85] text-graphite">
                  {p.excerpt}
                </p>
                <p className="mt-7 eyebrow text-graphite/60">{p.readTime} read</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ closing CTA */
export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 grain md:py-40">
      <Image
        src="/images/concierge.jpeg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/70" />
      <div className="relative mx-auto max-w-[1600px] px-6 text-center md:px-12">
        <Reveal>
          <p className="eyebrow text-gold">Private Consultation</p>
        </Reveal>
        <SplitHeading
          text="Come and stand in the room."
          className="display mx-auto mt-8 max-w-4xl text-[clamp(2.2rem,5.6vw,5rem)] text-ivory"
        />
        <Reveal delay={0.15}>
          <p className="lede mx-auto mt-8 max-w-xl">
            Ninety minutes with an advisor, a scale model, and complete
            transparency on availability and commercials. No obligation, and
            never a sales pitch.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
            <LuxLink href="/book-visit" variant="gold">
              Book a Private Visit
            </LuxLink>
            <LuxLink href="/concierge" variant="ghost">
              Speak to the Concierge
            </LuxLink>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-ivory/50">
            <a href={`tel:${BRAND.phoneHref}`} className="link-underline hover:text-gold">
              {BRAND.phone}
            </a>
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-gold"
            >
              WhatsApp
            </a>
            <a href={`mailto:${BRAND.email}`} className="link-underline hover:text-gold">
              {BRAND.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
