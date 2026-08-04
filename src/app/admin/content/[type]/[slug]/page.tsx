import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntry, type EntryType } from "@/lib/data";
import { deleteEntry, saveEntry } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const TYPES: Record<EntryType, string> = {
  project: "Project",
  developer: "Developer",
  location: "Location",
  post: "Journal entry",
  testimonial: "Testimonial",
};

const TEMPLATES: Record<EntryType, Record<string, unknown>> = {
  project: {
    status: "New Launch",
    priceFrom: "₹0.00 Cr onwards*",
    possession: "2028",
    configurations: ["2 BHK", "3 BHK"],
    developer: "",
    developerSlug: "",
    locality: "",
    city: "Mumbai",
    region: "Mumbai",
    heroImage: "/images/hero-skyline.png",
    gallery: [{ src: "/images/hero-skyline.png", caption: "View" }],
    story: ["Opening paragraph."],
    architecture: [{ title: "", copy: "" }],
    highlights: [{ label: "Address", value: "" }],
    amenities: [{ group: "Wellness", items: ["Pool"] }],
    plans: [{ type: "3 BHK", carpet: "1,000 sq.ft.", price: "On request" }],
    connectivity: [{ label: "Airport", value: "20 min" }],
    investment: { headline: "", points: [{ label: "", value: "" }] },
    masterplanNote: "",
    timeline: [{ label: "Launch", value: "2026" }],
    faqs: [{ q: "", a: "" }],
    rera: ["Registration in process"],
    accent: "#c3a15c",
  },
  developer: {
    founded: "2000",
    headline: "",
    story: [""],
    verticals: ["Residential"],
    stats: [{ label: "", value: "" }],
    awards: [""],
    timeline: [{ label: "", value: "" }],
  },
  location: {
    region: "Mumbai",
    story: [""],
    growth: [{ label: "", value: "" }],
    infrastructure: [""],
    lifestyle: [""],
    coords: { x: 40, y: 50 },
    appreciation: "0%",
  },
  post: {
    category: "Investment",
    readTime: "5 min",
    date: new Date().toISOString().slice(0, 10),
    body: [""],
  },
  testimonial: { role: "", project: "", rating: 5 },
};

type Props = {
  params: Promise<{ type: string; slug: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EntryEditPage({ params, searchParams }: Props) {
  const { type, slug } = await params;
  const { error } = await searchParams;
  if (!(type in TYPES)) notFound();
  const isNew = slug === "new";
  const entry = isNew ? null : await getEntry(type as EntryType, slug);
  if (!isNew && !entry) notFound();

  const data = entry?.data ?? TEMPLATES[type as EntryType];
  const field =
    "mt-2 w-full border border-ivory/12 bg-[#101010] px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-gold";

  return (
    <div className="max-w-4xl">
      <Link href={`/admin/content/${type}`} className="nav-type text-ivory/40">
        ← {TYPES[type as EntryType]}s
      </Link>
      <h1 className="display mt-6 text-[clamp(1.8rem,3.4vw,2.8rem)]">
        {isNew ? `New ${TYPES[type as EntryType]}` : entry?.title}
      </h1>

      {error === "json" && (
        <p className="mt-6 border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          The detail payload was not valid JSON. Changes were not saved.
        </p>
      )}

      <form action={saveEntry} className="mt-10 space-y-8">
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="originalSlug" value={isNew ? "" : slug} />

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="eyebrow text-ivory/40">Title / Name</span>
            <input
              name="title"
              required
              defaultValue={entry?.title ?? ""}
              className={field}
            />
          </label>
          <label className="block">
            <span className="eyebrow text-ivory/40">Slug</span>
            <input
              name="slug"
              required
              defaultValue={entry?.slug ?? ""}
              className={field}
            />
          </label>
        </div>

        <label className="block">
          <span className="eyebrow text-ivory/40">Summary / Subtitle / Quote</span>
          <textarea
            name="summary"
            rows={2}
            defaultValue={entry?.summary ?? ""}
            className={field}
          />
        </label>

        <div className="grid gap-6 md:grid-cols-3">
          <label className="block md:col-span-2">
            <span className="eyebrow text-ivory/40">Primary image path</span>
            <input
              name="image"
              defaultValue={entry?.image ?? ""}
              placeholder="/images/hero-skyline.png"
              className={field}
            />
          </label>
          <label className="block">
            <span className="eyebrow text-ivory/40">Order</span>
            <input
              name="position"
              type="number"
              defaultValue={entry?.position ?? 0}
              className={field}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-8">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={entry?.featured ?? false}
              className="h-4 w-4 accent-[#c3a15c]"
            />
            <span className="nav-type text-ivory/60">Featured</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="published"
              defaultChecked={entry?.published ?? true}
              className="h-4 w-4 accent-[#c3a15c]"
            />
            <span className="nav-type text-ivory/60">Published</span>
          </label>
        </div>

        <label className="block">
          <span className="eyebrow text-ivory/40">
            Detail payload (JSON) — amenities, plans, story, stats…
          </span>
          <textarea
            name="data"
            rows={26}
            defaultValue={JSON.stringify(data, null, 2)}
            spellCheck={false}
            className={`${field} font-mono text-xs leading-relaxed`}
          />
        </label>

        <div className="flex flex-wrap items-center gap-5 pt-4">
          <button className="border border-gold/60 px-8 py-3 nav-type text-gold transition-colors hover:bg-gold hover:text-ink">
            Save entry
          </button>
          <Link
            href={`/admin/content/${type}`}
            className="nav-type text-ivory/40 hover:text-ivory"
          >
            Cancel
          </Link>
        </div>
      </form>

      {!isNew && (
        <form action={deleteEntry} className="mt-12 border-t border-ivory/10 pt-8">
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="slug" value={slug} />
          <button className="nav-type text-red-400/70 transition-colors hover:text-red-300">
            Delete this entry
          </button>
        </form>
      )}
    </div>
  );
}
