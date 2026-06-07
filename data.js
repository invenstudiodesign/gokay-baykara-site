/* ============================================================
   İçerik / veri — Op. Dr. Gökay Baykara
   ============================================================ */

window.DATA = {
  doctor: {
    name: "Op. Dr. Gökay Baykara",
    role: "Estetik, Plastik ve Rekonstrüktif Cerrahi",
    city: "Ankara",
    tagline: "Güzelliğinizi ince ayrıntılarla zenginleştirin.",
    phone: "0505 799 15 30",
    phoneHref: "+905057991530",
    email: "info@gokaybaykara.com",
    instagram: "https://www.instagram.com/opdrgokaybaykara/",
    booking: "https://www.doktortakvimi.com/gokay-baykara/plastik-rekonstruktif-ve-estetik-cerrahi/ankara",
    maps: "https://goo.gl/maps/CF4GN4bHQcuN5JMo9",
    logo: "https://gokaybaykara.com/wp-content/uploads/2025/03/logo_gokay_baykara.png",
    portrait: "https://gokaybaykara.com/wp-content/uploads/2025/03/gokay_baykara_homepage_main-scaled.jpeg",
    bioShort: "Ankara Üniversitesi Tıp Fakültesi'nde yüksek öğrenimini tamamlayan Gökay Baykara, 2015 yılında tıpta uzmanlık sınavını kazanarak Ankara Eğitim ve Araştırma Hastanesi Plastik, Rekonstrüktif ve Estetik Cerrahi ihtisasına başlamıştır.",
    bio: [
      "Ankara Üniversitesi Tıp Fakültesi'nde yüksek öğrenimini tamamlayan Op. Dr. Gökay Baykara, 2015 yılında tıpta uzmanlık sınavını kazanarak Ankara Eğitim ve Araştırma Hastanesi Plastik, Rekonstrüktif ve Estetik Cerrahi ihtisasına başlamıştır.",
      "Ulusal ve uluslararası birçok kurs, kongre ve toplantıya katılarak bilgi ve öngörülerini sürekli geliştirmiştir. Yaklaşımının merkezinde; her yüzün ve her bedenin kendine özgü oranlarını koruyan, doğal ve dengeli sonuçlar yer alır.",
      "Estetik cerrahiden rekonstrüktif uygulamalara kadar geniş bir yelpazede, hastalarının beklentilerini güvenli ve şeffaf bir süreçle buluşturmayı ilke edinmiştir."
    ],
    credentials: [
      ["2009", "Ankara Üniversitesi Tıp Fakültesi"],
      ["2015", "Tıpta Uzmanlık Sınavı"],
      ["2015–2020", "Plastik, Rekonstrüktif ve Estetik Cerrahi İhtisası"],
      ["Bugün", "Ankara'da özel muayenehane"]
    ]
  },

  stats: [
    ["10+", "yıllık deneyim"],
    ["3.500+", "başarılı operasyon"],
    ["40+", "farklı uygulama"],
    ["%98", "hasta memnuniyeti"]
  ],

  /* Hizmet kategorileri */
  categories: [
    { id: "estetik", label: "Estetik Cerrahi" },
    { id: "medikal", label: "Medikal Estetik" },
    { id: "rekonstruktif", label: "Rekonstrüktif Cerrahi" }
  ],

  /* öne çıkan hizmetler (anasayfa) */
  featured: ["burun-estetigi", "yuz-germe", "meme-buyutme", "liposuction", "botoks", "yag-dolgusu"],

  /* Hero bölümü metinleri */
  hero: {
    line1: "Güzelliğiniz,",
    line2: "ince ayrıntılarda",
    line3: "saklı.",
    eyebrow: "Estetik · Plastik · Rekonstrüktif Cerrahi",
    lede: "Op. Dr. Gökay Baykara ile doğal, dengeli ve size özgü sonuçlar. Ankara'da estetik ve rekonstrüktif cerrahide şeffaf, güven veren bir yaklaşım.",
    btn1: "Randevu Al",
    btn2: "Hizmetleri keşfet"
  },

  /* SEO ayarları */
  seo: {
    title: "Op. Dr. Gökay Baykara — Estetik, Plastik ve Rekonstrüktif Cerrahi | Ankara",
    description: "Ankara'da estetik cerrahide uzman. Rinoplasti, yüz germe, meme estetiği, liposuction ve medikal estetik uygulamalarında güvenilir ve doğal sonuçlar.",
    keywords: "estetik cerrahi ankara, rinoplasti, burun estetiği, yüz germe, meme estetiği, liposuction, botoks, plastik cerrah ankara, gökay baykara",
    ogImage: "",
    canonical: "https://gokaybaykara.com/"
  },

  /* Düzenlenebilir bağlantılar (tek kaynak) */
  links: {
    phone: "0505 799 15 30",
    phoneHref: "+905057991530",
    email: "info@gokaybaykara.com",
    whatsapp: "+905057991530",
    instagram: "https://www.instagram.com/opdrgokaybaykara/",
    google: "https://goo.gl/maps/CF4GN4bHQcuN5JMo9",
    maps: "https://goo.gl/maps/CF4GN4bHQcuN5JMo9",
    booking: "https://www.doktortakvimi.com/gokay-baykara/plastik-rekonstruktif-ve-estetik-cerrahi/ankara"
  },

  /* Menü (sürükle-bırak ile sıralanır, aç/kapa) */
  nav: [
    { id: "home", label: "Anasayfa", page: "home", enabled: true },
    { id: "about", label: "Hakkında", page: "about", enabled: true },
    { id: "services", label: "Hizmetler", page: "services", enabled: true },
    { id: "blog", label: "Blog", page: "blog", enabled: true },
    { id: "contact", label: "İletişim", page: "contact", enabled: true }
  ],

  /* Tema / görünüm */
  theme: {
    accent: "#B0894F", accentDeep: "#8F6B36", accentSoft: "#C9A874",
    serif: "Cormorant Garamond", sans: "Jost",
    logoText: "Gökay Baykara", logoSub: "Op. Dr. — Estetik Cerrahi", logoImg: ""
  },

  /* Anasayfa bölüm sırası + görünürlük */
  sections: [
    { id: "philosophy", label: "Felsefe", enabled: true },
    { id: "featured", label: "Öne Çıkan Hizmetler", enabled: true },
    { id: "about", label: "Hakkında Özeti", enabled: true },
    { id: "approach", label: "Süreç (3 adım)", enabled: true },
    { id: "testimonials", label: "Hasta Deneyimleri", enabled: true },
    { id: "social", label: "Sosyal Kanıt", enabled: true },
    { id: "blog", label: "Blog Önizleme", enabled: true }
  ],

  /* Kullanıcılar + roller */
  users: [
    { id: "u1", username: "admin", password: "gokay2025", role: "admin", name: "Yönetici" },
    { id: "u2", username: "editor", password: "editor2025", role: "editor", name: "İçerik Editörü" },
    { id: "u3", username: "tasarim", password: "tasarim2025", role: "designer", name: "Tasarımcı" }
  ],

  services: [
    {
      slug: "burun-estetigi", cat: "estetik", title: "Burun Estetiği",
      sub: "Rinoplasti",
      img: "https://gokaybaykara.com/wp-content/uploads/2025/03/gokay_baykara_homepage_main-scaled.jpeg",
      short: "Yüz oranlarınızla uyumlu, doğal ve nefes alabilen bir burun.",
      body: "Rinoplasti, burnun hem estetik görünümünü hem de solunum işlevini iyileştirmeyi amaçlayan bir operasyondur. Her yüzün kendine özgü oranları gözetilerek, abartısız ve doğal bir sonuç hedeflenir. Planlama aşamasında yüz analizi yapılır ve beklentiler birlikte netleştirilir.",
      points: ["Kişiye özel yüz analizi", "Doğal ve dengeli profil", "Fonksiyonel (nefes) iyileştirme", "Açık veya kapalı teknik"]
    },
    {
      slug: "yuz-germe", cat: "estetik", title: "Yüz Germe",
      sub: "Face Lift",
      short: "Yıllarla gevşeyen dokulara dinlenmiş, doğal bir tazelik.",
      body: "Yüz germe operasyonu, yaşa ve yer çekimine bağlı sarkmaları gidererek yüze dinlenmiş ve daha genç bir ifade kazandırır. Amaç değiştirmek değil; yüzün kendi ifadesini koruyarak tazelemektir.",
      points: ["Doğal ifade korunur", "Boyun ve alt yüz uyumu", "İz gizleme tekniği", "Uzun süreli sonuç"]
    },
    {
      slug: "goz-kapagi", cat: "estetik", title: "Göz Kapağı Estetiği",
      sub: "Blefaroplasti",
      short: "Yorgun bakışı açan, gözleri yeniden uyandıran dokunuş.",
      body: "Üst ve alt göz kapağındaki fazla deri ve yağ dokusunun düzenlenmesiyle, yorgun ve düşük görünen göz çevresi canlandırılır.",
      points: ["Üst / alt kapak", "Yorgun bakışın giderilmesi", "Gizli iz", "Kısa iyileşme"]
    },
    {
      slug: "kepce-kulak", cat: "estetik", title: "Kepçe Kulak",
      sub: "Otoplasti",
      short: "Kulakları başa orantılı ve doğal bir konuma getiren operasyon.",
      body: "Otoplasti, öne çıkık kulakların başa daha yakın ve simetrik bir konuma getirilmesini sağlar. Çoğunlukla genç yaşta tercih edilse de her yaşta uygulanabilir.",
      points: ["Simetrik konumlandırma", "Her yaşa uygun", "Kısa operasyon", "Hızlı dönüş"]
    },
    {
      slug: "meme-buyutme", cat: "estetik", title: "Meme Büyütme",
      sub: "Augmentasyon",
      short: "Bedeninizle orantılı, dengeli ve doğal bir dekolte.",
      body: "Meme büyütme, implant veya yağ enjeksiyonu yöntemleriyle göğüs hacmini bedenle orantılı şekilde artırmayı amaçlar. İmplant seçimi; boy, beden yapısı ve beklentiye göre birlikte belirlenir.",
      points: ["İmplant veya yağ ile", "Bedenle orantılı planlama", "Doğal his ve görünüm", "Detaylı ölçüm"]
    },
    {
      slug: "meme-diklestirme", cat: "estetik", title: "Meme Dikleştirme",
      sub: "Mastopeksi",
      short: "Sarkan dokuyu yeniden şekillendiren, dik bir hat.",
      body: "Mastopeksi, zamanla veya emzirme sonrası sarkan meme dokusunun yeniden şekillendirilerek dikleştirilmesini sağlar.",
      points: ["Dik ve toparlanmış hat", "Gerekirse hacim ekleme", "İz planlaması", "Kişiye özel"]
    },
    {
      slug: "liposuction", cat: "estetik", title: "Liposuction",
      sub: "Yağ Aldırma",
      short: "İnatçı yağlardan arınan, daha tanımlı bir siluet.",
      body: "Liposuction, diyet ve egzersizle gitmeyen bölgesel yağ birikimlerinin alınarak vücut hatlarının inceltilmesini sağlar. Bel, karın, sırt ve bacak gibi bölgelerde uygulanabilir.",
      points: ["Bölgesel inceltme", "Tanımlı hatlar", "Vaser / klasik teknik", "Hızlı toparlanma"]
    },
    {
      slug: "karin-germe", cat: "estetik", title: "Karın Germe",
      sub: "Abdominoplasti",
      short: "Gevşeyen karın duvarına sıkı, düz bir görünüm.",
      body: "Karın germe; fazla deri ve gevşemiş kas dokusunun düzenlenmesiyle, özellikle gebelik ve kilo değişimleri sonrası karın bölgesine sıkı bir görünüm kazandırır.",
      points: ["Sıkı karın duvarı", "Kas onarımı", "Fazla deri alımı", "İz gizleme"]
    },
    {
      slug: "popo-estetigi", cat: "estetik", title: "Kalça / Popo Estetiği",
      sub: "BBL",
      short: "Bedeninizle orantılı, dolgun ve dengeli hatlar.",
      body: "Kalça estetiği, çoğunlukla kişinin kendi yağ dokusu kullanılarak (BBL) kalçaya hacim ve dengeli bir form kazandırmayı amaçlar.",
      points: ["Kendi yağ dokusuyla", "Dengeli form", "Bel–kalça uyumu", "Doğal sonuç"]
    },
    {
      slug: "yag-dolgusu", cat: "estetik", title: "Yağ (Greft) Dolgusu",
      sub: "Lipofilling",
      short: "Kendi dokunuzla hacim kazandıran doğal yöntem.",
      body: "Yağ dolgusu, vücudun bir bölgesinden alınan yağın işlenerek hacim kaybı olan bölgelere aktarılmasıdır. Yüz, el ve vücut bölgelerinde doğal hacim için tercih edilir.",
      points: ["Kendi dokunuzla", "Doğal hacim", "Yüz ve vücut", "Kalıcı sonuç"]
    },
    {
      slug: "botoks", cat: "medikal", title: "Botoks",
      sub: "Mimik Çizgileri",
      short: "Mimik çizgilerini yumuşatan, dinlenmiş bir ifade.",
      body: "Botoks uygulaması, aşırı kas hareketine bağlı mimik çizgilerini yumuşatarak yüze dinlenmiş ve daha genç bir ifade kazandırır. İğne uygulaması birkaç dakika sürer.",
      points: ["Alın ve göz çevresi", "Doğal ifade", "Birkaç dakika", "Ağrısız uygulama"]
    },
    {
      slug: "dolgu", cat: "medikal", title: "Dolgu",
      sub: "Hyaluronik Asit",
      short: "Hacim ve nemi geri kazandıran ameliyatsız çözüm.",
      body: "Dolgu uygulamaları, hacim kaybı yaşanan dudak, elmacık ve çene gibi bölgelere hyaluronik asit ile dolgunluk kazandırır.",
      points: ["Dudak / elmacık / çene", "Ameliyatsız", "Anında etki", "Doğal dozaj"]
    },
    {
      slug: "mezoterapi", cat: "medikal", title: "Mezoterapi",
      sub: "Cilt Yenileme",
      short: "Cilde vitamin ve canlılık veren mikro uygulama.",
      body: "Mezoterapi, cildin ihtiyaç duyduğu vitamin, mineral ve aktif bileşenlerin mikro enjeksiyonlarla cilde verilmesidir. Cilt kalitesini ve canlılığını artırır.",
      points: ["Cilt canlılığı", "Saç mezoterapisi", "Seans bazlı", "Bakım odaklı"]
    },
    {
      slug: "cilt-kanseri", cat: "rekonstruktif", title: "Cilt Kanseri Tedavisi",
      sub: "Onkoplastik",
      short: "Sağlığı önceleyen, estetiği gözeten cerrahi onarım.",
      body: "Cilt kanseri tedavisinde tümörün tam olarak çıkarılması önceliklidir; aynı zamanda oluşan dokunun estetik ve fonksiyonel onarımı titizlikle planlanır.",
      points: ["Onkolojik güvenlik", "Estetik onarım", "Patoloji takibi", "Multidisipliner yaklaşım"]
    },
    {
      slug: "mikrocerrahi", cat: "rekonstruktif", title: "El Cerrahisi & Mikrocerrahi",
      sub: "Rekonstrüksiyon",
      short: "İşlevi ve estetiği birlikte onaran hassas cerrahi.",
      body: "El cerrahisi ve mikrocerrahi; sinir, damar ve tendon onarımlarından doku aktarımlarına kadar geniş bir alanda işlevin geri kazandırılmasını amaçlar.",
      points: ["Sinir / damar onarımı", "Doku aktarımı", "İşlev odaklı", "Hassas teknik"]
    },
    {
      slug: "yara-izi", cat: "rekonstruktif", title: "Yara İzi (Skar) Tedavisi",
      sub: "Skar Revizyonu",
      short: "İzleri daha az belirgin hale getiren çok aşamalı yaklaşım.",
      body: "Yara izi tedavisi; cerrahi revizyon, enjeksiyon ve cilt uygulamalarının birlikte kullanılmasıyla izlerin görünürlüğünü azaltmayı amaçlar.",
      points: ["Cerrahi revizyon", "Enjeksiyon tedavileri", "Çok aşamalı", "Kişiye özel plan"]
    }
  ],

  blog: [
    {
      slug: "kepce-kulak-operasyonu", title: "Kepçe Kulak Operasyonu",
      date: "5 Aralık 2022", cat: "Yüz Estetiği",
      img: "https://gokaybaykara.com/wp-content/uploads/2022/10/one-cikan-kepce-kulak-blog-yazi-basligi.jpg",
      excerpt: "Kepçe kulak, başa olan açısı normalden fazla olan kulak yapısıdır. Otoplasti ile doğal bir konuma getirilebilir.",
      read: "4 dk"
    },
    {
      slug: "rinoplasti-zamanla-iyilesir", title: "Rinoplasti Sonrası Burnunuz Neden Zaman Geçtikçe Daha İyi Görünür?",
      date: "9 Ekim 2022", cat: "Burun Estetiği",
      img: "https://gokaybaykara.com/wp-content/uploads/2022/10/one-cikan-rinoplasti-blog-yazi-basligi.jpg",
      excerpt: "Rinoplasti sonrası iyileşme, aylara yayılan bir süreçtir. Ödemin çözülmesiyle sonuç giderek netleşir.",
      read: "5 dk"
    },
    {
      slug: "karin-germe-liposuction-fark", title: "Karın Germe ve Liposuction Arasındaki Farklar",
      date: "16 Ağustos 2022", cat: "Vücut Estetiği",
      img: "https://gokaybaykara.com/wp-content/uploads/2022/10/one-cikan-liposuction-blog-yazi-basligi.jpg",
      excerpt: "İki işlem de farklı ihtiyaçlara yanıt verir. Hangisinin sizin için uygun olduğunu birlikte değerlendiririz.",
      read: "6 dk"
    }
  ],

  testimonials: [
    { text: "Süreç boyunca her aşamayı sabırla anlattı. Sonuç tam istediğim gibi doğal oldu.", who: "Rinoplasti hastası" },
    { text: "Kendimi güvende hissettim. İlgisi ve şeffaflığı için minnettarım.", who: "Meme estetiği hastası" },
    { text: "Doğal bir sonuç istiyordum ve tam olarak bunu aldım. Teşekkürler.", who: "Yüz germe hastası" }
  ],

  faq: [
    ["Randevu nasıl alabilirim?", "İletişim formunu doldurarak, telefonla ya da WhatsApp üzerinden ulaşarak randevu oluşturabilirsiniz. İlk görüşmede beklentilerinizi birlikte değerlendiriyoruz."],
    ["İlk görüşmede neler oluyor?", "İlk görüşmede tıbbi geçmişiniz değerlendirilir, beklentileriniz dinlenir ve size uygun yaklaşım şeffaf biçimde anlatılır. Karar için sizi yönlendirmeden bilgilendirmeyi önceliklendiriyoruz."],
    ["İyileşme süreci ne kadar?", "İyileşme süreci işleme göre değişir. Her hasta için ayrıntılı bir bakım ve takip planı paylaşılır."],
    ["Operasyon nerede yapılıyor?", "Operasyonlar Ankara'da tam donanımlı, akredite hastane ortamlarında gerçekleştirilir."]
  ]
};
