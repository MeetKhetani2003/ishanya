"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { APPRECIATION_SERIES } from "@/lib/content";

const W = 640;
const H = 340;
const PAD = { l: 42, r: 20, t: 26, b: 34 };

const SERIES = [
  { key: "powai", label: "Powai", color: "#e0c68d" },
  { key: "panvel", label: "Panvel · NAINA", color: "#c3a15c" },
  { key: "karjat", label: "Karjat", color: "#7d8f6a" },
] as const;

export function AppreciationChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [active, setActive] = useState<string | null>(null);

  const max = 220;
  const min = 90;
  const x = (i: number) =>
    PAD.l + (i * (W - PAD.l - PAD.r)) / (APPRECIATION_SERIES.length - 1);
  const y = (v: number) =>
    PAD.t + ((max - v) / (max - min)) * (H - PAD.t - PAD.b);

  return (
    <div ref={ref} className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Capital appreciation index chart">
        <defs>
          <linearGradient id="chart-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c3a15c" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#c3a15c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[100, 140, 180, 220].map((v) => (
          <g key={v}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(v)}
              y2={y(v)}
              stroke="currentColor"
              strokeOpacity="0.09"
            />
            <text
              x={PAD.l - 12}
              y={y(v) + 4}
              textAnchor="end"
              fontSize="10"
              fill="currentColor"
              fillOpacity="0.35"
            >
              {v}
            </text>
          </g>
        ))}

        {APPRECIATION_SERIES.map((d, i) => (
          <text
            key={d.year}
            x={x(i)}
            y={H - 10}
            textAnchor="middle"
            fontSize="10"
            fill="currentColor"
            fillOpacity="0.35"
          >
            {d.year}
          </text>
        ))}

        {SERIES.map((s, si) => {
          const pts = APPRECIATION_SERIES.map(
            (d, i) => `${x(i)},${y(d[s.key])}`,
          ).join(" ");
          const areaPts = `${PAD.l},${y(min)} ${pts} ${x(
            APPRECIATION_SERIES.length - 1,
          )},${y(min)}`;
          const dim = active && active !== s.key;
          return (
            <g
              key={s.key}
              onMouseEnter={() => setActive(s.key)}
              onMouseLeave={() => setActive(null)}
              style={{ opacity: dim ? 0.22 : 1, transition: "opacity .5s" }}
            >
              {s.key === "panvel" && (
                <motion.polygon
                  points={areaPts}
                  fill="url(#chart-fade)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.4, delay: 0.8 }}
                />
              )}
              <motion.polyline
                points={pts}
                fill="none"
                stroke={s.color}
                strokeWidth="1.6"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: si * 0.22, ease: [0.16, 1, 0.3, 1] }}
              />
              {APPRECIATION_SERIES.map((d, i) => (
                <motion.circle
                  key={i}
                  cx={x(i)}
                  cy={y(d[s.key])}
                  r="2.6"
                  fill={s.color}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1 + i * 0.06 }}
                />
              ))}
            </g>
          );
        })}
      </svg>

      <div className="mt-6 flex flex-wrap gap-7">
        {SERIES.map((s) => (
          <button
            key={s.key}
            onMouseEnter={() => setActive(s.key)}
            onMouseLeave={() => setActive(null)}
            className="flex items-center gap-3 nav-type text-ivory/55 transition-colors hover:text-ivory"
          >
            <span
              className="block h-px w-6"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
