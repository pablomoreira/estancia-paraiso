// Shared primitives and helpers for the landing page.

const ARS = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
    .format(Math.round(n));

const USD = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    .format(Math.round(n));

// Small decorative wordmark / brand glyph
function BrandMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="#4A3826" strokeWidth="1" />
      <path d="M6 26 C 12 18, 18 22, 22 18 C 26 14, 32 18, 34 22" stroke="#4A3826" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M6 30 C 14 26, 24 28, 34 26" stroke="#6E7656" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="28" cy="13" r="1.4" fill="#4A3826" />
    </svg>
  );
}

// A faux "rule and tick" decorative element
function TickRule() {
  return (
    <div className="flex items-center gap-2 text-earth-600/70">
      <span className="h-px w-10 bg-earth-600/40" />
      <span className="text-[10px] tracking-[0.3em] uppercase">01 · El terreno</span>
    </div>
  );
}

// Stat block
function Stat({ value, label, sub }) {
  return (
    <div className="flex flex-col">
      <div className="font-display text-5xl md:text-6xl text-earth-700 leading-none">{value}</div>
      <div className="mt-2 text-xs tracking-[0.2em] uppercase text-earth-600">{label}</div>
      {sub && <div className="mt-1 text-sm text-earth-700/80">{sub}</div>}
    </div>
  );
}

// Pill / tag
function Tag({ children, tone = "earth" }) {
  const tones = {
    earth: "bg-cream-200/80 text-earth-700 border-earth-700/15",
    sage:  "bg-sage-300/30 text-sage-700 border-sage-700/20",
    dark:  "bg-earth-700 text-cream-50 border-earth-700",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] tracking-[0.2em] uppercase ${tones[tone]}`}>
      <span className="h-1 w-1 rounded-full bg-current opacity-60" />
      {children}
    </span>
  );
}

// Section header pattern
function SectionHeader({ kicker, title, lead }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 text-earth-600">
        <span className="h-px w-10 bg-earth-600/50" />
        <span className="text-[10px] tracking-[0.3em] uppercase">{kicker}</span>
      </div>
      <h2 className="font-display mt-4 text-4xl md:text-5xl leading-[1.05] text-earth-800">{title}</h2>
      {lead && <p className="mt-5 text-earth-700/80 text-lg leading-relaxed max-w-2xl">{lead}</p>}
    </div>
  );
}

// Primary CTA
function CTA({ children, dark = true, as = "button", href, onClick }) {
  const cls = dark
    ? "bg-earth-700 text-cream-50 hover:bg-earth-800"
    : "bg-cream-50 text-earth-700 border border-earth-700/30 hover:bg-cream-100";
  const inner = (
    <span className="inline-flex items-center gap-2">
      {children}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
  const base = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm tracking-wide transition-colors duration-300 ${cls}`;
  if (as === "a") return <a href={href} className={base}>{inner}</a>;
  return <button type="button" onClick={onClick} className={base}>{inner}</button>;
}

Object.assign(window, { ARS, USD, BrandMark, TickRule, Stat, Tag, SectionHeader, CTA });
