import React, { useEffect } from "react";
import { Check, CheckCircle, RefreshCw, AlertCircle, Clock, ChevronDown } from "lucide-react";
import { T, STATUS_STYLES, PLANS, inputStyle } from "../tokens.js";

export function Pill({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.Draft;
  const icons = { Live: CheckCircle, Sending: RefreshCw, Blocked: AlertCircle, Draft: Clock };
  const Icon = icons[status] || Clock;
  return (
    <span style={{
      background: s.bg, color: s.fg, fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10.5, letterSpacing: "0.04em", padding: "3px 8px", borderRadius: 4,
      textTransform: "uppercase", fontWeight: 500, whiteSpace: "nowrap",
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      <Icon size={10} />{status}
    </span>
  );
}

export function FieldRow({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        fontSize: 11.5, color: T.paperDim, marginBottom: 7,
        fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em",
      }}>
        {label}
        {hint && <span style={{ fontSize: 11, fontFamily: "Inter, sans-serif", textTransform: "none", opacity: 0.7 }}>{hint}</span>}
      </label>
      {children}
    </div>
  );
}

export function Card({ children, style = {} }) {
  return (
    <div style={{ background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 10, ...style }}>
      {children}
    </div>
  );
}

export function Toast({ message, type = "success", onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  const colors = { success: T.moss, error: T.rose, info: T.sky };
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 9999,
      background: T.ink2, border: `1px solid ${T.line2}`, borderRadius: 8,
      padding: "12px 18px", display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)", fontSize: 13.5, color: colors[type],
    }}>
      <CheckCircle size={16} />{message}
    </div>
  );
}

export function PricingCards({ selectable, selectedKey, onSelect }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
      {PLANS.map((p) => {
        const isSelected = selectedKey === p.key;
        return (
          <div
            key={p.key}
            onClick={selectable ? () => onSelect(p.key) : undefined}
            style={{
              background: isSelected ? "rgba(224,165,38,0.06)" : T.ink2,
              borderRadius: 10, padding: "24px 22px", position: "relative", overflow: "hidden",
              border: isSelected ? `2px solid ${T.gold}` : p.featured ? `2px solid rgba(224,165,38,0.4)` : `1px solid ${T.line}`,
              cursor: selectable ? "pointer" : "default", transition: "all 0.15s",
            }}
          >
            {p.featured && (
              <div style={{
                position: "absolute", top: 0, right: 0, background: T.gold, color: T.ink,
                fontSize: 10, padding: "3px 10px", borderBottomLeftRadius: 6,
                fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", fontWeight: 700,
              }}>Most popular</div>
            )}
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17, marginBottom: 6 }}>{p.name}</div>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Fraunces', serif", marginBottom: 2 }}>{p.price}</div>
            <div style={{ fontSize: 11, color: T.paperDim, marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>{p.sub}</div>
            <div style={{ fontSize: 12.5, color: T.paperDim, marginBottom: 16, lineHeight: 1.5 }}>{p.line}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {p.features.map((f) => (
                <div key={f} style={{ display: "flex", gap: 9, fontSize: 12.5, color: T.paper, alignItems: "flex-start" }}>
                  <Check size={13} color={T.moss} style={{ flexShrink: 0, marginTop: 1 }} />{f}
                </div>
              ))}
            </div>
            {p.footnote && <div style={{ fontSize: 11, color: T.paperDim, fontStyle: "italic", marginTop: 12 }}>{p.footnote}</div>}
            {selectable && (
              <button
                onClick={(e) => { e.stopPropagation(); onSelect(p.key); }}
                style={{
                  width: "100%", marginTop: 18, padding: "11px 0", borderRadius: 6, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                  background: isSelected ? T.gold : "transparent",
                  color: isSelected ? T.ink : T.paperDim,
                  border: isSelected ? "none" : `1px solid ${T.line2}`,
                }}
              >
                {isSelected ? <><Check size={13} /> Selected</> : "Choose this plan"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = React.useState(null);
  const items = [
    { q: "How long does distribution take?", a: "Most platforms confirm within 24–72 hours. TikTok and Instagram are typically fastest (same day). Apple Music and Spotify review within 48 hours." },
    { q: "Can I distribute lyrics without audio?", a: "Yes — 12Flock is one of the only distributors that supports lyrics-only submissions for platforms that accept them. TikTok, Instagram, and WhatsApp all support it." },
    { q: "What file formats are supported?", a: "Audio: MP3, WAV, FLAC, AIFF (min 16-bit / 44.1kHz). Lyrics: plain text, .lrc, or .txt. Cover art: 3000×3000px minimum, JPG or PNG." },
    { q: "How do royalty payouts work?", a: "We collect royalties monthly from each platform, consolidate them, and pay via M-Pesa, PayPal, or bank transfer. Minimum payout is $5." },
    { q: "What happens if I cancel my plan?", a: "Your releases stay live indefinitely. You just lose the ability to send new releases until you resubscribe." },
    { q: "Can I use 12Flock for a label?", a: "Yes — Flock Unlimited supports up to 5 team members. Contact us for larger label arrangements." },
  ];
  return (
    <section style={{ padding: "80px 48px", maxWidth: 760, margin: "0 auto" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: T.paperDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>FAQ</div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Common questions</h2>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${T.line}` }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: T.paper, textAlign: "left", gap: 16 }}>
            <span style={{ fontSize: 14.5, fontWeight: 500 }}>{item.q}</span>
            <ChevronDown size={16} color={T.paperDim} style={{ flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {open === i && <div style={{ fontSize: 13.5, color: T.paperDim, lineHeight: 1.7, paddingBottom: 18 }}>{item.a}</div>}
        </div>
      ))}
    </section>
  );
}
