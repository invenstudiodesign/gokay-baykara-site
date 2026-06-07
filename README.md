# Op. Dr. Gökay Baykara — Web Sitesi

Estetik, Plastik ve Rekonstrüktif Cerrahi — tek dosya, statik web sitesi.

## İçerik
- `index.html` — Ana site (anasayfa, hakkında, hizmetler, blog, iletişim + randevu formu)
- `admin.html` — Yönetim paneli (giriş: **admin / gokay2025**)
- `.nojekyll` — GitHub Pages'in dosyaları olduğu gibi sunması için (silmeyin)

Her iki dosya da kendi içinde tam (self-contained) — ek bağımlılık yoktur, doğrudan açılır.

## GitHub Pages ile yayına alma
1. GitHub'da yeni bir repo oluşturun (örn. `gokay-baykara-site`)
2. Bu klasördeki dosyaları repoya yükleyin
3. Repo → **Settings → Pages** → Source: `main` branch, `/root` → Save
4. Birkaç dakika içinde `https://kullaniciadiniz.github.io/gokay-baykara-site/` adresinde yayında

## Kendi domaininizi bağlama (gokaybaykara.com)
1. Settings → Pages → "Custom domain" alanına `gokaybaykara.com` yazın
2. Domain sağlayıcınızda DNS kayıtları:
   - `A` kayıtları → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - veya `CNAME` → `kullaniciadiniz.github.io`
3. "Enforce HTTPS" işaretleyin

## Önemli notlar
- Randevu formu ve admin değişiklikleri şu an **tarayıcıda (localStorage)** saklanır — sunucu/veritabanı yoktur. Gerçek üretim için backend entegrasyonu gerekir.
- Admin şifresi istemci tarafındadır; yalnızca demo amaçlıdır.
- Görseller sürükle-bırak ile eklenir ve tarayıcıda saklanır.
