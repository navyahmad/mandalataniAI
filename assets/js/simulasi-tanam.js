// ==================================================
// SIMULASI TANAM AI - TANAMAN PANGAN & HOLTIKULTURA
// With OPT/Hama Prediction
// ==================================================

// Database Tanaman Umum (Pangan + Holtikultura)
const tanamanDatabase = {
  // TANAMAN PANGAN
  padi: {
    nama: "Padi",
    icon: "🌾",
    kategori: "Pangan",
    suhu: { min: 22, max: 32, optimal: 27 },
    curahHujan: { min: 150, max: 300, optimal: 200 },
    ph: { min: 5.5, max: 7, optimal: 6.2 },
    kelembaban: { min: 70, max: 90, optimal: 80 },
    ketinggian: { min: 0, max: 800, optimal: 200 },
    tekstur: ["lempung", "lempung-liat"],
    air: ["sangat-baik", "baik"],
    musim: [1, 3]
  },
  jagung: {
    nama: "Jagung",
    icon: "🌽",
    kategori: "Pangan",
    suhu: { min: 21, max: 34, optimal: 27 },
    curahHujan: { min: 85, max: 200, optimal: 110 },
    ph: { min: 5.5, max: 7.5, optimal: 6.5 },
    kelembaban: { min: 60, max: 80, optimal: 70 },
    ketinggian: { min: 0, max: 1200, optimal: 400 },
    tekstur: ["lempung", "lempung-berpasir"],
    air: ["baik", "cukup"],
    musim: [2, 3]
  },
  kedelai: {
    nama: "Kedelai",
    icon: "🫘",
    kategori: "Pangan",
    suhu: { min: 23, max: 30, optimal: 26 },
    curahHujan: { min: 100, max: 200, optimal: 150 },
    ph: { min: 6, max: 7, optimal: 6.5 },
    kelembaban: { min: 65, max: 85, optimal: 75 },
    ketinggian: { min: 0, max: 500, optimal: 150 },
    tekstur: ["lempung", "lempung-berpasir"],
    air: ["baik", "cukup"],
    musim: [2, 3]
  },
  kacangHijau: {
    nama: "Kacang Hijau",
    icon: "🫛",
    kategori: "Pangan",
    suhu: { min: 25, max: 30, optimal: 27 },
    curahHujan: { min: 60, max: 150, optimal: 100 },
    ph: { min: 6, max: 7, optimal: 6.5 },
    kelembaban: { min: 60, max: 75, optimal: 68 },
    ketinggian: { min: 0, max: 400, optimal: 100 },
    tekstur: ["lempung-berpasir", "lempung"],
    air: ["cukup", "baik"],
    musim: [2, 3]
  },
  kacangTanah: {
    nama: "Kacang Tanah",
    icon: "🥜",
    kategori: "Pangan",
    suhu: { min: 24, max: 33, optimal: 28 },
    curahHujan: { min: 80, max: 130, optimal: 100 },
    ph: { min: 6, max: 7, optimal: 6.5 },
    kelembaban: { min: 65, max: 80, optimal: 72 },
    ketinggian: { min: 0, max: 500, optimal: 200 },
    tekstur: ["lempung-berpasir", "pasir"],
    air: ["cukup", "baik"],
    musim: [2, 3]
  },
  singkong: {
    nama: "Singkong",
    icon: "🍠",
    kategori: "Pangan",
    suhu: { min: 18, max: 35, optimal: 27 },
    curahHujan: { min: 75, max: 200, optimal: 150 },
    ph: { min: 5, max: 8, optimal: 6 },
    kelembaban: { min: 60, max: 85, optimal: 75 },
    ketinggian: { min: 0, max: 1500, optimal: 400 },
    tekstur: ["lempung-berpasir", "lempung", "pasir"],
    air: ["cukup", "baik", "kurang"],
    musim: [1, 2, 3]
  },
  ubiJalar: {
    nama: "Ubi Jalar",
    icon: "🍠",
    kategori: "Pangan",
    suhu: { min: 21, max: 27, optimal: 24 },
    curahHujan: { min: 75, max: 150, optimal: 110 },
    ph: { min: 5.5, max: 7.5, optimal: 6 },
    kelembaban: { min: 65, max: 80, optimal: 72 },
    ketinggian: { min: 0, max: 1000, optimal: 300 },
    tekstur: ["lempung-berpasir", "lempung"],
    air: ["cukup", "baik"],
    musim: [2, 3]
  },
  
  // TANAMAN HOLTIKULTURA
  cabai: {
    nama: "Cabai",
    icon: "🌶️",
    kategori: "Holtikultura",
    suhu: { min: 24, max: 32, optimal: 27 },
    curahHujan: { min: 60, max: 150, optimal: 100 },
    ph: { min: 6, max: 7, optimal: 6.5 },
    kelembaban: { min: 60, max: 80, optimal: 70 },
    ketinggian: { min: 0, max: 1400, optimal: 400 },
    tekstur: ["lempung", "lempung-berpasir"],
    air: ["baik", "sangat-baik"],
    musim: [2, 3]
  },
  tomat: {
    nama: "Tomat",
    icon: "🍅",
    kategori: "Holtikultura",
    suhu: { min: 20, max: 28, optimal: 24 },
    curahHujan: { min: 75, max: 130, optimal: 100 },
    ph: { min: 6, max: 7, optimal: 6.5 },
    kelembaban: { min: 60, max: 80, optimal: 70 },
    ketinggian: { min: 0, max: 1500, optimal: 600 },
    tekstur: ["lempung", "lempung-berpasir"],
    air: ["baik", "sangat-baik"],
    musim: [2, 3]
  },
  terong: {
    nama: "Terong",
    icon: "🍆",
    kategori: "Holtikultura",
    suhu: { min: 22, max: 30, optimal: 26 },
    curahHujan: { min: 75, max: 150, optimal: 110 },
    ph: { min: 5.5, max: 7, optimal: 6.5 },
    kelembaban: { min: 65, max: 85, optimal: 75 },
    ketinggian: { min: 0, max: 1200, optimal: 400 },
    tekstur: ["lempung", "lempung-berpasir"],
    air: ["baik", "sangat-baik"],
    musim: [1, 2, 3]
  },
  bayam: {
    nama: "Bayam",
    icon: "🥬",
    kategori: "Holtikultura",
    suhu: { min: 15, max: 30, optimal: 22 },
    curahHujan: { min: 50, max: 150, optimal: 100 },
    ph: { min: 6, max: 7.5, optimal: 6.5 },
    kelembaban: { min: 60, max: 80, optimal: 70 },
    ketinggian: { min: 0, max: 2000, optimal: 500 },
    tekstur: ["lempung", "lempung-berpasir"],
    air: ["baik", "sangat-baik"],
    musim: [1, 2, 3]
  },
  kangkung: {
    nama: "Kangkung",
    icon: "🥬",
    kategori: "Holtikultura",
    suhu: { min: 25, max: 35, optimal: 30 },
    curahHujan: { min: 100, max: 250, optimal: 175 },
    ph: { min: 5, max: 7, optimal: 6 },
    kelembaban: { min: 70, max: 95, optimal: 85 },
    ketinggian: { min: 0, max: 1000, optimal: 200 },
    tekstur: ["lempung", "lempung-liat"],
    air: ["sangat-baik", "baik"],
    musim: [1, 2, 3]
  },
  sawi: {
    nama: "Sawi",
    icon: "🥬",
    kategori: "Holtikultura",
    suhu: { min: 15, max: 30, optimal: 22 },
    curahHujan: { min: 60, max: 150, optimal: 100 },
    ph: { min: 6, max: 7.5, optimal: 6.5 },
    kelembaban: { min: 60, max: 80, optimal: 70 },
    ketinggian: { min: 0, max: 1500, optimal: 500 },
    tekstur: ["lempung", "lempung-berpasir"],
    air: ["baik", "sangat-baik"],
    musim: [1, 2, 3]
  },
  bawangMerah: {
    nama: "Bawang Merah",
    icon: "🧅",
    kategori: "Holtikultura",
    suhu: { min: 25, max: 32, optimal: 28 },
    curahHujan: { min: 30, max: 100, optimal: 60 },
    ph: { min: 6, max: 7, optimal: 6.5 },
    kelembaban: { min: 50, max: 70, optimal: 60 },
    ketinggian: { min: 0, max: 800, optimal: 300 },
    tekstur: ["lempung-berpasir", "lempung"],
    air: ["baik", "cukup"],
    musim: [2]
  },
  buncis: {
    nama: "Buncis",
    icon: "🫛",
    kategori: "Holtikultura",
    suhu: { min: 20, max: 28, optimal: 24 },
    curahHujan: { min: 75, max: 150, optimal: 110 },
    ph: { min: 6, max: 7.5, optimal: 6.5 },
    kelembaban: { min: 65, max: 85, optimal: 75 },
    ketinggian: { min: 0, max: 1500, optimal: 600 },
    tekstur: ["lempung", "lempung-berpasir"],
    air: ["baik", "cukup"],
    musim: [2, 3]
  }
};

