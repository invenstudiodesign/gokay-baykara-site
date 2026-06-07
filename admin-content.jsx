/* ============================================================
   ADMIN — Hizmetler + Anasayfa metinleri + SSS/yorumlar
   ============================================================ */

/* ---------------- HİZMETLER ---------------- */
function ServiceList({ go }) {
  const [, f] = uS(0);
  const d = S.get();
  const toast = useToast();
  const [del, setDel] = uS(null);
  const catLabel = (id) => (d.categories.find((c) => c.id === id) || {}).label || id;
  return (
    <div>
      <div className="toolbar-row">
        <div className="adm-sub">{d.services.length} hizmet · {d.featured.length} tanesi anasayfada öne çıkıyor</div>
        <button className="abtn abtn--gold" onClick={() => go("services/new")}><I d={Icon.plus} s={15} /> Yeni hizmet</button>
      </div>

      {d.featured.length > 0 && (
        <div className="panel-box" style={{ marginBottom: 20 }}>
          <div className="panel-h"><h3>Öne çıkanlar sırası</h3><span className="adm-sub">Anasayfada görünüm sırası · sürükleyin</span></div>
          <Sortable items={d.featured.map((sl) => d.services.find((x) => x.slug === sl)).filter(Boolean)} keyFn={(s) => s.slug}
            onReorder={(a, b) => { S.reorder("featured", a, b); f((n) => n + 1); }}
            renderItem={(s) => (
              <div className="nav-row">
                <span style={{ flex: 1, fontFamily: "var(--serif)", fontSize: 19 }}>{s.title}</span>
                <button className="abtn abtn--ghost abtn--sm" onClick={() => { S.toggleFeatured(s.slug); f((n) => n + 1); toast("Öne çıkarmadan kaldırıldı"); }}>Kaldır</button>
              </div>
            )} />
        </div>
      )}
      <div className="adm-list">
        <Sortable items={d.services} keyFn={(s) => s.slug} onReorder={(a, b) => { S.reorder("services", a, b); f((n) => n + 1); }}
          renderItem={(s) => (
            <div className="row-card" style={{ border: "none", padding: 0, background: "none" }}>
              <div className="row-thumb">{s.img ? <img src={s.img} alt="" /> : <div style={{ display: "grid", placeItems: "center", height: "100%", color: "var(--taupe)", fontSize: 11 }}>—</div>}</div>
              <div className="row-main">
                <div className="row-title">{s.title}</div>
                <div className="row-meta"><span className="pill">{catLabel(s.cat)}</span><span>{s.sub}</span></div>
              </div>
              <div className="row-actions">
                <button className={"abtn abtn--sm " + (d.featured.includes(s.slug) ? "abtn--gold" : "abtn--ghost")}
                  onClick={() => { S.toggleFeatured(s.slug); f((n) => n + 1); toast(d.featured.includes(s.slug) ? "Öne çıkarmadan kaldırıldı" : "Anasayfaya eklendi"); }}>
                  {d.featured.includes(s.slug) ? "★ Öne çıkan" : "☆ Öne çıkar"}
                </button>
                <button className="abtn abtn--ghost abtn--sm" onClick={() => go("services/edit/" + s.slug)}>Düzenle</button>
                <button className="abtn abtn--danger abtn--sm" onClick={() => setDel(s)}>Sil</button>
              </div>
            </div>
          )} />
      </div>
      {del && <Confirm danger title="Hizmeti sil" body={`"${del.title}" silinecek.`}
        onNo={() => setDel(null)} onYes={() => { S.deleteService(del.slug); setDel(null); f((n) => n + 1); toast("Hizmet silindi"); }} />}
    </div>
  );
}

