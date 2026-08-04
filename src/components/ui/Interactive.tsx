"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* --------------------------------------------------------- Smooth scroll */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({
        duration: 1.25,
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });
      lenis = instance;
      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);
  return null;
}

/* --------------------------------------------------------- Luxury cursor */
export function LuxCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 34, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 380, damping: 34, mass: 0.35 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHot(Boolean(el?.closest("a, button, [data-cursor]")));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="rounded-full border border-white/70"
          animate={{ width: hot ? 46 : 16, height: hot ? 46 : 16, opacity: hot ? 1 : 0.75 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}

/* ------------------------------------------------------- Magnetic wrapper */
export function Magnetic({
  children,
  strength = 0.32,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------- Lux button */
type ButtonVariant = "gold" | "ghost" | "ink";

export function LuxLink({
  href,
  children,
  variant = "gold",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden px-9 py-4 nav-type transition-colors duration-700";
  const styles: Record<ButtonVariant, string> = {
    gold: "border border-gold/70 text-gold hover:text-ink",
    ghost: "border border-ivory/25 text-ivory hover:text-ink",
    ink: "border border-ink/30 text-ink hover:text-ivory",
  };
  const fill: Record<ButtonVariant, string> = {
    gold: "bg-gold-soft",
    ghost: "bg-ivory",
    ink: "bg-ink",
  };
  return (
    <Magnetic>
      <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
        <span
          className={`absolute inset-0 -z-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100 ${fill[variant]}`}
        />
        <span className="relative z-10">{children}</span>
        <span className="relative z-10 block h-px w-6 bg-current transition-all duration-700 group-hover:w-9" />
      </Link>
    </Magnetic>
  );
}

/* --------------------------------------------------------- Scroll progress */
export function ScrollLine() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[95] h-px w-full bg-transparent">
      <div
        className="h-px origin-left bg-gradient-to-r from-gold-deep via-gold-soft to-gold"
        style={{ transform: `scaleX(${p})`, transition: "transform .12s linear" }}
      />
    </div>
  );
}
