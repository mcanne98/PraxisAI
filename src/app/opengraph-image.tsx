import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social sharing image, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0b1220",
        backgroundImage: "radial-gradient(circle at 85% 15%, rgba(82,113,255,0.35), transparent 45%)",
        color: "#f8fafc",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="64" height="64" viewBox="0 0 32 32">
          <circle cx="10" cy="10" r="6" fill="none" stroke="#f8fafc" strokeWidth="2.25" />
          <path d="M14.4 14.4 L19 19" stroke="#5eead4" strokeWidth="2.25" strokeLinecap="round" />
          <rect x="18" y="18" width="11" height="11" rx="1.5" fill="#5271ff" />
        </svg>
        <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>
          Praxis <span style={{ color: "#94a3b8", fontWeight: 500, marginLeft: 12 }}>Intelligence</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{site.tagline}</div>
        <div style={{ fontSize: 30, color: "#94a3b8", marginTop: 24 }}>AI advisory · consulting · education</div>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#5eead4", letterSpacing: 6 }}>LEARN · APPLY · TRANSFORM</div>
    </div>,
    size,
  );
}
