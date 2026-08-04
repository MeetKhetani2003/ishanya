import Link from "next/link";
import { getDashboardCounts, getLeads } from "@/lib/data";

export const dynamic = "force-dynamic";

const LABELS: Record<string, string> = {
  project: "Projects",
  developer: "Developers",
  location: "Locations",
  post: "Journal entries",
  testimonial: "Testimonials",
};

export default async function AdminDashboard() {
  let counts = { byType: {} as Record<string, number>, leads: 0, newLeads: 0 };
  let recent: Awaited<ReturnType<typeof getLeads>> = [];
  let error = "";
  try {
    counts = await getDashboardCounts();
    recent = (await getLeads()).slice(0, 8);
  } catch (e) {
    error = e instanceof Error ? e.message : "Database unavailable";
  }

  return (
    <div>
      <p className="eyebrow text-gold/70">Overview</p>
      <h1 className="display mt-5 text-[clamp(2rem,4vw,3.2rem)]">Studio Dashboard</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/45">
        Every section of the public experience is editable here — the collection,
        developers, locations, journal, testimonials, leads and SEO defaults.
      </p>

      {error && (
        <p className="mt-8 border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-12 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(LABELS).map(([type, label]) => (
          <Link
            key={type}
            href={`/admin/content/${type}`}
            className="group bg-[#0d0d0d] p-7 transition-colors hover:bg-[#141414]"
          >
            <p className="display text-4xl gold-text">
              {counts.byType[type] ?? 0}
            </p>
            <p className="mt-4 eyebrow text-ivory/40">{label}</p>
            <span className="mt-6 block h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
          </Link>
        ))}
        <Link
          href="/admin/leads"
          className="group bg-[#0d0d0d] p-7 transition-colors hover:bg-[#141414]"
        >
          <p className="display text-4xl gold-text">{counts.leads}</p>
          <p className="mt-4 eyebrow text-ivory/40">
            Leads · {counts.newLeads} new
          </p>
          <span className="mt-6 block h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
        </Link>
      </div>

      <div className="mt-16">
        <div className="flex items-end justify-between">
          <h2 className="display text-2xl">Recent enquiries</h2>
          <Link href="/admin/leads" className="nav-type text-gold">
            All leads →
          </Link>
        </div>
        <div className="mt-8 border-t border-ivory/10">
          {recent.length === 0 && (
            <p className="py-10 text-sm text-ivory/35">
              No enquiries yet. Submissions from the concierge, private visit and
              project pages appear here instantly.
            </p>
          )}
          {recent.map((l) => (
            <div
              key={l.id}
              className="grid gap-3 border-b border-ivory/10 py-5 md:grid-cols-[1.1fr_1.2fr_1fr_0.8fr_auto]"
            >
              <p className="text-sm text-ivory">{l.name}</p>
              <p className="text-sm text-ivory/45">{l.email}</p>
              <p className="text-sm text-ivory/45">{l.interest || "—"}</p>
              <p className="nav-type text-gold">{l.intent}</p>
              <p className="nav-type text-ivory/30">
                {new Date(l.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
