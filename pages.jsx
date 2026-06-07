/* ============================================================
   Sayfalar: Hakkında, Hizmetler, Hizmet detay, Blog, Yazı, İletişim
   ============================================================ */

/* ---------- Sayfa başlığı (alt sayfalar) ---------- */
function PageHero({ eyebrow, title, sub, crumbs }) {
  const { navigate } = useNav();
  return (
    <section className="page-hero">
      <div className="wrap">
        {crumbs && (
          <div className="crumbs reveal is-in">
            <a onClick={() => navigate("home")}>Anasayfa</a>
            {crumbs.map((c, i) => (
              <span key={i}><span className="crumb-sep">/</span>{c.page ? <a onClick={() => navigate(c.page, c.param)}>{c.label}</a> : <span>{c.label}</span>}</span>
            ))}
          </div>
        )}
        {eyebrow && <span className="eyebrow reveal is-in d1" style={{ marginTop: 18 }}>{eyebrow}</span>}
        <h1 className="display reveal is-in d2" style={{ fontSize: "clamp(40px,6vw,80px)", marginTop: 16 }}>{title}</h1>
        {sub && <p className="lede reveal is-in d3" style={{ maxWidth: "40em", marginTop: 18 }}>{sub}</p>}
      </div>
    </section>
  );
}

