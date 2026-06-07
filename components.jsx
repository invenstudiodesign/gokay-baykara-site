/* ============================================================
   Paylaşılan komponentler
   ============================================================ */
const { useState, useEffect, useRef, useContext, createContext } = React;

const D = window.DATA;

/* Linkler — D.links öncelikli, doctor'a düşer */
function lk(key) {
  const L = (window.DATA && window.DATA.links) || {};
  if (L[key] != null && L[key] !== "") return L[key];
  return ((window.DATA && window.DATA.doctor) || {})[key];
}
function waHref() {
  const w = lk("whatsapp") || lk("phoneHref") || "";
  const digits = String(w).replace(/[^0-9]/g, "");
  return "https://wa.me/" + digits;
}
window.lk = lk; window.waHref = waHref;

/* Navigasyon context'i (app.jsx ile paylaşılır) */
const NavCtx = createContext({ navigate: () => {}, route: { page: "home" } });
window.NavCtx = NavCtx;
const useNav = () => useContext(NavCtx);

/* ---------- Scroll reveal hook ---------- */
function useReveal(dep) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal:not(.is-in)"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    // fallback: anything above the fold
    requestAnimationFrame(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) el.classList.add("is-in");
      });
    });
    return () => io.disconnect();
  }, [dep]);
}

/* ---------- ikonlar ---------- */
const Arrow = ({ s = 14 }) => (
  <svg className="arrow" width={s} height={s} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const IG = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const Wa = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.13c-.24.69-1.42 1.32-1.95 1.36-.5.05-.97.24-3.27-.68-2.76-1.09-4.5-3.92-4.64-4.1-.13-.18-1.1-1.47-1.1-2.8 0-1.33.7-1.99.94-2.26.24-.27.53-.34.71-.34.18 0 .35.002.51.01.16.007.39-.06.6.46.24.58.81 1.99.88 2.13.07.14.12.31.02.49-.09.18-.14.29-.27.45-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.81.86.27.14.45.2.51.31.07.11.07.63-.17 1.32z"/>
  </svg>
);

/* ---------- Logo ---------- */
function Logo({ light, onClick }) {
  const t = (window.DATA && window.DATA.theme) || {};
  const name = t.logoText || "Gökay Baykara";
  const sub = t.logoSub || "Op. Dr. — Estetik Cerrahi";
  return (
    <a className={"logo" + (light ? " logo--light" : "")} onClick={onClick}
       style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
      {t.logoImg ? (
        <img src={t.logoImg} alt={name} style={{ height: 44, width: "auto", display: "block" }} />
      ) : (
        <>
          <span className="logo-mark" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="29" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <text x="30" y="39" textAnchor="middle" fontFamily="var(--serif)"
                    fontSize="30" fill="currentColor" fontWeight="500">{(name.trim().split(/\s+/).map((w) => w[0]).join("") || "GB").slice(0, 2).toUpperCase()}</text>
            </svg>
          </span>
          <span className="logo-text" style={{ lineHeight: 1 }}>
            <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: 21, letterSpacing: "0.02em" }}>{name}</span>
            <span style={{ display: "block", fontFamily: "var(--sans)", fontSize: 9.5, letterSpacing: "0.34em", textTransform: "uppercase", opacity: 0.7, marginTop: 3 }}>{sub}</span>
          </span>
        </>
      )}
    </a>
  );
}

