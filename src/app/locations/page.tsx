import type { Metadata } from "next";
import { PageHero } from "@/components/ui/Section";
import { RegionMap } from "@/components/home/MapAndVoices";
import { ClosingCTA } from "@/components/home/Sections";
import { Reveal } from "@/components/ui/motion";
import Image from "next/image";
import Link from "next/link";
import { getLocations, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Powai, Parel, Navi Mumbai, Panvel, Karjat, Khalapur — the micro-markets we know street by street.",
};

export default async function LocationsPage() {
  const [locations, projects] = await Promise.all([getLocations(), getProjects()]);

  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="An address is a decision"
        italic="about time."
        copy="We advise across seven markets in the Mumbai Metropolitan Region — each with a different clock, a different buyer and a different holding period."
        image="/images/navi-mumbai.png"
      />

      <RegionMap locations={locations} />

      <section className="bg-ivory py-24 text-charcoal md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="eyebrow text-gold-deep">Every market, examined</p>
          <div className="mt-14 border-t border-charcoal/15">
            {locations.map((l, i) => {
              const count = projects.filter((p) => p.region === l.region).length;
              return (
                <Reveal key={l.slug} delay={i * 0.04}>
                  <Link
                    href={`/locations/${l.slug}`}
                    className="group grid items-center gap-6 border-b border-charcoal/15 py-9 transition-colors duration-500 hover:bg-paper md:grid-cols-[1.1fr_1.6fr_auto_auto]"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative hidden h-20 w-28 overflow-hidden md:block">
                        <Image
                          src={l.image}
                          alt={l.name}
                          fill
                          sizes="120px"
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="display text-3xl text-charcoal transition-colors group-hover:text-gold-deep">
                        {l.name}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-graphite">
                      {l.headline}
                    </p>
                    <p className="display text-xl text-gold-deep">{l.appreciation}</p>
                    <p className="nav-type text-graphite/60">
                      {count} {count === 1 ? "residence" : "residences"}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
