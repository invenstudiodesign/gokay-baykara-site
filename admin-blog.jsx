/* ============================================================
   ADMIN — Blog yönetimi + bloklu editör
   ============================================================ */

function BlogList({ go }) {
  const [, f] = uS(0);
  const d = S.get();
  const toast = useToast();
  const [del, setDel] = uS(null);
  return (
    <div>
      <div className="toolbar-row">
        <div className="adm-sub">{d.blog.length} yazı · sitedeki blog sayfasında görünür</div>
        <button className="abtn abtn--gold" onClick={() => go("blog/new")}><I d={Icon.plus} s={15} /> Yeni yazı</button>
      </div>
      {d.blog.length === 0 ? (
        <Empty icon="✎" title="Henüz yazı yok" sub="İlk blog yazınızı ekleyin." action={<button className="abtn abtn--gold" onClick={() => go("blog/new")}>Yeni yazı</button>} />
      ) : (
        <Sortable items={d.blog} keyFn={(b) => b.slug} onReorder={(a, b) => { S.reorder("blog", a, b); f((n) => n + 1); }}
          renderItem={(b) => (
            <div className="row-card" style={{ border: "none", padding: 0, background: "none" }}>
              <div className="row-thumb">{b.img ? <img src={b.img} alt="" /> : null}</div>
              <div className="row-main">
                <div className="row-title">{b.title}</div>
                <div className="row-meta"><span className="pill pill--gold">{b.cat}</span><span>{b.date}</span>{b.read && <span>· {b.read}</span>}</div>
              </div>
              <div className="row-actions">
                <a className="abtn abtn--ghost abtn--sm" href={"index.html#/post/" + b.slug} target="_blank">Önizle</a>
                <button className="abtn abtn--ghost abtn--sm" onClick={() => go("blog/edit/" + b.slug)}>Düzenle</button>
                <button className="abtn abtn--danger abtn--sm" onClick={() => setDel(b)}>Sil</button>
              </div>
            </div>
          )} />
      )}
      {del && <Confirm danger title="Yazıyı sil" body={`"${del.title}" kalıcı olarak silinecek.`}
        onNo={() => setDel(null)} onYes={() => { S.deletePost(del.slug); setDel(null); f((n) => n + 1); toast("Yazı silindi"); }} />}
    </div>
  );
}

const CATS = ["Burun Estetiği", "Yüz Estetiği", "Vücut Estetiği", "Medikal Estetik", "Genel"];

