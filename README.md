# Web Portofolio Ari Budiman

Membuat landing page situs Portofolio saya. Berikut framework dan library yang digunakan :

- `NodeJS` : untuk install framework dan library cli
- `Webpack` : optimasi performa web. menambahkan plugin/loader `babel`, `css minification`, `image minimizer`
- `Tailwind` : styling web lebih praktis, menambahkan plugin `postcss`, `autoprefixer`
- `Flowbite` : styling components untuk tailwind
- `Aos` : styling animasi saat scrolling
- `Eslint` : membantu clean code javascript
- `Supabase` : backend database + storage terintegrasi (menggantikan REST API/SSL manual) untuk data proyek, guestbook, dan media.
- `Accessibility` : menambahkan fitur untuk pengguna screen reader
- `PWAs` : menambahkan fitur untuk bisa diakses secara online dan dapat di install

# Testing & Quality

- `npm test` : menjalankan Jest dengan cakupan penuh (current 100% statements/branches/functions/lines).
- `npm run lint` : menjalankan ESLint (config Google) untuk menjaga konsistensi kode.
- CI: GitHub Actions menjalankan lint + test pada push/PR ke `main` di Node 18 & 20.

# Deployment Web

Silahkan kunjungi **[https://www.aribudiman.site](https://www.aribudiman.site)** untuk melihat hasil jadi Website. Saat ini static asset di-deploy ke Amazon S3 + CloudFront untuk CDN, sementara data dan media dikelola via Supabase (database + storage) sehingga backend dan bucket terintegrasi.
