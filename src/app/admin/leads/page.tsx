import { getLeads } from "@/lib/data";
import { updateLeadStatus } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const STATUSES = ["New", "Contacted", "Visit booked", "Negotiating", "Closed", "Archived"];

export default async function LeadsPage() {
  let rows: Awaited<ReturnType<typeof getLeads>> = [];
  let error = "";
  try {
    rows = await getLeads();
  } catch (e) {
    error = e instanceof Error ? e.message : "Database unavailable";
  }

  return (
    <div>
      <p className="eyebrow text-gold/70">Pipeline</p>
      <h1 className="display mt-4 text-[clamp(1.9rem,3.6vw,3rem)]">Leads</h1>
      <p className="mt-4 text-sm text-ivory/45">
        {rows.length} enquiries captured from the concierge, private visit and
        project experiences.
      </p>

      {error && (
        <p className="mt-8 border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-12 space-y-px bg-ivory/10">
        {rows.map((l) => (
          <article key={l.id} className="bg-[#0d0d0d] p-6">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="display text-xl text-ivory">{l.name}</p>
                <p className="mt-2 text-sm text-ivory/50">
                  <a href={`mailto:${l.email}`} className="hover:text-gold">
                    {l.email}
                  </a>{" "}
                  ·{" "}
                  <a href={`tel:${l.phone}`} className="hover:text-gold">
                    {l.phone}
                  </a>
                </p>
              </div>
              <div className="text-right">
                <p className="nav-type text-gold">{l.intent}</p>
                <p className="mt-2 text-xs text-ivory/30">
                  {new Date(l.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 text-sm text-ivory/50 md:grid-cols-4">
              <p>
                <span className="eyebrow block text-ivory/25">Interest</span>
                {l.interest || "—"}
              </p>
              <p>
                <span className="eyebrow block text-ivory/25">Budget</span>
                {l.budget || "—"}
              </p>
              <p>
                <span className="eyebrow block text-ivory/25">Preferred date</span>
                {l.preferredDate || "—"}
              </p>
              <p>
                <span className="eyebrow block text-ivory/25">Source</span>
                {l.source}
              </p>
            </div>

            {l.message && (
              <p className="mt-5 border-l border-gold/40 pl-4 text-sm leading-relaxed text-ivory/60">
                {l.message}
              </p>
            )}

            <form action={updateLeadStatus} className="mt-6 flex flex-wrap items-center gap-3">
              <input type="hidden" name="id" value={l.id} />
              <select
                name="status"
                defaultValue={l.status}
                className="border border-ivory/12 bg-[#101010] px-4 py-2 nav-type text-ivory/70 outline-none focus:border-gold"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button className="border border-gold/50 px-5 py-2 nav-type text-gold transition-colors hover:bg-gold hover:text-ink">
                Update
              </button>
            </form>
          </article>
        ))}
        {rows.length === 0 && !error && (
          <p className="bg-[#0d0d0d] p-10 text-sm text-ivory/35">
            No enquiries yet.
          </p>
        )}
      </div>
    </div>
  );
}