/* ---------- Header ---------- */
function Header() {
  const { navigate, route } = useNav();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setMobile(false); setMega(false); }, [route]);

  const go = (page, param) => (e) => { e && e.preventDefault(); navigate(page, param); };

  const navItem = (label, page, param) => (
    <a className={"nav-item" + (route.page === page ? " active" : "")} onClick={go(page, param)}>{label}</a>
  );

  const byCat = (c) => D.services.filter((s) => s.cat === c);

  return (
    <>
      <header className={"site-head" + (scrolled ? " scrolled" : "")}>
        <div className="head-inner">
          <Logo onClick={go("home")} />

          <nav className="nav-main" onMouseLeave={() => setMega(false)}>
            {(D.nav || []).filter((n) => n.enabled !== false).map((n) => (
              n.page === "services" ? (
                <a key={n.id} className={"nav-item" + (route.page === "service" || route.page === "services" ? " active" : "")}
                   onMouseEnter={() => setMega(true)} onClick={go("services")}>
                  {n.label}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 6 }}><path d="M6 9l6 6 6-6"/></svg>
                </a>
              ) : (
                <a key={n.id} className={"nav-item" + (route.page === n.page ? " active" : "")} onClick={go(n.page, n.param)}>{n.label}</a>
              )
            ))}
          </nav>

          <div className="head-cta">
            <a className="head-phone" href={"tel:" + lk("phoneHref")}>{lk("phone")}</a>
            <button className="btn btn--gold head-book" onClick={go("contact")}>
              Randevu Al <Arrow />
            </button>
            <button className="burger" onClick={() => setMobile(true)} aria-label="Menü">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div className={"mega" + (mega ? " open" : "")} onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
          <div className="mega-inner">
            {D.categories.map((c) => (
              <div className="mega-col" key={c.id}>
                <div className="mega-cat">{c.label}</div>
                <ul>
                  {byCat(c.id).slice(0, 6).map((s) => (
                    <li key={s.slug}><a onClick={go("service", s.slug)}>{s.title}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mega-feature">
              <div className="eyebrow">Randevu</div>
              <p className="serif-italic" style={{ fontSize: 23, lineHeight: 1.3, margin: "10px 0 18px" }}>Hangi işlem size uygun? Birlikte değerlendirelim.</p>
              <button className="btn btn--gold" onClick={go("contact")}>Görüşme planla <Arrow /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobil menü */}
      <div className={"mobile-menu" + (mobile ? " open" : "")}>
        <div className="mm-top">
          <Logo light onClick={go("home")} />
          <button className="mm-close" onClick={() => setMobile(false)} aria-label="Kapat">✕</button>
        </div>
        <nav className="mm-nav">
          {(D.nav || []).filter((n) => n.enabled !== false).map((n) => (
            <a key={n.id} onClick={go(n.page, n.param)}>{n.label}</a>
          ))}
        </nav>
        <div className="mm-foot">
          <button className="btn btn--light" onClick={go("contact")} style={{ width: "100%", justifyContent: "center" }}>Randevu Al <Arrow /></button>
          <a className="mm-phone" href={"tel:" + lk("phoneHref")}>{lk("phone")}</a>
        </div>
      </div>
    </>
  );
}

/* ---------- Bölüm başlığı ---------- */
function SectionHead({ eyebrow, title, center, children }) {
  return (
    <div className={"sec-head" + (center ? " center" : "")}>
      {eyebrow && <span className={"eyebrow reveal" + (center ? " center" : "")}>{eyebrow}</span>}
      {title && <h2 className="h-section reveal d1" style={{ marginTop: 18, maxWidth: 18 + "em" }}>{title}</h2>}
      {children && <div className="reveal d2" style={{ marginTop: 18 }}>{children}</div>}
    </div>
  );
}

/* ---------- Hizmet kartı ---------- */
function ServiceCard({ s, i }) {
  const { navigate } = useNav();
  return (
    <article className={"svc-card reveal d" + ((i % 3) + 1)} onClick={() => navigate("service", s.slug)}>
      <div className="svc-media">
        <image-slot id={"svc-" + s.slug} {...(s.img ? { src: s.img } : {})}
          placeholder={s.title + " görseli"} radius="0"></image-slot>
        <span className="svc-tag">{s.sub}</span>
      </div>
      <div className="svc-body">
        <h3 className="svc-title">{s.title}</h3>
        <p className="svc-short muted">{s.short}</p>
        <span className="tlink" style={{ fontSize: 11.5 }}>Detaylı bilgi <Arrow s={13} /></span>
      </div>
    </article>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const { navigate } = useNav();
  const go = (p, x) => (e) => { e.preventDefault(); navigate(p, x); };
  return (
    <footer className="site-foot">
      <div className="wrap foot-cta reveal">
        <span className="eyebrow center">Randevu</span>
        <h2 className="h-section" style={{ color: "var(--ivory)", margin: "16px 0 26px", maxWidth: "14em" }}>
          Aklınızdaki soruyu <span className="serif-italic" style={{ color: "var(--gold-soft)" }}>çekinmeden</span> sorun.
        </h2>
        <p className="lede" style={{ color: "rgba(247,243,236,0.72)", maxWidth: "44em", margin: "0 auto 30px" }}>
          Herhangi bir estetik, plastik ve rekonstrüktif işlem hakkında bilgi almak için iletişim formunu kullanabilir; sosyal medya veya WhatsApp üzerinden ulaşabilirsiniz.
        </p>
        <div className="foot-cta-btns">
          <button className="btn btn--gold" onClick={go("contact")}>Randevu Al <Arrow /></button>
          <a className="btn btn--light" href={lk("instagram")} target="_blank" rel="noopener"><IG s={16} /> Instagram</a>
        </div>
      </div>

      <div className="foot-grid wrap">
        <div className="foot-brand">
          <Logo light onClick={go("home")} />
          <p className="muted" style={{ color: "rgba(247,243,236,0.55)", marginTop: 20, maxWidth: "26em" }}>
            {D.doctor.role} · {D.doctor.city}
          </p>
        </div>
        <div className="foot-col">
          <div className="foot-h">Sayfalar</div>
          {(D.nav || []).filter((n) => n.enabled !== false).map((n) => (
            <a key={n.id} onClick={go(n.page, n.param)}>{n.label}</a>
          ))}
        </div>
        <div className="foot-col">
          <div className="foot-h">Öne çıkan</div>
          {D.featured.slice(0,5).map((slug) => {
            const s = D.services.find((x) => x.slug === slug);
            return <a key={slug} onClick={go("service", slug)}>{s.title}</a>;
          })}
        </div>
        <div className="foot-col">
          <div className="foot-h">İletişim</div>
          <a href={"tel:" + lk("phoneHref")}>{lk("phone")}</a>
          <a href={"mailto:" + lk("email")}>{lk("email")}</a>
          <a href={lk("maps")} target="_blank" rel="noopener">Ankara · Harita</a>
          <a href={lk("instagram")} target="_blank" rel="noopener">@opdrgokaybaykara</a>
        </div>
      </div>

      <div className="foot-bottom wrap">
        <span>© {new Date().getFullYear()} Op. Dr. Gökay Baykara · Tüm hakları saklıdır.</span>
        <span className="muted" style={{ color: "rgba(247,243,236,0.4)" }}>Bu sitede yer alan içerikler bilgilendirme amaçlıdır, tıbbi tavsiye yerine geçmez. · <a href="admin.html" style={{ color: "rgba(247,243,236,0.4)", textDecoration: "none" }}>Yönetim</a></span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  NavCtx, useNav, useReveal, Arrow, IG, Wa, Logo, Header, Footer, SectionHead, ServiceCard
});
