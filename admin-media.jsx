/* ============================================================
   ADMIN — Medya kütüphanesi + Öncesi-Sonrası galeri + Randevular
   ============================================================ */

/* ---------------- MEDYA ---------------- */
function Media() {
  const [, f] = uS(0);
  const d = S.get();
  const toast = useToast();
  const inp = uR();
  const [del, setDel] = uS(null);

  const upload = async (files) => {
    for (const file of files) {
      try {
        const url = await window.imgUtils.fileToDataURL(file, 1400, 0.82);
        S.addMedia({ name: file.name, src: url });
      } catch (e) {}
    }
    f((n) => n + 1); toast("Görsel(ler) yüklendi");
  };

  const copy = (src) => { navigator.clipboard?.writeText(src); toast("Görsel kopyalandı"); };

  return (
    <div>
      <div className="toolbar-row">
        <div className="adm-sub">{d.media.length} görsel · yüklenen görseller blog ve hizmetlerde kullanılabilir</div>
        <button className="abtn abtn--gold" onClick={() => inp.current.click()}><I d={Icon.plus} s={15} /> Görsel yükle</button>
        <input ref={inp} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => upload([...e.target.files])} />
      </div>
      {d.media.length === 0 ? (
        <Empty icon="🖼" title="Kütüphane boş" sub="Yüklediğiniz görseller burada toplanır ve her yerde kullanılabilir." action={<button className="abtn abtn--gold" onClick={() => inp.current.click()}>Görsel yükle</button>} />
      ) : (
        <div className="media-grid">
          {d.media.map((m) => (
            <div className="media-item" key={m.id}>
              <div className="media-thumb"><img src={m.src} alt={m.name} /></div>
              <div className="media-info">
                <span className="media-name" title={m.name}>{m.name}</span>
                <button className="abtn abtn--danger abtn--sm abtn--icon" onClick={() => setDel(m)} title="Sil">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {del && <Confirm danger title="Görseli sil" body="Bu görsel kütüphaneden kaldırılacak." onNo={() => setDel(null)} onYes={() => { S.deleteMedia(del.id); setDel(null); f((n) => n + 1); toast("Görsel silindi"); }} />}
    </div>
  );
}

/* ---------------- ÖNCESİ-SONRASI GALERİ ---------------- */
function Gallery() {
  const [, f] = uS(0);
  const d = S.get();
  const toast = useToast();
  const [edit, setEdit] = uS(null); // {id?, title, before, after, cat}
  const [del, setDel] = uS(null);

  const blank = { title: "", cat: "", before: "", after: "" };

  return (
    <div>
      <div className="toolbar-row">
        <div className="adm-sub">{d.gallery.length} öncesi-sonrası · sitede galeri bölümünde görünür</div>
        <button className="abtn abtn--gold" onClick={() => setEdit(blank)}><I d={Icon.plus} s={15} /> Yeni ekle</button>
      </div>

      {d.gallery.length === 0 ? (
        <Empty icon="◐" title="Henüz görsel yok" sub="Öncesi-sonrası karşılaştırmaları ekleyin. Hasta onayı olan görselleri kullanmayı unutmayın." action={<button className="abtn abtn--gold" onClick={() => setEdit(blank)}>Yeni ekle</button>} />
      ) : (
        <div className="media-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))" }}>
          {d.gallery.map((g) => (
            <div className="media-item" key={g.id}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <div className="media-thumb" style={{ borderRadius: 0 }}>{g.before ? <img src={g.before} alt="öncesi" /> : null}<span className="pill" style={{ position: "absolute", top: 6, left: 6 }}>Öncesi</span></div>
                <div className="media-thumb" style={{ borderRadius: 0 }}>{g.after ? <img src={g.after} alt="sonrası" /> : null}<span className="pill pill--gold" style={{ position: "absolute", top: 6, right: 6 }}>Sonrası</span></div>
              </div>
              <div className="media-info">
                <span className="media-name">{g.title || "Başlıksız"}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button className="abtn abtn--ghost abtn--sm" onClick={() => setEdit(g)}>Düzenle</button>
                  <button className="abtn abtn--danger abtn--sm abtn--icon" onClick={() => setDel(g)}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {edit && <GalleryEditor g={edit} onClose={() => setEdit(null)} onSave={(g) => { S.upsertGallery(g); setEdit(null); f((n) => n + 1); toast("Kaydedildi"); }} />}
      {del && <Confirm danger title="Sil" body="Bu öncesi-sonrası kaydı silinecek." onNo={() => setDel(null)} onYes={() => { S.deleteGallery(del.id); setDel(null); f((n) => n + 1); toast("Silindi"); }} />}
    </div>
  );
}

function GalleryEditor({ g, onClose, onSave }) {
  const [form, setForm] = uS({ ...g });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
        <h3>{g.id ? "Düzenle" : "Öncesi-sonrası ekle"}</h3>
        <div className="afield"><span className="afield-l">Başlık / işlem</span><input className="ainput" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="örn. Rinoplasti" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 8 }}>
          <div className="afield"><span className="afield-l">Öncesi</span><Uploader value={form.before} onChange={(url) => set("before", url)} aspect="3/4" label="Öncesi görseli" /></div>
          <div className="afield"><span className="afield-l">Sonrası</span><Uploader value={form.after} onChange={(url) => set("after", url)} aspect="3/4" label="Sonrası görseli" /></div>
        </div>
        <div className="modal-actions">
          <button className="abtn abtn--ghost" onClick={onClose}>İptal</button>
          <button className="abtn abtn--gold" onClick={() => onSave(form)}>Kaydet</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- RANDEVU TALEPLERİ ---------------- */
function Appointments() {
  const [, f] = uS(0);
  const d = S.get();
  const toast = useToast();
  const [filter, setFilter] = uS("all");
  const [del, setDel] = uS(null);

  const list = d.appointments.filter((a) => filter === "all" ? true : a.status === filter);
  const fmt = (ts) => { const n = new Date(ts); return n.toLocaleDateString("tr-TR") + " · " + n.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }); };
  const segs = [["all", "Tümü"], ["new", "Yeni"], ["contacted", "Arandı"], ["done", "Tamamlandı"]];

  return (
    <div>
      <div className="toolbar-row">
        <div className="seg">
          {segs.map(([k, l]) => (
            <button key={k} className={filter === k ? "on" : ""} onClick={() => setFilter(k)}>
              {l}{k === "new" && d.appointments.filter((a) => a.status === "new").length > 0 ? " (" + d.appointments.filter((a) => a.status === "new").length + ")" : ""}
            </button>
          ))}
        </div>
        <div className="adm-sub">Site randevu formundan gelen talepler</div>
      </div>

      {list.length === 0 ? (
        <Empty icon="✦" title="Talep yok" sub="Sitedeki randevu formu doldurulduğunda talepler burada görünür. Denemek için siteyi açıp form gönderin." />
      ) : (
        <div className="adm-list">
          {list.map((a) => (
            <div className="row-card" key={a.id} style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
              <div className="row-main">
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="row-title" style={{ fontSize: 19 }}>{a.name}</span>
                  <span className={"pill " + (a.status === "new" ? "pill--new" : a.status === "contacted" ? "pill--contacted" : "pill--done")}>
                    {a.status === "new" ? "Yeni" : a.status === "contacted" ? "Arandı" : "Tamamlandı"}
                  </span>
                </div>
                <div className="row-meta" style={{ marginTop: 6 }}>
                  <span className="pill pill--gold">{a.serviceName || a.service}</span>
                  <span>📞 {a.phone}</span>
                  {a.email && <span>· {a.email}</span>}
                  {(a.date || a.time) && <span>· Tercih: {a.date} {a.time}</span>}
                  <span>· {fmt(a.ts)}</span>
                </div>
                {a.note && <p style={{ marginTop: 8, fontSize: 14, color: "var(--ink-soft)", fontStyle: "italic" }}>"{a.note}"</p>}
              </div>
              <div className="row-actions" style={{ flexWrap: "wrap" }}>
                <a className="abtn abtn--ghost abtn--sm" href={"tel:" + a.phone}>Ara</a>
                {a.status !== "contacted" && <button className="abtn abtn--ghost abtn--sm" onClick={() => { S.setAppointmentStatus(a.id, "contacted"); f((n) => n + 1); toast("Arandı olarak işaretlendi"); }}>Arandı</button>}
                {a.status !== "done" && <button className="abtn abtn--gold abtn--sm" onClick={() => { S.setAppointmentStatus(a.id, "done"); f((n) => n + 1); toast("Tamamlandı"); }}>Tamamla</button>}
                <button className="abtn abtn--danger abtn--sm abtn--icon" onClick={() => setDel(a)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {del && <Confirm danger title="Talebi sil" body="Bu randevu talebi silinecek." onNo={() => setDel(null)} onYes={() => { S.deleteAppointment(del.id); setDel(null); f((n) => n + 1); toast("Silindi"); }} />}
    </div>
  );
}

Object.assign(window, { Media, Gallery, Appointments });
