import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/Section";
import { MaskReveal, Reveal } from "@/components/ui/motion";
import { ClosingCTA } from "@/components/home/Sections";
import { getPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Editorial writing on investment, luxury, lifestyle and the mechanics of buying well in the Mumbai Metropolitan Region.",
};

export default async function JournalPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Writing for people who"
        italic="read the fine print."
        image="/images/journal-editorial.png"
      />

      {lead && (
        <section className="bg-ivory py-20 text-charcoal md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <Link href={`/journal/${lead.slug}`} className="img-zoom group block">
              <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
                <MaskReveal className="relative aspect-[16/10] w-full">
                  <Image
                    src={lead.image}
                    alt={lead.title}
                    fill
                    priority
                    sizes="(max-width:1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </MaskReveal>
                <div>
                  <p className="eyebrow text-gold-deep">
                    Featured · {lead.category}
                  </p>
                  <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.05] text-charcoal transition-colors group-hover:text-gold-deep">
                    {lead.title}
                  </h2>
                  <p className="mt-7 max-w-lg text-[1.02rem] leading-[1.95] text-graphite">
                    {lead.excerpt}
                  </p>
                  <p className="mt-8 eyebrow text-graphite/60">
                    {new Date(lead.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {lead.readTime} read
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="bg-paper py-20 text-charcoal md:py-28">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="border-t border-charcoal/15">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/journal/${p.slug}`}
                  className="group grid items-center gap-8 border-b border-charcoal/15 py-10 md:grid-cols-[auto_1.4fr_1fr_auto]"
                >
                  <span className="eyebrow text-gold-deep md:w-32">{p.category}</span>
                  <h3 className="display text-[clamp(1.5rem,2.6vw,2.4rem)] text-charcoal transition-colors group-hover:text-gold-deep">
                    {p.title}
                  </h3>
                  <p className="hidden text-sm leading-relaxed text-graphite md:block">
                    {p.excerpt}
                  </p>
                  <span className="nav-type text-graphite/60">{p.readTime}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
