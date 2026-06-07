/* ============================================================
   App + Router
   ============================================================ */
const { useState: useStateA, useEffect: useEffectA, useCallback } = React;

function parseHash() {
  const h = (location.hash || "").replace(/^#\/?/, "");
  const [page, param] = h.split("/");
  return { page: page || "home", param: param || null };
}

/* ---------- SEO meta enjeksiyonu ---------- */
function injectSeo(route) {
  const seo = D.seo || {};
  const doc = D.doctor || {};
  const pageTitles = {
    home: seo.title || doc.name,
    about: "Hakkında — " + (doc.name || ""),
    services: "Hizmetler — " + (doc.name || ""),
    service: (function() {
      const s = D.services && D.services.find((x) => x.slug === route.param);
      return (s ? s.title + " — " : "") + (doc.name || "");
    })(),
    blog: "Blog — " + (doc.name || ""),
    post: (function() {
      const b = D.blog && D.blog.find((x) => x.slug === route.param);
      return (b ? b.title + " — " : "") + (doc.name || "");
    })(),
    contact: "Randevu Al — " + (doc.name || "")
  };

  document.title = pageTitles[route.page] || seo.title || doc.name || "";

  const setMeta = (name, content, prop) => {
    if (!content) return;
    const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let el = document.querySelector(sel);
    if (!el) {
      el = document.createElement("meta");
      prop ? el.setAttribute("property", name) : el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta("description", route.page === "home" ? seo.description : pageTitles[route.page] + ". " + (seo.description || ""));
  setMeta("keywords", seo.keywords);
  setMeta("robots", "index, follow");
  setMeta("og:title", pageTitles[route.page] || seo.title, true);
  setMeta("og:description", seo.description, true);
  setMeta("og:type", route.page === "post" ? "article" : "website", true);
  setMeta("og:image", seo.ogImage || doc.portrait || "", true);
  setMeta("og:locale", "tr_TR", true);
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", pageTitles[route.page] || seo.title);
  setMeta("twitter:description", seo.description);

  // JSON-LD yapısal veri (LocalBusiness + Physician)
  let ld = document.getElementById("__jsonld");
  if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.id = "__jsonld"; document.head.appendChild(ld); }
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["Physician", "LocalBusiness"],
    "name": doc.name,
    "description": seo.description,
    "url": seo.canonical || location.href.split("#")[0],
    "telephone": doc.phone,
    "email": doc.email,
    "address": { "@type": "PostalAddress", "addressLocality": doc.city || "Ankara", "addressCountry": "TR" },
    "image": doc.portrait || seo.ogImage || "",
    "medicalSpecialty": "Plastic Surgery",
    "sameAs": [doc.instagram || "", doc.booking || ""].filter(Boolean)
  });

  // Canonical
  let can = document.querySelector("link[rel='canonical']");
  if (!can) { can = document.createElement("link"); can.rel = "canonical"; document.head.appendChild(can); }
  can.href = (seo.canonical || location.href.split("#")[0]);
}

function App() {
  const [route, setRoute] = useStateA(parseHash());
  const [, force] = useStateA(0);

  const navigate = useCallback((page, param) => {
    const next = "#/" + page + (param ? "/" + param : "");
    if (location.hash !== next) location.hash = next;
    else setRoute({ page, param: param || null });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffectA(() => {
    const onHash = () => { setRoute(parseHash()); window.scrollTo({ top: 0, behavior: "auto" }); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffectA(() => {
    const onChange = () => force((n) => n + 1);
    window.addEventListener("store:change", onChange);
    return () => window.removeEventListener("store:change", onChange);
  }, []);

  // SEO meta güncelle
  useEffectA(() => { injectSeo(route); }, [route]);

  let view;
  switch (route.page) {
    case "about": view = <About />; break;
    case "services": view = <Services />; break;
    case "service": view = <ServiceDetail slug={route.param} />; break;
    case "blog": view = <Blog />; break;
    case "post": view = <Post slug={route.param} />; break;
    case "contact": view = <Contact preselect={route.param} />; break;
    default: view = <Home />;
  }

  return (
    <NavCtx.Provider value={{ navigate, route }}>
      <Header />
      <div key={route.page + (route.param || "")}>{view}</div>
      <Footer />
      <a className="wa-fab" href={waHref()} target="_blank" rel="noopener" aria-label="WhatsApp">
        <Wa s={26} />
      </a>
    </NavCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
