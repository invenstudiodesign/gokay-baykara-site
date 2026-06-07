# Manuel Düzenleme Rehberi — kod bilmeden metin değiştirme

Bu klasör **elle düzenlenebilir** sürümdür. Tüm metinler tek dosyada: **`data.js`**.
Değiştirmek için `data.js`'i bir metin düzenleyiciyle (Not Defteri, VS Code, hatta GitHub'da kalem ✏️ ikonu) açın, tırnak içindeki yazıyı değiştirin, kaydedin.

> ⚠️ Sadece **tırnak içindeki** (`"..."`) yazıyı değiştirin. Tırnakları, virgülleri, köşeli parantezleri silmeyin.

## Sık değiştirilenler — `data.js` içinde

| Ne | Satır | Anahtar |
|----|-------|---------|
| Anasayfa büyük başlık (3 satır) | ~52 | `line1`, `line2` (altın italik), `line3` |
| Başlık üstü küçük etiket | ~55 | `eyebrow` |
| Başlık altı açıklama | ~56 | `lede` |
| Buton yazıları | ~57 | `btn1`, `btn2` |
| Telefon (görünen) | ~72 | `links.phone` |
| Telefon (arama numarası) | ~73 | `links.phoneHref` (+90… formatı) |
| E-posta | ~74 | `links.email` |
| Instagram / Google / randevu linkleri | ~75+ | `links.instagram`, `links.booking` … |
| İstatistikler (10+, 3.500+ …) | ~34 | `stats` |
| Kısa biyografi (anasayfa) | ~19 | `doctor.bioShort` |
| Uzun biyografi (Hakkında sayfası) | ~20 | `doctor.bio` |
| Sayfa başlığı / SEO açıklaması | ~63 | `seo.title`, `seo.description` |

### Örnek
Anasayfadaki başlığı değiştirmek için `data.js`'te şunu bulun:

```js
hero: {
    line1: "Güzelliğiniz,",
    line2: "ince ayrıntılarda",
    line3: "saklı.",
```

`"Güzelliğiniz,"` yerine istediğinizi yazın:

```js
    line1: "Yeni başlığınız,",
```

Kaydedin → GitHub'da commit edin → site güncellenir. Başka hiçbir şeye dokunmanıza gerek yok.

## Hizmetler ve blog yazıları
- **Hizmet metinleri:** `data.js` içinde `services:` listesi (her hizmetin `title`, `short`, `body`, `points` alanları).
- **Blog yazıları:** `data.js` içinde `blog:` listesi.
- Bunları tek tek elle düzenleyebilir **veya** admin panelinden ekley/düzenleyebilirsiniz (panel değişiklikleri yalnızca o tarayıcıda saklanır; kalıcı/herkese açık değişiklik için `data.js`'i düzenleyin).

## İki düzenleme yolu — özet
1. **Admin paneli (`admin.html`)** — hızlı, görsel; ama değişiklik **sizin tarayıcınızda** kalır (önizleme/yönetim için ideal).
2. **`data.js` düzenleme** — kalıcı, **tüm ziyaretçiler** görür. Yayına alınacak metinler için bunu kullanın.

## Yayına alma
Tüm bu klasörü (index.html, admin.html, data.js, .css, .jsx, .nojekyll dahil) GitHub deposuna yükleyin.
GitHub'da bir dosyayı düzenlemek için: dosyaya tıklayın → kalem ✏️ → değiştirin → "Commit changes". Site birkaç dakikada güncellenir.

> Not: Bu sürüm React/Babel'i internetten yükler (canlı site için uygun). Çevrimdışı tek-dosya sürüm ise `Gokay Baykara - Site.html`'dir ama o elle düzenlemeye uygun değildir.
