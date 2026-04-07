# Netflix Analytics Dashboard

Dashboard analitik interaktif untuk mengeksplorasi dataset katalog Netflix. Project ini memvisualisasikan tren rilis, distribusi genre, distribusi negara, KPI ringkas, dan tabel katalog yang bisa dicari.

## Tech Stack

- React.js
- Vite
- TailwindCSS dengan plugin `@tailwindcss/vite`
- CanvasJS
- PapaParse
- ESLint

## Fitur

- Memuat dan memproses dataset `netflix_titles.csv` dari folder `public`.
- Membersihkan data seperti `country`, `rating`, `release_year`, dan `listed_in`.
- Mengubah `listed_in` menjadi array genre.
- Filter tipe konten berdasarkan `Semua`, `Film`, dan `Acara TV`.
- KPI dashboard untuk `Total Judul`, `Rata-rata Judul / Tahun`, dan `Genre Terpopuler`.
- Line chart untuk tren jumlah judul berdasarkan tahun rilis 2000-2020.
- Bar chart horizontal untuk distribusi genre teratas.
- Pie chart untuk distribusi negara teratas.
- Insight text pada chart untuk membantu membaca hasil visualisasi.
- Tabel katalog dengan pencarian berdasarkan judul dan limit tampilan 12 baris.
- UI responsive menggunakan TailwindCSS utility classes.

## Struktur Project

```text
davis_web_analytics/
|-- public/
|   |-- netflix_titles.csv
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- components/
|   |   |-- BarChart.jsx
|   |   |-- Dashboard.jsx
|   |   |-- DataTable.jsx
|   |   |-- KPI.jsx
|   |   |-- LineChart.jsx
|   |   `-- PieChart.jsx
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- eslint.config.js
|-- package.json
|-- vite.config.js
`-- README.md
```

## Dataset

Dataset yang digunakan adalah `public/netflix_titles.csv`.

Kolom utama yang dipakai:

- `show_id`
- `type`
- `title`
- `country`
- `release_year`
- `rating`
- `listed_in`

Data diproses di `Dashboard.jsx` menggunakan PapaParse. Field `listed_in` dipisahkan berdasarkan koma untuk menghasilkan daftar genre, lalu dipakai pada KPI dan bar chart distribusi genre.

## Cara Menjalankan Project

Clone repository:

```bash
git clone https://github.com/djuliow/davis_web_analytics.git
cd davis_web_analytics
```

Install dependencies di macOS/Linux:

```bash
npm install
```

Jalankan development server di macOS/Linux:

```bash
npm run dev
```

Install dependencies di Windows PowerShell:

```bash
npm install
```

Jalankan development server di Windows PowerShell:

```bash
npm run dev
```

## Styling

Project ini menggunakan TailwindCSS dengan integrasi Vite melalui plugin `@tailwindcss/vite` di `vite.config.js`. File CSS global hanya digunakan sebagai entry Tailwind:

```css
@import "tailwindcss";
```

Semua styling komponen ditulis langsung melalui `className` menggunakan utility classes Tailwind.

## Komponen Utama

- `Dashboard.jsx`: mengatur parsing dataset, filter, KPI, dan layout utama dashboard.
- `KPI.jsx`: komponen reusable untuk kartu ringkasan metrik.
- `LineChart.jsx`: visualisasi tren jumlah judul berdasarkan tahun rilis.
- `BarChart.jsx`: visualisasi distribusi genre teratas menggunakan horizontal bar chart.
- `PieChart.jsx`: visualisasi distribusi negara teratas.
- `DataTable.jsx`: tabel katalog dengan fitur pencarian judul.
