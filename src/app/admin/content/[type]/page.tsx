import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEntries, type EntryType } from "@/lib/data";
import { togglePublished } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const TYPES: Record<EntryType, string> = {
  project: "Projects",
  developer: "Developers",
  location: "Locations",
  post: "Journal",
  testimonial: "Testimonials",
};

type Props = { params: Promise<{ type: string }> };

export default async function EntryListPage({ params }: Props) {
  const { type } = await params;
  if (!(type in TYPES)) notFound();
  const entries = await getAllEntries(type as EntryType);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-gold/70">Content</p>
          <h1 className="display mt-4 text-[clamp(1.9rem,3.6vw,3rem)]">
            {TYPES[type as EntryType]}
          </h1>
        </div>
        <Link
          href={`/admin/content/${type}/new`}
          className="border border-gold/60 px-6 py-3 nav-type text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          + New entry
        </Link>
      </div>

      <div className="mt-12 border-t border-ivory/10">
        {entries.map((e) => (
          <div
            key={e.id}
            className="grid items-center gap-4 border-b border-ivory/10 py-5 md:grid-cols-[2fr_1.4fr_auto_auto_auto]"
          >
            <div>
              <p className="display text-xl text-ivory">{e.title}</p>
              <p className="mt-1 text-xs text-ivory/30">/{e.slug}</p>
            </div>
            <p className="line-clamp-2 text-sm text-ivory/45">{e.summary}</p>
            <span
              className={`nav-type ${e.featured ? "text-gold" : "text-ivory/25"}`}
            >
              {e.featured ? "Featured" : "—"}
            </span>
            <form action={togglePublished}>
              <input type="hidden" name="type" value={type} />
              <input type="hidden" name="slug" value={e.slug} />
              <input type="hidden" name="next" value={String(!e.published)} />
              <button
                className={`nav-type ${e.published ? "text-green-400/80" : "text-ivory/30"}`}
              >
                {e.published ? "Published" : "Draft"}
              </button>
            </form>
            <Link
              href={`/admin/content/${type}/${e.slug}`}
              className="nav-type text-gold"
            >
              Edit →
            </Link>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="py-10 text-sm text-ivory/35">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}
