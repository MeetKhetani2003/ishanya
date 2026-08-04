"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/* --------------------------------------------------- luxury loading sequence */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      setDone(true);
      return;
    }
    if (sessionStorage.getItem("ir-loaded")) {
      setDone(true);
      return;
    }
    let n = 0;
    const int = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 9));
      setCount(n);
      if (n >= 100) {
        clearInterval(int);
        setTimeout(() => {
          sessionStorage.setItem("ir-loaded", "1");
          setDone(true);
        }, 480);
      }
    }, 70);
    return () => clearInterval(int);
  }, [pathname]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink grain"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="text-center"
          >
            <p className="eyebrow text-gold/70">Ishanaya Realty</p>
            <p className="display mt-6 text-[clamp(2rem,6vw,4.5rem)] gold-text">
              {BRAND.tagline}
            </p>
          </motion.div>

          <div className="mt-14 h-px w-56 overflow-hidden bg-ivory/10">
            <div
              className="h-px bg-gradient-to-r from-gold-deep via-gold-soft to-gold transition-[width] duration-200"
              style={{ width: `${count}%` }}
            />
          </div>
          <p className="mt-5 nav-type text-ivory/40">{count}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------------------------------- page transition */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------ admin gating */
export function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}

/* -------------------------------------------------------- floating actions */
export function FloatingActions() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed bottom-6 right-6 z-[92] flex flex-col items-end gap-3"
        >
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
              "Hello Ishanaya Realty, I would like to discuss a residence.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>
          <a
            href={`tel:${BRAND.phoneHref}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-lg transition-transform hover:scale-110"
            aria-label="Call"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