// Database OPT/Hama yang lebih lengkap
const optDatabase = {
  wereng_coklat: {
    nama: "Wereng Coklat",
    icon: "🦗",
    tanaman: ["padi"],
    kondisi: {
      suhu: { min: 25, max: 32 },
      kelembaban: { min: 70, max: 100 },
      curahHujan: { min: 150, max: 999 }
    },
    pencegahan: "Tanam varietas tahan wereng, gunakan musuh alami"
  },
  ulat_grayak: {
    nama: "Ulat Grayak",
    icon: "🐛",
    tanaman: ["jagung", "kedelai", "kacangHijau", "kacangTanah"],
    kondisi: {
      suhu: { min: 24, max: 32 },
      kelembaban: { min: 65, max: 85 },
      musim: [2, 3]
    },
    pencegahan: "Gunakan perangkap feromon, semprot Bacillus thuringiensis"
  },
  penggerek_polong: {
    nama: "Penggerek Polong",
    icon: "🐛",
    tanaman: ["kedelai", "kacangHijau", "kacangTanah", "buncis"],
    kondisi: {
      suhu: { min: 23, max: 30 },
      kelembaban: { min: 65, max: 85 }
    },
    pencegahan: "Monitoring saat pembungaan, tanam varietas tahan"
  },
  kutu_daun: {
    nama: "Kutu Daun (Aphid)",
    icon: "🦟",
    tanaman: ["kedelai", "kacangHijau", "jagung", "cabai", "tomat"],
    kondisi: {
      suhu: { min: 20, max: 28 },
      kelembaban: { min: 60, max: 80 }
    },
    pencegahan: "Gunakan mulsa reflektif, lepas musuh alami"
  },
  lalat_buah: {
    nama: "Lalat Buah",
    icon: "🪰",
    tanaman: ["cabai", "tomat", "terong"],
    kondisi: {
      suhu: { min: 25, max: 32 },
      kelembaban: { min: 70, max: 90 }
    },
    pencegahan: "Gunakan perangkap metil eugenol, pembrongsongan buah"
  },
  tungau: {
    nama: "Tungau",
    icon: "🕷️",
    tanaman: ["cabai", "tomat", "terong", "bayam", "sawi"],
    kondisi: {
      suhu: { min: 27, max: 35 },
      kelembaban: { min: 40, max: 70 },
      musim: [2]
    },
    pencegahan: "Semprot air bertekanan, gunakan akarisida"
  },
  trips: {
    nama: "Trips",
    icon: "🪰",
    tanaman: ["cabai", "tomat", "bawangMerah", "kedelai"],
    kondisi: {
      suhu: { min: 23, max: 32 },
      kelembaban: { min: 60, max: 85 }
    },
    pencegahan: "Mulsa reflektif, perangkap kuning, insektisida"
  },
  ulat_daun: {
    nama: "Ulat Daun",
    icon: "🐛",
    tanaman: ["bayam", "kangkung", "sawi", "kubis"],
    kondisi: {
      suhu: { min: 20, max: 30 },
      kelembaban: { min: 65, max: 90 }
    },
    pencegahan: "Monitoring rutin, semprot Bacillus thuringiensis"
  },
  busuk_daun: {
    nama: "Busuk Daun",
    icon: "🦠",
    tanaman: ["cabai", "tomat", "bayam", "kangkung", "sawi"],
    kondisi: {
      suhu: { min: 18, max: 28 },
      kelembaban: { min: 80, max: 100 },
      curahHujan: { min: 150, max: 999 }
    },
    pencegahan: "Drainase baik, jarak tanam, semprot fungisida"
  },
  antraknosa: {
    nama: "Antraknosa",
    icon: "🦠",
    tanaman: ["cabai", "tomat", "terong"],
    kondisi: {
      suhu: { min: 24, max: 32 },
      kelembaban: { min: 80, max: 100 },
      curahHujan: { min: 100, max: 999 }
    },
    pencegahan: "Rotasi tanaman, pemangkasan, fungisida preventif"
  },
  layu_bakteri: {
    nama: "Layu Bakteri",
    icon: "🦠",
    tanaman: ["tomat", "cabai", "terong"],
    kondisi: {
      suhu: { min: 25, max: 35 },
      kelembaban: { min: 70, max: 100 },
      ph: { min: 6, max: 7.5 }
    },
    pencegahan: "Varietas tahan, drainase baik, sanitasi alat"
  },
  tikus: {
    nama: "Tikus",
    icon: "🐀",
    tanaman: ["padi", "jagung", "singkong", "ubiJalar"],
    kondisi: {
      curahHujan: { min: 150, max: 999 },
      ketinggian: { min: 0, max: 500 }
    },
    pencegahan: "Bubu perangkap, TBS, gropyokan massal"
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.querySelector('.sidebar');
  
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }
});