/* ---------- HAKKINDA ---------- */
function About() {
  useReveal("about");
  const { navigate } = useNav();
  return (
    <main className="page-fade">
      <PageHero eyebrow="Hakkında" title="Op. Dr. Gökay Baykara"
        sub="Doğal, dengeli ve size özgü sonuçlara inanan; estetikten rekonstrüktif cerrahiye geniş bir alanda hizmet veren bir cerrah."
        crumbs={[{ label: "Hakkında" }]} />

      <section className="section about-main">
        <div className="wrap about-main-grid">
          <div className="about-photo reveal">
            <image-slot id="about-page-portrait" src={D.doctor.portrait} placeholder="Doktor portresi" radius="0"></image-slot>
          </div>
          <div className="about-text">
            {D.doctor.bio.map((p, i) => (
              <p key={i} className={"reveal d" + (i + 1)} style={{ fontSize: i === 0 ? 21 : 17, color: i === 0 ? "var(--ink)" : "var(--ink-soft)", fontFamily: i === 0 ? "var(--serif)" : "var(--sans)", lineHeight: i === 0 ? 1.45 : 1.75, marginBottom: 20 }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--ink)", color: "var(--ivory)" }}>
        <div className="wrap stat-strip">
          {D.stats.map(([n, l], i) => (
            <div className={"stat-cell reveal d" + (i + 1)} key={l}>
              <span className="stat-n">{n}</span>
              <span className="stat-l">{l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap timeline-grid">
          <SectionHead eyebrow="Eğitim & Deneyim" title="Kısa bir yolculuk" />
          <div className="timeline reveal d1">
            {D.doctor.credentials.map(([y, t], i) => (
              <div className="tl-row" key={i}>
                <span className="tl-y">{y}</span>
                <span className="tl-dot"></span>
                <span className="tl-t">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ paddingBottom: "clamp(70px,10vw,120px)" }}>
        <div className="wrap center">
          <button className="btn btn--gold reveal" onClick={() => navigate("contact")}>Randevu Al <Arrow /></button>
        </div>
      </section>
    </main>
  );
}

/* ---------- HİZMETLER (genel) ---------- */
function Services() {
  useReveal("services");
  const [active, setActive] = useState("all");
  const cats = [{ id: "all", label: "Tümü" }, ...D.categories];
  const list = active === "all" ? D.services : D.services.filter((s) => s.cat === active);
  return (
    <main className="page-fade">
      <PageHero eyebrow="Hizmetler" title="Uygulamalar"
        sub="Estetik cerrahiden medikal estetiğe ve rekonstrüktif uygulamalara kadar geniş bir yelpazede, kişiye özel planlanan işlemler."
        crumbs={[{ label: "Hizmetler" }]} />
      <section className="section" style={{ paddingTop: "clamp(30px,4vw,50px)" }}>
        <div className="wrap">
          <div className="svc-filter reveal is-in">
            {cats.map((c) => (
              <button key={c.id} className={"chip" + (active === c.id ? " on" : "")} onClick={() => setActive(c.id)}>{c.label}</button>
            ))}
          </div>
          <div className="svc-grid" style={{ marginTop: 44 }}>
            {list.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- HİZMET DETAY ---------- */
function ServiceDetail({ slug }) {
  useReveal("service-" + slug);
  const { navigate } = useNav();
  const s = D.services.find((x) => x.slug === slug) || D.services[0];
  const related = D.services.filter((x) => x.cat === s.cat && x.slug !== s.slug).slice(0, 3);
  const catLabel = (D.categories.find((c) => c.id === s.cat) || {}).label;
  return (
    <main className="page-fade">
      <section className="svc-hero">
        <div className="wrap svc-hero-grid">
          <div className="svc-hero-copy">
            <div className="crumbs reveal is-in">
              <a onClick={() => navigate("home")}>Anasayfa</a>
              <span className="crumb-sep">/</span>
              <a onClick={() => navigate("services")}>Hizmetler</a>
              <span className="crumb-sep">/</span><span>{s.title}</span>
            </div>
            <span className="eyebrow reveal is-in d1" style={{ marginTop: 20 }}>{catLabel} · {s.sub}</span>
            <h1 className="display reveal is-in d2" style={{ fontSize: "clamp(40px,6vw,84px)", marginTop: 14 }}>{s.title}</h1>
            <p className="lede reveal is-in d3" style={{ marginTop: 20, maxWidth: "32em" }}>{s.short}</p>
            <div className="reveal is-in d4" style={{ marginTop: 30 }}>
              <button className="btn btn--gold" onClick={() => navigate("contact", s.slug)}>Bu işlem için randevu <Arrow /></button>
            </div>
          </div>
          <div className="svc-hero-media reveal is-in d2">
            <image-slot id={"svcd-" + s.slug} {...(s.img ? { src: s.img } : {})} placeholder={s.title + " görseli"} radius="0"></image-slot>
          </div>
        </div>
      </section>

      <section className="section svc-detail">
        <div className="wrap svc-detail-grid">
          <div className="svc-detail-main">
            <span className="eyebrow reveal">Genel Bakış</span>
            <p className="reveal d1" style={{ fontFamily: "var(--serif)", fontSize: 25, lineHeight: 1.45, margin: "18px 0 24px" }}>{s.body}</p>
            <p className="muted reveal d2">
              Her hasta için süreç bireyseldir. Aşağıdaki başlıklar genel bilgilendirme amaçlıdır; size özel planı ilk görüşmede birlikte oluştururuz.
            </p>
          </div>
          <aside className="svc-detail-side reveal d2">
            <div className="side-card">
              <div className="foot-h" style={{ color: "var(--gold-deep)" }}>Öne çıkanlar</div>
              <ul className="check-list">
                {s.points.map((p) => (
                  <li key={p}><span className="check">✓</span>{p}</li>
                ))}
              </ul>
              <button className="btn btn--gold" style={{ width: "100%", justifyContent: "center", marginTop: 22 }} onClick={() => navigate("contact", s.slug)}>Randevu Al <Arrow /></button>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" style={{ background: "var(--ivory-2)", borderTop: "1px solid var(--line)" }}>
          <div className="wrap">
            <SectionHead eyebrow="İlgili" title="Benzer uygulamalar" />
            <div className="svc-grid">
              {related.map((r, i) => <ServiceCard key={r.slug} s={r} i={i} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

/* ---------- BLOG LİSTE ---------- */
function Blog() {
  useReveal("blog");
  const { navigate } = useNav();
  return (
    <main className="page-fade">
      <PageHero eyebrow="Blog" title="Güncel Yazılar"
        sub="Estetik ve rekonstrüktif cerrahiye dair merak edilenler; süreçler, iyileşme ve sık sorulan sorular üzerine notlar."
        crumbs={[{ label: "Blog" }]} />
      <section className="section" style={{ paddingTop: "clamp(20px,3vw,40px)" }}>
        <div className="wrap">
          <div className="blog-grid blog-grid--page">
            {D.blog.map((b, i) => (
              <article className={"blog-card reveal d" + ((i % 3) + 1)} key={b.slug} onClick={() => navigate("post", b.slug)}>
                <div className="blog-media"><image-slot id={"blogp-" + b.slug} src={b.img} placeholder="Blog görseli" radius="0"></image-slot></div>
                <div className="blog-meta"><span>{b.cat}</span><span>·</span><span>{b.date}</span><span>·</span><span>{b.read}</span></div>
                <h3 className="blog-title">{b.title}</h3>
                <p className="muted" style={{ fontSize: 15 }}>{b.excerpt}</p>
                <span className="tlink" style={{ fontSize: 11 }}>Devamını oku <Arrow s={13} /></span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- BLOG YAZISI ---------- */
function Post({ slug }) {
  useReveal("post-" + slug);
  const { navigate } = useNav();
  const b = D.blog.find((x) => x.slug === slug) || D.blog[0];
  return (
    <main className="page-fade">
      <section className="post-hero">
        <div className="wrap" style={{ maxWidth: 880 }}>
          <div className="crumbs reveal is-in">
            <a onClick={() => navigate("home")}>Anasayfa</a><span className="crumb-sep">/</span>
            <a onClick={() => navigate("blog")}>Blog</a><span className="crumb-sep">/</span><span>{b.cat}</span>
          </div>
          <div className="blog-meta reveal is-in d1" style={{ marginTop: 22, justifyContent: "center" }}>
            <span>{b.cat}</span><span>·</span><span>{b.date}</span><span>·</span><span>{b.read} okuma</span>
          </div>
          <h1 className="reveal is-in d2" style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: "clamp(32px,4.6vw,56px)", lineHeight: 1.08, marginTop: 16, textAlign: "center" }}>{b.title}</h1>
        </div>
      </section>
      <div className="wrap" style={{ maxWidth: 980 }}>
        <div className="post-cover reveal"><image-slot id={"postc-" + b.slug} src={b.img} placeholder="Kapak görseli" radius="0"></image-slot></div>
      </div>
      <article className="wrap post-body" style={{ maxWidth: 720 }}>
        {Array.isArray(b.blocks) && b.blocks.length > 0 ? (
          b.blocks.map((blk, i) => {
            if (blk.type === "h") return <h3 key={i} className="reveal" style={{ fontSize: 30, margin: "36px 0 14px" }}>{blk.value}</h3>;
            if (blk.type === "quote") return <blockquote key={i} className="post-quote reveal serif-italic">{blk.value}</blockquote>;
            if (blk.type === "image") return blk.value ? (
              <figure key={i} className="reveal" style={{ margin: "30px 0" }}>
                <div className="post-cover" style={{ aspectRatio: "16/9" }}><img src={blk.value} alt={blk.caption || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                {blk.caption && <figcaption className="muted" style={{ fontSize: 13, textAlign: "center", marginTop: 10 }}>{blk.caption}</figcaption>}
              </figure>
            ) : null;
            return <p key={i} className="reveal">{blk.value}</p>;
          })
        ) : (
          <>
            <p className="reveal" style={{ fontFamily: "var(--serif)", fontSize: 23, lineHeight: 1.5, marginBottom: 28 }}>{b.excerpt}</p>
            <p className="reveal d1">Bu yazı, konuya dair genel bir bilgilendirme sunmak için hazırlanmıştır. Her hastanın durumu kendine özgüdür; kesin değerlendirme ve planlama için yüz yüze görüşme gereklidir.</p>
            <h3 className="reveal d1" style={{ fontSize: 30, margin: "36px 0 14px" }}>Süreç nasıl ilerliyor?</h3>
            <p className="reveal d1">İlk görüşmede beklentileriniz dinlenir, gerekli değerlendirmeler yapılır ve size uygun yaklaşım şeffaf biçimde anlatılır. Karar aşamasında sizi yönlendirmeden, doğru bilgilendirmeyi önceliklendiriyoruz.</p>
            <blockquote className="post-quote reveal d1 serif-italic">"Doğal sonuç, müdahaleyi değil; kişinin kendi ifadesini öne çıkarır."</blockquote>
            <p className="reveal d1">İyileşme süreciniz adım adım takip edilir ve her aşamada size bir bakım planı paylaşılır. Aklınıza takılan her soru için bize ulaşabilirsiniz.</p>
          </>
        )}
        <div className="post-cta reveal d1">
          <div>
            <div className="eyebrow">Randevu</div>
            <p className="serif-italic" style={{ fontSize: 24, margin: "8px 0 0" }}>Bu konuda görüşmek ister misiniz?</p>
          </div>
          <button className="btn btn--gold" onClick={() => navigate("contact")}>Randevu Al <Arrow /></button>
        </div>
      </article>
      <section className="section" style={{ background: "var(--ivory-2)", borderTop: "1px solid var(--line)", marginTop: 70 }}>
        <div className="wrap">
          <SectionHead eyebrow="Devamı" title="Diğer yazılar" />
          <div className="blog-grid">
            {D.blog.filter((x) => x.slug !== b.slug).map((o, i) => (
              <article className={"blog-card reveal d" + (i + 1)} key={o.slug} onClick={() => navigate("post", o.slug)}>
                <div className="blog-media"><image-slot id={"posto-" + o.slug} src={o.img} placeholder="Blog görseli" radius="0"></image-slot></div>
                <div className="blog-meta"><span>{o.cat}</span><span>·</span><span>{o.date}</span></div>
                <h3 className="blog-title">{o.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

window.About = About;
window.Services = Services;
window.ServiceDetail = ServiceDetail;
window.Blog = Blog;
window.Post = Post;
window.PageHero = PageHero;
