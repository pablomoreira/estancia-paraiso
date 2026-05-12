// Main application — Lomas del Arroyo landing page

const { useState, useMemo, useEffect } = React;

const PRICE_ARS = 21_000_000;
const PRICE_USD = 15_000;
const DEFAULT_ENTREGA = 6_000_000;
const MIN_ENTREGA = 5_000_000;
const MAX_ENTREGA = 12_000_000;

/* ─────────────────────── NAV ─────────────────────── */
function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream-100/70 border-b border-earth-700/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 text-earth-800">
          <BrandMark size={28} />
          <div className="leading-tight">
            <div className="font-display text-lg">Estancia Paraíso</div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-earth-600 -mt-0.5">Urbanización sustentable</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-sm text-earth-700">
          <a href="#lugar" className="link-underline">El lugar</a>
          <a href="#inversion" className="link-underline">La inversión</a>
          <a href="#calculadora" className="link-underline">Calculadora</a>
          <a href="#planes" className="link-underline">Planes</a>
        </nav>
        <CTA dark={false} as="a" href="#contacto">Reservar visita</CTA>
      </div>
    </header>
  );
}

/* ─────────────────────── HERO ─────────────────────── */
function Hero() {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 rise-in">
            <div className="flex items-center gap-3 text-earth-600">
              <span className="h-px w-10 bg-earth-600/50" />
              <span className="text-[10px] tracking-[0.3em] uppercase">Estancia Grande · Concordia · Entre Ríos</span>
            </div>
            <h1 className="font-display mt-6 text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-tight text-earth-800">
              Muchas formas<br/>
              de vivir.<br/>
              <span className="font-display-italic text-sage-600">Una sola respuesta.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-earth-700/80 leading-relaxed">
              La calidez de un hogar, el aroma a madera, la brisa fresca, el olor a tierra y el rocío de la mañana.
              El equilibrio entre el vivir cotidiano y la tranquilidad de la naturaleza.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CTA as="a" href="#calculadora">Calcular mi cuota</CTA>
              <CTA dark={false} as="a" href="#lugar">Conocer el lugar</CTA>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <img
                src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/laguna-estancia-paraiso-01-1.jpg"
                alt="Laguna de Estancia Paraíso"
                className="w-full h-full object-cover rounded-md"
                style={{ aspectRatio: '4/5', display: 'block' }}
              />
              <div className="absolute -bottom-6 -left-6 bg-cream-50 border border-earth-700/15 rounded-md p-5 shadow-[0_10px_40px_-20px_rgba(74,56,38,0.4)] max-w-[240px]">
                <div className="text-[10px] tracking-[0.3em] uppercase text-earth-600">Desde</div>
                <div className="font-display text-4xl text-earth-800 mt-1">USD 15.000</div>
                <div className="text-sm text-earth-700/80 mt-1">o {ARS(PRICE_ARS)} en pesos</div>
                <div className="hairline mt-3 pt-3 text-xs text-earth-700/70">Financiación propia hasta 48 meses</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="border-y border-earth-700/15 bg-cream-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          <Stat value="24h" label="Seguridad" sub="Ingreso controlado" />
          <Stat value="48" label="Cuotas máx." sub="Financiación propia" />
          <Stat value="100%" label="Servicios" sub="Luz · agua · caminos" />
          <Stat value="0%" label="Comisión" sub="Compra directa al dueño" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── EL LUGAR ─────────────────────── */
function ElLugar() {
  return (
    <section id="lugar" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          kicker="01 · El lugar"
          title="Un espacio pensado para volver a mirar el cielo."
          lead="Barrio privado en Estancia Grande, sobre la ruta a Concordia, Entre Ríos. Para quienes quieran disfrutar la vida desde lo simple y conectarse profundamente con los sentidos."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <img
            src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/estancia-paraiso-2022_web.jpg"
            alt="Estancia Paraíso — vista aérea"
            className="lg:col-span-7 w-full h-full object-cover rounded-md"
            style={{ aspectRatio: '16/10', display: 'block' }}
          />
          <div className="lg:col-span-5 flex flex-col gap-6">
            <img
              src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-01.jpg"
              alt="Familias en Estancia Paraíso"
              className="w-full object-cover rounded-md"
              style={{ aspectRatio: '4/3', display: 'block' }}
            />
            <div className="bg-cream-50 border border-earth-700/15 rounded-md p-7">
              <div className="font-display text-2xl text-earth-800 leading-snug">
                "La calidez de un hogar, el aroma a madera, la brisa fresca, el olor a tierra y el rocío de la mañana."
              </div>
              <div className="mt-4 text-sm text-earth-600">— Estancia Paraíso · Estancia Grande</div>
            </div>
          </div>
        </div>

        {/* Features row */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { t: "Energía y agua", d: "Energía eléctrica a pie de lote y red de agua corriente provista al barrio." },
            { t: "Seguridad 24hs", d: "Cerco perimetral completo, ingreso controlado y vigilancia las 24 horas." },
            { t: "Accesos", d: "Caminos internos consolidados todo el año y acceso directo desde la ruta." },
          ].map((f, i) => (
            <div key={i} className="border-t border-earth-700/20 pt-6">
              <div className="text-[10px] tracking-[0.3em] uppercase text-earth-600">0{i+1}</div>
              <h3 className="font-display text-2xl text-earth-800 mt-3">{f.t}</h3>
              <p className="mt-3 text-earth-700/80 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── LA OPORTUNIDAD ─────────────────────── */
function LaOportunidad() {
  return (
    <section id="inversion" className="relative py-24 lg:py-32 bg-earth-700 text-cream-100 overflow-hidden">
      {/* decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-cream-200/15" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <img
              src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-08.jpg"
              alt="Atardecer en Estancia Paraíso"
              className="w-full object-cover rounded-md"
              style={{ aspectRatio: '4/5', display: 'block' }}
            />
          </div>
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-cream-200/70">
              <span className="h-px w-10 bg-cream-200/40" />
              <span className="text-[10px] tracking-[0.3em] uppercase">02 · La oportunidad</span>
            </div>
            <h2 className="font-display mt-6 text-4xl md:text-6xl leading-[1.05] text-cream-50">
              La tierra es la única<br/>inversión que <span className="font-display-italic text-cream-200">no se devalúa cuando llueve</span>.
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-cream-100/85 leading-relaxed">
              <p>
                Comprás directamente al dueño, sin intermediarios, sin comisiones,
                sin sorpresas. Reservás el lote con la entrega y firmás boleto el mismo día.
              </p>
              <p>
                El valor del suelo en zonas rurales productivas creció en promedio
                un <span className="text-cream-50 font-medium">38% anual en dólares</span> los últimos
                cinco años. Lomas del Arroyo está en la franja inicial de ese ciclo.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-8">
              <div>
                <div className="font-display text-4xl text-cream-50">+38%</div>
                <div className="text-[10px] tracking-[0.3em] uppercase mt-2 text-cream-200/70">Valorización anual<br/>en USD (2020–25)</div>
              </div>
              <div>
                <div className="font-display text-4xl text-cream-50">12×</div>
                <div className="text-[10px] tracking-[0.3em] uppercase mt-2 text-cream-200/70">Cuotas fijas<br/>en pesos</div>
              </div>
              <div>
                <div className="font-display text-4xl text-cream-50">48m</div>
                <div className="text-[10px] tracking-[0.3em] uppercase mt-2 text-cream-200/70">Plazo máximo<br/>ajustado IPC</div>
              </div>
              <div>
                <div className="font-display text-4xl text-cream-50">0%</div>
                <div className="text-[10px] tracking-[0.3em] uppercase mt-2 text-cream-200/70">Interés bancario<br/>financiación propia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── CALCULATOR ─────────────────────── */
function Calculator() {
  const [entrega, setEntrega] = useState(DEFAULT_ENTREGA);
  const [activeTerm, setActiveTerm] = useState(12);

  const saldo = Math.max(0, PRICE_ARS - entrega);
  const cuotaFija12 = saldo / 12;
  const cuota24 = saldo / 24;
  const cuota36 = saldo / 36;
  const cuota48 = saldo / 48;

  const terms = [
    { months: 12, value: cuotaFija12, type: 'fija', label: 'Cuota fija en pesos', note: 'Sin ajustes hasta el último vencimiento.' },
    { months: 24, value: cuota24, type: 'ipc', label: 'Cuota ajustable IPC', note: 'Se actualiza mes a mes por inflación oficial.' },
    { months: 36, value: cuota36, type: 'ipc', label: 'Cuota ajustable IPC', note: 'Más plazo, menos esfuerzo mensual.' },
    { months: 48, value: cuota48, type: 'ipc', label: 'Cuota ajustable IPC', note: 'Plan más largo · cuota inicial mínima.' },
  ];

  const active = terms.find(t => t.months === activeTerm);
  const pct = ((entrega / PRICE_ARS) * 100);

  return (
    <section id="calculadora" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          kicker="03 · Calculadora"
          title="Armá tu plan en treinta segundos."
          lead="Movés la entrega, elegís el plazo, y ves la cuota exacta. Sin letra chica."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CONTROLS */}
          <div className="lg:col-span-5 bg-cream-50 border border-earth-700/15 rounded-md p-8 lg:p-10">
            <div className="flex items-baseline justify-between">
              <div className="text-[10px] tracking-[0.3em] uppercase text-earth-600">Valor del lote</div>
              <div className="text-sm text-earth-700/70">USD 15.000</div>
            </div>
            <div className="font-display text-5xl text-earth-800 mt-1">{ARS(PRICE_ARS)}</div>

            <div className="hairline my-8" />

            <label className="block">
              <div className="flex items-baseline justify-between">
                <div className="text-[10px] tracking-[0.3em] uppercase text-earth-600">Tu entrega</div>
                <div className="text-xs text-earth-700/70">{pct.toFixed(0)}% del total</div>
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-4xl text-earth-800">{ARS(entrega)}</span>
              </div>
              <input
                type="range"
                className="earth-slider w-full mt-5"
                min={MIN_ENTREGA}
                max={MAX_ENTREGA}
                step={100_000}
                value={entrega}
                onChange={(e) => setEntrega(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase text-earth-600/70 mt-2">
                <span>Mín. {ARS(MIN_ENTREGA)}</span>
                <span>Máx. {ARS(MAX_ENTREGA)}</span>
              </div>
            </label>

            <div className="mt-6 flex flex-wrap gap-2">
              {[6_000_000, 6_500_000, 8_000_000, 10_500_000].map((v) => (
                <button
                  key={v}
                  onClick={() => setEntrega(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    entrega === v
                      ? 'bg-earth-700 text-cream-50 border-earth-700'
                      : 'bg-cream-100 text-earth-700 border-earth-700/20 hover:bg-cream-200'
                  }`}
                >
                  {ARS(v)}
                </button>
              ))}
            </div>

            <div className="hairline my-8" />

            <div className="flex items-baseline justify-between">
              <div className="text-[10px] tracking-[0.3em] uppercase text-earth-600">Saldo a financiar</div>
              <div className="text-xs text-earth-700/70">{(100 - pct).toFixed(0)}% restante</div>
            </div>
            <div className="font-display text-3xl text-earth-700 mt-1">{ARS(saldo)}</div>
          </div>

          {/* RESULTS */}
          <div className="lg:col-span-7">
            {/* Term selector */}
            <div className="grid grid-cols-4 gap-2 bg-cream-200/60 p-1.5 rounded-full border border-earth-700/10">
              {terms.map((t) => (
                <button
                  key={t.months}
                  onClick={() => setActiveTerm(t.months)}
                  className={`relative py-2.5 rounded-full text-sm transition-all duration-300 ${
                    activeTerm === t.months
                      ? 'bg-earth-700 text-cream-50 shadow-sm'
                      : 'text-earth-700 hover:bg-cream-100'
                  }`}
                >
                  {t.months} meses
                </button>
              ))}
            </div>

            {/* Active card */}
            <div className="mt-6 bg-earth-700 text-cream-50 rounded-md p-10 lg:p-12 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <Tag tone="dark">{active.type === 'fija' ? 'Cuota fija' : 'Ajuste IPC'}</Tag>
                <span className="text-[10px] tracking-[0.3em] uppercase text-cream-200/70">Plazo {active.months} meses</span>
              </div>
              <div className="mt-6 text-cream-200/80 text-sm">Tu cuota mensual estimada</div>
              <div className="mt-2 flex items-baseline gap-3 flex-wrap">
                <span className="font-display text-6xl md:text-7xl text-cream-50 leading-none">{ARS(active.value)}</span>
                <span className="text-cream-200/70 text-sm">/ mes</span>
              </div>
              <div className="mt-4 text-cream-100/85 max-w-md">{active.note}</div>

              <div className="hairline mt-10 border-cream-200/20" style={{borderColor: 'rgba(235,224,201,0.2)'}} />
              <div className="mt-6 grid grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-cream-200/60">Entrega</div>
                  <div className="font-display text-2xl text-cream-50 mt-1">{ARS(entrega)}</div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-cream-200/60">Saldo</div>
                  <div className="font-display text-2xl text-cream-50 mt-1">{ARS(saldo)}</div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-cream-200/60">Total estimado</div>
                  <div className="font-display text-2xl text-cream-50 mt-1">
                    {active.type === 'fija' ? ARS(entrega + active.value * active.months) : 'Variable IPC'}
                  </div>
                </div>
              </div>
            </div>

            {/* All terms quick view */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
              {terms.map((t) => (
                <button
                  key={t.months}
                  onClick={() => setActiveTerm(t.months)}
                  className={`text-left bg-cream-50 border rounded-md p-4 transition-all ${
                    activeTerm === t.months ? 'border-earth-700' : 'border-earth-700/15 hover:border-earth-700/40'
                  }`}
                >
                  <div className="text-[10px] tracking-[0.3em] uppercase text-earth-600">{t.months}m · {t.type === 'fija' ? 'Fija' : 'IPC'}</div>
                  <div className="font-display text-xl text-earth-800 mt-1.5 leading-tight">{ARS(t.value)}</div>
                  <div className="text-[11px] text-earth-700/60 mt-0.5">por mes</div>
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs text-earth-700/60 leading-relaxed">
              * Los planes de 24, 36 y 48 meses se ajustan mensualmente por el Índice de Precios al Consumidor (IPC) publicado por INDEC.
              El plan de 12 meses es de cuota fija en pesos sin ajustes ni intereses. Sujeto a disponibilidad y aprobación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── COMPARISON TABLE ─────────────────────── */
function Planes() {
  const plans = [
    {
      key: 'contado',
      name: 'Contado',
      tag: 'Mejor precio',
      tone: 'sage',
      headline: 'USD 13.950',
      headlineSub: '~ ' + ARS(19_530_000),
      bullet: '7% de descuento sobre lista',
      rows: [
        ['Entrega', '100% al firmar'],
        ['Cuotas', '—'],
        ['Ajuste', 'Ninguno'],
        ['Boleto', 'Inmediato'],
        ['Escritura', '30 días'],
        ['Descuento', '7% en USD'],
      ],
      cta: 'Hablar con un asesor',
    },
    {
      key: 'corto',
      name: 'Financiado · Corto plazo',
      tag: 'Más elegido',
      tone: 'dark',
      headline: ARS(1_250_000),
      headlineSub: 'cuota fija · 12 meses',
      bullet: 'Entrega ' + ARS(6_000_000) + ' + 12 cuotas fijas',
      rows: [
        ['Entrega', ARS(6_000_000)],
        ['Cuotas', '12 mensuales'],
        ['Ajuste', 'Ninguno · cuota fija'],
        ['Boleto', 'Al firmar'],
        ['Escritura', 'Al cancelar'],
        ['Descuento', '—'],
      ],
      cta: 'Reservar mi lote',
      featured: true,
    },
    {
      key: 'largo',
      name: 'Financiado · Largo plazo',
      tag: 'Cuota mínima',
      tone: 'earth',
      headline: ARS(302_083),
      headlineSub: 'desde · 48 meses IPC',
      bullet: 'Entrega ' + ARS(6_500_000) + ' + 48 cuotas IPC',
      rows: [
        ['Entrega', ARS(6_500_000)],
        ['Cuotas', '24 / 36 / 48 meses'],
        ['Ajuste', 'Mensual por IPC'],
        ['Boleto', 'Al firmar'],
        ['Escritura', 'Al cancelar'],
        ['Descuento', '—'],
      ],
      cta: 'Simular largo plazo',
    },
  ];

  return (
    <section id="planes" className="py-24 lg:py-32 bg-cream-50/60 border-y border-earth-700/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          kicker="04 · Planes de pago"
          title="Tres caminos para llegar al mismo lugar."
          lead="Elegí lo que se acomoda a tu liquidez. Todos los planes se firman ante escribano y el lote queda a tu nombre desde el boleto."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((p) => {
            const featured = p.featured;
            return (
              <div
                key={p.key}
                className={`relative rounded-md p-8 lg:p-10 flex flex-col ${
                  featured
                    ? 'bg-earth-700 text-cream-50 border border-earth-700 lg:-mt-4 lg:mb-0 shadow-[0_30px_60px_-40px_rgba(74,56,38,0.6)]'
                    : 'bg-cream-50 text-earth-800 border border-earth-700/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`text-[10px] tracking-[0.3em] uppercase ${featured ? 'text-cream-200/70' : 'text-earth-600'}`}>{p.name}</div>
                  <span className={`text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full ${
                    featured ? 'bg-cream-50/15 text-cream-100' : p.tone === 'sage' ? 'bg-sage-400/20 text-sage-700' : 'bg-earth-700/10 text-earth-700'
                  }`}>{p.tag}</span>
                </div>

                <div className="mt-8">
                  <div className={`font-display text-5xl lg:text-6xl leading-none ${featured ? 'text-cream-50' : 'text-earth-800'}`}>{p.headline}</div>
                  <div className={`mt-2 text-sm ${featured ? 'text-cream-200/80' : 'text-earth-700/70'}`}>{p.headlineSub}</div>
                </div>

                <div className={`mt-6 text-sm leading-relaxed ${featured ? 'text-cream-100/90' : 'text-earth-700/80'}`}>
                  {p.bullet}
                </div>

                <div className={`my-8 ${featured ? 'border-t border-cream-200/20' : 'hairline'}`} />

                <dl className="space-y-3 text-sm">
                  {p.rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className={featured ? 'text-cream-200/70' : 'text-earth-600'}>{k}</dt>
                      <dd className={`text-right ${featured ? 'text-cream-50' : 'text-earth-800'}`}>{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10">
                  <a
                    href="#contacto"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm tracking-wide transition-colors ${
                      featured
                        ? 'bg-cream-50 text-earth-700 hover:bg-cream-100'
                        : 'bg-earth-700 text-cream-50 hover:bg-earth-800'
                    }`}
                  >
                    {p.cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed comparison table */}
        <div className="mt-16 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-4 pr-4 text-[10px] tracking-[0.3em] uppercase text-earth-600 font-normal w-1/4">Detalle</th>
                {plans.map((p) => (
                  <th key={p.key} className="py-4 px-4 text-[10px] tracking-[0.3em] uppercase text-earth-600 font-normal">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Precio total estimado', 'USD 13.950 · ' + ARS(19_530_000), 'USD 15.000 · ' + ARS(21_000_000), 'USD 15.000 + IPC'],
                ['Entrega inicial', '100%', ARS(6_000_000), ARS(6_500_000)],
                ['Cantidad de cuotas', '—', '12', '24 / 36 / 48'],
                ['Tipo de cuota', '—', 'Fija en pesos', 'Ajuste IPC mensual'],
                ['Posesión', 'Inmediata', 'Inmediata', 'Inmediata'],
                ['Escritura', '30 días', 'Al cancelar', 'Al cancelar'],
                ['Reserva', ARS(500_000), ARS(500_000), ARS(500_000)],
              ].map((row, i) => (
                <tr key={i} className="border-t border-earth-700/10">
                  <td className="py-4 pr-4 text-earth-700">{row[0]}</td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j} className={`py-4 px-4 ${j === 1 ? 'text-earth-800 font-medium' : 'text-earth-700'}`}>{cell}</td>
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

/* ─────────────────────── GALLERY ─────────────────────── */
function Gallery() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            kicker="05 · Galería"
            title="Cuatro estaciones, el mismo arroyo."
          />
          <div className="text-sm text-earth-700/70 max-w-xs">
            Las fotografías son reales y sin edición. Subí las tuyas arrastrándolas a cada cuadro.
          </div>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-4">
          <img src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-03.jpg" alt="Familias" className="col-span-12 md:col-span-5 w-full object-cover rounded-md" style={{ aspectRatio: '4/5', display: 'block' }} />
          <img src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-04.jpg" alt="Vida en el barrio" className="col-span-12 md:col-span-7 w-full object-cover rounded-md" style={{ aspectRatio: '16/10', display: 'block' }} />
          <img src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-05.jpg" alt="Paisaje del lote" className="col-span-12 md:col-span-7 w-full object-cover rounded-md" style={{ aspectRatio: '16/10', display: 'block' }} />
          <img src="https://estanciaparaiso.com.ar/wp-content/uploads/2022/07/Estancia-Paraiso-familias-06.jpg" alt="Naturaleza" className="col-span-12 md:col-span-5 w-full object-cover rounded-md" style={{ aspectRatio: '4/5', display: 'block' }} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── CONTACT / FOOTER ─────────────────────── */
function Contacto() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contacto" className="relative bg-earth-800 text-cream-100 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 text-cream-200/70">
            <span className="h-px w-10 bg-cream-200/40" />
            <span className="text-[10px] tracking-[0.3em] uppercase">06 · Reservá tu visita</span>
          </div>
          <h2 className="font-display mt-6 text-5xl md:text-6xl text-cream-50 leading-[1.05]">
            Vení a caminar el lote.<br/>
            <span className="font-display-italic text-cream-200">El paisaje convence solo.</span>
          </h2>
          <p className="mt-6 text-cream-100/80 max-w-md leading-relaxed">
            Coordinamos visitas guiadas los sábados. Te buscamos en el último cruce de ruta
            y volvés con la decisión tomada (o no, no hay apuro).
          </p>
          <div className="mt-10 space-y-3 text-sm">
            <div className="flex items-center gap-3"><span className="text-[10px] tracking-[0.3em] uppercase text-cream-200/60 w-20">Tel.</span>(0345) 422-7683</div>
            <div className="flex items-center gap-3"><span className="text-[10px] tracking-[0.3em] uppercase text-cream-200/60 w-20">Email</span>info@estanciaparaiso.com.ar</div>
            <div className="flex items-center gap-3"><span className="text-[10px] tracking-[0.3em] uppercase text-cream-200/60 w-20">Ubicación</span>Estancia Grande · Concordia · Entre Ríos</div>
            <div className="flex items-center gap-3 pt-3">
              <a href="https://www.instagram.com/estancia_paraiso_/" target="_blank" rel="noopener" className="link-underline text-cream-100">Instagram</a>
              <span className="text-cream-200/40">·</span>
              <a href="https://www.facebook.com/Estancia-Paraiso-131428373990355/" target="_blank" rel="noopener" className="link-underline text-cream-100">Facebook</a>
              <span className="text-cream-200/40">·</span>
              <a href="https://www.youtube.com/@Estanciaparaisoconcordia" target="_blank" rel="noopener" className="link-underline text-cream-100">YouTube</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <form onSubmit={submit} className="bg-cream-50 text-earth-800 rounded-md p-8 lg:p-10">
            {!sent ? (
              <>
                <div className="font-display text-3xl text-earth-800">Coordinemos.</div>
                <p className="mt-2 text-earth-700/70 text-sm">Te respondemos en el día.</p>
                <div className="mt-8 space-y-5">
                  <label className="block">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-earth-600">Nombre</div>
                    <input
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full mt-2 border-b border-earth-700/30 bg-transparent py-2 outline-none focus:border-earth-700 transition-colors text-earth-800"
                    />
                  </label>
                  <label className="block">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-earth-600">Email</div>
                    <input
                      required type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full mt-2 border-b border-earth-700/30 bg-transparent py-2 outline-none focus:border-earth-700 transition-colors text-earth-800"
                    />
                  </label>
                  <label className="block">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-earth-600">Mensaje</div>
                    <textarea
                      rows="3"
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      className="w-full mt-2 border-b border-earth-700/30 bg-transparent py-2 outline-none focus:border-earth-700 transition-colors text-earth-800 resize-none"
                      placeholder="Qué plan te interesa, cuándo querrías visitar…"
                    />
                  </label>
                </div>
                <button type="submit" className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-earth-700 text-cream-50 px-6 py-3 text-sm hover:bg-earth-800 transition-colors">
                  Enviar consulta
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </>
            ) : (
              <div className="py-10 text-center">
                <div className="font-display text-3xl text-earth-800">Gracias, {form.nombre || 'amigo'}.</div>
                <p className="mt-3 text-earth-700/70">Te escribimos a <span className="text-earth-800">{form.email}</span> en las próximas horas.</p>
                <button onClick={() => { setSent(false); setForm({nombre:'',email:'',mensaje:''}); }} className="mt-6 text-sm link-underline text-earth-700">Enviar otra consulta</button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* footer strip */}
      <div className="mt-24 border-t border-cream-200/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-cream-200/60">
          <div className="flex items-center gap-3">
            <BrandMark size={20} />
            <span className="font-display text-base text-cream-100">Estancia Paraíso</span>
            <span>· Barrio privado · Estancia Grande, Entre Ríos</span>
          </div>
          <div className="flex gap-6">
            <a href="https://estanciaparaiso.com.ar/master-plan-2/" target="_blank" rel="noopener" className="link-underline">Master Plan</a>
            <a href="https://estanciaparaiso.com.ar/tour-360/" target="_blank" rel="noopener" className="link-underline">Tour 360°</a>
            <a href="https://estanciaparaiso.com.ar/contacto/" target="_blank" rel="noopener" className="link-underline">Contacto</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── APP ─────────────────────── */
function App() {
  return (
    <>
      <Nav />
      <Hero />
      <ElLugar />
      <LaOportunidad />
      <Calculator />
      <Planes />
      <Gallery />
      <Contacto />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
