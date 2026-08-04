import { asc, eq, and, desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { cmsEntries, leads, settings } from "@/db/schema";
import {
  DEVELOPERS,
  LOCATIONS,
  POSTS,
  PROJECTS,
  TESTIMONIALS,
  type Developer,
  type LocationEntry,
  type Post,
  type Project,
  type Testimonial,
} from "./content";

export type EntryType =
  | "project"
  | "developer"
  | "location"
  | "post"
  | "testimonial";

type SeedSpec = {
  type: EntryType;
  rows: {
    slug: string;
    title: string;
    summary: string;
    image: string;
    featured: boolean;
    data: Record<string, unknown>;
  }[];
};

function seedSpecs(): SeedSpec[] {
  return [
    {
      type: "project",
      rows: PROJECTS.map((p) => ({
        slug: p.slug,
        title: p.name,
        summary: p.subtitle,
        image: p.cardImage,
        featured: p.featured,
        data: p as unknown as Record<string, unknown>,
      })),
    },
    {
      type: "developer",
      rows: DEVELOPERS.map((d) => ({
        slug: d.slug,
        title: d.name,
        summary: d.descriptor,
        image: d.image,
        featured: true,
        data: d as unknown as Record<string, unknown>,
      })),
    },
    {
      type: "location",
      rows: LOCATIONS.map((l) => ({
        slug: l.slug,
        title: l.name,
        summary: l.headline,
        image: l.image,
        featured: true,
        data: l as unknown as Record<string, unknown>,
      })),
    },
    {
      type: "post",
      rows: POSTS.map((p) => ({
        slug: p.slug,
        title: p.title,
        summary: p.excerpt,
        image: p.image,
        featured: false,
        data: p as unknown as Record<string, unknown>,
      })),
    },
    {
      type: "testimonial",
      rows: TESTIMONIALS.map((t, i) => ({
        slug: `testimonial-${i + 1}`,
        title: t.name,
        summary: t.quote,
        image: "",
        featured: true,
        data: t as unknown as Record<string, unknown>,
      })),
    },
  ];
}

let seedPromise: Promise<void> | null = null;

async function ensureSeed() {
  if (!seedPromise) {
    seedPromise = (async () => {
      const specs = seedSpecs();
      for (const spec of specs) {
        for (let i = 0; i < spec.rows.length; i++) {
          const row = spec.rows[i];
          await db
            .insert(cmsEntries)
            .values({
              type: spec.type,
              slug: row.slug,
              title: row.title,
              summary: row.summary,
              image: row.image,
              featured: row.featured,
              published: true,
              position: i,
              data: row.data,
            })
            .onConflictDoNothing();
        }
      }
    })().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}

async function readEntries<T>(type: EntryType, fallback: T[]): Promise<T[]> {
  try {
    await ensureSeed();
    const rows = await db
      .select()
      .from(cmsEntries)
      .where(and(eq(cmsEntries.type, type), eq(cmsEntries.published, true)))
      .orderBy(asc(cmsEntries.position), asc(cmsEntries.id));
    if (!rows.length) return fallback;
    return rows.map((r) => r.data as T);
  } catch {
    return fallback;
  }
}

export const getProjects = () => readEntries<Project>("project", PROJECTS);
export const getDevelopers = () => readEntries<Developer>("developer", DEVELOPERS);
export const getLocations = () => readEntries<LocationEntry>("location", LOCATIONS);
export const getPosts = () => readEntries<Post>("post", POSTS);
export const getTestimonials = () =>
  readEntries<Testimonial>("testimonial", TESTIMONIALS);

export async function getProjectBySlug(slug: string) {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}
export async function getDeveloperBySlug(slug: string) {
  const all = await getDevelopers();
  return all.find((d) => d.slug === slug) ?? null;
}
export async function getLocationBySlug(slug: string) {
  const all = await getLocations();
  return all.find((l) => l.slug === slug) ?? null;
}
export async function getPostBySlug(slug: string) {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

/* ------------------------------------------------------------ admin reads */

export async function getAllEntries(type: EntryType) {
  await ensureSeed();
  return db
    .select()
    .from(cmsEntries)
    .where(eq(cmsEntries.type, type))
    .orderBy(asc(cmsEntries.position), asc(cmsEntries.id));
}

export async function getEntry(type: EntryType, slug: string) {
  const rows = await db
    .select()
    .from(cmsEntries)
    .where(and(eq(cmsEntries.type, type), eq(cmsEntries.slug, slug)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getLeads() {
  return db.select().from(leads).orderBy(desc(leads.createdAt)).limit(200);
}

export async function getDashboardCounts() {
  const [entryCounts, leadCount, newLeads] = await Promise.all([
    db
      .select({ type: cmsEntries.type, count: sql<number>`count(*)::int` })
      .from(cmsEntries)
      .groupBy(cmsEntries.type),
    db.select({ count: sql<number>`count(*)::int` }).from(leads),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(leads)
      .where(eq(leads.status, "New")),
  ]);
  const byType = Object.fromEntries(entryCounts.map((r) => [r.type, r.count]));
  return {
    byType,
    leads: leadCount[0]?.count ?? 0,
    newLeads: newLeads[0]?.count ?? 0,
  };
}

export async function getSettings() {
  try {
    const rows = await db.select().from(settings);
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch {
    return {} as Record<string, string>;
  }
}

export async function saveSetting(key: string, value: string) {
  await db
    .insert(settings)
    .values({ key, value })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value, updatedAt: new Date() },
    });
}
