# USK MajorMatch

Website tryout dan prediksi kelayakan jurusan Universitas Syiah Kuala dengan UI/UX mengikuti screenshot referensi.

## Status

Repo ini sudah berisi project Vite + React dan siap deploy ke Vercel.

## Vercel settings

Biasanya Vercel akan auto-detect sebagai Vite. Jika masih 404, buka Project Settings di Vercel dan pastikan:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Root Directory: `./`

Setelah itu lakukan **Redeploy** dari Vercel.

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka URL lokal yang muncul dari Vite.

## Fitur

- Landing page
- 30 soal tryout
- Halaman review jawaban
- Halaman hasil skor
- Halaman prediksi kelayakan jurusan
