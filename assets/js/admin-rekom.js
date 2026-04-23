// ==============================================
// REKOMENDASI TANAM AI - MANDALA TANI SIDOARJO
// With OPT/Hama Prediction
// ==============================================

// Database Tanaman Sidoarjo (5 komoditas utama)
const tanamanSidoarjo = {
  padi: {
    nama: "Padi",
    icon: "🌾",
    suhu: { min: 22, max: 32, optimal: 27 },
    curahHujan: { min: 150, max: 300, optimal: 200 },
    ph: { min: 5.5, max: 7, optimal: 6.2 },
    kelembaban: { min: 70, max: 90, optimal: 80 },
    ketinggian: { min: 0, max: 800, optimal: 200 },
    tekstur: ["lempung", "lempung-liat"],
    air: ["sangat-baik", "baik"],
    musim: [1, 3],
    estimasiHasil: "5-6 ton/ha",
    lamaPanen: "105-120 hari",
    hargaPasar: "Rp 5.000-6.000/kg"
  },
  jagung: {
    nama: "Jagung",
    icon: "🌽",
    suhu: { min: 21, max: 34, optimal: 27 },
    curahHujan: { min: 85, max: 200, optimal: 110 },
    ph: { min: 5.5, max: 7.5, optimal: 6.5 },
    kelembaban: { min: 60, max: 80, optimal: 70 },
    ketinggian: { min: 0, max: 1200, optimal: 400 },
    tekstur: ["lempung", "lempung-berpasir"],
    air: ["baik", "cukup"],
    musim: [2, 3],
    estimasiHasil: "8-10 ton/ha",
    lamaPanen: "80-100 hari",
    hargaPasar: "Rp 3.500-4.500/kg"
  },
  kedelai: {
    nama: "Kedelai",
    icon: "🫘",
    suhu: { min: 23, max: 30, optimal: 26 },
    curahHujan: { min: 100, max: 200, optimal: 150 },
    ph: { min: 6, max: 7, optimal: 6.5 },
    kelembaban: { min: 65, max: 85, optimal: 75 },
    ketinggian: { min: 0, max: 500, optimal: 150 },
    tekstur: ["lempung", "lempung-berpasir"],
    air: ["baik", "cukup"],
    musim: [2, 3],
    estimasiHasil: "1.5-2 ton/ha",
    lamaPanen: "80-90 hari",
    hargaPasar: "Rp 8.000-10.000/kg"
  },
  kacangHijau: {
    nama: "Kacang Hijau",
    icon: "🫛",
    suhu: { min: 25, max: 30, optimal: 27 },
    curahHujan: { min: 60, max: 150, optimal: 100 },
    ph: { min: 6, max: 7, optimal: 6.5 },
    kelembaban: { min: 60, max: 75, optimal: 68 },
    ketinggian: { min: 0, max: 400, optimal: 100 },
    tekstur: ["lempung-berpasir", "lempung"],
    air: ["cukup", "baik"],
    musim: [2, 3],
    estimasiHasil: "1-1.5 ton/ha",
    lamaPanen: "55-65 hari",
    hargaPasar: "Rp 12.000-15.000/kg"
  },
  tebu: {
    nama: "Tebu",
    icon: "🎋",
    suhu: { min: 25, max: 35, optimal: 30 },
    curahHujan: { min: 150, max: 250, optimal: 200 },
    ph: { min: 6, max: 7.5, optimal: 6.8 },
    kelembaban: { min: 70, max: 85, optimal: 78 },
    ketinggian: { min: 0, max: 1000, optimal: 300 },
    tekstur: ["lempung", "lempung-liat"],
    air: ["sangat-baik", "baik"],
    musim: [1, 2, 3],
    estimasiHasil: "80-100 ton/ha",
    lamaPanen: "12 bulan",
    hargaPasar: "Rp 900-1.200/kg"
  }
};