// Hitung Simulasi
function hitungSimulasi(event) {
  event.preventDefault();
  
  const formData = {
    kecamatan: document.getElementById('kecamatan').value,
    luasLahan: parseFloat(document.getElementById('luasLahan').value),
    suhu: parseFloat(document.getElementById('suhu').value),
    curahHujan: parseFloat(document.getElementById('curahHujan').value),
    phTanah: parseFloat(document.getElementById('phTanah').value),
    kelembaban: parseFloat(document.getElementById('kelembaban').value),
    ketinggian: parseFloat(document.getElementById('ketinggian').value),
    teksturTanah: document.getElementById('teksturTanah').value,
    ketersediaanAir: document.getElementById('ketersediaanAir').value,
    musimTanam: parseInt(document.getElementById('musimTanam').value)
  };
  
  // Calculate scores
  const results = [];
  
  for (const [key, tanaman] of Object.entries(tanamanDatabase)) {
    const score = hitungScore(formData, tanaman);
    results.push({
      key: key,
      tanaman: tanaman,
      score: score
    });
  }
  
  // Sort by score
  results.sort((a, b) => b.score - a.score);
  
  // Prediksi OPT untuk top 3
  const optPredictions = [];
  results.slice(0, 3).forEach(result => {
    const opts = prediksiOPT(formData, result.key);
    if (opts.length > 0) {
      optPredictions.push({
        tanaman: result.tanaman.nama,
        opts: opts
      });
    }
  });
  
  // Display results
  tampilkanHasil(results, optPredictions, formData);
  
  document.getElementById('hasilSimulasi').scrollIntoView({ behavior: 'smooth' });
}

