import { connectToDatabase } from "@/db";
import { CmsEntryModel, LeadModel, SettingModel } from "@/db/models";
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
  await connectToDatabase();
  
  if (!seedPromise) {
    seedPromise = (async () => {
      const specs = seedSpecs();
      for (const spec of specs) {
        for (let i = 0; i < spec.rows.length; i++) {
          const row = spec.rows[i];
          await CmsEntryModel.updateOne(
            { type: spec.type, slug: row.slug },
            {
              $setOnInsert: {
                type: spec.type,
                slug: row.slug,
                title: row.title,
                summary: row.summary,
                image: row.image,
                featured: row.featured,
                published: true,
                position: i,
                data: row.data,
              }
            },
            { upsert: true }
          );
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
    const rows = await CmsEntryModel.find({ type, published: true })
      .sort({ position: 1, _id: 1 })
      .lean();
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
  const docs = await CmsEntryModel.find({ type })
    .sort({ position: 1, _id: 1 })
    .lean();
  
  return docs.map(d => ({ ...d, id: (d._id as any).toString() }));
}

export async function getEntry(type: EntryType, slug: string) {
  await connectToDatabase();
  const row = await CmsEntryModel.findOne({ type, slug }).lean();
  if (row) {
    return { ...row, id: (row._id as any).toString() };
  }
  return null;
}

export async function getLeads() {
  await connectToDatabase();
  const docs = await LeadModel.find()
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();
  return docs.map(d => ({ ...d, id: (d._id as any).toString() }));
}

export async function getDashboardCounts() {
  await connectToDatabase();
  const entryCounts = await CmsEntryModel.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } }
  ]);
  const leadCount = await LeadModel.countDocuments();
  const newLeads = await LeadModel.countDocuments({ status: "New" });

  const byType = Object.fromEntries(entryCounts.map((r) => [r._id, r.count]));
  return {
    byType,
    leads: leadCount,
    newLeads: newLeads,
  };
}

export async function getSettings() {
  try {
    await connectToDatabase();
    const rows = await SettingModel.find().lean();
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch {
    return {} as Record<string, string>;
  }
}

export async function saveSetting(key: string, value: string) {
  await connectToDatabase();
  await SettingModel.findOneAndUpdate(
    { key },
    { value },
    { upsert: true }
  );
}
