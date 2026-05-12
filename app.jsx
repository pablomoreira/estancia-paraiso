// ─── Estancia Paraíso — Lomas del Arroyo · Landing Page ───────────────────
// Self-contained React artifact with all helpers, design tokens, and sections

import { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ──────────────────────────────────────────────────────────────
const PRICE_ARS = 21_000_000;
const PRICE_USD = 15_000;
const DEFAULT_ENTREGA = 6_000_000;
const MIN_ENTREGA = 5_000_000;
const MAX_ENTREGA = 12_000_000;
const CURRENT_MONTH = new Date().getMonth(); // 0-based; 4=mayo, 5=junio

// ─── HELPERS ────────────────────────────────────────────────────────────────
const fmt = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});
const ARS = (n) => fmt.format(n);

// ─── DESIGN TOKENS (injected as <style>) ────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --c-earth-900: #2B1F10;
    --c-earth-800: #3D2B14;
    --c-earth-700: #5C3D1E;
    --c-earth-600: #7A5230;
    --c-earth-500: #9A6E4A;
    --c-earth-400: #B8906E;
    --c-cream-50:  #FDFAF4;
    --c-cream-100: #F5EDD8;
    --c-cream-200: #EBD9B8;
    --c-sage-700:  #4A5540;
    --c-sage-600:  #5E6E52;
    --c-sage-400:  #8E9E82;
    --c-terra:     #C4522A;
    --c-terra-lt:  #E87A52;
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
    --font-lora: 'Lora', Georgia, serif;
    --radius: 6px;
    --radius-lg: 10px;
    --max-w: 1280px;
    --pad-x: clamp(1.5rem, 5vw, 4rem);
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: var(--font-body);
    background: var(--c-cream-50);
    color: var(--c-earth-800);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }

  /* Marquee */
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-33.333%); }
  }

  /* Fade-rise */
  @keyframes rise {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .rise { animation: rise 0.7s ease both; }
  .rise-2 { animation: rise 0.7s 0.15s ease both; }
  .rise-3 { animation: rise 0.7s 0.3s ease both; }

  /* Pulse dot */
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .pulse { animation: pulse-dot 2s ease-in-out infinite; }

  /* Section divider */
  .hairline { border: none; border-top: 1px solid rgba(92,61,30,0.12); }

  /* Link underline effect */
  .link {
    position: relative;
    text-decoration: none;
    color: inherit;
  }
  .link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: currentColor;
    transition: width 0.25s ease;
  }
  .link:hover::after { width: 100%; }

  /* Slider */
  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, var(--c-earth-700) var(--pct, 50%), rgba(92,61,30,0.2) var(--pct, 50%));
    border-radius: 2px;
    outline: none;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px; height: 20px;
    background: var(--c-earth-700);
    border-radius: 50%;
    border: 2px solid var(--c-cream-50);
    box-shadow: 0 1px 6px rgba(0,0,0,0.25);
    cursor: pointer;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--c-earth-400); border-radius: 3px; }
