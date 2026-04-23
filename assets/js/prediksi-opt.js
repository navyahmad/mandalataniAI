// ==========================================
// PREDIKSI OPT - MANDALA TANI
// ==========================================

// Database OPT
const optDatabase = [
    {
        id: 1,
        nama: "Wereng Batang Coklat",
        tanaman: "Padi",
        tingkatRisiko: "Tinggi",
        gejala: "Daun menguning, tanaman menjadi kerdil, hopperburn",
        penanganan: "Gunakan insektisida dan tanam varietas tahan wereng",
        kondisiMuncul: {
            suhu: [25, 30],
            kelembaban: [70, 90],
            curahHujan: "Tinggi"
        },
        icon: "🐛"
    },
    {
        id: 2,
        nama: "Penggerek Batang",
        tanaman: "Jagung",
        tingkatRisiko: "Sedang",
        gejala: "Lubang pada batang, daun berlubang, pertumbuhan terhambat",
        penanganan: "Sanitasi lahan dan gunakan insektisida sistemik",
        kondisiMuncul: {
            suhu: [26, 32],
            kelembaban: [60, 80],
            curahHujan: "Sedang"
        },
        icon: "🦗"
    },
    {
        id: 3,
        nama: "Blas (Blast Disease)",
        tanaman: "Padi",
        tingkatRisiko: "Tinggi",
        gejala: "Bercak coklat pada daun dan malai, tanaman rebah",
        penanganan: "Gunakan fungisida dan varietas tahan blas",
        kondisiMuncul: {
            suhu: [20, 28],
            kelembaban: [80, 95],
            curahHujan: "Sangat Tinggi"
        },
        icon: "🍄"
    },
    {
        id: 4,
        nama: "Lalat Bibit",
        tanaman: "Kedelai",
        tingkatRisiko: "Sedang",
        gejala: "Bibit mati atau pertumbuhan terhambat",
        penanganan: "Perlakuan benih dengan insektisida",
        kondisiMuncul: {
            suhu: [24, 30],
            kelembaban: [65, 85],
            curahHujan: "Sedang"
        },
        icon: "🪰"
    },
    {
        id: 5,
        nama: "Kutu Daun",
        tanaman: "Tebu",
        tingkatRisiko: "Rendah",
        gejala: "Daun keriting dan menguning, pertumbuhan lambat",
        penanganan: "Semprot dengan insektisida atau pestisida nabati",
        kondisiMuncul: {
            suhu: [25, 32],
            kelembaban: [50, 70],
            curahHujan: "Rendah"
        },
        icon: "🐜"
    },
    {
        id: 6,
        nama: "Tikus Sawah",
        tanaman: "Padi",
        tingkatRisiko: "Sedang",
        gejala: "Tanaman terpotong, bulir padi hilang",
        penanganan: "Gropyokan, perangkap, dan rodentisida",
        kondisiMuncul: {
            suhu: [22, 30],
            kelembaban: [60, 85],
            curahHujan: "Sedang"
        },
        icon: "🐭"
    }
];

// Data Kondisi per Kecamatan
const kondisiKecamatan = [
    { kecamatan: "Candi", suhu: 28, kelembaban: 75, curahHujan: 180 },
    { kecamatan: "Sidoarjo", suhu: 29, kelembaban: 72, curahHujan: 150 },
    { kecamatan: "Buduran", suhu: 27, kelembaban: 78, curahHujan: 195 },
    { kecamatan: "Taman", suhu: 26, kelembaban: 80, curahHujan: 220 },
    { kecamatan: "Waru", suhu: 28, kelembaban: 74, curahHujan: 170 },
    { kecamatan: "Krian", suhu: 27, kelembaban: 76, curahHujan: 200 },
    { kecamatan: "Porong", suhu: 25, kelembaban: 85, curahHujan: 310 },
    { kecamatan: "Tanggulangin", suhu: 24, kelembaban: 88, curahHujan: 350 },
    { kecamatan: "Gedangan", suhu: 29, kelembaban: 70, curahHujan: 160 },
    { kecamatan: "Prambon", suhu: 28, kelembaban: 73, curahHujan: 190 }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    loadRiskCards();
    loadRisikoTable();
});

function initSidebar() {
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
}

// Load Risk Cards
function loadRiskCards() {
    const container = document.getElementById('riskGrid');
    container.innerHTML = '';
    
    optDatabase.forEach(opt => {
        const card = document.createElement('div');
        card.className = `risk-card ${opt.tingkatRisiko.toLowerCase()}`;
        card.innerHTML = `
            <div class="risk-header">
                <div>
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${opt.icon}</div>
                    <h3 style="margin-bottom: 0.3rem;">${opt.nama}</h3>
                    <p style="color: #7f8c8d; font-size: 0.9rem;">Tanaman: ${opt.tanaman}</p>
                </div>
                <span class="risk-badge ${opt.tingkatRisiko.toLowerCase()}">
                    ${opt.tingkatRisiko}
                </span>
            </div>
            
            <div style="margin: 1rem 0;">
                <strong style="color: #2c3e50;">Gejala:</strong>
                <p style="color: #555; font-size: 0.9rem; margin-top: 0.3rem;">${opt.gejala}</p>
            </div>
            
            <div class="condition-box">
                <strong style="color: #2c3e50; display: block; margin-bottom: 0.5rem;">Kondisi Pemicu:</strong>
                <div class="condition-item">
                    <span>🌡️ Suhu:</span>
                    <strong>${opt.kondisiMuncul.suhu[0]}-${opt.kondisiMuncul.suhu[1]}°C</strong>
                </div>
                <div class="condition-item">
                    <span>💨 Kelembaban:</span>
                    <strong>${opt.kondisiMuncul.kelembaban[0]}-${opt.kondisiMuncul.kelembaban[1]}%</strong>
                </div>
                <div class="condition-item">
                    <span>💧 Curah Hujan:</span>
                    <strong>${opt.kondisiMuncul.curahHujan}</strong>
                </div>
            </div>
            
            <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 6px;">
                <strong style="color: #27ae60; display: block; margin-bottom: 0.5rem;">✅ Penanganan:</strong>
                <p style="color: #555; font-size: 0.9rem;">${opt.penanganan}</p>
            </div>
            
            <button class="btn btn-outline" onclick="viewDetailOPT(${opt.id})" style="width: 100%; margin-top: 1rem;">
                📖 Lihat Detail Lengkap
            </button>
        `;
        container.appendChild(card);
    });
}

