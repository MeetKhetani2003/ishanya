import type { MetadataRoute } from "next";
import { DEVELOPERS, LOCATIONS, POSTS, PROJECTS } from "@/lib/content";

const BASE = "https://ishanayarealty.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/collection",
    "/developers",
    "/investment",
    "/locations",
    "/gallery",
    "/journal",
    "/testimonials",
    "/about",
    "/concierge",
    "/book-visit",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dynamicRoutes = [
    ...PROJECTS.map((p) => `/projects/${p.slug}`),
    ...DEVELOPERS.map((d) => `/developers/${d.slug}`),
    ...LOCATIONS.map((l) => `/locations/${l.slug}`),
    ...POSTS.map((p) => `/journal/${p.slug}`),
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
