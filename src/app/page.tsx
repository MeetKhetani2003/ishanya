import { Hero, Ticker } from "@/components/home/Hero";
import {
  ClosingCTA,
  CollectionEditorial,
  Ethos,
  Intelligence,
  JournalStrip,
  Lifestyle,
} from "@/components/home/Sections";
import { DeveloperRail } from "@/components/home/DeveloperRail";
import { RegionMap, Voices } from "@/components/home/MapAndVoices";
import {
  getDevelopers,
  getLocations,
  getPosts,
  getProjects,
  getTestimonials,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, developers, locations, posts, testimonials] = await Promise.all([
    getProjects(),
    getDevelopers(),
    getLocations(),
    getPosts(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <Ticker />
      <Ethos />
      <CollectionEditorial projects={projects} />
      <Intelligence />
      <DeveloperRail developers={developers} />
      <Lifestyle />
      <RegionMap locations={locations} />
      <Voices testimonials={testimonials} />
      <JournalStrip posts={posts} />
      <ClosingCTA />
    </>
  );
}
