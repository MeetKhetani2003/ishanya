import type { Metadata } from "next";
import { PageHero, GoldRule } from "@/components/ui/Section";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ishanaya Realty collects, uses and protects your information.",
};

const SECTIONS = [
  {
    h: "What we collect",
    p: "Name, phone number, email address, budget range, preferred visit dates and any brief you choose to share through our forms, WhatsApp or email. We do not collect financial account information through this website.",
  },
  {
    h: "Why we collect it",
    p: "Solely to respond to your enquiry, prepare a shortlist, arrange site visits and maintain the advisory relationship. We do not sell, rent or broker your data to developers or third-party lead aggregators.",
  },
  {
    h: "Who can see it",
    p: "Your advisor and the senior partners of the firm. Where a site visit requires developer registration, we share only the minimum details required by that developer's MahaRERA-compliant visitor process, and only with your consent.",
  },
  {
    h: "How long we keep it",
    p: "For the duration of the advisory relationship and for five years thereafter, in line with statutory record-keeping expectations for registered real estate agents. You may request deletion at any time.",
  },
  {
    h: "Cookies and analytics",
    p: "We use minimal first-party storage to remember interface preferences such as the loading sequence. We do not run advertising pixels or cross-site retargeting.",
  },
  {
    h: "Your rights",
    p: `You may request access, correction or deletion of your data by writing to ${BRAND.email}. We respond within seven working days.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        italic="Policy"
        copy="Discretion is part of the service. This is precisely what we do with your information."
        image="/images/journal-editorial.png"
      />
      <section className="bg-ivory py-24 text-charcoal md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-0">
          {SECTIONS.map((s, i) => (
            <div key={s.h} className="border-t border-charcoal/15 py-10">
              <div className="flex items-baseline gap-5">
                <span className="eyebrow text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display text-2xl text-charcoal md:text-3xl">{s.h}</h2>
              </div>
              <p className="mt-6 text-[1rem] leading-[1.95] text-graphite">{s.p}</p>
            </div>
          ))}
          <GoldRule className="mt-10 text-charcoal" />
          <p className="mt-10 text-sm text-graphite/70">
            Last updated: January 2026. {BRAND.rera}
          </p>
        </div>
      </section>
    </>
  );
}
