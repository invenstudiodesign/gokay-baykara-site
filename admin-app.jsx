/* ============================================================
   ADMIN — uygulama kabuğu + router + roller
   ============================================================ */
const AUTH_KEY = "gb_admin_user";

const SECTIONS = {
  dashboard:    { label: "Genel Bakış", icon: "dash", group: null, roles: ["admin", "editor", "designer"] },
  appointments: { label: "Randevu Talepleri", icon: "apt", group: "İletişim", roles: ["admin", "editor"] },
  blog:         { label: "Blog Yazıları", icon: "blog", group: "İçerik", roles: ["admin", "editor"] },
  services:     { label: "Hizmetler", icon: "svc", group: "İçerik", roles: ["admin", "editor"] },
  gallery:      { label: "Öncesi-Sonrası", icon: "gallery", group: "İçerik", roles: ["admin", "editor", "designer"] },
  media:        { label: "Medya Kütüphanesi", icon: "media", group: "İçerik", roles: ["admin", "editor", "designer"] },
  faq:          { label: "SSS & Yorumlar", icon: "faq", group: "İçerik", roles: ["admin", "editor"] },
  theme:        { label: "Tema & Görünüm", icon: "theme", group: "Tasarım", roles: ["admin", "designer"] },
  hero:         { label: "Hero Bölümü", icon: "home", group: "Tasarım", roles: ["admin", "designer"] },
  sections:     { label: "Anasayfa Düzeni", icon: "sections", group: "Tasarım", roles: ["admin", "designer"] },
  links:        { label: "Bağlantılar", icon: "links", group: "Site", roles: ["admin"] },
  nav:          { label: "Menü", icon: "nav", group: "Site", roles: ["admin"] },
  home:         { label: "Doktor & Bilgiler", icon: "home", group: "Site", roles: ["admin", "designer"] },
  seo:          { label: "SEO Ayarları", icon: "search", group: "Site", roles: ["admin", "editor"] },
  publish:      { label: "Yayınla", icon: "publish", group: "Sistem", roles: ["admin", "editor", "designer"] },
  users:        { label: "Kullanıcılar", icon: "users", group: "Sistem", roles: ["admin"] }
};

function canAccess(section, role) {
  const s = SECTIONS[section];
  if (!s) return false;
  return s.roles.includes(role);
}

