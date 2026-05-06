# USK MajorMatch

Website tryout dan prediksi kelayakan jurusan Universitas Syiah Kuala.

## Fitur

- Landing page
- Quiz 30 soal: Mathematics, Science, Language
- Pilih jawaban, previous/next, progress, dan jumlah answered
- Halaman review 30 nomor
- Halaman hasil dengan skor total, grade, dan rincian subtes
- Halaman prediksi jurusan

## Struktur

```text
.
├── index.html
├── styles.css
├── app.js
├── assets/
│   └── logo-usk-majormatch.png
├── .github/workflows/pages.yml
├── package.json
├── netlify.toml
└── vercel.json
```

## Jalankan lokal

```bash
python3 -m http.server 5173
```

Buka `http://localhost:5173`.

## Deploy GitHub Pages

1. Buat repository baru di GitHub.
2. Upload semua file ini ke branch `main`.
3. Buka **Settings > Pages**.
4. Pilih **Source: GitHub Actions**.
5. Workflow `.github/workflows/pages.yml` akan deploy otomatis.
