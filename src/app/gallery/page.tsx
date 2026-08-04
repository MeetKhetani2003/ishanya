import type { Metadata } from "next";
import { PageHero } from "@/components/ui/Section";
import { ProjectGallery } from "@/components/project/ProjectInteractive";
import { ClosingCTA } from "@/components/home/Sections";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Renders, interiors, arrival sequences and landscapes from the Ishanaya Realty collection.",
};

export default async function GalleryPage() {
  const projects = await getProjects();
  const gallery = projects.flatMap((p) =>
    p.gallery.map((g) => ({ src: g.src, caption: `${p.name} · ${g.caption}` })),
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Look slowly."
        italic="Everything here is deliberate."
        copy="Renders, show residences, arrival sequences and landscapes across the collection."
        image="/images/lifestyle-deck.png"
      />
      <section className="bg-ink py-20 grain md:py-28">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <ProjectGallery gallery={gallery} />
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
