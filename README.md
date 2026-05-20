# MandalaTani AI 🌾

**MandalaTani AI** adalah platform kolaborasi pertanian berbasis AI dan GIS (Geographic Information System) yang dirancang khusus untuk mengoptimalkan rantai pasok pupuk subsidi, memantau hasil panen, serta memberikan rekomendasi pertanian cerdas bagi Dinas Pertanian, Penyuluh Kecamatan, dan Penyuluh Desa di Kabupaten Sidoarjo.

---

## 🌟 Fitur Utama

### 👥 Kolaborasi Multi-Peran (Multi-Role Support)
Sistem menyediakan antarmuka dan hak akses yang disesuaikan untuk tiga aktor utama:
*   **Dinas Pertanian (Admin Utama)**: Memantau visualisasi statistik panen kabupaten, stok pupuk, rekomendasi tanam, prediksi bencana banjir (integrasi BMKG), potensi serangan OPT (Organisme Pengganggu Tumbuhan), serta mengelola akun pengguna dan artikel blog.
*   **Penyuluh Kecamatan**: Melaporkan data panen per desa, memantau tren perkembangan komoditas wilayah, dan menerima notifikasi darurat.
*   **Penyuluh Desa**: Mengajukan permintaan pupuk bersubsidi darurat secara *real-time* lengkap dengan koordinat titik lahan dan foto bukti lapangan.

### 🗺️ Peta GIS Interaktif (Leaflet.js)
Visualisasi berbasis peta geografis untuk melacak persebaran komoditas unggulan (Padi, Jagung, Kedelai, Kacang Hijau, Tebu) di setiap kecamatan Kabupaten Sidoarjo beserta detail data produksinya dari tahun ke tahun.

### 🤖 Simulasi Tanam bertenaga AI
Alat kalkulator kecocokan tanaman pangan dan holtikultura berdasarkan parameter iklim dan tanah menggunakan metode:
1.  **Fuzzy Logic Scoring**: Menghitung bobot parameter suhu, curah hujan, pH tanah, kelembaban, dan ketinggian secara adaptif.
2.  **TOPSIS Method**: Menentukan alternatif tanaman terbaik berdasarkan kedekatan terhadap kondisi ideal positif.
3.  **Prediksi Risiko OPT**: Menghitung persentase potensi ancaman hama (seperti Wereng Coklat, Tikus, Ulat Grayak) berdasarkan keselarasan iklim mikro saat simulasi.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

*   **Frontend Core**: HTML5 (Semantik) & Vanilla CSS3 (Responsif & Efek Glassmorphism)
*   **Javascript**: Vanilla JS (ES6)
*   **Libraries**:
    *   [Leaflet.js](https://leafletjs.com/) (Rendering Peta GIS & Koordinat Picker)
    *   [Chart.js](https://www.chartjs.org/) (Visualisasi Chart Statistik Dinamis)
*   **Data & State Management**: JSON file statis untuk data awal & `localStorage` peramban untuk persistensi entri data dinamis.

---

## 📂 Struktur Direktori Proyek

```bash
MandalaTani AI/
├── index.html                   # Landing Page Utama & Chatbot Asisten virtual
├── blog.html                    # Artikel & Publikasi Pertanian
├── peta.html                    # Peta GIS Distribusi Komoditas Sidoarjo
├── CNAME                        # Konfigurasi Domain Kustom
├── admin/                       # Panel Pengelolaan Dinas Pertanian
│   ├── dashboard.html           # Monitoring Statistik & Grafik
│   ├── simulasi-tanam.html      # Fitur Simulasi AI Kecocokan Lahan
│   └── ...
├── penyuluh-kecamatan/          # Panel Pengawasan Tingkat Kecamatan
├── penyuluh-desa/               # Panel Petugas Lapangan Tingkat Desa
│   ├── permintaan-pupuk.html    # Form Permintaan Pupuk Bersubsidi
│   └── ...
├── pages/                       # Autentikasi (Masuk & Daftar Akun)
└── assets/                      # Aset Pendukung Aplikasi
    ├── css/                     # stylesheet utama (style.css & admin.css)
    ├── js/                      # Logika kalkulasi AI, grafik, dan form handler
    └── data/                    # Dataset JSON (kecamatan, hama, panen, permintaan)
```

---

## 🚀 Cara Menjalankan Secara Lokal

Karena proyek ini dibangun menggunakan arsitektur *frontend-driven* tanpa ketergantungan server backend yang kompleks:

1.  **Unduh / Kloning Repositori**:
    ```bash
    git clone https://github.com/username/MandalaTani-AI.git
    cd MandalaTani-AI
    ```
2.  **Jalankan Aplikasi**:
    *   Cukup buka berkas `index.html` langsung di peramban web pilihan Anda.
    *   *Rekomendasi:* Gunakan ekstensi seperti **Live Server** di VS Code untuk pengalaman navigasi lokal yang lebih optimal.

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan kompetisi dan pengembangan digitalisasi pertanian Kabupaten Sidoarjo. Hak cipta dilindungi undang-undang.
