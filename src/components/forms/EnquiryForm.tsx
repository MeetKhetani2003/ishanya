"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  source: string;
  interest?: string;
  intent?: "Consultation" | "Private Visit" | "Enquiry" | "Callback";
  tone?: "dark" | "light";
  compact?: boolean;
  heading?: string;
};

const BUDGETS = [
  "Under ₹2 Cr",
  "₹2 – 5 Cr",
  "₹5 – 10 Cr",
  "₹10 Cr +",
  "Advisory only",
];

export function EnquiryForm({
  source,
  interest = "",
  intent = "Consultation",
  tone = "dark",
  compact = false,
  heading,
}: Props) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  const dark = tone === "dark";
  const field = `w-full border-b bg-transparent py-3 text-sm outline-none transition-colors duration-500 ${
    dark
      ? "border-ivory/15 text-ivory placeholder:text-ivory/25 focus:border-gold"
      : "border-charcoal/20 text-charcoal placeholder:text-charcoal/35 focus:border-gold-deep"
  }`;
  const label = `eyebrow ${dark ? "text-ivory/35" : "text-graphite/60"}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source, intent }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong");
      }
      router.push(
        `/thank-you?intent=${encodeURIComponent(intent)}&name=${encodeURIComponent(
          String(payload.name ?? ""),
        )}`,
      );
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      {heading && (
        <h3
          className={`display mb-10 text-[clamp(1.6rem,2.6vw,2.4rem)] ${
            dark ? "text-ivory" : "text-charcoal"
          }`}
        >
          {heading}
        </h3>
      )}
      <div className={`grid gap-8 ${compact ? "" : "md:grid-cols-2"}`}>
        <div>
          <label className={label} htmlFor={`${source}-name`}>
            Full name
          </label>
          <input id={`${source}-name`} name="name" required className={field} placeholder="Your name" />
        </div>
        <div>
          <label className={label} htmlFor={`${source}-phone`}>
            Phone
          </label>
          <input
            id={`${source}-phone`}
            name="phone"
            required
            className={field}
            placeholder="+91"
            inputMode="tel"
          />
        </div>
        <div>
          <label className={label} htmlFor={`${source}-email`}>
            Email
          </label>
          <input
            id={`${source}-email`}
            name="email"
            type="email"
            required
            className={field}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className={label} htmlFor={`${source}-interest`}>
            Residence of interest
          </label>
          <input
            id={`${source}-interest`}
            name="interest"
            defaultValue={interest}
            className={field}
            placeholder="Isle of Calm, Powai"
          />
        </div>
        <div>
          <label className={label} htmlFor={`${source}-budget`}>
            Budget
          </label>
          <select
            id={`${source}-budget`}
            name="budget"
            className={`${field} ${dark ? "[&>option]:bg-ink" : "[&>option]:bg-white"}`}
            defaultValue=""
          >
            <option value="">Select</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor={`${source}-date`}>
            Preferred date
          </label>
          <input id={`${source}-date`} name="preferredDate" type="date" className={field} />
        </div>
        <div className={compact ? "" : "md:col-span-2"}>
          <label className={label} htmlFor={`${source}-message`}>
            Anything we should know
          </label>
          <textarea
            id={`${source}-message`}
            name="message"
            rows={3}
            className={field}
            placeholder="Family size, timelines, view preference, holding period…"
          />
        </div>
      </div>

      {state === "error" && (
        <p className="mt-6 text-sm text-red-400">{error}</p>
      )}

      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        type="submit"
        disabled={state === "sending"}
        className={`group relative mt-12 inline-flex items-center gap-4 overflow-hidden border px-10 py-4 nav-type transition-colors duration-700 disabled:opacity-50 ${
          dark
            ? "border-gold/70 text-gold hover:text-ink"
            : "border-charcoal/40 text-charcoal hover:text-ivory"
        }`}
      >
        <span
          className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100 ${
            dark ? "bg-gold-soft" : "bg-charcoal"
          }`}
        />
        <span className="relative z-10">
          {state === "sending" ? "Sending…" : "Submit Request"}
        </span>
        <span className="relative z-10 block h-px w-7 bg-current transition-all duration-700 group-hover:w-11" />
      </motion.button>

      <p
        className={`mt-6 text-xs ${dark ? "text-ivory/30" : "text-graphite/60"}`}
      >
        Your details remain private and are never shared with third parties.
      </p>
    </form>
  );
}
