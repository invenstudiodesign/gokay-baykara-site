/* ============================================================
   İletişim + Randevu Sihirbazı (site içi form)
   ============================================================ */

function Field({ label, children, error }) {
  return (
    <label className={"field" + (error ? " field--err" : "")}>
      <span className="field-l">{label}</span>
      {children}
      {error && <span className="field-e">{error}</span>}
    </label>
  );
}

function BookingWizard({ preselect }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    service: preselect || "", name: "", phone: "", email: "", date: "", time: "", note: ""
  });
  const [errs, setErrs] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const times = ["10:00", "11:30", "13:30", "15:00", "16:30"];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Lütfen adınızı girin.";
    if (!/^[0-9 +()]{7,}$/.test(form.phone.trim())) e.phone = "Geçerli bir telefon girin.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Geçerli bir e-posta girin.";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !form.service) { setErrs({ service: "Bir işlem seçin." }); return; }
    if (step === 1 && !validate()) return;
    setErrs({});
    setStep((s) => s + 1);
    document.querySelector(".booking-card")?.scrollIntoView ? null : null;
  };
  const back = () => { setErrs({}); setStep((s) => Math.max(0, s - 1)); };

  const svc = D.services.find((x) => x.slug === form.service);

  const steps = ["İşlem", "Bilgiler", "Onay"];

  return (
    <div className="booking-card">
      {step < 3 && (
        <div className="wiz-steps">
          {steps.map((s, i) => (
            <div className={"wiz-step" + (i === step ? " on" : "") + (i < step ? " done" : "")} key={s}>
              <span className="wiz-num">{i < step ? "✓" : i + 1}</span>
              <span className="wiz-lbl">{s}</span>
            </div>
          ))}
        </div>
      )}

      {step === 0 && (
        <div className="wiz-pane">
          <h3 className="wiz-h">Hangi işlemle ilgileniyorsunuz?</h3>
          <p className="muted" style={{ marginTop: 6, marginBottom: 22 }}>Emin değilseniz "Genel görüşme" seçebilirsiniz; birlikte değerlendiririz.</p>
          {errs.service && <p className="field-e" style={{ marginBottom: 12 }}>{errs.service}</p>}
          <div className="svc-pick">
            <button className={"pick" + (form.service === "genel" ? " on" : "")} onClick={() => setForm((f) => ({ ...f, service: "genel" }))}>
              <span>Genel görüşme</span><span className="muted" style={{ fontSize: 12 }}>Ne istediğime karar vermedim</span>
            </button>
            {D.services.map((s) => (
              <button key={s.slug} className={"pick" + (form.service === s.slug ? " on" : "")} onClick={() => setForm((f) => ({ ...f, service: s.slug }))}>
                <span>{s.title}</span><span className="muted" style={{ fontSize: 12 }}>{s.sub}</span>
              </button>
            ))}
          </div>
          <div className="wiz-actions">
            <span></span>
            <button className="btn btn--gold" onClick={next}>Devam <Arrow /></button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="wiz-pane">
          <h3 className="wiz-h">İletişim bilgileriniz</h3>
          <p className="muted" style={{ marginTop: 6, marginBottom: 22 }}>Size ulaşıp uygun zamanı netleştirelim.</p>
          <div className="form-grid">
            <Field label="Ad Soyad *" error={errs.name}>
              <input value={form.name} onChange={set("name")} placeholder="Adınız Soyadınız" />
            </Field>
            <Field label="Telefon *" error={errs.phone}>
              <input value={form.phone} onChange={set("phone")} placeholder="05xx xxx xx xx" inputMode="tel" />
            </Field>
            <Field label="E-posta" error={errs.email}>
              <input value={form.email} onChange={set("email")} placeholder="ornek@eposta.com" inputMode="email" />
            </Field>
            <Field label="Tercih edilen tarih">
              <input type="date" value={form.date} onChange={set("date")} />
            </Field>
          </div>
          <div className="field" style={{ marginTop: 4 }}>
            <span className="field-l">Tercih edilen saat</span>
            <div className="time-row">
              {times.map((t) => (
                <button key={t} className={"time-chip" + (form.time === t ? " on" : "")} onClick={() => setForm((f) => ({ ...f, time: t }))}>{t}</button>
              ))}
            </div>
          </div>
          <Field label="Eklemek istedikleriniz">
            <textarea rows="3" value={form.note} onChange={set("note")} placeholder="Kısaca beklentiniz veya sorunuz..."></textarea>
          </Field>
          <div className="wiz-actions">
            <button className="btn btn--ghost" onClick={back}>Geri</button>
            <button className="btn btn--gold" onClick={next}>Özeti gör <Arrow /></button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="wiz-pane">
          <h3 className="wiz-h">Randevu özeti</h3>
          <p className="muted" style={{ marginTop: 6, marginBottom: 22 }}>Bilgileri kontrol edip gönderin.</p>
          <ul className="summary">
            <li><span>İşlem</span><span>{form.service === "genel" ? "Genel görüşme" : (svc ? svc.title : "—")}</span></li>
            <li><span>Ad Soyad</span><span>{form.name}</span></li>
            <li><span>Telefon</span><span>{form.phone}</span></li>
            {form.email && <li><span>E-posta</span><span>{form.email}</span></li>}
            {form.date && <li><span>Tarih</span><span>{form.date}{form.time ? " · " + form.time : ""}</span></li>}
            {!form.date && form.time && <li><span>Saat</span><span>{form.time}</span></li>}
            {form.note && <li><span>Not</span><span>{form.note}</span></li>}
          </ul>
          <div className="wiz-actions">
            <button className="btn btn--ghost" onClick={back}>Geri</button>
            <button className="btn btn--gold" onClick={() => { if (window.STORE) { const svcName = form.service === "genel" ? "Genel görüşme" : (svc ? svc.title : "—"); window.STORE.addAppointment({ ...form, serviceName: svcName }); } setStep(3); }}>Randevu talebini gönder <Arrow /></button>
          </div>
          <p className="muted" style={{ fontSize: 12.5, marginTop: 16, textAlign: "center" }}>Bu bir ön taleptir. En kısa sürede sizi arayarak randevunuzu netleştiririz.</p>
        </div>
      )}

      {step === 3 && (
        <div className="wiz-pane wiz-done">
          <div className="done-ring">✓</div>
          <h3 className="wiz-h" style={{ marginTop: 18 }}>Talebiniz alındı, {form.name.split(" ")[0] || "teşekkürler"}.</h3>
          <p className="muted" style={{ marginTop: 10, maxWidth: "30em", marginInline: "auto" }}>
            En kısa sürede sizi arayarak {form.service === "genel" || !svc ? "görüşme" : svc.title.toLowerCase()} için uygun zamanı netleştireceğiz. Acil durumda WhatsApp'tan da ulaşabilirsiniz.
          </p>
          <div className="wiz-actions" style={{ justifyContent: "center", marginTop: 26 }}>
            <a className="btn btn--gold" href={waHref()} target="_blank" rel="noopener"><Wa s={16} /> WhatsApp</a>
            <button className="btn btn--ghost" onClick={() => { setForm({ service:"", name:"", phone:"", email:"", date:"", time:"", note:"" }); setStep(0); }}>Yeni talep</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Contact({ preselect }) {
  useReveal("contact");
  const C = (window.DATA && window.DATA.contact) || {};
  const info = [
    ["Telefon", lk("phone"), "tel:" + lk("phoneHref")],
    ["E-posta", lk("email"), "mailto:" + lk("email")],
    ["Instagram", "@opdrgokaybaykara", lk("instagram")],
    ["Konum", "Ankara · Harita için tıklayın", lk("maps")]
  ];
  return (
    <main className="page-fade">
      <PageHero eyebrow="İletişim" title={C.pageTitle || "Randevu Al"}
        sub={C.pageSub || "Birkaç adımda randevu talebinizi oluşturun; sizi arayarak uygun zamanı birlikte netleştirelim."}
        crumbs={[{ label: "İletişim" }]} />
      <section className="section" style={{ paddingTop: "clamp(20px,3vw,40px)" }}>
        <div className="wrap contact-grid">
          <div className="contact-aside reveal">
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 30, fontWeight: 400 }}>{C.heading || "Bize ulaşın"}</h3>
            <p className="muted" style={{ marginTop: 12, marginBottom: 28 }}>
              {C.intro || "Herhangi bir estetik, plastik ve rekonstrüktif işlem hakkında bilgi almak için çekinmeden iletişime geçin."}
            </p>
            <ul className="contact-list">
              {info.map(([l, v, href]) => (
                <li key={l}>
                  <span className="ci-l">{l}</span>
                  <a className="ci-v" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener">{v}</a>
                </li>
              ))}
            </ul>
            <div className="map-slot">
              <image-slot id="contact-map" placeholder="Konum / harita görseli" radius="0"></image-slot>
            </div>
          </div>
          <div className="reveal d1">
            <BookingWizard preselect={preselect} />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--ivory-2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <SectionHead center eyebrow="Sık Sorulanlar" title="Merak edilenler" />
          <div className="faq">
            {D.faq.map(([q, a], i) => <FaqItem key={i} q={q} a={a} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"faq-item reveal" + (open ? " open" : "")}>
      <button className="faq-q" onClick={() => setOpen((o) => !o)}>
        <span>{q}</span>
        <span className="faq-ic">{open ? "−" : "+"}</span>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? 200 : 0 }}><p>{a}</p></div>
    </div>
  );
}

window.Contact = Contact;