function ServiceEditor({ slug, go }) {
  const editing = slug && slug !== "new";
  const ex = editing ? S.get().services.find((s) => s.slug === slug) : null;
  const cats = S.get().categories;
  const toast = useToast();

  const [form, setForm] = uS({
    title: ex?.title || "", sub: ex?.sub || "", cat: ex?.cat || cats[0].id,
    short: ex?.short || "", body: ex?.body || "", img: ex?.img || "",
    points: ex?.points || ["", "", "", ""]
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setPoint = (i, v) => setForm((f) => { const p = [...f.points]; p[i] = v; return { ...f, points: p }; });

  const save = () => {
    if (!form.title.trim()) { toast("Lütfen hizmet adı girin"); return; }
    S.upsertService({
      slug: ex?.slug, title: form.title.trim(), sub: form.sub.trim(), cat: form.cat,
      short: form.short.trim(), body: form.body.trim(), img: form.img,
      points: form.points.map((p) => p.trim()).filter(Boolean)
    });
    toast(editing ? "Hizmet güncellendi" : "Hizmet eklendi");
    go("services");
  };

  return (
    <div className="adm-form">
      <div className="editor-grid">
        <div>
          <div className="afield"><input className="ainput big" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Hizmet adı… (örn. Burun Estetiği)" autoFocus /></div>
          <div className="afield">
            <span className="afield-l">Alt başlık / yöntem</span>
            <input className="ainput" value={form.sub} onChange={(e) => set("sub", e.target.value)} placeholder="örn. Rinoplasti" />
          </div>
          <div className="afield">
            <span className="afield-l">Kısa açıklama (kart)</span>
            <textarea className="atext" value={form.short} onChange={(e) => set("short", e.target.value)} placeholder="Tek cümlelik özet" style={{ minHeight: 70 }} />
          </div>
          <div className="afield">
            <span className="afield-l">Detay metni (hizmet sayfası)</span>
            <textarea className="atext" value={form.body} onChange={(e) => set("body", e.target.value)} placeholder="İşlemi anlatan paragraf" style={{ minHeight: 140 }} />
          </div>
          <div className="afield">
            <span className="afield-l">Öne çıkanlar (4 madde)</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {form.points.map((p, i) => (
                <input key={i} className="ainput" value={p} onChange={(e) => setPoint(i, e.target.value)} placeholder={"Madde " + (i + 1)} />
              ))}
            </div>
          </div>
        </div>
        <aside className="aside-box">
          <h4>Ayarlar</h4>
          <div className="afield">
            <span className="afield-l">Kategori</span>
            <select className="aselect" value={form.cat} onChange={(e) => set("cat", e.target.value)}>
              {cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div className="afield">
            <span className="afield-l">Görsel</span>
            <Uploader value={form.img} onChange={(url) => set("img", url)} aspect="4/3" />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button className="abtn abtn--ghost" onClick={() => go("services")} style={{ flex: 1, justifyContent: "center" }}>İptal</button>
            <button className="abtn abtn--gold" onClick={save} style={{ flex: 1, justifyContent: "center" }}>{editing ? "Güncelle" : "Ekle"}</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------------- ANASAYFA / DOKTOR METİNLERİ ---------------- */
function HomeContent() {
  const d = S.get();
  const toast = useToast();
  const [doc, setDoc] = uS({ ...d.doctor });
  const [stats, setStats] = uS(d.stats.map((s) => [...s]));
  const setStat = (i, j, v) => setStats((s) => { const c = s.map((x) => [...x]); c[i][j] = v; return c; });
  const saveDoc = () => { S.updateDoctor(doc); S.updateStats(stats); toast("Anasayfa içeriği kaydedildi"); };
  return (
    <div className="adm-form" style={{ maxWidth: 760 }}>
      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>Hero & tanıtım</h3></div>
        <div className="afield"><span className="afield-l">İsim</span><input className="ainput" value={doc.name} onChange={(e) => setDoc({ ...doc, name: e.target.value })} /></div>
        <div className="afield"><span className="afield-l">Slogan</span><input className="ainput" value={doc.tagline} onChange={(e) => setDoc({ ...doc, tagline: e.target.value })} /></div>
        <div className="afield"><span className="afield-l">Kısa biyografi (anasayfa)</span><textarea className="atext" value={doc.bioShort} onChange={(e) => setDoc({ ...doc, bioShort: e.target.value })} /></div>
      </div>

      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>İstatistikler</h3></div>
        <div style={{ display: "grid", gap: 10 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 10 }}>
              <input className="ainput" value={s[0]} onChange={(e) => setStat(i, 0, e.target.value)} placeholder="10+" />
              <input className="ainput" value={s[1]} onChange={(e) => setStat(i, 1, e.target.value)} placeholder="yıllık deneyim" />
            </div>
          ))}
        </div>
      </div>

      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>İletişim bilgileri</h3></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="afield"><span className="afield-l">Telefon</span><input className="ainput" value={doc.phone} onChange={(e) => setDoc({ ...doc, phone: e.target.value })} /></div>
          <div className="afield"><span className="afield-l">E-posta</span><input className="ainput" value={doc.email} onChange={(e) => setDoc({ ...doc, email: e.target.value })} /></div>
        </div>
      </div>

      <button className="abtn abtn--gold" onClick={saveDoc}>Değişiklikleri kaydet</button>
    </div>
  );
}

/* ---------------- SSS + YORUMLAR ---------------- */
function FaqContent() {
  const d = S.get();
  const toast = useToast();
  const [faq, setFaq] = uS(d.faq.map((x) => [...x]));
  const [tes, setTes] = uS(d.testimonials.map((t) => ({ ...t })));
  const setF = (i, j, v) => setFaq((f) => { const c = f.map((x) => [...x]); c[i][j] = v; return c; });
  const setT = (i, k, v) => setTes((t) => { const c = t.map((x) => ({ ...x })); c[i][k] = v; return c; });
  const save = () => {
    S.updateFaq(faq.filter((x) => x[0].trim()));
    S.updateTestimonials(tes.filter((t) => t.text.trim()));
    toast("Kaydedildi");
  };
  return (
    <div className="adm-form" style={{ maxWidth: 820 }}>
      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h">
          <h3>Sık sorulan sorular</h3>
          <button className="abtn abtn--ghost abtn--sm" onClick={() => setFaq((f) => [...f, ["", ""]])}>＋ Soru</button>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          {faq.map((q, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--line)", paddingBottom: 14 }}>
              <input className="ainput" style={{ marginBottom: 8, fontWeight: 500 }} value={q[0]} onChange={(e) => setF(i, 0, e.target.value)} placeholder="Soru" />
              <textarea className="atext" value={q[1]} onChange={(e) => setF(i, 1, e.target.value)} placeholder="Cevap" style={{ minHeight: 60 }} />
            </div>
          ))}
        </div>
      </div>

      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h">
          <h3>Hasta deneyimleri</h3>
          <button className="abtn abtn--ghost abtn--sm" onClick={() => setTes((t) => [...t, { text: "", who: "" }])}>＋ Yorum</button>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          {tes.map((t, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--line)", paddingBottom: 14 }}>
              <textarea className="atext" value={t.text} onChange={(e) => setT(i, "text", e.target.value)} placeholder="Yorum metni" style={{ minHeight: 60, marginBottom: 8 }} />
              <input className="ainput" value={t.who} onChange={(e) => setT(i, "who", e.target.value)} placeholder="örn. Rinoplasti hastası" />
            </div>
          ))}
        </div>
      </div>

      <button className="abtn abtn--gold" onClick={save}>Değişiklikleri kaydet</button>
    </div>
  );
}

