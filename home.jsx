/* ============================================================
   Anasayfa
   ============================================================ */

function Hero() {
  const { navigate } = useNav();
  const H = D.hero || {
    line1: "Güzelliğiniz,", line2: "ince ayrıntılarda", line3: "saklı.",
    eyebrow: "Estetik · Plastik · Rekonstrüktif Cerrahi",
    lede: "Op. Dr. Gökay Baykara ile doğal, dengeli ve size özgü sonuçlar.",
    btn1: "Randevu Al", btn2: "Hizmetleri keşfet"
  };
  return (
    <section className="hero">
      <div className="hero-grid wrap">
        <div className="hero-copy">
          <span className="eyebrow reveal is-in">{H.eyebrow}</span>
          <h1 className="display reveal is-in d1" style={{ marginTop: 22 }}>
            {H.line1}<br /><span className="serif-italic" style={{ color: "var(--gold-deep)" }}>{H.line2}</span><br />{H.line3}
          </h1>
          <p className="lede reveal is-in d2" style={{ marginTop: 26, maxWidth: "30em" }}>
            {H.lede}
          </p>
          <div className="hero-btns reveal is-in d3">
            <button className="btn btn--gold" onClick={() => navigate("contact")}>{H.btn1} <Arrow /></button>
            <button className="btn btn--ghost" onClick={() => navigate("services")}>{H.btn2}</button>
          </div>
          <div className="hero-stats reveal is-in d4">
            {D.stats.slice(0, 3).map(([n, l]) => (
              <div className="hstat" key={l}>
                <span className="hstat-n">{n}</span>
                <span className="hstat-l muted">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-media reveal is-in d2">
          <div className="hero-photo">
            <image-slot id="hero-portrait" src={D.doctor.portrait}
              placeholder="Doktor portresi" radius="0"></image-slot>
          </div>
          <div className="hero-badge">
            <span className="serif-italic" style={{ fontSize: 19 }}>Op. Dr.</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1.05 }}>Gökay Baykara</span>
            <span className="muted" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", marginTop: 6 }}>Ankara</span>
          </div>
        </div>
      </div>
      <div className="hero-marquee">
        <div className="marquee-track">
          {Array(2).fill(0).map((_, k) => (
            <span key={k}>
              Rinoplasti <i>·</i> Yüz Germe <i>·</i> Meme Estetiği <i>·</i> Liposuction <i>·</i> Botoks <i>·</i> Dolgu <i>·</i> Mikrocerrahi <i>·</i>&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="section philo">
      <div className="wrap philo-grid">
        <h2 className="h-section reveal" style={{ maxWidth: "11em" }}>
          Değiştirmek değil; <span className="serif-italic" style={{ color: "var(--gold-deep)" }}>kendi güzelliğinizi</span> ortaya çıkarmak.
        </h2>
        <div className="philo-side reveal d1">
          <p className="lede">
            Her yüzün ve her bedenin kendine özgü oranları vardır. Yaklaşımımızın merkezinde; bu dengeyi koruyan, doğal ve abartısız sonuçlar yer alır.
          </p>
          <p className="muted" style={{ marginTop: 16 }}>
            Planlamadan iyileşmeye kadar her aşamada şeffaf bir süreç ve güven veren bir iletişim önceliğimizdir.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturedServices() {
  const { navigate } = useNav();
  const list = D.featured.map((slug) => D.services.find((s) => s.slug === slug));
  return (
    <section className="section svc-section" style={{ background: "var(--ivory-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="svc-section-head">
          <SectionHead eyebrow="Öne Çıkan Hizmetler" title="Sık tercih edilen uygulamalar" />
          <button className="btn btn--ghost reveal d2 svc-all-btn" onClick={() => navigate("services")}>Tümünü gör <Arrow /></button>
        </div>
        <div className="svc-grid">
          {list.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function AboutTeaser() {
  const { navigate } = useNav();
  return (
    <section className="section about-teaser">
      <div className="wrap at-grid">
        <div className="at-media reveal">
          <image-slot id="about-portrait" src={D.doctor.portrait} placeholder="Doktor / klinik görseli" radius="0"></image-slot>
          <div className="at-exp">
            <span className="hstat-n">10+</span>
            <span className="muted" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>yıllık deneyim</span>
          </div>
        </div>
        <div className="at-copy">
          <span className="eyebrow reveal">Hakkında</span>
          <h2 className="h-section reveal d1" style={{ margin: "18px 0 22px" }}>Op. Dr. Gökay Baykara</h2>
          <p className="lede reveal d2">{D.doctor.bioShort}</p>
          <ul className="cred-list reveal d3">
            {D.doctor.credentials.map(([y, t]) => (
              <li key={t}><span className="cred-y">{y}</span><span className="cred-t">{t}</span></li>
            ))}
          </ul>
          <div className="reveal d4" style={{ marginTop: 30 }}>
            <button className="btn btn--ghost" onClick={() => navigate("about")}>Detaylı bilgi <Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    ["01", "Görüşme", "Beklentilerinizi dinler, yüz ve beden analizinizi yapar, size uygun seçenekleri şeffafça anlatırız."],
    ["02", "Planlama", "İşleme özel ayrıntılı bir plan ve zaman çizelgesi hazırlanır; tüm sorularınız netleşir."],
    ["03", "Uygulama & Takip", "Operasyon akredite ortamda gerçekleştirilir; iyileşme süreciniz adım adım takip edilir."]
  ];
  return (
    <section className="section approach">
      <div className="wrap">
        <SectionHead center eyebrow="Süreç" title="Güven veren, üç adımlı bir yolculuk" />
        <div className="step-grid">
          {steps.map(([n, t, d], i) => (
            <div className={"step reveal d" + (i + 1)} key={n}>
              <span className="step-n">{n}</span>
              <h3 className="step-t">{t}</h3>
              <p className="muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section testi" style={{ background: "var(--sand)" }}>
      <div className="wrap">
        <SectionHead center eyebrow="Hasta Deneyimleri" title="Güvenin sesi" />
        <div className="testi-grid">
          {D.testimonials.map((t, i) => (
            <figure className={"testi-card reveal d" + (i + 1)} key={i}>
              <div className="quote-mark serif-italic">"</div>
              <blockquote className="serif-italic">{t.text}</blockquote>
              <figcaption className="muted">{t.who}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const cards = [
    ["Instagram", "Paylaşımlarımızı takip edin, bizi daha yakından tanıyın.", "@opdrgokaybaykara", lk("instagram"), "ig"],
    ["Google", "Hakkımızdaki yorumları inceleyin, deneyiminizi paylaşın.", "Google Yorumlar", lk("google") || lk("maps"), "g"],
    ["Doktortakvimi", "Görüşleri inceleyin ve online randevu oluşturun.", "Randevu Al", lk("booking"), "dt"]
  ];
  return (
    <section className="section-sm sproof">
      <div className="wrap sproof-grid">
        {cards.map(([t, d, l, href, k], i) => (
          <a className={"sproof-card reveal d" + (i + 1)} key={k} href={href} target="_blank" rel="noopener">
            <span className="sproof-k">{t}</span>
            <p className="muted">{d}</p>
            <span className="tlink" style={{ fontSize: 11 }}>{l} <Arrow s={13} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function BlogTeaser() {
  const { navigate } = useNav();
  return (
    <section className="section blog-teaser" style={{ background: "var(--ivory-2)", borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="svc-section-head">
          <SectionHead eyebrow="Blog" title="Güncel yazılarımız" />
          <button className="btn btn--ghost reveal d2 svc-all-btn" onClick={() => navigate("blog")}>Tüm yazılar <Arrow /></button>
        </div>
        <div className="blog-grid">
          {D.blog.map((b, i) => (
            <article className={"blog-card reveal d" + (i + 1)} key={b.slug} onClick={() => navigate("post", b.slug)}>
              <div className="blog-media"><image-slot id={"blog-" + b.slug} src={b.img} placeholder="Blog görseli" radius="0"></image-slot></div>
              <div className="blog-meta"><span>{b.cat}</span><span>·</span><span>{b.date}</span></div>
              <h3 className="blog-title">{b.title}</h3>
              <span className="tlink" style={{ fontSize: 11 }}>Devamını oku <Arrow s={13} /></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  useReveal("home");
  const map = {
    philosophy: Philosophy,
    featured: FeaturedServices,
    about: AboutTeaser,
    approach: Approach,
    testimonials: Testimonials,
    social: SocialProof,
    blog: BlogTeaser
  };
  const secs = (D.sections && D.sections.length) ? D.sections : [
    { id: "philosophy", enabled: true }, { id: "featured", enabled: true },
    { id: "about", enabled: true }, { id: "approach", enabled: true },
    { id: "testimonials", enabled: true }, { id: "social", enabled: true },
    { id: "blog", enabled: true }
  ];
  return (
    <main className="page-fade">
      <Hero />
      {secs.filter((s) => s.enabled !== false).map((s) => {
        const C = map[s.id];
        return C ? <C key={s.id} /> : null;
      })}
    </main>
  );
}

window.Home = Home;
