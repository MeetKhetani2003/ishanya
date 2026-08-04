import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Studio · Ishanaya Realty",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content/project", label: "Projects" },
  { href: "/admin/content/developer", label: "Developers" },
  { href: "/admin/content/location", label: "Locations" },
  { href: "/admin/content/post", label: "Journal" },
  { href: "/admin/content/testimonial", label: "Testimonials" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/settings", label: "SEO & Settings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-ivory">
      <div className="mx-auto flex max-w-[1700px] flex-col lg:flex-row">
        <aside className="border-b border-ivory/10 px-6 py-8 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-8">
          <Link href="/">
            <Logo className="h-10 w-auto" />
          </Link>
          <p className="eyebrow mt-6 text-gold/60">Studio</p>
          <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="nav-type py-2 text-ivory/55 transition-colors hover:text-gold"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 hidden lg:block">
            <div className="hairline" />
            <Link
              href="/"
              className="mt-6 inline-block nav-type text-ivory/40 hover:text-gold"
            >
              ← View site
            </Link>
          </div>
        </aside>

        <div className="flex-1 px-6 py-10 lg:px-12 lg:py-14">{children}</div>
      </div>
    </div>
  );
}