function BlogEditor({ slug, go }) {
  const editing = slug && slug !== "new";
  const existing = editing ? S.get().blog.find((b) => b.slug === slug) : null;
  const toast = useToast();

  const [title, setTitle] = uS(existing?.title || "");
  const [cat, setCat] = uS(existing?.cat || CATS[0]);
  const [excerpt, setExcerpt] = uS(existing?.excerpt || "");
  const [img, setImg] = uS(existing?.img || "");
  const [read, setRead] = uS(existing?.read || "4 dk");
  const seed = existing?.blocks && existing.blocks.length
    ? existing.blocks
    : [
        { id: "b1", type: "p", value: existing?.excerpt || "" },
        { id: "b2", type: "h", value: "Süreç nasıl ilerliyor?" },
        { id: "b3", type: "p", value: "" }
      ];
  const [blocks, setBlocks] = uS(seed);

  const today = () => {
    const m = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
    const n = new Date(); return n.getDate() + " " + m[n.getMonth()] + " " + n.getFullYear();
  };

  const setBlk = (id, patch) => setBlocks((bs) => bs.map((b) => b.id === id ? { ...b, ...patch } : b));
  const addBlk = (type) => setBlocks((bs) => [...bs, { id: S.uid("b"), type, value: "" }]);
  const rmBlk = (id) => setBlocks((bs) => bs.filter((b) => b.id !== id));
  const move = (id, dir) => setBlocks((bs) => {
    const i = bs.findIndex((b) => b.id === id); const j = i + dir;
    if (j < 0 || j >= bs.length) return bs;
    const c = [...bs]; [c[i], c[j]] = [c[j], c[i]]; return c;
  });

  const save = () => {
    if (!title.trim()) { toast("Lütfen başlık girin"); return; }
    const cleanBlocks = blocks.filter((b) => (b.value || "").trim() || b.type === "image");
    const auto = cleanBlocks.find((b) => b.type === "p" && b.value.trim());
    const post = {
      slug: existing?.slug, title: title.trim(), cat,
      excerpt: excerpt.trim() || (auto ? auto.value.slice(0, 140) : ""),
      img, read, date: existing?.date || today(), blocks: cleanBlocks
    };
    const sl = S.upsertPost(post);
    toast(editing ? "Yazı güncellendi" : "Yazı yayınlandı");
    go("blog");
  };

  return (
    <div className="adm-form">
      <div className="editor-grid">
        <div>
          <div className="afield">
            <input className="ainput big" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Yazı başlığı…" autoFocus />
          </div>

          <div className="block-type" style={{ marginBottom: 10 }}>İçerik blokları</div>
          <div className="blocks">
            {blocks.map((b, i) => (
              <div className="block" key={b.id}>
                <span className="block-grip">⋮⋮</span>
                <div className="block-type">{({ p: "Paragraf", h: "Başlık", quote: "Alıntı", image: "Görsel" })[b.type]}</div>
                <div className="block-tools">
                  <button onClick={() => move(b.id, -1)} title="Yukarı">↑</button>
                  <button onClick={() => move(b.id, 1)} title="Aşağı">↓</button>
                  <button onClick={() => rmBlk(b.id)} title="Sil">✕</button>
                </div>
                {b.type === "image" ? (
                  <div>
                    <Uploader value={b.value} onChange={(url) => setBlk(b.id, { value: url })} aspect="16/9" label="Blok görseli yükle" />
                    {b.value && <input className="block-input" style={{ marginTop: 10, fontSize: 13 }} value={b.caption || ""} onChange={(e) => setBlk(b.id, { caption: e.target.value })} placeholder="Görsel açıklaması (isteğe bağlı)" />}
                  </div>
                ) : (
                  <textarea className={"block-input " + b.type} rows={b.type === "h" ? 1 : 3}
                    value={b.value} onChange={(e) => setBlk(b.id, { value: e.target.value })}
                    placeholder={({ p: "Paragraf yazın…", h: "Ara başlık", quote: "Alıntı / vurgu cümlesi" })[b.type]} />
                )}
              </div>
            ))}
          </div>
          <div className="add-block">
            <button onClick={() => addBlk("p")}>＋ Paragraf</button>
            <button onClick={() => addBlk("h")}>＋ Başlık</button>
            <button onClick={() => addBlk("quote")}>＋ Alıntı</button>
            <button onClick={() => addBlk("image")}>＋ Görsel</button>
          </div>
        </div>

        <aside className="aside-box">
          <h4>Yayın ayarları</h4>
          <div className="afield">
            <span className="afield-l">Kategori</span>
            <select className="aselect" value={cat} onChange={(e) => setCat(e.target.value)}>
              {CATS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="afield">
            <span className="afield-l">Okuma süresi</span>
            <input className="ainput" value={read} onChange={(e) => setRead(e.target.value)} placeholder="4 dk" />
          </div>
          <div className="afield">
            <span className="afield-l">Özet (liste / kart)</span>
            <textarea className="atext" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Boş bırakılırsa ilk paragraftan alınır" style={{ minHeight: 70 }} />
          </div>
          <div className="afield">
            <span className="afield-l">Kapak görseli</span>
            <Uploader value={img} onChange={(url) => setImg(url)} aspect="3/2" />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button className="abtn abtn--ghost" onClick={() => go("blog")} style={{ flex: 1, justifyContent: "center" }}>İptal</button>
            <button className="abtn abtn--gold" onClick={save} style={{ flex: 1, justifyContent: "center" }}>{editing ? "Güncelle" : "Yayınla"}</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { BlogList, BlogEditor });
