"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { cmsEntries, leads } from "@/db/schema";
import { saveSetting } from "@/lib/data";

function str(fd: FormData, key: string, fallback = "") {
  const v = fd.get(key);
  return typeof v === "string" ? v : fallback;
}

export async function saveEntry(formData: FormData) {
  const type = str(formData, "type");
  const originalSlug = str(formData, "originalSlug");
  const slug =
    str(formData, "slug")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `entry-${Date.now()}`;
  const title = str(formData, "title");
  const summary = str(formData, "summary");
  const image = str(formData, "image");
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const position = Number(str(formData, "position", "0")) || 0;

  let data: Record<string, unknown> = {};
  try {
    data = JSON.parse(str(formData, "data", "{}")) as Record<string, unknown>;
  } catch {
    redirect(`/admin/content/${type}/${originalSlug || slug}?error=json`);
  }

  // keep the primary display fields in sync inside the JSON payload
  if (type === "project") {
    data = { ...data, slug, name: title, subtitle: summary, cardImage: image, featured };
  } else if (type === "developer") {
    data = { ...data, slug, name: title, descriptor: summary, image };
  } else if (type === "location") {
    data = { ...data, slug, name: title, headline: summary, image };
  } else if (type === "post") {
    data = { ...data, slug, title, excerpt: summary, image };
  } else if (type === "testimonial") {
    data = { ...data, name: title, quote: summary };
  }

  const values = {
    type,
    slug,
    title,
    summary,
    image,
    featured,
    published,
    position,
    data,
    updatedAt: new Date(),
  };

  if (originalSlug) {
    await db
      .update(cmsEntries)
      .set(values)
      .where(and(eq(cmsEntries.type, type), eq(cmsEntries.slug, originalSlug)));
  } else {
    await db.insert(cmsEntries).values(values).onConflictDoUpdate({
      target: [cmsEntries.type, cmsEntries.slug],
      set: values,
    });
  }

  revalidatePath("/", "layout");
  redirect(`/admin/content/${type}?saved=1`);
}

export async function deleteEntry(formData: FormData) {
  const type = str(formData, "type");
  const slug = str(formData, "slug");
  await db
    .delete(cmsEntries)
    .where(and(eq(cmsEntries.type, type), eq(cmsEntries.slug, slug)));
  revalidatePath("/", "layout");
  redirect(`/admin/content/${type}?deleted=1`);
}

export async function togglePublished(formData: FormData) {
  const type = str(formData, "type");
  const slug = str(formData, "slug");
  const next = formData.get("next") === "true";
  await db
    .update(cmsEntries)
    .set({ published: next, updatedAt: new Date() })
    .where(and(eq(cmsEntries.type, type), eq(cmsEntries.slug, slug)));
  revalidatePath("/", "layout");
  revalidatePath(`/admin/content/${type}`);
}

export async function updateLeadStatus(formData: FormData) {
  const id = Number(str(formData, "id"));
  const status = str(formData, "status", "New");
  if (Number.isFinite(id)) {
    await db.update(leads).set({ status }).where(eq(leads.id, id));
  }
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function saveSettings(formData: FormData) {
  const keys = [
    "seoTitle",
    "seoDescription",
    "heroHeadline",
    "conciergePhone",
    "conciergeEmail",
    "officeAddress",
    "announcement",
  ];
  for (const k of keys) {
    await saveSetting(k, str(formData, k));
  }
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}
