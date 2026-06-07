/* ============================================================
   ADMIN — çekirdek: ikonlar, yardımcılar, giriş, kabuk, dashboard
   ============================================================ */
const { useState: uS, useEffect: uE, useRef: uR, createContext: cC, useContext: uC, useCallback: uCB } = React;
const S = window.STORE;

/* ---------- İkonlar ---------- */
const Icon = {
  dash: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  blog: "M4 4h16v4H4zM4 10h10v2H4zM4 14h16v2H4zM4 18h10v2H4z",
  svc: "M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z",
  media: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6",
  gallery: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  apt: "M7 2v3M17 2v3M3 8h18M5 5h14v16H5zM9 12h2v2H9zM13 12h2v2h-2z",
  home: "M3 11l9-8 9 8M5 9v11h5v-6h4v6h5V9",
  faq: "M12 18h.01M9.5 9a2.5 2.5 0 1 1 3.6 2.2c-.8.5-1.1 1-1.1 1.8v.5",
  out: "M9 4H5v16h4M16 12H9M14 8l4 4-4 4",
  plus: "M12 5v14M5 12h14",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  links: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
  nav: "M4 6h16M4 12h16M4 18h16",
  theme: "M12 3a9 9 0 1 0 1 17.9c.8-.1 1-1 .5-1.6-.5-.7-.2-1.8.7-2h1.8a4 4 0 0 0 4-4c0-5-4-8.3-8-8.3zM7.5 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
  sections: "M4 5h16v5H4zM4 14h16v5H4z",
  users: "M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 21v-2a4 4 0 0 0-3-3.87M16 4a3.5 3.5 0 0 1 0 7",
  publish: "M12 16V4M7 9l5-5 5 5M5 20h14",
};
function I({ d, s = 18 }) {
  return <svg className="ai" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}

/* ---------- Toast ---------- */
const ToastCtx = cC(() => {});
function useToast() { return uC(ToastCtx); }
function ToastHost({ children }) {
  const [msg, setMsg] = uS(null);
  const ref = uR();
  const toast = uCB((m) => {
    setMsg(m); clearTimeout(ref.current);
    ref.current = setTimeout(() => setMsg(null), 2400);
  }, []);
  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className={"toast" + (msg ? " show" : "")}><span className="tk">✓</span>{msg}</div>
    </ToastCtx.Provider>
  );
}

