import type { Metadata } from "next";
import { PageHero } from "@/components/ui/Section";
import { CollectionExplorer } from "@/components/collection/CollectionExplorer";
import { ClosingCTA } from "@/components/home/Sections";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "A curated collection of residences across Powai, Parel, Panvel, Ulwe, Karjat and Khalapur — including Isle of Calm by GHP Group.",
};

export default async function CollectionPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHero
        eyebrow="The Collection"
        title="Eleven checks. Twelve"
        italic="addresses."
        copy="We do not list property. We carry a small, examined collection — each residence held to a legal, structural and commercial protocol before it appears here."
        image="/images/isle-of-calm.png"
      />
      <CollectionExplorer projects={projects} />
      <ClosingCTA />
    </>
  );
}