// Hitung Score
function hitungScore(data, tanaman) {
  const fuzzyScores = {
    suhu: fuzzyMembership(data.suhu, tanaman.suhu),
    curahHujan: fuzzyMembership(data.curahHujan, tanaman.curahHujan),
    ph: fuzzyMembership(data.phTanah, tanaman.ph),
    kelembaban: fuzzyMembership(data.kelembaban, tanaman.kelembaban),
    ketinggian: fuzzyMembership(data.ketinggian, tanaman.ketinggian)
  };
  
  const fuzzyTotal = (
    fuzzyScores.suhu * 0.25 +
    fuzzyScores.curahHujan * 0.30 +
    fuzzyScores.ph * 0.20 +
    fuzzyScores.kelembaban * 0.15 +
    fuzzyScores.ketinggian * 0.10
  );
  
  let categoricalScore = 0;
  if (tanaman.tekstur.includes(data.teksturTanah)) categoricalScore += 0.33;
  if (tanaman.air.includes(data.ketersediaanAir)) categoricalScore += 0.33;
  if (tanaman.musim.includes(data.musimTanam)) categoricalScore += 0.34;
  
  const totalScore = (fuzzyTotal * 0.7) + (categoricalScore * 0.3);
  
  return Math.round(totalScore * 100);
}

// Fuzzy Membership
function fuzzyMembership(value, criteria) {
  const { min, max, optimal } = criteria;
  
  if (value < min || value > max) {
    if (value < min) {
      const distance = min - value;
      return Math.max(0, 1 - (distance / min));
    } else {
      const distance = value - max;
      return Math.max(0, 1 - (distance / max));
    }
  }
  
  const distanceToOptimal = Math.abs(value - optimal);
  const range = max - min;
  
  return 1 - (distanceToOptimal / range);
}

