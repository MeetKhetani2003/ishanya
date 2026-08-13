"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/lib/content";

const PRIMARY = [
  { href: "/projects", label: "Projects" },
  { href: "/developers", label: "Developers" },
  { href: "/investment", label: "Intelligence" },
  { href: "/locations", label: "Locations" },
  { href: "/journal", label: "Journal" },
];

const MENU = [
  { href: "/", label: "Home", n: "01" },
  { href: "/projects", label: "Projects", n: "02" },
  { href: "/developers", label: "Developers", n: "03" },
  { href: "/investment", label: "Investment Intelligence", n: "04" },
  { href: "/locations", label: "Locations", n: "05" },
  { href: "/gallery", label: "Gallery", n: "06" },
  { href: "/journal", label: "Journal", n: "07" },
  { href: "/testimonials", label: "Client Stories", n: "08" },
  { href: "/about", label: "About", n: "09" },
  { href: "/concierge", label: "Concierge", n: "10" },
  { href: "/book-visit", label: "Book a Private Visit", n: "11" },
  { href: "/contact", label: "Contact", n: "12" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-700 ${
          scrolled
            ? "bg-ink/85 py-3 backdrop-blur-xl"
            : "bg-gradient-to-b from-black/60 to-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
          <Link href="/" aria-label="Ishanaya Realty — home" className="shrink-0">
            <Logo className="h-12 w-auto md:h-16" />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-type link-underline transition-colors duration-500 ${
                  pathname?.startsWith(item.href)
                    ? "text-gold"
                    : "text-ivory/70 hover:text-ivory"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/book-visit"
              className="group relative hidden overflow-hidden border border-gold/60 px-6 py-3 nav-type text-gold md:inline-block"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold-soft transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                Private Visit
              </span>
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 flex-col items-end justify-center gap-[6px] lg:hidden"
            >
              <span className="block h-px w-8 bg-ivory transition-all duration-500" />
              <span className="block h-px w-5 bg-gold transition-all duration-500" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] bg-ink grain"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <div className="absolute inset-0 opacity-25">
              <Image
                src="/images/hero-skyline.png"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
            </div>

            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between px-6 py-6 md:px-12">
                <Logo className="h-12 w-auto md:h-16" />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="nav-type text-ivory/70 transition-colors hover:text-gold"
                >
                  Close ✕
                </button>
              </div>

              <div className="grid flex-1 grid-cols-1 gap-10 overflow-y-auto px-6 pb-16 md:px-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                <nav className="flex flex-col justify-center gap-1 pt-6">
                  {MENU.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.25 + i * 0.045, duration: 0.8, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-baseline gap-5 py-1.5"
                      >
                        <span className="eyebrow w-8 text-gold/50">{item.n}</span>
                        <span className="display text-[clamp(1.6rem,3.4vw,2.9rem)] text-ivory/85 transition-colors duration-500 group-hover:text-gold">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="space-y-8 border-l border-ivory/10 pl-0 lg:pl-12"
                >
                  <div>
                    <p className="eyebrow text-gold/70">Concierge</p>
                    <a
                      href={`tel:${BRAND.phoneHref}`}
                      className="display mt-3 block text-2xl text-ivory hover:text-gold"
                    >
                      {BRAND.phone}
                    </a>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="mt-2 block text-sm text-ivory/60 hover:text-gold"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                  <div className="hairline" />
                  <div>
                    <p className="eyebrow text-gold/70">Sales Gallery</p>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/60">
                      {BRAND.address}
                    </p>
                    <p className="mt-2 text-xs text-ivory/40">{BRAND.hours}</p>
                  </div>
                  <div className="hairline" />
                  <p className="text-xs text-ivory/35">{BRAND.rera}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