/* ---------------- HERO EDİTÖRÜ ---------------- */
function HeroContent() {
  const d = S.get();
  const toast = useToast();
  const [h, setH] = uS({ ...(d.hero || {}) });
  const set = (k, v) => setH((f) => ({ ...f, [k]: v }));
  return (
    <div className="adm-form" style={{ maxWidth: 760 }}>
      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>Hero başlığı</h3><span className="adm-sub">Üç satır + vurgulu italik orta satır</span></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div className="afield"><span className="afield-l">1. satır</span><input className="ainput" value={h.line1||""} onChange={(e) => set("line1", e.target.value)} placeholder="Güzelliğiniz," /></div>
          <div className="afield"><span className="afield-l">2. satır (altın italik)</span><input className="ainput" value={h.line2||""} onChange={(e) => set("line2", e.target.value)} placeholder="ince ayrıntılarda" /></div>
          <div className="afield"><span className="afield-l">3. satır</span><input className="ainput" value={h.line3||""} onChange={(e) => set("line3", e.target.value)} placeholder="saklı." /></div>
        </div>
        <div className="afield">
          <span className="afield-l">Üst etiket (eyebrow)</span>
          <input className="ainput" value={h.eyebrow||""} onChange={(e) => set("eyebrow", e.target.value)} placeholder="Estetik · Plastik · Rekonstrüktif Cerrahi" />
        </div>
        <div className="afield">
          <span className="afield-l">Alt açıklama (hero lede)</span>
          <textarea className="atext" value={h.lede||""} onChange={(e) => set("lede", e.target.value)} style={{ minHeight: 80 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="afield"><span className="afield-l">Ana buton metni</span><input className="ainput" value={h.btn1||""} onChange={(e) => set("btn1", e.target.value)} placeholder="Randevu Al" /></div>
          <div className="afield"><span className="afield-l">İkinci buton metni</span><input className="ainput" value={h.btn2||""} onChange={(e) => set("btn2", e.target.value)} placeholder="Hizmetleri keşfet" /></div>
        </div>
      </div>
      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>Önizleme</h3></div>
        <div style={{ padding: "28px 24px", background: "var(--ivory)", borderRadius: "var(--radius-lg)", borderLeft: "3px solid var(--gold)" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-deep)", marginBottom: 10 }}>{h.eyebrow}</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 36, lineHeight: 1.05, marginBottom: 12 }}>
            {h.line1 || "—"}<br />
            <span style={{ color: "var(--gold-deep)", fontStyle: "italic" }}>{h.line2 || "—"}</span><br />
            {h.line3 || "—"}
          </div>
          <div style={{ fontSize: 15, color: "var(--ink-soft)", maxWidth: "36em" }}>{h.lede}</div>
        </div>
      </div>
      <button className="abtn abtn--gold" onClick={() => { S.updateHero(h); toast("Hero kaydedildi"); }}>Değişiklikleri kaydet</button>
    </div>
  );
}

/* ---------------- SEO AYARLARI ---------------- */
function SeoContent() {
  const d = S.get();
  const toast = useToast();
  const [seo, setSeo] = uS({ ...(d.seo || {}) });
  const set = (k, v) => setSeo((f) => ({ ...f, [k]: v }));
  return (
    <div className="adm-form" style={{ maxWidth: 760 }}>
      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>Temel SEO</h3></div>
        <div className="afield">
          <span className="afield-l">Sayfa başlığı (title)</span>
          <input className="ainput" value={seo.title||""} onChange={(e) => set("title", e.target.value)} placeholder="Op. Dr. Gökay Baykara — Estetik Cerrahi | Ankara" />
          <span style={{ fontSize: 12, color: (seo.title||"").length > 60 ? "#C0563E" : "var(--taupe)", marginTop: 4 }}>{(seo.title||"").length}/60 karakter önerilir</span>
        </div>
        <div className="afield">
          <span className="afield-l">Meta açıklama (description)</span>
          <textarea className="atext" value={seo.description||""} onChange={(e) => set("description", e.target.value)} style={{ minHeight: 80 }} placeholder="Ankara'da estetik cerrahide uzman..." />
          <span style={{ fontSize: 12, color: (seo.description||"").length > 160 ? "#C0563E" : "var(--taupe)", marginTop: 4 }}>{(seo.description||"").length}/160 karakter önerilir</span>
        </div>
        <div className="afield">
          <span className="afield-l">Anahtar kelimeler</span>
          <textarea className="atext" value={seo.keywords||""} onChange={(e) => set("keywords", e.target.value)} style={{ minHeight: 60 }} placeholder="estetik cerrahi ankara, rinoplasti, burun estetiği…" />
        </div>
      </div>
      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>Open Graph / Sosyal medya paylaşımı</h3></div>
        <div className="afield">
          <span className="afield-l">OG Görsel URL (paylaşım görseli)</span>
          <input className="ainput" value={seo.ogImage||""} onChange={(e) => set("ogImage", e.target.value)} placeholder="https://…/og-image.jpg (1200×630 önerilir)" />
        </div>
        <div className="afield">
          <span className="afield-l">Canonical URL</span>
          <input className="ainput" value={seo.canonical||""} onChange={(e) => set("canonical", e.target.value)} placeholder="https://gokaybaykara.com/" />
        </div>
        <div style={{ background: "var(--gold-tint)", borderRadius: "var(--radius-lg)", padding: "14px 18px", fontSize: 13.5, color: "var(--ink-soft)" }}>
          <b style={{ color: "var(--gold-deep)" }}>Otomatik üretilenler:</b> Her sayfa için başlık, açıklama, og:type, JSON-LD (LocalBusiness + Physician), Twitter Card ve robots meta etiketi site tarafından otomatik oluşturulur. Burada yalnızca genel değerleri düzenlemeniz yeterlidir.
        </div>
      </div>
      <button className="abtn abtn--gold" onClick={() => { S.updateSeo(seo); toast("SEO ayarları kaydedildi"); }}>Değişiklikleri kaydet</button>
    </div>
  );
}

Object.assign(window, { ServiceList, ServiceEditor, HomeContent, FaqContent, HeroContent, SeoContent });
