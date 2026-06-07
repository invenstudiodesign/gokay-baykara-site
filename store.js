/* ============================================================
   STORE — paylaşılan veri katmanı (localStorage)
   data.js'ten tohumlanır; site okur, admin yazar.
   ============================================================ */
(function () {
  const KEY = "gb_content_v2";
  const EDITABLE = [
    "doctor", "stats", "categories", "featured",
    "services", "blog", "testimonials", "faq",
    "gallery", "media", "appointments",
    "hero", "seo",
    "links", "nav", "theme", "sections", "users"
  ];

  function clone(x) { return JSON.parse(JSON.stringify(x)); }

  function defaults() {
    const d = clone(window.DATA);
    return {
      doctor: d.doctor,
      stats: d.stats,
      categories: d.categories,
      featured: d.featured,
      services: d.services,
      blog: d.blog.map((b) => ({ ...b, blocks: b.blocks || null })),
      testimonials: d.testimonials,
      faq: d.faq,
      gallery: [],          // {id, title, before, after}
      media: [],            // {id, name, src, ts}
      appointments: [],     // {id, service, name, phone, email, date, time, note, status, ts}
      hero: d.hero,
      seo: d.seo,
      links: d.links,
      nav: d.nav,
      theme: d.theme,
      sections: d.sections,
      users: d.users
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  let state = load();
  const def = defaults();
  if (!state) {
    state = def;
  } else {
    // yeni anahtarları doldur
    EDITABLE.forEach((k) => { if (state[k] === undefined) state[k] = def[k]; });
  }

  function syncToData() {
    EDITABLE.forEach((k) => { window.DATA[k] = state[k]; });
  }
  syncToData();

  function commit(silent) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Kayıt edilemedi (kota dolmuş olabilir):", e);
    }
    syncToData();
    if (!silent) window.dispatchEvent(new CustomEvent("store:change"));
  }

  const uid = (p) => (p || "id") + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  function slugify(s) {
    return (s || "")
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      .slice(0, 60) || "yazi";
  }

  window.STORE = {
    KEY,
    get: () => state,
    commit,
    uid,
    slugify,

    reset() {
      state = defaults();
      commit();
    },

    /* ----- BLOG ----- */
    upsertPost(post) {
      const list = state.blog;
      if (post.slug && list.some((b) => b.slug === post.slug)) {
        const i = list.findIndex((b) => b.slug === post.slug);
        list[i] = { ...list[i], ...post };
      } else {
        post.slug = post.slug || slugify(post.title) + "-" + Math.random().toString(36).slice(2, 5);
        list.unshift(post);
      }
      commit();
      return post.slug;
    },
    deletePost(slug) {
      state.blog = state.blog.filter((b) => b.slug !== slug);
      commit();
    },

    /* ----- HİZMETLER ----- */
    upsertService(svc) {
      const list = state.services;
      if (svc.slug && list.some((s) => s.slug === svc.slug)) {
        const i = list.findIndex((s) => s.slug === svc.slug);
        list[i] = { ...list[i], ...svc };
      } else {
        svc.slug = svc.slug || slugify(svc.title);
        list.push(svc);
      }
      commit();
      return svc.slug;
    },
    deleteService(slug) {
      state.services = state.services.filter((s) => s.slug !== slug);
      state.featured = state.featured.filter((f) => f !== slug);
      commit();
    },
    toggleFeatured(slug) {
      const f = state.featured;
      if (f.includes(slug)) state.featured = f.filter((x) => x !== slug);
      else state.featured = [...f, slug];
      commit();
    },

    /* ----- MEDYA ----- */
    addMedia(item) {
      item.id = item.id || uid("m");
      item.ts = Date.now();
      state.media.unshift(item);
      commit();
      return item;
    },
    deleteMedia(id) {
      state.media = state.media.filter((m) => m.id !== id);
      commit();
    },

    /* ----- GALERİ (öncesi-sonrası) ----- */
    upsertGallery(g) {
      if (g.id && state.gallery.some((x) => x.id === g.id)) {
        const i = state.gallery.findIndex((x) => x.id === g.id);
        state.gallery[i] = { ...state.gallery[i], ...g };
      } else {
        g.id = g.id || uid("g");
        state.gallery.unshift(g);
      }
      commit();
      return g.id;
    },
    deleteGallery(id) {
      state.gallery = state.gallery.filter((g) => g.id !== id);
      commit();
    },

    /* ----- RANDEVU TALEPLERİ ----- */
    addAppointment(a) {
      a.id = uid("apt");
      a.ts = Date.now();
      a.status = "new";
      state.appointments.unshift(a);
      commit();
      return a.id;
    },
    setAppointmentStatus(id, status) {
      const a = state.appointments.find((x) => x.id === id);
      if (a) { a.status = status; commit(); }
    },
    deleteAppointment(id) {
      state.appointments = state.appointments.filter((a) => a.id !== id);
      commit();
    },

    /* ----- ANASAYFA / DOKTOR METİNLERİ ----- */
    updateDoctor(patch) { state.doctor = { ...state.doctor, ...patch }; commit(); },
    updateStats(stats) { state.stats = stats; commit(); },
    updateTestimonials(t) { state.testimonials = t; commit(); },
    updateFaq(f) { state.faq = f; commit(); },
    updateHero(patch) { state.hero = { ...state.hero, ...patch }; commit(); },
    updateSeo(patch) { state.seo = { ...state.seo, ...patch }; commit(); },

    /* ----- LİNKLER ----- */
    updateLinks(patch) { state.links = { ...state.links, ...patch }; commit(); },

    /* ----- MENÜ (nav) ----- */
    updateNav(nav) { state.nav = nav; commit(); },
    addNavItem(item) { item.id = item.id || uid("nav"); state.nav.push(item); commit(); },
    deleteNavItem(id) { state.nav = state.nav.filter((n) => n.id !== id); commit(); },

    /* ----- TEMA ----- */
    updateTheme(patch) { state.theme = { ...state.theme, ...patch }; commit(); applyTheme(); },

    /* ----- BÖLÜMLER ----- */
    updateSections(sections) { state.sections = sections; commit(); },

    /* ----- GENEL SIRALAMA ----- */
    reorder(key, fromIdx, toIdx) {
      const list = state[key];
      if (!Array.isArray(list)) return;
      const c = [...list];
      const [moved] = c.splice(fromIdx, 1);
      c.splice(toIdx, 0, moved);
      state[key] = c;
      commit();
    },

    /* ----- KULLANICILAR ----- */
    authenticate(username, password) {
      const u = (state.users || []).find((x) => x.username === username && x.password === password);
      return u ? { id: u.id, username: u.username, role: u.role, name: u.name } : null;
    },
    upsertUser(u) {
      if (u.id && state.users.some((x) => x.id === u.id)) {
        const i = state.users.findIndex((x) => x.id === u.id);
        state.users[i] = { ...state.users[i], ...u };
      } else {
        u.id = u.id || uid("u");
        state.users.push(u);
      }
      commit();
    },
    deleteUser(id) { state.users = state.users.filter((u) => u.id !== id); commit(); },

    applyTheme,

    /* başka sekmede yapılan değişikliği yükle */
    reload() {
      const fresh = load();
      if (fresh) {
        state = fresh;
        EDITABLE.forEach((k) => { if (state[k] === undefined) state[k] = def[k]; });
        syncToData();
        applyTheme();
        window.dispatchEvent(new CustomEvent("store:change"));
      }
    }
  };

  /* ===== Tema uygulama + renk yardımcıları ===== */
  function hexToRgb(h) {
    h = (h || "").replace("#", "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h || "B0894F", 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function rgbToHex(r, g, b) {
    const c = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
    return "#" + c(r) + c(g) + c(b);
  }
  function shade(hex, pct) { // pct<0 koyu, >0 açık
    const { r, g, b } = hexToRgb(hex);
    const t = pct < 0 ? 0 : 255;
    const p = Math.abs(pct) / 100;
    return rgbToHex(r + (t - r) * p, g + (t - g) * p, b + (t - b) * p);
  }
  const _loadedFonts = {};
  function loadFont(family) {
    if (!family || _loadedFonts[family]) return;
    const base = family.split(",")[0].replace(/["']/g, "").trim();
    if (["Cormorant Garamond", "Jost"].includes(base)) { _loadedFonts[family] = 1; return; }
    _loadedFonts[family] = 1;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=" + base.replace(/ /g, "+") + ":ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap";
    document.head.appendChild(link);
  }
  function applyTheme() {
    const t = (window.DATA && window.DATA.theme) || {};
    const accent = t.accent || "#B0894F";
    const deep = t.accentDeep || shade(accent, -22);
    const soft = t.accentSoft || shade(accent, 26);
    const tint = shade(accent, 84);
    let el = document.getElementById("__theme");
    if (!el) { el = document.createElement("style"); el.id = "__theme"; document.head.appendChild(el); }
    let css = ":root{";
    css += `--gold:${accent};--gold-deep:${deep};--gold-soft:${soft};--gold-tint:${tint};`;
    if (t.serif) css += `--serif:"${t.serif}", Georgia, serif;`;
    if (t.sans) css += `--sans:"${t.sans}", system-ui, sans-serif;`;
    css += "}";
    el.textContent = css;
    loadFont(t.serif); loadFont(t.sans);
  }
  applyTheme();

  // Sekmeler arası senkron: admin başka sekmede kaydederse site güncellensin
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) window.STORE.reload();
  });

  /* ----- Görsel yardımcıları ----- */
  window.imgUtils = {
    // Dosyayı küçülterek dataURL'e çevirir (localStorage kotası için)
    fileToDataURL(file, maxW = 1280, quality = 0.82) {
      return new Promise((resolve, reject) => {
        if (!file || !file.type || !file.type.startsWith("image/")) {
          reject(new Error("Geçersiz görsel")); return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            const scale = Math.min(1, maxW / img.width);
            const w = Math.round(img.width * scale);
            const h = Math.round(img.height * scale);
            const c = document.createElement("canvas");
            c.width = w; c.height = h;
            const ctx = c.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h);
            const isPng = file.type === "image/png";
            resolve(c.toDataURL(isPng ? "image/png" : "image/jpeg", quality));
          };
          img.onerror = reject;
          img.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  };
})();