/* ---------- Onay modalı ---------- */
function Confirm({ title, body, onYes, onNo, danger }) {
  return (
    <div className="modal-bg" onClick={onNo}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="modal-actions">
          <button className="abtn abtn--ghost" onClick={onNo}>Vazgeç</button>
          <button className={"abtn " + (danger ? "abtn--danger" : "abtn--gold")} onClick={onYes}>Evet, devam et</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Görsel yükleyici ---------- */
function Uploader({ value, onChange, label, aspect }) {
  const [drag, setDrag] = uS(false);
  const [busy, setBusy] = uS(false);
  const inp = uR();
  const handle = async (file) => {
    if (!file) return;
    setBusy(true);
    try {
      const url = await window.imgUtils.fileToDataURL(file, 1280, 0.82);
      onChange(url, file.name);
      if (window.STORE) window.STORE.addMedia({ name: file.name, src: url });
    } catch (e) { alert("Görsel yüklenemedi: " + e.message); }
    setBusy(false);
  };
  if (value) {
    return (
      <div className="upload-preview" style={aspect ? { aspectRatio: aspect } : null}>
        <img src={value} alt="" />
        <button className="abtn abtn--danger abtn--sm rm" onClick={() => onChange("", "")}>Kaldır</button>
      </div>
    );
  }
  return (
    <div className={"uploader" + (drag ? " drag" : "")}
      onClick={() => inp.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}>
      <input ref={inp} type="file" accept="image/*" onChange={(e) => handle(e.target.files[0])} />
      {busy ? "Yükleniyor…" : (label || "Görsel sürükleyin veya seçmek için tıklayın")}
    </div>
  );
}

/* ---------- GİRİŞ ---------- */
function Login({ onOk }) {
  const [u, setU] = uS(""); const [p, setP] = uS(""); const [err, setErr] = uS("");
  const submit = (e) => {
    e.preventDefault();
    const user = S.authenticate(u.trim(), p);
    if (user) { onOk(user); }
    else setErr("Kullanıcı adı veya şifre hatalı.");
  };
  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <div className="login-mark">
          <svg width="48" height="48" viewBox="0 0 60 60" fill="none" style={{ margin: "0 auto" }}>
            <circle cx="30" cy="30" r="29" stroke="var(--gold)" strokeWidth="1" opacity="0.6" />
            <text x="30" y="39" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="30" fill="var(--gold-deep)" fontWeight="500">GB</text>
          </svg>
        </div>
        <div className="eyebrow">Yönetim Paneli</div>
        <h1 className="login-h">Hoş geldiniz</h1>
        <p className="login-sub">İçeriği yönetmek için giriş yapın</p>
        {err && <div className="login-err">{err}</div>}
        <div className="afield">
          <span className="afield-l">Kullanıcı adı</span>
          <input className="ainput" value={u} onChange={(e) => setU(e.target.value)} placeholder="admin" autoFocus />
        </div>
        <div className="afield">
          <span className="afield-l">Şifre</span>
          <input className="ainput" type="password" value={p} onChange={(e) => setP(e.target.value)} placeholder="••••••••" />
        </div>
        <button className="abtn abtn--gold" type="submit" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Giriş Yap</button>
        <p className="login-hint">Demo: <b>admin</b>/gokay2025 · <b>editor</b>/editor2025 · <b>tasarim</b>/tasarim2025</p>
      </form>
    </div>
  );
}

/* ---------- Boş durum ---------- */
function Empty({ icon, title, sub, action }) {
  return (
    <div className="empty">
      <div className="e-ic">{icon || "✦"}</div>
      <h3>{title}</h3>
      <p>{sub}</p>
      {action && <div style={{ marginTop: 18 }}>{action}</div>}
    </div>
  );
}

/* ---------- DASHBOARD ---------- */
function Dashboard({ go }) {
  const d = S.get();
  const newApts = d.appointments.filter((a) => a.status === "new").length;
  const cards = [
    ["Blog yazısı", d.blog.length, "blog"],
    ["Hizmet", d.services.length, "services"],
    ["Galeri", d.gallery.length, "gallery"],
    ["Yeni randevu", newApts, "appointments", true]
  ];
  const recentApts = d.appointments.slice(0, 5);
  return (
    <div>
      <div className="stat-cards">
        {cards.map(([l, n, page, accent]) => (
          <button className={"stat-card" + (accent && n > 0 ? " accent" : "")} key={l} onClick={() => go(page)} style={{ textAlign: "left", cursor: "pointer", border: "1px solid var(--line)", font: "inherit" }}>
            <div className="sc-n">{n}</div>
            <div className="sc-l">{l}</div>
          </button>
        ))}
      </div>

      <div className="dash-grid">
        <div className="panel-box">
          <div className="panel-h">
            <h3>Son randevu talepleri</h3>
            <button className="abtn abtn--ghost abtn--sm" onClick={() => go("appointments")}>Tümü</button>
          </div>
          {recentApts.length === 0 ? (
            <Empty icon="✦" title="Henüz talep yok" sub="Siteden gelen randevu talepleri burada görünür." />
          ) : (
            <div className="adm-list">
              {recentApts.map((a) => (
                <div className="row-card" key={a.id}>
                  <div className="row-main">
                    <div className="row-title" style={{ fontSize: 18 }}>{a.name}</div>
                    <div className="row-meta"><span>{a.serviceName || a.service}</span><span>·</span><span>{a.phone}</span></div>
                  </div>
                  <span className={"pill " + (a.status === "new" ? "pill--new" : a.status === "contacted" ? "pill--contacted" : "pill--done")}>
                    {a.status === "new" ? "Yeni" : a.status === "contacted" ? "Arandı" : "Tamam"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="panel-box">
          <div className="panel-h"><h3>Hızlı işlem</h3></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="abtn abtn--gold" onClick={() => go("blog/new")} style={{ justifyContent: "flex-start" }}>＋ Yeni blog yazısı</button>
            <button className="abtn abtn--ghost" onClick={() => go("services/new")} style={{ justifyContent: "flex-start" }}>＋ Yeni hizmet</button>
            <button className="abtn abtn--ghost" onClick={() => go("gallery")} style={{ justifyContent: "flex-start" }}>＋ Öncesi-sonrası ekle</button>
            <button className="abtn abtn--ghost" onClick={() => go("media")} style={{ justifyContent: "flex-start" }}>↑ Görsel yükle</button>
          </div>
          <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
            <a className="abtn abtn--ghost" href="index.html" target="_blank" style={{ width: "100%", justifyContent: "center" }}>Siteyi yeni sekmede aç ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, I, ToastHost, useToast, Confirm, Uploader, Login, Empty, Dashboard });
