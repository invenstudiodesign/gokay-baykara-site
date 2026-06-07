/* ============================================================
   ADMIN — Sortable (sürükle-bırak) + Linkler, Menü, Tema, Bölümler, Kullanıcılar
   ============================================================ */

/* ---------------- Sürükle-bırak liste ---------------- */
function Sortable({ items, onReorder, renderItem, keyFn, className }) {
  const [drag, setDrag] = uS(null);
  const [over, setOver] = uS(null);
  const k = keyFn || ((it, i) => i);
  return (
    <div className={className || "sortable"}>
      {items.map((it, i) => (
        <div
          key={k(it, i)}
          className={"sortable-row" + (drag === i ? " dragging" : "") + (over === i && drag !== null && drag !== i ? " over" : "")}
          draggable
          onDragStart={(e) => { setDrag(i); e.dataTransfer.effectAllowed = "move"; }}
          onDragEnter={() => setOver(i)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={() => { if (drag !== null && over !== null && drag !== over) onReorder(drag, over); setDrag(null); setOver(null); }}
        >
          <span className="drag-handle" title="Sürükle">⠿</span>
          <div className="sortable-body">{renderItem(it, i)}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- LİNKLER ---------------- */
function LinksEditor() {
  const d = S.get();
  const toast = useToast();
  const [f, setF] = uS({ ...(d.links || {}) });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const fields = [
    ["phone", "Telefon (görünen)", "0505 799 15 30"],
    ["phoneHref", "Telefon (arama no, +90…)", "+905057991530"],
    ["whatsapp", "WhatsApp numarası", "+905057991530"],
    ["email", "E-posta", "info@gokaybaykara.com"],
    ["instagram", "Instagram URL", "https://instagram.com/…"],
    ["google", "Google / Yorumlar URL", "https://g.page/…"],
    ["maps", "Harita (konum) URL", "https://maps.google.com/…"],
    ["booking", "Randevu (Doktortakvimi) URL", "https://doktortakvimi.com/…"]
  ];
  const test = (url) => { if (url) window.open(url, "_blank"); };
  return (
    <div className="adm-form" style={{ maxWidth: 760 }}>
      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>İletişim & sosyal bağlantılar</h3><span className="adm-sub">Tüm sitede otomatik güncellenir</span></div>
        {fields.map(([k, label, ph]) => (
          <div className="afield" key={k}>
            <span className="afield-l">{label}</span>
            <div style={{ display: "flex", gap: 8 }}>
              <input className="ainput" value={f[k] || ""} onChange={(e) => set(k, e.target.value)} placeholder={ph} />
              {(k === "instagram" || k === "google" || k === "maps" || k === "booking") &&
                <button className="abtn abtn--ghost abtn--sm" onClick={() => test(f[k])} title="Linki test et">Test ↗</button>}
            </div>
          </div>
        ))}
      </div>
      <button className="abtn abtn--gold" onClick={() => { S.updateLinks(f); toast("Bağlantılar kaydedildi"); }}>Değişiklikleri kaydet</button>
    </div>
  );
}

/* ---------------- MENÜ (nav) ---------------- */
const PAGE_OPTS = [
  ["home", "Anasayfa"], ["about", "Hakkında"], ["services", "Hizmetler"],
  ["blog", "Blog"], ["contact", "İletişim"]
];
function NavEditor() {
  const [, force] = uS(0);
  const d = S.get();
  const toast = useToast();
  const nav = d.nav || [];
  const update = (id, patch) => { S.updateNav(nav.map((n) => n.id === id ? { ...n, ...patch } : n)); force((x) => x + 1); };
  const add = () => { S.addNavItem({ label: "Yeni öğe", page: "home", enabled: true }); force((x) => x + 1); toast("Menü öğesi eklendi"); };
  const del = (id) => { S.deleteNavItem(id); force((x) => x + 1); toast("Silindi"); };
  return (
    <div className="adm-form" style={{ maxWidth: 720 }}>
      <div className="toolbar-row">
        <div className="adm-sub">Sürükleyerek sıralayın · kapatınca menüden gizlenir</div>
        <button className="abtn abtn--gold" onClick={add}><I d={Icon.plus} s={15} /> Öğe ekle</button>
      </div>
      <Sortable items={nav} keyFn={(n) => n.id} onReorder={(a, b) => { S.reorder("nav", a, b); force((x) => x + 1); }}
        renderItem={(n) => (
          <div className="nav-row">
            <input className="ainput" style={{ flex: "1 1 180px" }} value={n.label} onChange={(e) => update(n.id, { label: e.target.value })} placeholder="Etiket" />
            <select className="aselect" style={{ width: 150 }} value={n.page} onChange={(e) => update(n.id, { page: e.target.value })}>
              {PAGE_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <label className="switch" title="Görünür">
              <input type="checkbox" checked={n.enabled !== false} onChange={(e) => update(n.id, { enabled: e.target.checked })} />
              <span className="switch-tr"></span>
            </label>
            <button className="abtn abtn--danger abtn--sm abtn--icon" onClick={() => del(n.id)}>✕</button>
          </div>
        )} />
    </div>
  );
}

/* ---------------- TEMA / GÖRÜNÜM ---------------- */
const ACCENTS = ["#B0894F", "#9C7B4A", "#A8733E", "#7E6A52", "#6E7E6A", "#8A6D7C", "#3F5C6B", "#1E1A15"];
const SERIFS = ["Cormorant Garamond", "Playfair Display", "EB Garamond", "Cormorant", "Lora"];
const SANSS = ["Jost", "Manrope", "Montserrat", "Work Sans", "Outfit"];
function ThemeEditor() {
  const d = S.get();
  const toast = useToast();
  const [t, setT] = uS({ ...(d.theme || {}) });
  const apply = (patch) => { const nt = { ...t, ...patch }; setT(nt); S.updateTheme(patch); };
  return (
    <div className="adm-form" style={{ maxWidth: 820 }}>
      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>Vurgu rengi</h3><span className="adm-sub">Değişiklik anında uygulanır</span></div>
        <div className="swatch-row">
          {ACCENTS.map((c) => (
            <button key={c} className={"swatch" + (t.accent === c ? " on" : "")} style={{ background: c }}
              onClick={() => apply({ accent: c, accentDeep: "", accentSoft: "" })} title={c} />
          ))}
          <label className="swatch swatch--custom" title="Özel renk">
            <input type="color" value={t.accent || "#B0894F"} onChange={(e) => apply({ accent: e.target.value, accentDeep: "", accentSoft: "" })} />
            <span>+</span>
          </label>
        </div>
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
          <span className="adm-sub">Seçili:</span>
          <span style={{ fontFamily: "monospace", fontSize: 14, color: "var(--gold-deep)" }}>{t.accent}</span>
        </div>
      </div>

      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>Yazı tipleri</h3></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="afield">
            <span className="afield-l">Başlık fontu (serif)</span>
            <select className="aselect" value={t.serif} onChange={(e) => apply({ serif: e.target.value })}>
              {SERIFS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <div style={{ fontFamily: t.serif + ", serif", fontSize: 30, marginTop: 8 }}>Güzellik · Aa</div>
          </div>
          <div className="afield">
            <span className="afield-l">Gövde fontu (sans)</span>
            <select className="aselect" value={t.sans} onChange={(e) => apply({ sans: e.target.value })}>
              {SANSS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <div style={{ fontFamily: t.sans + ", sans-serif", fontSize: 16, marginTop: 12 }}>Doğal, dengeli sonuçlar.</div>
          </div>
        </div>
      </div>

      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>Logo</h3></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="afield"><span className="afield-l">Logo metni</span><input className="ainput" value={t.logoText || ""} onChange={(e) => apply({ logoText: e.target.value })} placeholder="Gökay Baykara" /></div>
          <div className="afield"><span className="afield-l">Alt yazı</span><input className="ainput" value={t.logoSub || ""} onChange={(e) => apply({ logoSub: e.target.value })} placeholder="Op. Dr. — Estetik Cerrahi" /></div>
        </div>
        <div className="afield">
          <span className="afield-l">Logo görseli (yüklerseniz metin yerine kullanılır)</span>
          <Uploader value={t.logoImg} onChange={(url) => apply({ logoImg: url })} aspect="3/1" label="Logo görseli yükle (PNG, şeffaf önerilir)" />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button className="abtn abtn--gold" onClick={() => toast("Tema kaydedildi")}>Kaydet</button>
        <button className="abtn abtn--ghost" onClick={() => { const def = { accent: "#B0894F", accentDeep: "", accentSoft: "", serif: "Cormorant Garamond", sans: "Jost", logoText: "Gökay Baykara", logoSub: "Op. Dr. — Estetik Cerrahi", logoImg: "" }; setT(def); S.updateTheme(def); toast("Varsayılana sıfırlandı"); }}>Varsayılana sıfırla</button>
      </div>
    </div>
  );
}

/* ---------------- BÖLÜMLER (anasayfa düzeni) ---------------- */
function SectionsEditor() {
  const [, force] = uS(0);
  const d = S.get();
  const toast = useToast();
  const secs = d.sections || [];
  const toggle = (id, v) => { S.updateSections(secs.map((s) => s.id === id ? { ...s, enabled: v } : s)); force((x) => x + 1); };
  return (
    <div className="adm-form" style={{ maxWidth: 680 }}>
      <div className="toolbar-row">
        <div className="adm-sub">Anasayfadaki bölümlerin sırası ve görünürlüğü · sürükleyerek sıralayın</div>
      </div>
      <div className="panel-box">
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, color: "var(--taupe)", fontSize: 13 }}>
          <span className="pill pill--gold">Hero</span> her zaman en üstte (sabit)
        </div>
        <Sortable items={secs} keyFn={(s) => s.id} onReorder={(a, b) => { S.reorder("sections", a, b); force((x) => x + 1); }}
          renderItem={(s, i) => (
            <div className="nav-row">
              <span style={{ width: 26, color: "var(--taupe)", fontSize: 13 }}>{i + 1}.</span>
              <span style={{ flex: 1, fontFamily: "var(--serif)", fontSize: 20 }}>{s.label}</span>
              <label className="switch" title="Görünür">
                <input type="checkbox" checked={s.enabled !== false} onChange={(e) => toggle(s.id, e.target.checked)} />
                <span className="switch-tr"></span>
              </label>
            </div>
          )} />
      </div>
      <button className="abtn abtn--gold" style={{ marginTop: 18 }} onClick={() => toast("Bölüm düzeni kaydedildi")}>Tamam</button>
    </div>
  );
}

/* ---------------- KULLANICILAR ---------------- */
const ROLES = [["admin", "Admin"], ["editor", "Editör"], ["designer", "Tasarımcı"]];
const roleLabel = (r) => (ROLES.find((x) => x[0] === r) || ["", r])[1];
function UsersEditor() {
  const [, force] = uS(0);
  const d = S.get();
  const toast = useToast();
  const [edit, setEdit] = uS(null);
  const [del, setDel] = uS(null);
  const blank = { username: "", password: "", role: "editor", name: "" };
  return (
    <div>
      <div className="toolbar-row">
        <div className="adm-sub">{d.users.length} kullanıcı · roller giriş yetkisini belirler</div>
        <button className="abtn abtn--gold" onClick={() => setEdit(blank)}><I d={Icon.plus} s={15} /> Kullanıcı ekle</button>
      </div>
      <div className="adm-list">
        {d.users.map((u) => (
          <div className="row-card" key={u.id}>
            <div className="usr-av">{(u.name || u.username || "?").slice(0, 1).toUpperCase()}</div>
            <div className="row-main">
              <div className="row-title" style={{ fontSize: 19 }}>{u.name || u.username}</div>
              <div className="row-meta"><span className={"pill pill--" + u.role}>{roleLabel(u.role)}</span><span>@{u.username}</span></div>
            </div>
            <div className="row-actions">
              <button className="abtn abtn--ghost abtn--sm" onClick={() => setEdit(u)}>Düzenle</button>
              {u.username !== "admin" && <button className="abtn abtn--danger abtn--sm" onClick={() => setDel(u)}>Sil</button>}
            </div>
          </div>
        ))}
      </div>

      <div className="panel-box" style={{ marginTop: 22 }}>
        <h4 style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-deep)", margin: "0 0 14px" }}>Rol yetkileri</h4>
        <div className="role-grid">
          <div><b>Admin</b><span>Her şeye tam yetki — içerik, tasarım, linkler, kullanıcılar.</span></div>
          <div><b>Editör</b><span>Blog, hizmetler, galeri, randevular, SSS, SEO. Tasarım ve kullanıcılar hariç.</span></div>
          <div><b>Tasarımcı</b><span>Tema, hero, bölüm düzeni, medya ve galeri. Metin/ayar değiştiremez.</span></div>
        </div>
      </div>

      {edit && <UserModal u={edit} onClose={() => setEdit(null)} onSave={(u) => { S.upsertUser(u); setEdit(null); force((x) => x + 1); toast("Kaydedildi"); }} />}
      {del && <Confirm danger title="Kullanıcıyı sil" body={`"${del.name || del.username}" silinecek.`} onNo={() => setDel(null)} onYes={() => { S.deleteUser(del.id); setDel(null); force((x) => x + 1); toast("Silindi"); }} />}
    </div>
  );
}
function UserModal({ u, onClose, onSave }) {
  const [f, setF] = uS({ ...u });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{u.id ? "Kullanıcıyı düzenle" : "Yeni kullanıcı"}</h3>
        <div className="afield"><span className="afield-l">Ad</span><input className="ainput" value={f.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="Ad Soyad" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="afield"><span className="afield-l">Kullanıcı adı</span><input className="ainput" value={f.username || ""} onChange={(e) => set("username", e.target.value)} placeholder="kullanici" /></div>
          <div className="afield"><span className="afield-l">Şifre</span><input className="ainput" value={f.password || ""} onChange={(e) => set("password", e.target.value)} placeholder="••••••" /></div>
        </div>
        <div className="afield">
          <span className="afield-l">Rol</span>
          <select className="aselect" value={f.role} onChange={(e) => set("role", e.target.value)} disabled={u.username === "admin"}>
            {ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="modal-actions">
          <button className="abtn abtn--ghost" onClick={onClose}>İptal</button>
          <button className="abtn abtn--gold" onClick={() => { if (!f.username || !f.password) return; onSave(f); }}>Kaydet</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- YAYINLA / DIŞA AKTAR ---------------- */
function buildDataJs() {
  const s = S.get();
  const out = {};
  ["doctor", "stats", "categories", "featured", "services", "blog", "testimonials", "faq", "gallery", "hero", "seo", "links", "nav", "theme", "sections", "users"]
    .forEach((k) => { out[k] = s[k]; });
  return "/* Op. Dr. Gökay Baykara — içerik dosyası\n   Bu dosya admin panelindeki \"Yayınla\" ile üretildi. " + new Date().toLocaleString("tr-TR") + "\n   Yayına almak için GitHub deposundaki data.js ile değiştirin. */\nwindow.DATA = " + JSON.stringify(out, null, 2) + ";\n";
}
function dl(name, text, type) {
  const blob = new Blob([text], { type: type || "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function PublishEditor() {
  const toast = useToast();
  const fileRef = uR();
  const d = S.get();
  const counts = `${d.blog.length} yazı · ${d.services.length} hizmet · ${d.gallery.length} galeri`;
  const publish = () => { dl("data.js", buildDataJs(), "text/javascript;charset=utf-8"); toast("data.js indirildi — GitHub'a yükleyin"); };
  const backup = () => { dl("gokay-yedek-" + new Date().toISOString().slice(0, 10) + ".json", JSON.stringify(S.get(), null, 2), "application/json"); toast("Yedek indirildi"); };
  const restore = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try { const data = JSON.parse(r.result); localStorage.setItem(S.KEY, JSON.stringify(data)); S.reload(); toast("Yedek geri yüklendi"); }
      catch (e) { alert("Geçersiz yedek dosyası."); }
    };
    r.readAsText(file);
  };
  return (
    <div className="adm-form" style={{ maxWidth: 760 }}>
      <div className="panel-box pub-hero" style={{ marginBottom: 20 }}>
        <div className="eyebrow" style={{ color: "var(--gold-deep)" }}>Yayınla</div>
        <h3 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, margin: "10px 0 8px" }}>Değişiklikleri kaynağa aktar</h3>
        <p className="muted" style={{ marginBottom: 4 }}>
          Panelde yaptığınız tüm değişiklikler (metin, hizmet, blog, tema, linkler, menü, düzen) şu an bu tarayıcıda kayıtlı. <b>Yayınla</b> ile bunlar tek bir <code>data.js</code> dosyasına dönüşür; bu dosyayı GitHub'a yükleyince <b>herkes için kalıcı</b> olur.
        </p>
        <p className="muted" style={{ fontSize: 13 }}>İçerik: {counts}</p>
        <button className="abtn abtn--gold" style={{ marginTop: 16, fontSize: 14, padding: "14px 28px" }} onClick={publish}>↓ data.js indir (yayınla)</button>
      </div>

      <div className="panel-box" style={{ marginBottom: 20 }}>
        <div className="panel-h"><h3>Nasıl yayınlanır?</h3></div>
        <ol className="pub-steps">
          <li><b>data.js indir (yayınla)</b> butonuna basın — bilgisayarınıza <code>data.js</code> iner.</li>
          <li>GitHub deposunda <code>data.js</code> (veya <code>site/data.js</code>) dosyasını açın → kalem ✏️ → <b>içeriği silip yeni dosyayı sürükleyin</b> ya da <b>Upload files</b> ile aynı isimle yükleyin.</li>
          <li><b>Commit changes</b> deyin. Site birkaç dakikada güncellenir; artık tüm ziyaretçiler yeni içeriği görür.</li>
        </ol>
        <div style={{ background: "var(--gold-tint)", borderRadius: "var(--radius-lg)", padding: "12px 16px", fontSize: 13.5, color: "var(--ink-soft)" }}>
          💡 İpucu: Yayınlamadan önce <b>Siteyi görüntüle</b> ile değişikliklerinizi önizleyebilirsiniz — emin olunca yayınlayın.
        </div>
      </div>

      <div className="panel-box">
        <div className="panel-h"><h3>Yedekleme</h3><span className="adm-sub">Güvenli kopya</span></div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="abtn abtn--ghost" onClick={backup}>↓ Yedek indir (.json)</button>
          <button className="abtn abtn--ghost" onClick={() => fileRef.current.click()}>↑ Yedek geri yükle</button>
          <input ref={fileRef} type="file" accept="application/json,.json" style={{ display: "none" }} onChange={(e) => restore(e.target.files[0])} />
        </div>
        <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>Yedek, o anki tüm içeriği (randevu talepleri dahil) saklar. Geri yükleme mevcut verinin üzerine yazar.</p>
      </div>
    </div>
  );
}

Object.assign(window, { Sortable, LinksEditor, NavEditor, ThemeEditor, SectionsEditor, UsersEditor, PublishEditor, roleLabel, ROLES });