// Database OPT/Hama berdasarkan kondisi
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
  penggerek_batang: {
    nama: "Penggerek Batang Padi",
    icon: "🐛",
    tanaman: ["padi"],
    kondisi: {
      suhu: { min: 22, max: 30 },
      kelembaban: { min: 75, max: 100 },
      ph: { min: 5, max: 7 }
    },
    pencegahan: "Sanitasi lahan, pergiliran tanaman, tanam serempak"
  },
  belalang: {
    nama: "Belalang",
    icon: "🦗",
    tanaman: ["padi", "jagung", "kedelai"],
    kondisi: {
      suhu: { min: 25, max: 35 },
      kelembaban: { min: 60, max: 80 },
      musim: [2]
    },
    pencegahan: "Monitoring rutin, pengendalian mekanis dan kimiawi"
  },
  ulat_grayak: {
    nama: "Ulat Grayak",
    icon: "🐛",
    tanaman: ["jagung", "kedelai"],
    kondisi: {
      suhu: { min: 24, max: 32 },
      kelembaban: { min: 65, max: 85 },
      musim: [2, 3]
    },
    pencegahan: "Tanam varietas tahan, gunakan perangkap feromon"
  },
  lalat_bibit: {
    nama: "Lalat Bibit",
    icon: "🪰",
    tanaman: ["jagung"],
    kondisi: {
      suhu: { min: 25, max: 30 },
      kelembaban: { min: 70, max: 90 },
      curahHujan: { min: 100, max: 999 }
    },
    pencegahan: "Perlakuan benih dengan insektisida, tanam dalam"
  },
  penggerek_polong: {
    nama: "Penggerek Polong",
    icon: "🐛",
    tanaman: ["kedelai", "kacangHijau"],
    kondisi: {
      suhu: { min: 23, max: 30 },
      kelembaban: { min: 65, max: 85 }
    },
    pencegahan: "Tanam varietas tahan, monitoring saat pembungaan"
  },
  kutu_daun: {
    nama: "Kutu Daun (Aphid)",
    icon: "🦟",
    tanaman: ["kedelai", "kacangHijau", "jagung"],
    kondisi: {
      suhu: { min: 20, max: 28 },
      kelembaban: { min: 60, max: 80 }
    },
    pencegahan: "Gunakan mulsa reflektif, lepas musuh alami"
  },
  penggerek_batang_tebu: {
    nama: "Penggerek Batang Tebu",
    icon: "🪱",
    tanaman: ["tebu"],
    kondisi: {
      suhu: { min: 25, max: 32 },
      kelembaban: { min: 70, max: 90 }
    },
    pencegahan: "Gunakan bibit sehat, sanitasi lahan, tanam varietas tahan"
  },
  tikus: {
    nama: "Tikus Sawah",
    icon: "🐀",
    tanaman: ["padi", "jagung"],
    kondisi: {
      curahHujan: { min: 150, max: 999 },
      ketinggian: { min: 0, max: 500 }
    },
    pencegahan: "Bubu perangkap, TBS (Trap Barrier System), gropyokan"
  },
  penyakit_blast: {
    nama: "Penyakit Blast/Blas",
    icon: "🦠",
    tanaman: ["padi"],
    kondisi: {
      suhu: { min: 22, max: 28 },
      kelembaban: { min: 85, max: 100 },
      curahHujan: { min: 200, max: 999 }
    },
    pencegahan: "Tanam varietas tahan, kelola air dengan baik"
  }
};

// Data historis keberhasilan tanaman di Sidoarjo
const historisSidoarjo = {
  padi: 0.85,
  jagung: 0.78,
  kedelai: 0.72,
  kacangHijau: 0.68,
  tebu: 0.88
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded');
  const toggleBtn = document.getElementById('toggleSidebar');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.classList.toggle('active');
      }
    });
  }
});

