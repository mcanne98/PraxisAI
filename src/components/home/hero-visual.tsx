/**
 * "Knowledge → Capability → Impact"
 * Scattered points of knowledge are drawn into a structured capability grid,
 * which resolves into a rising line of measurable outcomes. Pure SVG + CSS:
 * no JavaScript, deterministic coordinates, and static under reduced motion.
 */

const knowledge: [number, number, number][] = [
  [38, 92, 3],
  [72, 60, 2.5],
  [56, 140, 3.5],
  [104, 112, 2.5],
  [30, 196, 2.5],
  [88, 178, 3],
  [126, 70, 2],
  [60, 248, 3],
  [118, 226, 2.5],
  [40, 300, 2],
  [96, 290, 3.5],
  [138, 158, 2],
  [70, 338, 2.5],
  [130, 316, 2],
  [150, 260, 3],
];

const grid: { x: number; y: number; on: boolean }[] = [];
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    grid.push({ x: 236 + c * 40, y: 152 + r * 40, on: (r + c) % 2 === 0 || (r === 1 && c === 2) });
  }
}

const sources = [0, 3, 5, 8, 10, 14];

export function HeroVisual() {
  return (
    <figure
      className="relative mx-auto w-full max-w-[560px]"
      aria-label="Illustration: scattered knowledge converges into structured capability and rises as measurable impact."
    >
      <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="impact" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-blue)" />
            <stop offset="100%" stopColor="var(--color-teal)" />
          </linearGradient>
        </defs>

        {/* Convergence lines: knowledge → capability */}
        <g fill="none" stroke="var(--color-blue-soft)" strokeOpacity="0.45" strokeWidth="1">
          {sources.map((i, n) => {
            const [x, y] = knowledge[i];
            const target = grid[[0, 3, 4, 6, 7, 1][n]];
            return (
              <path
                key={i}
                d={`M${x} ${y} C ${(x + target.x) / 2 + 20} ${y}, ${target.x - 40} ${target.y + 14}, ${target.x} ${target.y + 14}`}
                className="hv-draw"
                style={{ animationDelay: `${0.3 + n * 0.12}s` }}
                pathLength={1}
              />
            );
          })}
        </g>

        {/* Knowledge points */}
        <g>
          {knowledge.map(([x, y, r], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={sources.includes(i) ? "var(--color-teal)" : "var(--color-mist)"}
              fillOpacity={sources.includes(i) ? 0.95 : 0.45}
              className="hv-pulse"
              style={{ animationDelay: `${(i % 5) * 0.6}s` }}
            />
          ))}
        </g>

        {/* Capability grid */}
        <g>
          {grid.map((cell, i) => (
            <rect
              key={i}
              x={cell.x}
              y={cell.y}
              width="28"
              height="28"
              rx="5"
              fill={cell.on ? "var(--color-blue)" : "none"}
              fillOpacity={cell.on ? 0.9 : 0}
              stroke="var(--color-blue-soft)"
              strokeOpacity={cell.on ? 0 : 0.5}
              className="hv-rise"
              style={{ animationDelay: `${0.9 + i * 0.06}s` }}
            />
          ))}
        </g>

        {/* Impact: rising outcome line */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M392 300 L428 268 L456 276 L488 206 L520 120"
            stroke="url(#impact)"
            strokeWidth="3"
            className="hv-draw"
            style={{ animationDelay: "1.7s" }}
            pathLength={1}
          />
          <line x1="392" y1="330" x2="532" y2="330" stroke="var(--color-mist)" strokeOpacity="0.3" />
        </g>
        <rect
          x="511"
          y="104"
          width="18"
          height="18"
          rx="3"
          fill="var(--color-teal)"
          className="hv-rise"
          style={{ animationDelay: "2.4s" }}
        />

        {/* Labels */}
        <g fill="var(--color-mist)" fontSize="11" letterSpacing="2" fontFamily="var(--font-display)" fontWeight="600">
          <text x="30" y="392">
            KNOWLEDGE
          </text>
          <text x="232" y="392">
            CAPABILITY
          </text>
          <text x="436" y="392" fill="var(--color-teal)">
            IMPACT
          </text>
        </g>
      </svg>
      <style>{`
        .hv-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hv-draw 1.4s var(--ease-praxis) forwards; }
        .hv-rise { opacity: 0; transform-box: fill-box; transform-origin: center; animation: hv-rise .7s var(--ease-praxis) forwards; }
        .hv-pulse { animation: hv-pulse 4.8s ease-in-out infinite; }
        @keyframes hv-draw { to { stroke-dashoffset: 0; } }
        @keyframes hv-rise { from { opacity: 0; transform: translateY(6px) scale(.9); } to { opacity: 1; transform: none; } }
        @keyframes hv-pulse { 0%,100% { opacity: 1; } 50% { opacity: .55; } }
        @media (prefers-reduced-motion: reduce) {
          .hv-draw { stroke-dashoffset: 0; animation: none; }
          .hv-rise { opacity: 1; animation: none; }
          .hv-pulse { animation: none; }
        }
      `}</style>
    </figure>
  );
}