`;

// ─── SMALL SHARED COMPONENTS ────────────────────────────────────────────────

function BrandMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 20 C8 20 10 10 16 10 C22 10 24 20 24 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M12 20 C12 20 13 15 16 15 C19 15 20 20 20 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function CTA({ children, href, dark = true, small = false, ...rest }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    padding: small ? "9px 20px" : "12px 28px",
    fontSize: small ? 12 : 14,
    fontWeight: 500,
    letterSpacing: "0.04em",
    textDecoration: "none",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    cursor: "pointer",
    border: "none",
  };
  const darkStyle = { background: "var(--c-earth-700)", color: "var(--c-cream-50)" };
  const lightStyle = {
    background: "transparent",
    color: "var(--c-earth-700)",
    boxShadow: "inset 0 0 0 1.5px var(--c-earth-700)",
  };
  return (
    <a href={href} style={{ ...base, ...(dark ? darkStyle : lightStyle) }} {...rest}>
      {children}
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function Kicker({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
      color: "var(--c-earth-500)", fontWeight: 500,
    }}>
      <span style={{ height: 1, width: 32, background: "var(--c-earth-400)" }} />
      {children}
    </div>
  );
}

function SectionHeader({ kicker, title, lead }) {
  return (
    <div style={{ maxWidth: 720 }}>
      <Kicker>{kicker}</Kicker>
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2rem, 4vw, 3.2rem)",
        fontWeight: 400,
        lineHeight: 1.1,
        color: "var(--c-earth-800)",
        marginTop: 20,
        letterSpacing: "-0.02em",
      }}>{title}</h2>
      {lead && (
        <p style={{
          marginTop: 16,
          fontSize: 17,
          color: "var(--c-earth-600)",
          lineHeight: 1.7,
          maxWidth: 580,
        }}>{lead}</p>
      )}
    </div>
  );
}

function Stat({ value, label, sub }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
        fontWeight: 400,
        color: "var(--c-earth-800)",
        lineHeight: 1,
      }}>{value}</div>
      <div style={{
        marginTop: 8,
        fontSize: 13,
        fontWeight: 500,
        color: "var(--c-earth-700)",
      }}>{label}</div>
      <div style={{
        marginTop: 4,
        fontSize: 12,
        color: "var(--c-earth-500)",
        letterSpacing: "0.05em",
      }}>{sub}</div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: 999,
      background: "rgba(235,224,200,0.2)",
      color: "var(--c-cream-200)",
      fontSize: 11,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      fontWeight: 500,
    }}>{children}</span>
  );
}

// ─── PROMO BAR ───────────────────────────────────────────────────────────────
function PromoBar() {
  const items = [
    "La Era del Peso · Edición 2026",
    "20% OFF en mayo · pago contado en pesos",
    "10% OFF en junio · pago contado en pesos",
    "Solo 15 lotes con esta financiación",
    "Financiación única en pesos · hasta 48 meses",
    "Aceptamos criptomonedas · USDT · BTC",
  ];
  return (
    <div style={{
      background: "var(--c-earth-800)",
      color: "var(--c-cream-100)",
      overflow: "hidden",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      position: "relative",
      zIndex: 50,
    }}>
      <div style={{
        display: "flex",
        whiteSpace: "nowrap",
        animation: "marquee 44s linear infinite",
        width: "max-content",
        paddingTop: 10,
        paddingBottom: 10,
      }}>
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} style={{
            padding: "0 24px",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "var(--c-terra)",
              display: "inline-block",
            }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 40,
      background: scrolled ? "rgba(253,250,244,0.88)" : "rgba(253,250,244,0.7)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(92,61,30,0.08)",
      transition: "background 0.3s",
    }}>
      <div style={{
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "0 var(--pad-x)",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}>
        <a href="#" style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "var(--c-earth-800)",
          textDecoration: "none",
        }}>
          <BrandMark size={30} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.2 }}>
              Estancia Paraíso
            </div>
            <div style={{
              fontSize: 9,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--c-earth-500)",
              marginTop: 1,
            }}>Urbanización sustentable</div>
          </div>
        </a>

        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          fontSize: 14,
          color: "var(--c-earth-600)",
        }}>
          {[
            { label: "El lugar", href: "#lugar" },
            { label: "Promo Mayo", href: "#promo", accent: true },
            { label: "Calculadora", href: "#calculadora" },
            { label: "Planes", href: "#planes" },
          ].map(({ label, href, accent }) => (
            <a
              key={href}
              href={href}
              className="link"
              style={{
                color: accent ? "var(--c-terra)" : "var(--c-earth-600)",
                fontWeight: accent ? 500 : 400,
              }}
            >{label}</a>
          ))}
        </nav>

        <CTA href="#contacto" small>Reservar visita</CTA>
      </div>
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: "relative" }}>
      <div style={{
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "clamp(3rem, 6vw, 6rem) var(--pad-x) 3rem",
        display: "grid",
        gridTemplateColumns: "1fr min(40%, 480px)",
        gap: "clamp(2rem, 5vw, 5rem)",
        alignItems: "end",
      }}>
        <div className="rise">
          <Kicker>Estancia Grande · Concordia · Entre Ríos</Kicker>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 7vw, 7rem)",
            fontWeight: 400,
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
            color: "var(--c-earth-800)",
            marginTop: 24,
          }}>
            Muchas formas<br />
            de vivir.<br />
            <em style={{
              fontStyle: "italic",
              color: "var(--c-sage-600)",
            }}>Una sola respuesta.</em>
          </h1>
          <p className="rise-2" style={{
            marginTop: 28,
            maxWidth: 520,
            fontSize: 17,
            color: "var(--c-earth-600)",
            lineHeight: 1.75,
          }}>
            La calidez de un hogar, el aroma a madera, la brisa fresca, el olor a tierra y el
            rocío de la mañana. El equilibrio entre el vivir cotidiano y la tranquilidad de la naturaleza.
          </p>
          <div className="rise-3" style={{
            marginTop: 36,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
          }}>
            <CTA href="#calculadora">Calcular mi cuota</CTA>
            <CTA href="#lugar" dark={false}>Conocer el lugar</CTA>
          </div>
        </div>

        <div style={{ position: "relative" }} className="rise-2">
          <img
            src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/laguna-estancia-paraiso-01-1.jpg"
            alt="Laguna de Estancia Paraíso"
            style={{
              width: "100%",
              aspectRatio: "4/5",
              objectFit: "cover",
              borderRadius: "var(--radius-lg)",
              display: "block",
            }}
          />
          <div style={{
            position: "absolute",
            bottom: -24,
            left: -24,
            background: "var(--c-cream-50)",
            border: "1px solid rgba(92,61,30,0.12)",
            borderRadius: "var(--radius-lg)",
            padding: "20px 24px",
            boxShadow: "0 8px 32px -16px rgba(61,43,20,0.35)",
            maxWidth: 230,
          }}>
            <div style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--c-earth-500)" }}>
              Desde
            </div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.2rem",
              color: "var(--c-earth-800)",
              lineHeight: 1.1,
              marginTop: 4,
            }}>USD 15.000</div>
            <div style={{ fontSize: 13, color: "var(--c-earth-600)", marginTop: 4 }}>
              o {ARS(PRICE_ARS)} en pesos
            </div>
            <hr className="hairline" style={{ margin: "12px 0 8px" }} />
            <div style={{ fontSize: 11, color: "var(--c-earth-500)" }}>
              Financiación propia hasta 48 meses
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        borderTop: "1px solid rgba(92,61,30,0.1)",
        borderBottom: "1px solid rgba(92,61,30,0.1)",
        background: "rgba(235,217,184,0.18)",
        marginTop: 40,
      }}>
        <div style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "clamp(2rem, 3vw, 2.5rem) var(--pad-x)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
        }}>
          <Stat value="24h" label="Seguridad" sub="Ingreso controlado" />
          <Stat value="48" label="Cuotas máx." sub="Financiación propia" />
          <Stat value="100%" label="Servicios" sub="Luz · agua · caminos" />
          <Stat value="0%" label="Comisión" sub="Compra directa al dueño" />
        </div>
      </div>
    </section>
  );
}

// ─── PROMOCIÓN ──────────────────────────────────────────────────────────────
function Promocion() {
  const isMay = CURRENT_MONTH === 4;
  const activeMonth = CURRENT_MONTH === 5 ? "junio" : "mayo";
  const precioLista = PRICE_ARS;
  const precioMayo = Math.round(PRICE_ARS * 0.80);
  const precioJunio = Math.round(PRICE_ARS * 0.90);

  const card = (month, pct, precio, fecha) => {
    const isActive = activeMonth === month;
    return (
      <div style={{
        borderRadius: "var(--radius-lg)",
        padding: "28px 30px",
        border: "1px solid " + (isActive ? "var(--c-earth-700)" : "rgba(92,61,30,0.14)"),
        background: isActive ? "var(--c-earth-700)" : "var(--c-cream-50)",
        color: isActive ? "var(--c-cream-50)" : "var(--c-earth-800)",
        boxShadow: isActive ? "0 24px 48px -24px rgba(61,43,20,0.45)" : "none",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{
            fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase",
            color: isActive ? "rgba(245,237,223,0.6)" : "var(--c-earth-500)",
          }}>
            {month.charAt(0).toUpperCase() + month.slice(1)} 2026
          </span>
          <span style={{
            fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "4px 12px", borderRadius: 999,
            background: isActive ? "rgba(245,237,223,0.15)" : (month === "mayo" ? "rgba(196,82,42,0.12)" : "rgba(92,61,30,0.08)"),
            color: isActive ? "var(--c-cream-200)" : (month === "mayo" ? "var(--c-terra)" : "var(--c-earth-600)"),
          }}>
            {isActive ? "Mes en curso" : (month === "mayo" ? "Cerrado" : "Próximo")}
          </span>
        </div>
        <div style={{ marginTop: 20, display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "3.8rem", fontWeight: 400, lineHeight: 1 }}>
            {pct}%
          </span>
          <span style={{
            fontSize: 14,
            color: isActive ? "rgba(245,237,223,0.7)" : "var(--c-earth-500)",
          }}>de descuento</span>
        </div>
        <div style={{
          marginTop: 14, fontSize: 14,
          color: isActive ? "rgba(245,237,223,0.9)" : "var(--c-earth-600)",
        }}>
          Precio promocional{" "}
          <strong style={{
            color: isActive ? "var(--c-cream-50)" : "var(--c-earth-800)",
            fontWeight: 500,
          }}>{ARS(precio)}</strong>{" "}
          <span style={{
            textDecoration: "line-through",
            color: isActive ? "rgba(245,237,223,0.4)" : "rgba(92,61,30,0.4)",
          }}>{ARS(precioLista)}</span>
        </div>
        <div style={{
          marginTop: 6, fontSize: 11,
          color: isActive ? "rgba(245,237,223,0.5)" : "var(--c-earth-400)",
        }}>
          Pago contado en pesos · hasta el {fecha}
        </div>
      </div>
    );
  };

  return (
    <section id="promo" style={{
      background: "var(--c-cream-100)",
      padding: "clamp(4rem, 7vw, 7rem) var(--pad-x)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr min(44%, 520px)",
          gap: "clamp(2.5rem, 5vw, 5rem)",
          alignItems: "start",
        }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "var(--c-earth-800)",
              color: "var(--c-cream-50)",
              padding: "8px 16px",
              borderRadius: 999,
              marginBottom: 24,
            }}>
              <span className="pulse" style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--c-terra)", display: "inline-block",
              }} />
              <span style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 500 }}>
                La Era del Peso
              </span>
              <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,237,223,0.5)" }}>
                Edición 2026
              </span>
            </div>

            <Kicker>Promoción limitada · Mayo & Junio 2026</Kicker>

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 4.5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.03,
              color: "var(--c-earth-800)",
              marginTop: 20,
              letterSpacing: "-0.02em",
            }}>
              Solo <em style={{ fontStyle: "italic", color: "var(--c-terra)" }}>15 lotes</em><br />
              con esta financiación.
            </h2>

            <p style={{
              marginTop: 20,
              fontSize: 16,
              color: "var(--c-earth-600)",
              lineHeight: 1.75,
              maxWidth: 500,
            }}>
              Una franja única: lista de unidades cerrada, descuentos sólo en mayo y junio para pago
              contado en pesos, y financiación propia en pesos hasta 48 meses para el resto.{" "}
              <strong style={{ color: "var(--c-earth-800)", fontWeight: 500 }}>
                Cuando se cierren las 15, el precio vuelve a lista.
              </strong>
            </p>

            {/* Lot counter */}
            <div style={{ marginTop: 36 }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(15, 1fr)",
                gap: 5,
                maxWidth: 420,
              }}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} style={{
                    height: 44,
                    borderRadius: 4,
                    background: i < 11 ? "var(--c-earth-700)" : "var(--c-cream-200)",
                    border: i >= 11 ? "1px solid rgba(92,61,30,0.2)" : "none",
                  }} />
                ))}
              </div>
              <div style={{
                marginTop: 10,
                display: "flex",
                justifyContent: "space-between",
                maxWidth: 420,
                fontSize: 12,
                color: "var(--c-earth-500)",
              }}>
                <span>
                  <strong style={{ color: "var(--c-earth-800)", fontWeight: 500 }}>11 disponibles</strong>
                  {" "}· 4 reservados
                </span>
                <span>Stock al {new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "long" })}</span>
              </div>
            </div>

            <div style={{ marginTop: 36, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <CTA href="#contacto">Reservar mi unidad</CTA>
              <a href="#calculadora" className="link" style={{
                fontSize: 14, color: "var(--c-earth-600)",
              }}>
                o calcular mi cuota →
              </a>
            </div>
          </div>

          {/* Right: cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {card("mayo", 20, precioMayo, "31 de mayo")}
            {card("junio", 10, precioJunio, "30 de junio")}

            {/* Crypto */}
            <div style={{
              borderRadius: "var(--radius-lg)",
              padding: "20px 24px",
              border: "1px solid rgba(92,61,30,0.14)",
              background: "var(--c-cream-50)",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}>
              <div style={{ display: "flex" }}>
                {[
                  { bg: "#F7931A", label: "₿", font: 14 },
                  { bg: "#26A17B", label: "USDT", font: 10 },
                ].map(({ bg, label, font }, i) => (
                  <div key={i} style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: bg, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: font,
                    border: "2px solid var(--c-cream-50)",
                    marginLeft: i > 0 ? -10 : 0,
                    position: "relative", zIndex: 2 - i,
                  }}>{label}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--c-earth-500)" }}>
                  También consultar por
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 19, color: "var(--c-earth-800)", marginTop: 2 }}>
                  Pago en criptomonedas
                </div>
                <div style={{ fontSize: 12, color: "var(--c-earth-500)", marginTop: 2 }}>
                  USDT · BTC · Coordinamos al reservar.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EL LUGAR ────────────────────────────────────────────────────────────────
function ElLugar() {
  return (
    <section id="lugar" style={{
      padding: "clamp(4rem, 7vw, 8rem) var(--pad-x)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <SectionHeader
          kicker="01 · El lugar"
          title="Un espacio pensado para volver a mirar el cielo."
          lead="Barrio privado en Estancia Grande, sobre la ruta a Concordia, Entre Ríos. Para quienes quieran disfrutar la vida desde lo simple."
        />

        <div style={{
          marginTop: 48,
          display: "grid",
          gridTemplateColumns: "minmax(0,7fr) minmax(0,5fr)",
          gap: 20,
          alignItems: "start",
        }}>
          <img
            src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/estancia-paraiso-2022_web.jpg"
            alt="Vista aérea de Estancia Paraíso"
            style={{
              width: "100%", aspectRatio: "16/10",
              objectFit: "cover", borderRadius: "var(--radius-lg)",
              display: "block",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <img
              src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-01.jpg"
              alt="Familias en Estancia Paraíso"
              style={{
                width: "100%", aspectRatio: "4/3",
                objectFit: "cover", borderRadius: "var(--radius-lg)",
                display: "block",
              }}
            />
            <div style={{
              background: "var(--c-cream-100)",
              border: "1px solid rgba(92,61,30,0.12)",
              borderRadius: "var(--radius-lg)",
              padding: "24px 28px",
            }}>
              <blockquote style={{
                fontFamily: "var(--font-lora)",
                fontStyle: "italic",
                fontSize: "1.15rem",
                color: "var(--c-earth-800)",
                lineHeight: 1.6,
              }}>
                "La calidez de un hogar, el aroma a madera, la brisa fresca, el olor a tierra y el rocío de la mañana."
              </blockquote>
              <div style={{
                marginTop: 14, fontSize: 11,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--c-earth-500)",
              }}>
                — Estancia Paraíso · Estancia Grande
              </div>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 64,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(1.5rem, 3vw, 3rem)",
        }}>
          {[
            { t: "Energía y agua", d: "Energía eléctrica a pie de lote y red de agua corriente provista al barrio." },
            { t: "Seguridad 24hs", d: "Cerco perimetral completo, ingreso controlado y vigilancia las 24 horas." },
            { t: "Accesos", d: "Caminos internos consolidados todo el año y acceso directo desde la ruta." },
          ].map((f, i) => (
            <div key={i} style={{
              borderTop: "1px solid rgba(92,61,30,0.18)",
              paddingTop: 24,
            }}>
              <div style={{
                fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                color: "var(--c-earth-500)",
              }}>0{i + 1}</div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 400,
                color: "var(--c-earth-800)",
                marginTop: 12,
              }}>{f.t}</h3>
              <p style={{ marginTop: 10, fontSize: 15, color: "var(--c-earth-600)", lineHeight: 1.7 }}>
                {f.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LA OPORTUNIDAD ──────────────────────────────────────────────────────────
function LaOportunidad() {
  return (
    <section id="inversion" style={{
      background: "var(--c-earth-700)",
      color: "var(--c-cream-100)",
      padding: "clamp(4rem, 7vw, 8rem) var(--pad-x)",
      position: "relative",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "min(42%, 440px) 1fr",
          gap: "clamp(2.5rem, 5vw, 5rem)",
          alignItems: "center",
        }}>
          <img
            src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-08.jpg"
            alt="Atardecer en Estancia Paraíso"
            style={{
              width: "100%", aspectRatio: "4/5",
              objectFit: "cover", borderRadius: "var(--radius-lg)",
              display: "block",
            }}
          />
          <div>
            <Kicker style={{ color: "rgba(245,237,223,0.5)" }}>
              <span style={{ color: "rgba(245,237,223,0.5)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                02 · La oportunidad
              </span>
            </Kicker>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              color: "var(--c-cream-50)",
              marginTop: 20,
              letterSpacing: "-0.02em",
            }}>
              La tierra es la única<br />
              inversión que{" "}
              <em style={{ fontStyle: "italic", color: "var(--c-cream-200)" }}>
                no se devalúa cuando llueve
              </em>.
            </h2>

            <div style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px 40px",
              fontSize: 15,
              color: "rgba(245,237,223,0.8)",
              lineHeight: 1.7,
            }}>
              <p>
                Comprás directamente al dueño, sin intermediarios, sin comisiones,
                sin sorpresas. Reservás el lote con la entrega y firmás boleto el mismo día.
              </p>
              <p>
                El valor del suelo en zonas rurales creció en promedio un{" "}
                <strong style={{ color: "var(--c-cream-50)", fontWeight: 500 }}>38% anual en dólares</strong>{" "}
                los últimos cinco años. Estancia Paraíso está en la franja inicial de ese ciclo.
              </p>
            </div>

            <div style={{
              marginTop: 44,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem",
            }}>
              {[
                { v: "+38%", l: "Valorización anual en USD (2020–25)" },
                { v: "12×", l: "Cuotas fijas en pesos" },
                { v: "48m", l: "Plazo máximo ajustado IPC" },
                { v: "0%", l: "Interés bancario — financiación propia" },
              ].map(({ v, l }) => (
                <div key={v}>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.4rem",
                    fontWeight: 400,
                    color: "var(--c-cream-50)",
                    lineHeight: 1,
                  }}>{v}</div>
                  <div style={{
                    marginTop: 8, fontSize: 10,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "rgba(245,237,223,0.5)",
                    lineHeight: 1.5,
                  }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CALCULATOR ─────────────────────────────────────────────────────────────
function Calculator() {
  const [entrega, setEntrega] = useState(DEFAULT_ENTREGA);
  const [activeTerm, setActiveTerm] = useState(12);
  const sliderRef = useRef(null);

  const saldo = Math.max(0, PRICE_ARS - entrega);
  const pct = entrega / PRICE_ARS * 100;

  const terms = [
    { months: 12, cuota: saldo / 12, type: "fija", note: "Sin ajustes hasta el último vencimiento." },
    { months: 24, cuota: saldo / 24, type: "ipc",  note: "Se actualiza mes a mes por inflación oficial." },
    { months: 36, cuota: saldo / 36, type: "ipc",  note: "Más plazo, menos esfuerzo mensual." },
    { months: 48, cuota: saldo / 48, type: "ipc",  note: "Plan más largo · cuota inicial mínima." },
  ];
  const active = terms.find((t) => t.months === activeTerm);

  useEffect(() => {
    if (sliderRef.current) {
      const p = ((entrega - MIN_ENTREGA) / (MAX_ENTREGA - MIN_ENTREGA)) * 100;
      sliderRef.current.style.setProperty("--pct", `${p}%`);
    }
  }, [entrega]);

  return (
    <section id="calculadora" style={{
      padding: "clamp(4rem, 7vw, 8rem) var(--pad-x)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <SectionHeader
          kicker="03 · Calculadora"
          title="Armá tu plan en treinta segundos."
          lead="Movés la entrega, elegís el plazo, y ves la cuota exacta. Sin letra chica."
        />

        <div style={{
          marginTop: 48,
          display: "grid",
          gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)",
          gap: 24,
          alignItems: "start",
        }}>
          {/* Controls */}
          <div style={{
            background: "var(--c-cream-100)",
            border: "1px solid rgba(92,61,30,0.12)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(1.5rem, 3vw, 2.5rem)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-earth-500)" }}>
                Valor del lote
              </span>
              <span style={{ fontSize: 13, color: "var(--c-earth-500)" }}>USD 15.000</span>
            </div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.8rem",
              color: "var(--c-earth-800)",
              lineHeight: 1.1,
              marginTop: 6,
            }}>{ARS(PRICE_ARS)}</div>

            <hr className="hairline" style={{ margin: "28px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-earth-500)" }}>
                Tu entrega
              </span>
              <span style={{ fontSize: 12, color: "var(--c-earth-500)" }}>{pct.toFixed(0)}% del total</span>
            </div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.2rem",
              color: "var(--c-earth-800)",
              marginBottom: 18,
            }}>{ARS(entrega)}</div>

            <input
              ref={sliderRef}
              type="range"
              min={MIN_ENTREGA}
              max={MAX_ENTREGA}
              step={100_000}
              value={entrega}
              onChange={(e) => setEntrega(Number(e.target.value))}
            />
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--c-earth-400)", marginTop: 8,
            }}>
              <span>Mín. {ARS(MIN_ENTREGA)}</span>
              <span>Máx. {ARS(MAX_ENTREGA)}</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
              {[6_000_000, 6_500_000, 8_000_000, 10_500_000].map((v) => (
                <button
                  key={v}
                  onClick={() => setEntrega(v)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    cursor: "pointer",
                    border: "1px solid " + (entrega === v ? "var(--c-earth-700)" : "rgba(92,61,30,0.2)"),
                    background: entrega === v ? "var(--c-earth-700)" : "var(--c-cream-50)",
                    color: entrega === v ? "var(--c-cream-50)" : "var(--c-earth-700)",
                    transition: "all 0.15s",
                  }}
                >{ARS(v)}</button>
              ))}
            </div>

            <hr className="hairline" style={{ margin: "24px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-earth-500)" }}>
                Saldo a financiar
              </span>
              <span style={{ fontSize: 12, color: "var(--c-earth-500)" }}>{(100 - pct).toFixed(0)}% restante</span>
            </div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.9rem",
              color: "var(--c-earth-600)",
            }}>{ARS(saldo)}</div>
          </div>

          {/* Results */}
          <div>
            {/* Term selector */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 6,
              background: "rgba(184,144,110,0.14)",
              padding: 6,
              borderRadius: 999,
              border: "1px solid rgba(92,61,30,0.08)",
            }}>
              {terms.map((t) => (
                <button
                  key={t.months}
                  onClick={() => setActiveTerm(t.months)}
                  style={{
                    padding: "10px 0",
                    borderRadius: 999,
                    fontSize: 14,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    border: "none",
                    transition: "all 0.2s",
                    background: activeTerm === t.months ? "var(--c-earth-700)" : "transparent",
                    color: activeTerm === t.months ? "var(--c-cream-50)" : "var(--c-earth-600)",
                    fontWeight: activeTerm === t.months ? 500 : 400,
                  }}
                >{t.months} meses</button>
              ))}
            </div>

            {/* Active card */}
            <div style={{
              marginTop: 16,
              background: "var(--c-earth-700)",
              color: "var(--c-cream-50)",
              borderRadius: "var(--radius-lg)",
              padding: "clamp(2rem, 3vw, 3rem)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* decorative grain */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(circle at 80% 20%, rgba(245,237,223,0.04) 0%, transparent 60%)",
                pointerEvents: "none",
              }} />

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Tag>{active.type === "fija" ? "Cuota fija" : "Ajuste IPC"}</Tag>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,237,223,0.5)" }}>
                  Plazo {active.months} meses
                </span>
              </div>

              <div style={{ marginTop: 20, fontSize: 14, color: "rgba(245,237,223,0.7)" }}>
                Tu cuota mensual estimada
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 5vw, 4.5rem)",
                  lineHeight: 1,
                  color: "var(--c-cream-50)",
                }}>{ARS(Math.round(active.cuota))}</span>
                <span style={{ fontSize: 14, color: "rgba(245,237,223,0.6)" }}>/ mes</span>
              </div>

              <p style={{ marginTop: 12, fontSize: 15, color: "rgba(245,237,223,0.8)", maxWidth: 440 }}>
                {active.note}
              </p>

              <hr style={{ border: "none", borderTop: "1px solid rgba(245,237,223,0.15)", margin: "28px 0 20px" }} />

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
              }}>
                {[
                  { l: "Entrega", v: ARS(entrega) },
                  { l: "Saldo", v: ARS(saldo) },
                  {
                    l: "Total estimado",
                    v: active.type === "fija"
                      ? ARS(entrega + Math.round(active.cuota) * active.months)
                      : "Variable IPC",
                  },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,237,223,0.5)" }}>{l}</div>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      color: "var(--c-cream-50)",
                      marginTop: 4,
                    }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* All terms quick */}
            <div style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
            }}>
              {terms.map((t) => (
                <button
                  key={t.months}
                  onClick={() => setActiveTerm(t.months)}
                  style={{
                    textAlign: "left",
                    background: "var(--c-cream-50)",
                    border: "1px solid " + (activeTerm === t.months ? "var(--c-earth-700)" : "rgba(92,61,30,0.14)"),
                    borderRadius: "var(--radius)",
                    padding: "14px 16px",
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--c-earth-500)" }}>
                    {t.months}m · {t.type === "fija" ? "Fija" : "IPC"}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    color: "var(--c-earth-800)",
                    marginTop: 6,
                    lineHeight: 1.2,
                  }}>{ARS(Math.round(t.cuota))}</div>
                  <div style={{ fontSize: 11, color: "var(--c-earth-400)", marginTop: 2 }}>por mes</div>
                </button>
              ))}
            </div>

            <p style={{
              marginTop: 16, fontSize: 12,
              color: "var(--c-earth-400)", lineHeight: 1.7,
            }}>
              * Los planes de 24, 36 y 48 meses se ajustan mensualmente por el IPC (INDEC).
              El plan de 12 meses es cuota fija en pesos sin ajustes ni intereses. Sujeto a disponibilidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PLANES ──────────────────────────────────────────────────────────────────
function Planes() {
  const isMay = CURRENT_MONTH === 4;
  const promoLabel = isMay ? "Mayo 20% OFF" : "Junio 10% OFF";
  const promoPct = isMay ? 20 : 10;
  const contadoPrice = Math.round(PRICE_ARS * (1 - promoPct / 100));

  const plans = [
    {
      key: "contado",
      name: "Contado en pesos",
      tag: promoLabel,
      headline: ARS(contadoPrice),
      headlineSub: `Lista ${ARS(PRICE_ARS)} · ${promoPct}% OFF`,
      desc: `Pago contado en pesos durante ${isMay ? "mayo" : "junio"} · también en criptomonedas`,
      rows: [
        ["Entrega", "100% al firmar"],
        ["Cuotas", "—"],
        ["Ajuste", "Ninguno"],
        ["Boleto", "Inmediato"],
        ["Escritura", "30 días"],
        ["Descuento", `${promoPct}% sobre lista`],
      ],
      cta: "Reservar al precio promo",
      featured: false,
      tagAccent: true,
    },
    {
      key: "corto",
      name: "Financiado · Corto plazo",
      tag: "Único en pesos",
      headline: ARS(1_250_000),
      headlineSub: "cuota fija · 12 meses · sin descuento",
      desc: `Entrega ${ARS(6_000_000)} + 12 cuotas fijas en pesos. Una de las 15 unidades de La Era del Peso.`,
      rows: [
        ["Entrega", ARS(6_000_000)],
        ["Cuotas", "12 mensuales"],
        ["Ajuste", "Ninguno · cuota fija"],
        ["Boleto", "Al firmar"],
        ["Escritura", "Al cancelar"],
        ["Descuento", "—"],
      ],
      cta: "Reservar mi lote",
      featured: true,
    },
    {
      key: "largo",
      name: "Financiado · Largo plazo",
      tag: "15 unidades",
      headline: ARS(302_083),
      headlineSub: "desde · 48 meses IPC · sin descuento",
      desc: `Entrega ${ARS(6_500_000)} + 24, 36 o 48 cuotas ajustables IPC. Cupo limitado.`,
      rows: [
        ["Entrega", ARS(6_500_000)],
        ["Cuotas", "24 / 36 / 48 meses"],
        ["Ajuste", "Mensual por IPC"],
        ["Boleto", "Al firmar"],
        ["Escritura", "Al cancelar"],
        ["Descuento", "—"],
      ],
      cta: "Simular largo plazo",
      featured: false,
    },
  ];

  return (
    <section id="planes" style={{
      background: "rgba(235,217,184,0.15)",
      borderTop: "1px solid rgba(92,61,30,0.1)",
      borderBottom: "1px solid rgba(92,61,30,0.1)",
      padding: "clamp(4rem, 7vw, 8rem) var(--pad-x)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <SectionHeader
          kicker="04 · Planes de pago"
          title="Tres caminos para llegar al mismo lugar."
          lead="Elegí lo que se acomoda a tu liquidez. Todos los planes se firman ante escribano y el lote queda a tu nombre desde el boleto."
        />

        <div style={{
          marginTop: 48,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          alignItems: "end",
        }}>
          {plans.map((p) => (
            <div key={p.key} style={{
              borderRadius: "var(--radius-lg)",
              padding: "clamp(1.5rem, 2.5vw, 2.5rem)",
              border: "1px solid " + (p.featured ? "var(--c-earth-700)" : "rgba(92,61,30,0.14)"),
              background: p.featured ? "var(--c-earth-700)" : "var(--c-cream-50)",
              color: p.featured ? "var(--c-cream-50)" : "var(--c-earth-800)",
              boxShadow: p.featured ? "0 20px 48px -24px rgba(61,43,20,0.45)" : "none",
              marginTop: p.featured ? 0 : 16,
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{
                  fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
                  color: p.featured ? "rgba(245,237,223,0.55)" : "var(--c-earth-500)",
                }}>{p.name}</div>
                <span style={{
                  fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "4px 12px", borderRadius: 999,
                  background: p.featured
                    ? "rgba(245,237,223,0.15)"
                    : p.tagAccent
                    ? "rgba(196,82,42,0.1)"
                    : "rgba(92,61,30,0.08)",
                  color: p.featured
                    ? "var(--c-cream-200)"
                    : p.tagAccent
                    ? "var(--c-terra)"
                    : "var(--c-earth-600)",
                }}>{p.tag}</span>
              </div>

              <div style={{ marginTop: 28 }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
                  fontWeight: 400,
                  lineHeight: 1,
                  color: p.featured ? "var(--c-cream-50)" : "var(--c-earth-800)",
                }}>{p.headline}</div>
                <div style={{
                  marginTop: 8, fontSize: 13,
                  color: p.featured ? "rgba(245,237,223,0.7)" : "var(--c-earth-500)",
                }}>{p.headlineSub}</div>
              </div>

              <p style={{
                marginTop: 16, fontSize: 14, lineHeight: 1.7,
                color: p.featured ? "rgba(245,237,223,0.85)" : "var(--c-earth-600)",
              }}>{p.desc}</p>

              <hr style={{
                border: "none",
                borderTop: "1px solid " + (p.featured ? "rgba(245,237,223,0.15)" : "rgba(92,61,30,0.12)"),
                margin: "24px 0",
              }} />

              <dl style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, flex: 1 }}>
                {p.rows.map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <dt style={{ color: p.featured ? "rgba(245,237,223,0.6)" : "var(--c-earth-500)" }}>{k}</dt>
                    <dd style={{
                      textAlign: "right",
                      color: p.featured ? "var(--c-cream-50)" : "var(--c-earth-800)",
                      fontWeight: 400,
                    }}>{v}</dd>
                  </div>
                ))}
              </dl>

              <a href="#contacto" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 28,
                padding: "12px 20px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                cursor: "pointer",
                transition: "opacity 0.2s",
                background: p.featured ? "var(--c-cream-50)" : "var(--c-earth-700)",
                color: p.featured ? "var(--c-earth-700)" : "var(--c-cream-50)",
              }}>
                {p.cta}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Summary table */}
        <div style={{ marginTop: 48, overflowX: "auto" }}>
          <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "12px 12px 12px 0", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--c-earth-500)", fontWeight: 400, width: "26%" }}>Detalle</th>
                {plans.map((p) => (
                  <th key={p.key} style={{ textAlign: "left", padding: "12px", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--c-earth-500)", fontWeight: 400 }}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Precio total estimado", `${ARS(contadoPrice)} · ${promoPct}% OFF`, ARS(21_000_000), "USD 15.000 + IPC"],
                ["Entrega inicial", "100%", ARS(6_000_000), ARS(6_500_000)],
                ["Cantidad de cuotas", "—", "12", "24 / 36 / 48"],
                ["Tipo de cuota", "—", "Fija en pesos", "Ajuste IPC mensual"],
                ["Posesión", "Inmediata", "Inmediata", "Inmediata"],
                ["Escritura", "30 días", "Al cancelar", "Al cancelar"],
                ["Reserva", ARS(500_000), ARS(500_000), ARS(500_000)],
              ].map((row, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(92,61,30,0.1)" }}>
                  <td style={{ padding: "14px 12px 14px 0", color: "var(--c-earth-600)" }}>{row[0]}</td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j} style={{ padding: "14px 12px", color: j === 1 ? "var(--c-earth-800)" : "var(--c-earth-600)", fontWeight: j === 1 ? 500 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── GALERÍA ─────────────────────────────────────────────────────────────────
function Gallery() {
  const imgs = [
    { src: "https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-03.jpg", alt: "Familias", span: "5" },
    { src: "https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-04.jpg", alt: "Vida en el barrio", span: "7" },
    { src: "https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-05.jpg", alt: "Paisaje del lote", span: "7" },
    { src: "https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-06.jpg", alt: "Naturaleza", span: "5" },
  ];
  return (
    <section style={{ padding: "clamp(4rem, 7vw, 8rem) var(--pad-x)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <SectionHeader
          kicker="05 · Galería"
          title="Cuatro estaciones, el mismo arroyo."
        />
        <div style={{
          marginTop: 48,
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 14,
        }}>
          {imgs.map((img, i) => (
            <img key={i}
              src={img.src}
              alt={img.alt}
              style={{
                gridColumn: `span ${img.span}`,
                width: "100%",
                aspectRatio: img.span === "5" ? "4/5" : "16/10",
                objectFit: "cover",
                borderRadius: "var(--radius-lg)",
                display: "block",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACTO ────────────────────────────────────────────────────────────────
function Contacto() {
  const channels = [
    {
      name: "WhatsApp",
      handle: ["+54 9 3454 34-0639", "+54 9 3454 02-1858", "+54 9 3454 02-3467"],
      href: "https://wa.me/5493454340639",
      cta: "Escribir por WhatsApp",
      bg: "#25D366",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M17.6 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2.1-.3 0-.5 0-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3M12.1 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.9 1.2C17.6 21.9 22 17.4 22 12s-4.4-10-9.9-10z" />
        </svg>
      ),
    },
    {
      name: "Teléfono",
      handle: "(0345) 422-7683",
      href: "tel:+543454227683",
      cta: "Llamar ahora",
      bg: "var(--c-earth-700)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      handle: "@estancia_paraiso_",
      href: "https://www.instagram.com/estancia_paraiso_/",
      cta: "Ver Instagram",
      bg: "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      handle: "/EstanciaParaiso",
      href: "https://www.facebook.com/Estancia-Paraiso-131428373990355/",
      cta: "Ver Facebook",
      bg: "#1877F2",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15h-2.4v-3H10V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-.55 0-1 .45-1 1V12H16l-.5 3h-2v6.95C18.05 21.45 22 17.19 22 12z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      handle: "@Estanciaparaisoconcordia",
      href: "https://www.youtube.com/@Estanciaparaisoconcordia",
      cta: "Ver canal",
      bg: "#FF0000",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M23 7s-.2-1.5-.9-2.2c-.8-.9-1.8-.9-2.2-1C16.8 3.5 12 3.5 12 3.5s-4.8 0-7.9.3c-.4.1-1.4.1-2.2 1C1.2 5.5 1 7 1 7S.8 8.8.8 10.6v1.7C.8 14.1 1 16 1 16s.2 1.5.9 2.2c.8.9 1.9.8 2.4.9 1.7.2 7.7.3 7.7.3s4.8 0 7.9-.3c.4-.1 1.4-.1 2.2-1 .7-.7.9-2.2.9-2.2s.2-1.8.2-3.6v-1.7C23.2 8.8 23 7 23 7zM9.7 14.4V8L16 11.2l-6.3 3.2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contacto" style={{
      background: "var(--c-earth-800)",
      color: "var(--c-cream-100)",
      padding: "clamp(4rem, 7vw, 8rem) var(--pad-x)",
    }}>
      <div style={{
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)",
        gap: "clamp(2.5rem, 5vw, 6rem)",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "rgba(245,237,223,0.45)" }}>
            <span style={{ height: 1, width: 32, background: "rgba(245,237,223,0.3)" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" }}>
              06 · Hablemos
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 3.5vw, 3.4rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "var(--c-cream-50)",
            marginTop: 20,
            letterSpacing: "-0.02em",
          }}>
            Vení a caminar el lote.<br />
            <em style={{ fontStyle: "italic", color: "var(--c-cream-200)" }}>
              El paisaje convence solo.
            </em>
          </h2>
          <p style={{
            marginTop: 20, fontSize: 15,
            color: "rgba(245,237,223,0.75)", lineHeight: 1.75,
            maxWidth: 420,
          }}>
            Coordinamos visitas guiadas los sábados. Escribinos por WhatsApp o redes
            y arreglamos el día y la hora. Sin formularios, sin demoras.
          </p>

          <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 14, fontSize: 14 }}>
            {[
              ["Ubicación", "Estancia Grande · Concordia · Entre Ríos"],
              ["Horarios",  "Lun – Vie 9 a 17hs"],
              ["Pagos",     "Pesos · USDT · BTC"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 16 }}>
                <span style={{
                  fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
                  color: "rgba(245,237,223,0.45)", minWidth: 76,
                  paddingTop: 2,
                }}>{k}</span>
                <span style={{ color: "rgba(245,237,223,0.85)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}>
            {channels.map((c) => (
              <a key={c.name} href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener"
                style={{
                  textDecoration: "none",
                  background: "var(--c-cream-50)",
                  borderRadius: "var(--radius-lg)",
                  padding: "20px 22px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  transition: "transform 0.2s",
                  border: "1px solid rgba(245,237,223,0.08)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: c.bg, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>{c.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--c-earth-500)" }}>
                    {c.name}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    color: "var(--c-earth-800)",
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}>
                    {Array.isArray(c.handle)
                      ? c.handle.map((n, i) => <div key={i}>{n}</div>)
                      : c.handle}
                  </div>
                  <div style={{
                    marginTop: 8, fontSize: 12,
                    color: "var(--c-earth-600)",
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    {c.cta}
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}

            {/* Tour 360 */}
            <a href="https://estanciaparaiso.com.ar/tour-360/"
              target="_blank" rel="noopener"
              style={{
                gridColumn: "1 / -1",
                textDecoration: "none",
                background: "var(--c-earth-700)",
                border: "1px solid rgba(245,237,223,0.1)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                display: "flex", alignItems: "center", gap: 16,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--c-earth-600)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "var(--c-earth-700)"}
            >
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(245,237,223,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,237,223,0.45)" }}>
                  Recorrido virtual
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--c-cream-50)", marginTop: 4 }}>
                  Tour 360° por la estancia
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{
        maxWidth: "var(--max-w)",
        margin: "64px auto 0",
        paddingTop: 28,
        borderTop: "1px solid rgba(245,237,223,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        fontSize: 12,
        color: "rgba(245,237,223,0.4)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BrandMark size={18} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "var(--c-cream-100)" }}>
            Estancia Paraíso
          </span>
          <span>· Barrio privado · Estancia Grande, Entre Ríos</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { l: "Master Plan", h: "https://estanciaparaiso.com.ar/master-plan-2/" },
            { l: "Tour 360°", h: "https://estanciaparaiso.com.ar/tour-360/" },
            { l: "Contacto", h: "https://estanciaparaiso.com.ar/contacto/" },
          ].map(({ l, h }) => (
            <a key={l} href={h} target="_blank" rel="noopener" className="link"
              style={{ color: "rgba(245,237,223,0.45)", textDecoration: "none" }}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <PromoBar />
      <Nav />
      <Hero />
      <Promocion />
      <ElLugar />
      <LaOportunidad />
      <Calculator />
      <Planes />
      <Gallery />
      <Contacto />
    </>
  );
}
