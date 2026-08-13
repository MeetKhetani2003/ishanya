"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { BRAND } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/* --------------------------------------------------- luxury loading sequence */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

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
      n = Math.min(100, n + Math.ceil(Math.random() * 7));
      setCount(n);
      if (n >= 100) {
        clearInterval(int);
        setTimeout(() => {
          sessionStorage.setItem("ir-loaded", "1");
          setDone(true);
        }, 550);
      }
    }, 60);
    return () => clearInterval(int);
  }, [pathname]);

  useEffect(() => {
    if (done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Compact logo viewport is 0 0 60 64
    const scale = Math.min(width / 60, height / 64) * 0.72;
    const offsetX = (width - 60 * scale) / 2;
    const offsetY = (height - 64 * scale) / 2;

    const towers = [
      // Tower 1
      [
        { x: 11, y: 47 },
        { x: 11, y: 28 },
        { x: 15.2, y: 24.8 },
        { x: 15.2, y: 47 }
      ],
      // Tower 2
      [
        { x: 17.6, y: 47 },
        { x: 17.6, y: 23.4 },
        { x: 21.8, y: 20.2 },
        { x: 21.8, y: 47 }
      ],
      // Tower 3
      [
        { x: 24.2, y: 47 },
        { x: 24.2, y: 18.6 },
        { x: 28.4, y: 15.4 },
        { x: 28.4, y: 47 }
      ],
      // Tower 4
      [
        { x: 30.8, y: 47 },
        { x: 30.8, y: 13.2 },
        { x: 35, y: 10 },
        { x: 35, y: 47 }
      ],
      // Tower 5
      [
        { x: 37.4, y: 47 },
        { x: 37.4, y: 19.5 },
        { x: 48.6, y: 27.7 },
        { x: 48.6, y: 47 },
        { x: 44.5, y: 47 },
        { x: 44.5, y: 29.9 },
        { x: 41.5, y: 27.7 },
        { x: 41.5, y: 47 },
        { x: 37.4, y: 47 }
      ]
    ];

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
    }> = [];

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#8a6a2c");
      grad.addColorStop(0.22, "#c3a15c");
      grad.addColorStop(0.48, "#f4e2b4");
      grad.addColorStop(0.72, "#c3a15c");
      grad.addColorStop(1, "#9c7c3d");

      const progress = countRef.current / 100;

      // Draw bottom curves
      ctx.lineWidth = 1.2 * scale;
      ctx.strokeStyle = grad;
      ctx.globalAlpha = 0.85 * Math.min(progress * 1.5, 1);
      
      ctx.beginPath();
      const startX1 = 6 * scale + offsetX;
      const startY1 = 49.5 * scale + offsetY;
      const endX1 = 50 * scale + offsetX;
      const endY1 = 48.5 * scale + offsetY;
      ctx.moveTo(startX1, startY1);
      ctx.quadraticCurveTo(28 * scale + offsetX, 55 * scale + offsetY, endX1, endY1);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 0.8 * scale;
      ctx.globalAlpha = 0.55 * Math.min(progress * 1.5, 1);
      ctx.moveTo(6 * scale + offsetX, 55.5 * scale + offsetY);
      ctx.lineTo(50 * scale + offsetX, 55.5 * scale + offsetY);
      ctx.stroke();

      // Draw stepped towers
      ctx.fillStyle = grad;
      
      towers.forEach((t, tIdx) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(t[0].x * scale + offsetX, t[0].y * scale + offsetY);
        for (let i = 1; i < t.length; i++) {
          ctx.lineTo(t[i].x * scale + offsetX, t[i].y * scale + offsetY);
        }
        ctx.closePath();
        
        // Bounding box for clipping
        const minX = Math.min(...t.map(p => p.x)) * scale + offsetX;
        const maxX = Math.max(...t.map(p => p.x)) * scale + offsetX;
        const minY = Math.min(...t.map(p => p.y)) * scale + offsetY;
        const maxY = Math.max(...t.map(p => p.y)) * scale + offsetY;
        
        // Calculate progress for each tower individually to give sequential filling effect
        const startThreshold = tIdx * 0.15;
        const towerProgress = Math.max(0, Math.min(1, (progress - startThreshold) / 0.4));

        const fillHeight = (maxY - minY) * towerProgress;
        ctx.rect(minX - 5, maxY - fillHeight, (maxX - minX) + 10, fillHeight + 5);
        ctx.clip();
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.restore();
      });

      // Spawn particles from tops
      const tops = [
        { x: 13.1, y: 26.4 },
        { x: 19.7, y: 21.8 },
        { x: 26.3, y: 17.0 },
        { x: 32.9, y: 11.6 },
        { x: 43.0, y: 23.6 }
      ];

      tops.forEach((top, topIdx) => {
        const startThreshold = topIdx * 0.15;
        const towerProgress = Math.max(0, Math.min(1, (progress - startThreshold) / 0.4));
        if (towerProgress >= 0.95 && Math.random() < 0.08) {
          particles.push({
            x: top.x * scale + offsetX,
            y: top.y * scale + offsetY,
            vx: (Math.random() - 0.5) * 0.3 * scale,
            vy: -Math.random() * 0.6 * scale - 0.3 * scale,
            size: Math.random() * 1.5 * scale + 0.5 * scale,
            alpha: 1.0,
            life: 0,
            maxLife: 50 + Math.random() * 30
          });
        }
      });

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - (p.life / p.maxLife);

        ctx.fillStyle = "#f4e2b4";
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      particles = particles.filter(p => p.life < p.maxLife);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink grain"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex flex-col items-center justify-center relative">
            <div className="w-64 h-64 md:w-80 md:h-80">
              <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
              className="mt-6 text-center"
            >
              <h2 className="display text-2xl text-ivory tracking-[0.15em] mb-2 uppercase">
                Ishanaya Realty
              </h2>
              <p className="eyebrow text-gold/60 text-[0.66rem] animate-pulse">
                Loading your premium residences...
              </p>
              <p className="mt-4 nav-type text-gold/40 text-xs font-mono">{count}%</p>
            </motion.div>
          </div>
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
