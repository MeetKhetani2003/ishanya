import { BRAND } from "@/lib/content";
import { getSettings } from "@/lib/data";
import { saveSettings } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function SettingsPage({ searchParams }: Props) {
  const { saved } = await searchParams;
  const s = await getSettings();
  const field =
    "mt-2 w-full border border-ivory/12 bg-[#101010] px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-gold";

  const FIELDS: { key: string; label: string; fallback: string; area?: boolean }[] = [
    { key: "seoTitle", label: "Default SEO title", fallback: "Ishanaya Realty — Curators of Address" },
    {
      key: "seoDescription",
      label: "Default SEO description",
      fallback:
        "A private luxury real estate advisory for Mumbai, Navi Mumbai, Panvel, Karjat and Khalapur.",
      area: true,
    },
    { key: "heroHeadline", label: "Home hero headline", fallback: "Some addresses are never advertised." },
    { key: "conciergePhone", label: "Concierge phone", fallback: BRAND.phone },
    { key: "conciergeEmail", label: "Concierge email", fallback: BRAND.email },
    { key: "officeAddress", label: "Sales gallery address", fallback: BRAND.address, area: true },
    { key: "announcement", label: "Announcement bar (optional)", fallback: "" },
  ];

  return (
    <div className="max-w-3xl">
      <p className="eyebrow text-gold/70">Configuration</p>
      <h1 className="display mt-4 text-[clamp(1.9rem,3.6vw,3rem)]">SEO &amp; Settings</h1>
      <p className="mt-4 text-sm text-ivory/45">
        Global metadata and concierge details used across the experience.
      </p>

      {saved && (
        <p className="mt-8 border border-gold/40 bg-gold/10 p-4 text-sm text-gold">
          Settings saved.
        </p>
      )}

      <form action={saveSettings} className="mt-10 space-y-7">
        {FIELDS.map((f) => (
          <label key={f.key} className="block">
            <span className="eyebrow text-ivory/40">{f.label}</span>
            {f.area ? (
              <textarea
                name={f.key}
                rows={3}
                defaultValue={s[f.key] ?? f.fallback}
                className={field}
              />
            ) : (
              <input
                name={f.key}
                defaultValue={s[f.key] ?? f.fallback}
                className={field}
              />
            )}
          </label>
        ))}
        <button className="border border-gold/60 px-8 py-3 nav-type text-gold transition-colors hover:bg-gold hover:text-ink">
          Save settings
        </button>
      </form>
    </div>
  );
}
