import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/lib/content";

const COLUMNS = [
  {
    title: "Experience",
    links: [
      { href: "/collection", label: "The Collection" },
      { href: "/developers", label: "Developers" },
      { href: "/locations", label: "Locations" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Intelligence",
    links: [
      { href: "/investment", label: "Investment Intelligence" },
      { href: "/journal", label: "Journal" },
      { href: "/testimonials", label: "Client Stories" },
      { href: "/about", label: "About Ishanaya" },
    ],
  },
  {
    title: "Engage",
    links: [
      { href: "/concierge", label: "Concierge" },
      { href: "/book-visit", label: "Book a Private Visit" },
      { href: "/contact", label: "Contact" },
      { href: "/admin", label: "Studio (CMS)" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24 text-ivory grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo className="h-14 w-auto" />
            <p className="mt-8 max-w-sm text-sm leading-loose text-ivory/55">
              {BRAND.promise} We represent the buyer — never the transaction.
            </p>
            <div className="mt-10 space-y-2">
              <a
                href={`tel:${BRAND.phoneHref}`}
                className="display block text-2xl text-ivory transition-colors hover:text-gold"
              >
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="block text-sm text-ivory/55 transition-colors hover:text-gold"
              >
                {BRAND.email}
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-gold/70">{col.title}</p>
                <ul className="mt-6 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-ivory/60 transition-colors duration-500 hover:text-gold"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline mt-20" />

        <div className="flex flex-col gap-6 py-8 text-xs text-ivory/35 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. {BRAND.rera}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms
            </Link>
            <span>{BRAND.address}</span>
          </div>
        </div>

        <p className="max-w-5xl pb-10 text-[10px] leading-relaxed text-ivory/25">
          Disclaimer: Project names referenced are registered under MahaRERA where
          applicable. Isle of Calm — MahaRERA P51800077922 / P51800077401; Tower 3
          will receive its RERA registration at a later stage. The 3 BHK is a jodi
          apartment, subject to availability and approvals. This website does not
          constitute an offer and/or agreement; all purchases and leases shall be
          governed solely by the terms of the agreement for sale/lease. All images
          are for representative purposes unless otherwise noted. T&amp;C apply.
        </p>
      </div>
    </footer>
  );
}