function parseAdminHash() {
  const h = (location.hash || "").replace(/^#\/?/, "");
  const parts = h.split("/").filter(Boolean);
  return { section: parts[0] || "dashboard", action: parts[1] || null, id: parts.slice(2).join("/") || null };
}

function loadUser() {
  try { return JSON.parse(sessionStorage.getItem(AUTH_KEY) || "null"); } catch (e) { return null; }
}

function AdminShell() {
  const [user, setUser] = uS(loadUser);
  const [route, setRoute] = uS(parseAdminHash());
  const [menu, setMenu] = uS(false);
  const [, force] = uS(0);

  uE(() => {
    const onHash = () => { setRoute(parseAdminHash()); setMenu(false); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    const onStore = () => force((n) => n + 1);
    window.addEventListener("store:change", onStore);
    return () => { window.removeEventListener("hashchange", onHash); window.removeEventListener("store:change", onStore); };
  }, []);

  const go = (path) => { location.hash = "#/" + path; };
  const logout = () => { sessionStorage.removeItem(AUTH_KEY); setUser(null); go("dashboard"); };

  if (!user) return <Login onOk={(u) => { sessionStorage.setItem(AUTH_KEY, JSON.stringify(u)); setUser(u); }} />;

  const role = user.role;
  const allowed = canAccess(route.section, role);
  const sec = SECTIONS[route.section] || SECTIONS.dashboard;
  const d = S.get();
  const newApts = d.appointments.filter((a) => a.status === "new").length;

  let title = sec.label, sub = "";
  let body;

  if (!allowed) {
    title = "Erişim yok";
    body = (
      <Empty icon="🔒" title="Bu bölüme erişiminiz yok"
        sub={`"${roleLabel(role)}" rolü bu sayfayı görüntüleyemez. Yöneticinizle iletişime geçin.`}
        action={<button className="abtn abtn--gold" onClick={() => go("dashboard")}>Genel bakışa dön</button>} />
    );
  } else {
    switch (route.section) {
      case "appointments": body = <Appointments />; sub = "Gelen randevu taleplerini yönetin"; break;
      case "blog":
        if (route.action === "new") { title = "Yeni Blog Yazısı"; body = <BlogEditor slug="new" go={go} />; }
        else if (route.action === "edit") { title = "Yazıyı Düzenle"; body = <BlogEditor slug={route.id} go={go} />; }
        else { body = <BlogList go={go} />; sub = "Sitedeki blog içeriği · sürükleyerek sıralayın"; }
        break;
      case "services":
        if (route.action === "new") { title = "Yeni Hizmet"; body = <ServiceEditor slug="new" go={go} />; }
        else if (route.action === "edit") { title = "Hizmeti Düzenle"; body = <ServiceEditor slug={route.id} go={go} />; }
        else { body = <ServiceList go={go} />; sub = "Hizmet ve uygulamalar · sürükleyerek sıralayın"; }
        break;
      case "gallery": body = <Gallery />; sub = "Öncesi-sonrası karşılaştırmaları"; break;
      case "media":   body = <Media />; sub = "Görsel kütüphanesi"; break;
      case "faq":     body = <FaqContent />; sub = "Sık sorulan sorular ve hasta yorumları"; break;
      case "theme":   body = <ThemeEditor />; sub = "Renk, yazı tipi ve logo"; break;
      case "hero":    body = <HeroContent />; sub = "Hero başlığı, açıklama, buton metinleri"; break;
      case "sections": body = <SectionsEditor />; sub = "Anasayfa bölüm sırası ve görünürlüğü"; break;
      case "links":   body = <LinksEditor />; sub = "Telefon, e-posta, sosyal medya, randevu linkleri"; break;
      case "nav":     body = <NavEditor />; sub = "Menü öğeleri · ekle, sırala, gizle"; break;
      case "home":    body = <HomeContent />; sub = "Doktor bilgileri, istatistikler"; break;
      case "seo":     body = <SeoContent />; sub = "Meta etiketler, anahtar kelimeler, Open Graph"; break;
      case "publish": body = <PublishEditor />; sub = "Değişiklikleri kaynağa aktarıp yayınlayın"; break;
      case "users":   body = <UsersEditor />; sub = "Kullanıcılar ve roller"; break;
      default: body = <Dashboard go={go} />; sub = "İçerik özeti ve hızlı işlemler";
    }
  }

  // sidebar gruplarını role göre filtrele
  const groups = {};
  Object.entries(SECTIONS).forEach(([k, v]) => {
    if (!v.roles.includes(role)) return;
    const g = v.group || "_";
    (groups[g] = groups[g] || []).push([k, v]);
  });

  return (
    <div className={"adm" + (menu ? " menu-open" : "")}>
      <aside className="adm-side">
        <div className="adm-brand">
          <svg width="34" height="34" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="29" stroke="var(--gold-soft)" strokeWidth="1" opacity="0.6" />
            <text x="30" y="39" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="28" fill="var(--gold-soft)" fontWeight="500">GB</text>
          </svg>
          <div>
            <div className="ab-name">Gökay Baykara</div>
            <div className="ab-role">Yönetim Paneli</div>
          </div>
        </div>
        <nav className="adm-nav">
          {Object.entries(groups).map(([g, items]) => (
            <React.Fragment key={g}>
              {g !== "_" && <div className="adm-nav-group">{g}</div>}
              {items.map(([k, v]) => (
                <button key={k} className={"adm-link" + (route.section === k ? " on" : "")} onClick={() => go(k)}>
                  <I d={Icon[v.icon]} />
                  {v.label}
                  {k === "appointments" && newApts > 0 && <span className="badge">{newApts}</span>}
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a href="index.html" target="_blank">↗ Siteyi görüntüle</a>
          <button onClick={logout}>Çıkış yap</button>
        </div>
      </aside>

      <div className="adm-main">
        <div className="adm-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className="abtn abtn--ghost abtn--icon adm-burger" onClick={() => setMenu((m) => !m)}>☰</button>
            <div>
              <div className="adm-title">{title}</div>
              {sub && <div className="adm-sub">{sub}</div>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="abtn abtn--gold abtn--sm pub-btn" onClick={() => go("publish")} title="Değişiklikleri yayınla">↑ Yayınla</button>
            <div className="user-chip">
              <div className="usr-av">{(user.name || user.username || "?").slice(0, 1).toUpperCase()}</div>
              <div>
                <div className="uc-name">{user.name || user.username}</div>
                <div className="uc-role">{roleLabel(role)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="adm-body" key={route.section + (route.action || "") + (route.id || "")}>
          <div className="page-fade">{body}</div>
        </div>
      </div>
    </div>
  );
}

function AdminApp() {
  return <ToastHost><AdminShell /></ToastHost>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<AdminApp />);
