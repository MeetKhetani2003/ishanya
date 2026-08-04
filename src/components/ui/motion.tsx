"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ Reveal */
export function Reveal({
  children,
  delay = 0,
  y = 34,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------- Mask image reveal */
export function MaskReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: 1.18 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.6, ease: EASE, delay }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      <motion.span
        aria-hidden
        className="absolute inset-0 z-10 bg-ink"
        initial={{ scaleY: 1 }}
        animate={inView ? { scaleY: 0 } : {}}
        style={{ originY: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      />
    </div>
  );
}

/* ------------------------------------------------------------ Split words */
export function SplitHeading({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  const words = text.split(" ");
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.08em" }}
        >
          <motion.span
            className="inline-block"
            variants={
              reduce
                ? {}
                : {
                    hidden: { y: "108%", opacity: 0 },
                    show: { y: "0%", opacity: 1 },
                  }
            }
            transition={{ duration: 1.05, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* --------------------------------------------------------------- Parallax */
export function Parallax({
  children,
  distance = 90,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------- Counter (stats) */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        {inView ? <Ticker value={value} decimals={decimals} /> : (0).toFixed(decimals)}
      </motion.span>
      {suffix}
    </span>
  );
}

function Ticker({ value, decimals }: { value: number; decimals: number }) {
  const mv = useSpring(0, { duration: 1800, bounce: 0 });
  mv.set(value);
  const text = useTransform(mv, (v) => v.toFixed(decimals));
  return <motion.span>{text}</motion.span>;
}
