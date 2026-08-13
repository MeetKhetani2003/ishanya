import { Ticker } from "@/components/home/Hero";
import {
  HeroSlider,
  QuickSearch,
  FeaturedShowcase,
  FiveBenefits,
  SimpleProcess,
  PodcastCard,
  JourneyForm,
  LatestBlogs,
  FAQAccordion,
} from "@/components/home/HomeSections";
import { RegionMap } from "@/components/home/MapAndVoices";
import { getProjects, getPosts, getLocations } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, posts, locations] = await Promise.all([
    getProjects(),
    getPosts(),
    getLocations(),
  ]);

  return (
    <>
      <HeroSlider projects={projects} />
      <Ticker />
      <QuickSearch />
      <FeaturedShowcase />
      <FiveBenefits />
      <SimpleProcess />
      <PodcastCard />
      <RegionMap locations={locations} />
      <LatestBlogs posts={posts} />
      <JourneyForm />
      <FAQAccordion />
    </>
  );
}