// Prediksi OPT
function prediksiOPT(formData, tanamanKey) {
  const predictions = [];
  
  for (const [key, opt] of Object.entries(optDatabase)) {
    if (!opt.tanaman.includes(tanamanKey)) continue;
    
    let riskScore = 0;
    let matchCount = 0;
    
    if (opt.kondisi.suhu && formData.suhu >= opt.kondisi.suhu.min && formData.suhu <= opt.kondisi.suhu.max) {
      riskScore++; matchCount++;
    }
    if (opt.kondisi.kelembaban && formData.kelembaban >= opt.kondisi.kelembaban.min && formData.kelembaban <= opt.kondisi.kelembaban.max) {
      riskScore++; matchCount++;
    }
    if (opt.kondisi.curahHujan && formData.curahHujan >= opt.kondisi.curahHujan.min) {
      riskScore++; matchCount++;
    }
    if (opt.kondisi.musim && opt.kondisi.musim.includes(formData.musimTanam)) {
      riskScore++; matchCount++;
    }
    if (opt.kondisi.ketinggian && formData.ketinggian >= opt.kondisi.ketinggian.min && formData.ketinggian <= opt.kondisi.ketinggian.max) {
      riskScore++; matchCount++;
    }
    if (opt.kondisi.ph && formData.phTanah >= opt.kondisi.ph.min && formData.phTanah <= opt.kondisi.ph.max) {
      riskScore++; matchCount++;
    }
    
    const riskPercentage = matchCount > 0 ? (riskScore / matchCount) * 100 : 0;
    
    if (riskPercentage >= 50) {
      predictions.push({
        ...opt,
        riskPercentage: Math.round(riskPercentage)
      });
    }
  }
  
  predictions.sort((a, b) => b.riskPercentage - a.riskPercentage);
  return predictions.slice(0, 3);
}

// Tampilkan Hasil
function tampilkanHasil(results, optPredictions, formData) {
  const resultBox = document.getElementById('hasilSimulasi');
  const resultCards = document.getElementById('resultCards');
  const detailAnalisis = document.getElementById('detailAnalisis');
  
  resultBox.style.display = 'block';
  
  // Top 3 Results
  resultCards.innerHTML = '';
  const medals = ['🥇', '🥈', '🥉'];
  
  results.slice(0, 3).forEach((result, index) => {
    resultCards.innerHTML += `
      <div class="result-card">
        <div class="result-rank">${medals[index]}</div>
        <div class="result-tanaman">${result.tanaman.icon} ${result.tanaman.nama}</div>
        <div class="result-score">${result.score}%</div>
        <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">
          ${result.tanaman.kategori}
        </div>
      </div>
    `;
  });
  
  // Detail Analisis dengan OPT
  detailAnalisis.innerHTML = `
    <h4 style="margin-bottom: 20px;">Top 3 Rekomendasi Tanaman</h4>
    
    ${results.slice(0, 3).map((result, index) => {
      const optForTanaman = optPredictions.find(o => o.tanaman === result.tanaman.nama);
      
      return `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid ${index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32'};">
          <h4 style="margin-bottom: 10px;">${medals[index]} ${result.tanaman.icon} ${result.tanaman.nama} - Score: ${result.score}%</h4>
          <p style="color: #666; margin-bottom: 15px;"><strong>Kategori:</strong> ${result.tanaman.kategori}</p>
          
          ${optForTanaman && optForTanaman.opts.length > 0 ? `
            <div style="background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 3px solid #ffc107;">
              <h5 style="margin-bottom: 10px; color: #856404;">⚠️ Potensi Serangan OPT/Hama:</h5>
              ${optForTanaman.opts.map(opt => `
                <div style="margin-bottom: 8px;">
                  <strong>${opt.icon} ${opt.nama}</strong> - Risiko: ${opt.riskPercentage}%<br>
                  <small style="color: #666;">Pencegahan: ${opt.pencegahan}</small>
                </div>
              `).join('')}
            </div>
          ` : '<p style="color: #28a745;">✅ Risiko OPT/hama rendah</p>'}
        </div>
      `;
    }).join('')}
  `;
}

// Reset Form
function resetForm() {
  document.getElementById('simulasiForm').reset();
  document.getElementById('hasilSimulasi').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}