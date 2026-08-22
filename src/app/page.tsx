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
import { getProjects, getPosts, getLocations, getHeroSlides } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, posts, locations, slides] = await Promise.all([
    getProjects(),
    getPosts(),
    getLocations(),
    getHeroSlides(),
  ]);

  return (
    <>
      <HeroSlider slides={slides} projects={projects} />
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
