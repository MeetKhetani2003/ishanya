type LogoProps = {
  className?: string;
  compact?: boolean;
};

/** Ishanaya Realty mark — architectural towers within a champagne-gold wordmark. */
export function Logo({ className = "", compact = false }: LogoProps) {
  const id = compact ? "ir-gold-compact" : "ir-gold-full";
  return (
    <svg
      viewBox={compact ? "0 0 60 64" : "0 0 260 64"}
      className={className}
      role="img"
      aria-label="Ishanaya Realty"
      fill="none"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a6a2c" />
          <stop offset="22%" stopColor="#c3a15c" />
          <stop offset="48%" stopColor="#f4e2b4" />
          <stop offset="72%" stopColor="#c3a15c" />
          <stop offset="100%" stopColor="#9c7c3d" />
        </linearGradient>
      </defs>

      {/* tower mark — stepped skyline rising to a crown */}
      <g fill={`url(#${id})`}>
        <path d="M11 47V28l4.2-3.2V47H11Z" />
        <path d="M17.6 47V23.4l4.2-3.2V47h-4.2Z" />
        <path d="M24.2 47V18.6l4.2-3.2V47h-4.2Z" />
        <path d="M30.8 47V13.2L35 10v37h-4.2Z" />
        <path d="M37.4 47V19.5l11.2 8.2V47h-4.1V29.9l-3-2.2V47h-4.1Z" />
      </g>
      <path
        d="M6 49.5c10.5 5.5 33 5.5 44-1"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="1.1"
        opacity="0.85"
      />
      <path
        d="M6 55.5h44"
        stroke={`url(#${id})`}
        strokeWidth="0.7"
        opacity="0.55"
      />

      {!compact && (
        <>
          <text
            x="64"
            y="34"
            fill={`url(#${id})`}
            fontFamily="var(--font-playfair), serif"
            fontSize="24"
            letterSpacing="6"
          >
            ISHANAYA
          </text>
          <text
            x="66"
            y="49"
            fill={`url(#${id})`}
            fontFamily="var(--font-dm-sans), sans-serif"
            fontSize="9"
            letterSpacing="7.5"
          >
            REALTY
          </text>
        </>
      )}
    </svg>
  );
}
