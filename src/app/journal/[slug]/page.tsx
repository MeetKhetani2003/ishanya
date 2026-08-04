import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GoldRule } from "@/components/ui/Section";
import { Reveal, SplitHeading } from "@/components/ui/motion";
import { ClosingCTA } from "@/components/home/Sections";
import { getPostBySlug, getPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.image], type: "article" },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const more = (await getPosts()).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink grain vignette">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
          <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 pt-40 text-center md:px-12">
            <Reveal>
              <p className="eyebrow text-gold">{post.category}</p>
            </Reveal>
            <SplitHeading
              as="h1"
              text={post.title}
              className="display mt-7 text-[clamp(2.2rem,5.4vw,4.4rem)] text-ivory"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 eyebrow text-ivory/40">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · {post.readTime} read
              </p>
            </Reveal>
          </div>
        </header>

        <div className="bg-ivory py-24 text-charcoal md:py-32">
          <div className="mx-auto max-w-3xl px-6 md:px-0">
            <Reveal>
              <p className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.55] text-charcoal">
                {post.excerpt}
              </p>
            </Reveal>
            <GoldRule className="my-14 text-charcoal" />
            {post.body.map((para, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <p className="mt-8 text-[1.06rem] leading-[2.05] text-graphite first-letter:float-left first-letter:mr-3 first-letter:font-[family-name:var(--font-playfair)] first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-gold-deep [&:not(:first-child)]:first-letter:float-none [&:not(:first-child)]:first-letter:mr-0 [&:not(:first-child)]:first-letter:text-[1.06rem] [&:not(:first-child)]:first-letter:leading-[2.05] [&:not(:first-child)]:first-letter:text-graphite">
                  {para}
                </p>
              </Reveal>
            ))}
            <GoldRule className="mt-16 text-charcoal" />
            <p className="mt-10 text-sm text-graphite/70">
              Written by the Ishanaya Realty advisory desk. For a private view on
              your portfolio,{" "}
              <Link href="/concierge" className="link-underline text-gold-deep">
                speak to the concierge
              </Link>
              .
            </p>
          </div>
        </div>
      </article>

      <section className="bg-ink py-20 grain md:py-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="eyebrow text-gold">Continue reading</p>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} href={`/journal/${p.slug}`} className="img-zoom group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="display mt-6 text-2xl text-ivory transition-colors group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-ivory/45">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