// Load Risiko Table
function loadRisikoTable() {
    const tbody = document.getElementById('tableRisikoBody');
    tbody.innerHTML = '';
    
    kondisiKecamatan.forEach(kec => {
        // Prediksi risiko wereng
        const risikoWereng = prediksiRisiko(kec, [25, 30], [70, 90], 200);
        const risikoJamur = prediksiRisiko(kec, [20, 28], [80, 95], 250);
        
        const row = `
            <tr>
                <td><strong>${kec.kecamatan}</strong></td>
                <td>${kec.suhu}°C</td>
                <td>${kec.kelembaban}%</td>
                <td>${kec.curahHujan} mm</td>
                <td><span class="status-badge ${getRisikoClass(risikoWereng)}">${risikoWereng}</span></td>
                <td><span class="status-badge ${getRisikoClass(risikoJamur)}">${risikoJamur}</span></td>
                <td>
                    <button class="btn-action btn-view" onclick="viewKecamatanDetail('${kec.kecamatan}')">👁️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Prediksi Risiko berdasarkan kondisi
function prediksiRisiko(kondisi, suhuRange, kelembabanRange, curahHujanMin) {
    let score = 0;
    
    // Check suhu
    if (kondisi.suhu >= suhuRange[0] && kondisi.suhu <= suhuRange[1]) {
        score += 33;
    }
    
    // Check kelembaban
    if (kondisi.kelembaban >= kelembabanRange[0] && kondisi.kelembaban <= kelembabanRange[1]) {
        score += 33;
    }
    
    // Check curah hujan
    if (kondisi.curahHujan >= curahHujanMin) {
        score += 34;
    }
    
    // Determine risk level
    if (score >= 70) return "Tinggi";
    if (score >= 40) return "Sedang";
    return "Rendah";
}

// Get Risiko Class
function getRisikoClass(risiko) {
    if (risiko === "Tinggi") return "danger";
    if (risiko === "Sedang") return "warning";
    return "success";
}

// View Detail OPT
function viewDetailOPT(id) {
    const opt = optDatabase.find(o => o.id === id);
    if (opt) {
        alert(`${opt.icon} ${opt.nama}\n\n` +
              `Tanaman: ${opt.tanaman}\n` +
              `Tingkat Risiko: ${opt.tingkatRisiko}\n\n` +
              `Gejala:\n${opt.gejala}\n\n` +
              `Penanganan:\n${opt.penanganan}\n\n` +
              `Kondisi Pemicu:\n` +
              `- Suhu: ${opt.kondisiMuncul.suhu[0]}-${opt.kondisiMuncul.suhu[1]}°C\n` +
              `- Kelembaban: ${opt.kondisiMuncul.kelembaban[0]}-${opt.kondisiMuncul.kelembaban[1]}%\n` +
              `- Curah Hujan: ${opt.kondisiMuncul.curahHujan}`);
    }
}

// View Kecamatan Detail
function viewKecamatanDetail(kecamatan) {
    const kec = kondisiKecamatan.find(k => k.kecamatan === kecamatan);
    if (kec) {
        const risikoWereng = prediksiRisiko(kec, [25, 30], [70, 90], 200);
        const risikoJamur = prediksiRisiko(kec, [20, 28], [80, 95], 250);
        
        alert(`Analisis OPT - ${kecamatan}\n\n` +
              `Kondisi Saat Ini:\n` +
              `🌡️ Suhu: ${kec.suhu}°C\n` +
              `💨 Kelembaban: ${kec.kelembaban}%\n` +
              `💧 Curah Hujan: ${kec.curahHujan} mm\n\n` +
              `Prediksi Risiko:\n` +
              `🐛 Wereng: ${risikoWereng}\n` +
              `🍄 Jamur: ${risikoJamur}\n\n` +
              `${risikoWereng === 'Tinggi' || risikoJamur === 'Tinggi' ? 
                '⚠️ Rekomendasi: Lakukan monitoring intensif dan aplikasi pestisida preventif!' : 
                '✅ Kondisi relatif aman, tetap lakukan monitoring rutin.'}`);
    }
}

// Filter by Tanaman
function filterByTanaman() {
    const filter = document.getElementById('filterTanaman').value;
    const cards = document.querySelectorAll('.risk-card');
    
    cards.forEach(card => {
        const tanaman = card.querySelector('p').textContent.replace('Tanaman: ', '');
        if (filter === 'all' || tanaman === filter) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Refresh Prediksi
function refreshPrediksi() {
    alert('🔄 Memperbarui prediksi OPT berdasarkan data cuaca terkini...\n\n✅ Prediksi berhasil diperbarui!');
    setTimeout(() => {
        location.reload();
    }, 1000);
}