// Hitung Rekomendasi
function hitungRekomendasi(event) {
  event.preventDefault();
  console.log('Form submitted');
  
  // Get form values
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
  
  console.log('Form data:', formData);
  
  // Calculate scores for all plants
  const results = [];
  
  for (const [key, tanaman] of Object.entries(tanamanSidoarjo)) {
    const score = hitungScoreRekomendasi(formData, tanaman, key);
    results.push({
      key: key,
      tanaman: tanaman,
      score: score,
      details: getDetailAnalisis(formData, tanaman)
    });
  }
  
  // Sort by score
  results.sort((a, b) => b.score - a.score);
  console.log('Results:', results);
  
  // Prediksi OPT/Hama
  const optPredictions = prediksiOPT(formData, results[0].key);
  console.log('OPT Predictions:', optPredictions);
  
  // Display results
  tampilkanHasil(results, optPredictions, formData);
  
  // Scroll to results
  setTimeout(() => {
    document.getElementById('hasilRekomendasi').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// Hitung Score Rekomendasi
function hitungScoreRekomendasi(data, tanaman, key) {
  let totalScore = 0;
  
  // 1. Fuzzy Logic Scoring
  const fuzzyScores = {
    suhu: fuzzyMembership(data.suhu, tanaman.suhu),
    curahHujan: fuzzyMembership(data.curahHujan, tanaman.curahHujan),
    ph: fuzzyMembership(data.phTanah, tanaman.ph),
    kelembaban: fuzzyMembership(data.kelembaban, tanaman.kelembaban),
    ketinggian: fuzzyMembership(data.ketinggian, tanaman.ketinggian)
  };
  
  // Weighted fuzzy score
  const fuzzyTotal = (
    fuzzyScores.suhu * 0.25 +
    fuzzyScores.curahHujan * 0.30 +
    fuzzyScores.ph * 0.20 +
    fuzzyScores.kelembaban * 0.15 +
    fuzzyScores.ketinggian * 0.10
  );
  
  // 2. Categorical matching
  let categoricalScore = 0;
  if (tanaman.tekstur.includes(data.teksturTanah)) categoricalScore += 0.25;
  if (tanaman.air.includes(data.ketersediaanAir)) categoricalScore += 0.25;
  if (tanaman.musim.includes(data.musimTanam)) categoricalScore += 0.25;
  
  // 3. Data historis Sidoarjo
  const historisScore = historisSidoarjo[key] || 0.5;
  categoricalScore += historisScore * 0.25;
  
  // 4. Combine scores
  totalScore = (fuzzyTotal * 0.6) + (categoricalScore * 0.4);
  
  // Convert to 0-100 scale
  return Math.round(totalScore * 100);
}

// Fuzzy Membership Function
function fuzzyMembership(value, criteria) {
  const { min, max, optimal } = criteria;
  
  if (value < min || value > max) {
    // Outside range - calculate penalty
    if (value < min) {
      const distance = min - value;
      return Math.max(0, 1 - (distance / min));
    } else {
      const distance = value - max;
      return Math.max(0, 1 - (distance / max));
    }
  }
  
  // Inside range - calculate closeness to optimal
  const distanceToOptimal = Math.abs(value - optimal);
  const range = max - min;
  
  return 1 - (distanceToOptimal / range);
}

// Prediksi OPT/Hama
function prediksiOPT(formData, tanamanUtama) {
  const predictions = [];
  
  for (const [key, opt] of Object.entries(optDatabase)) {
    // Cek apakah OPT sesuai dengan tanaman
    if (!opt.tanaman.includes(tanamanUtama)) continue;
    
    let riskScore = 0;
    let matchCount = 0;
    
    // Cek kondisi suhu
    if (opt.kondisi.suhu) {
      if (formData.suhu >= opt.kondisi.suhu.min && formData.suhu <= opt.kondisi.suhu.max) {
        riskScore += 1;
      }
      matchCount += 1;
    }
    
    // Cek kelembaban
    if (opt.kondisi.kelembaban) {
      if (formData.kelembaban >= opt.kondisi.kelembaban.min && formData.kelembaban <= opt.kondisi.kelembaban.max) {
        riskScore += 1;
      }
      matchCount += 1;
    }
    
    // Cek curah hujan
    if (opt.kondisi.curahHujan) {
      if (formData.curahHujan >= opt.kondisi.curahHujan.min) {
        riskScore += 1;
      }
      matchCount += 1;
    }
    
    // Cek pH
    if (opt.kondisi.ph) {
      if (formData.phTanah >= opt.kondisi.ph.min && formData.phTanah <= opt.kondisi.ph.max) {
        riskScore += 1;
      }
      matchCount += 1;
    }
    
    // Cek musim
    if (opt.kondisi.musim) {
      if (opt.kondisi.musim.includes(formData.musimTanam)) {
        riskScore += 1;
      }
      matchCount += 1;
    }
    
    // Cek ketinggian
    if (opt.kondisi.ketinggian) {
      if (formData.ketinggian >= opt.kondisi.ketinggian.min && formData.ketinggian <= opt.kondisi.ketinggian.max) {
        riskScore += 1;
      }
      matchCount += 1;
    }
    
    // Hitung persentase risiko
    const riskPercentage = matchCount > 0 ? (riskScore / matchCount) * 100 : 0;
    
    // Jika risiko > 50%, masukkan ke prediksi
    if (riskPercentage >= 50) {
      predictions.push({
        ...opt,
        riskPercentage: Math.round(riskPercentage),
        key: key
      });
    }
  }
  
  // Sort by risk percentage
  predictions.sort((a, b) => b.riskPercentage - a.riskPercentage);
  
  return predictions.slice(0, 5); // Return top 5 risks
}

// Get Detail Analisis
function getDetailAnalisis(data, tanaman) {
  const details = [];
  
  // Suhu
  if (data.suhu >= tanaman.suhu.min && data.suhu <= tanaman.suhu.max) {
    details.push({ param: "Suhu", status: "✅ Sesuai", nilai: `${data.suhu}°C` });
  } else {
    details.push({ param: "Suhu", status: "❌ Tidak Sesuai", nilai: `${data.suhu}°C` });
  }
  
  // Curah Hujan
  if (data.curahHujan >= tanaman.curahHujan.min && data.curahHujan <= tanaman.curahHujan.max) {
    details.push({ param: "Curah Hujan", status: "✅ Sesuai", nilai: `${data.curahHujan}mm` });
  } else {
    details.push({ param: "Curah Hujan", status: "❌ Tidak Sesuai", nilai: `${data.curahHujan}mm` });
  }
  
  // pH Tanah
  if (data.phTanah >= tanaman.ph.min && data.phTanah <= tanaman.ph.max) {
    details.push({ param: "pH Tanah", status: "✅ Sesuai", nilai: `${data.phTanah}` });
  } else {
    details.push({ param: "pH Tanah", status: "❌ Tidak Sesuai", nilai: `${data.phTanah}` });
  }
  
  // Tekstur Tanah
  if (tanaman.tekstur.includes(data.teksturTanah)) {
    details.push({ param: "Tekstur Tanah", status: "✅ Sesuai", nilai: data.teksturTanah });
  } else {
    details.push({ param: "Tekstur Tanah", status: "⚠️ Kurang Sesuai", nilai: data.teksturTanah });
  }
  
  return details;
}

// Tampilkan Hasil
function tampilkanHasil(results, optPredictions, formData) {
  const resultBox = document.getElementById('hasilRekomendasi');
  const resultCards = document.getElementById('resultCards');
  const optList = document.getElementById('optList');
  const detailAnalisis = document.getElementById('detailAnalisis');
  
  resultBox.style.display = 'block';
  
  // Top 3 Results
  resultCards.innerHTML = '';
  const medals = ['🥇', '🥈', '🥉'];
  
  results.slice(0, 3).forEach((result, index) => {
    const card = `
      <div class="result-card">
        <div class="result-rank">${medals[index]}</div>
        <div class="result-tanaman">${result.tanaman.icon} ${result.tanaman.nama}</div>
        <div class="result-score">${result.score}%</div>
        <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">
          ${result.score >= 80 ? 'Sangat Direkomendasikan' : 
            result.score >= 60 ? 'Direkomendasikan' : 'Kurang Direkomendasikan'}
        </div>
      </div>
    `;
    resultCards.innerHTML += card;
  });
  
  // OPT Predictions
  optList.innerHTML = '';
  if (optPredictions.length > 0) {
    optPredictions.forEach(opt => {
      const riskClass = opt.riskPercentage >= 75 ? 'risk-high' : 
                       opt.riskPercentage >= 50 ? 'risk-medium' : 'risk-low';
      const riskText = opt.riskPercentage >= 75 ? 'Risiko Tinggi' : 
                      opt.riskPercentage >= 50 ? 'Risiko Sedang' : 'Risiko Rendah';
      
      const item = `
        <div class="opt-item">
          <div class="opt-icon">${opt.icon}</div>
          <div class="opt-content">
            <h4>${opt.nama}</h4>
            <p><strong>Pencegahan:</strong> ${opt.pencegahan}</p>
            <span class="risk-level ${riskClass}">${riskText} - ${opt.riskPercentage}%</span>
          </div>
        </div>
      `;
      optList.innerHTML += item;
    });
  } else {
    optList.innerHTML = '<p style="text-align: center; opacity: 0.9;">✅ Kondisi lahan cukup aman dari serangan OPT/hama utama</p>';
  }
  
  // Detail Analisis
  detailAnalisis.innerHTML = `
    <h4 style="margin-bottom: 15px;">Analisis untuk ${results[0].tanaman.nama} (Rekomendasi #1)</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Status</th>
          <th>Nilai</th>
        </tr>
      </thead>
      <tbody>
        ${results[0].details.map(d => `
          <tr>
            <td><strong>${d.param}</strong></td>
            <td>${d.status}</td>
            <td>${d.nilai}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    
    <div style="margin-top: 25px; padding: 20px; background: #d4edda; border-radius: 8px; border-left: 4px solid #28a745;">
      <h4 style="color: #155724; margin-bottom: 10px;">💡 Rekomendasi Tindakan</h4>
      <ul style="color: #155724; margin-left: 20px; line-height: 1.8;">
        <li>Tanam <strong>${results[0].tanaman.nama}</strong> di Kecamatan ${formData.kecamatan}</li>
        <li>Luas lahan: ${formData.luasLahan} hektar</li>
        <li>Estimasi hasil: ${results[0].tanaman.estimasiHasil}</li>
        <li>Lama panen: ${results[0].tanaman.lamaPanen}</li>
        <li>Harga pasar saat ini: ${results[0].tanaman.hargaPasar}</li>
      </ul>
    </div>
  `;
}

// Reset Form
function resetForm() {
  document.getElementById('rekomForm').reset();
  document.getElementById('hasilRekomendasi').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}