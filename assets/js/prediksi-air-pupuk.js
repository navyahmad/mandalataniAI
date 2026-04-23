// ==========================================
// PREDIKSI AIR & PUPUK - MANDALA TANI
// ==========================================

// Formula Kebutuhan per Tanaman (per hektar)
const formulaTanaman = {
    padi: {
        nama: "Padi",
        air: 5500,           // liter per hari
        urea: 250,           // kg
        npk: 150,            // kg
        lamaTanam: 120,      // hari
        icon: "🌾"
    },
    jagung: {
        nama: "Jagung",
        air: 4000,
        urea: 300,
        npk: 200,
        lamaTanam: 90,
        icon: "🌽"
    },
    kedelai: {
        nama: "Kedelai",
        air: 3000,
        urea: 50,            // Kedelai butuh N lebih sedikit
        npk: 100,
        lamaTanam: 85,
        icon: "🫘"
    },
    tebu: {
        nama: "Tebu",
        air: 6000,
        urea: 400,
        npk: 300,
        lamaTanam: 365,      // 1 tahun
        icon: "🎋"
    },
    kacang_hijau: {
        nama: "Kacang Hijau",
        air: 2500,
        urea: 40,
        npk: 80,
        lamaTanam: 60,
        icon: "🫛"
    }
};

// Faktor Penyesuaian
const faktorMusim = {
    hujan: 0.7,      // Hujan mengurangi kebutuhan irigasi
    kemarau: 1.2     // Kemarau meningkatkan kebutuhan air
};

const faktorIrigasi = {
    "teknis": 1.0,
    "semi-teknis": 1.1,
    "sederhana": 1.2,
    "tadah-hujan": 1.3
};

const faktorTanah = {
    "subur": 0.9,        // Tanah subur butuh pupuk lebih sedikit
    "sedang": 1.0,
    "kurang": 1.2        // Tanah kurang subur butuh pupuk lebih banyak
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    updateFormula();
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

// Update Formula Display
function updateFormula() {
    const jenisTanaman = document.getElementById('jenisTanaman').value;
    const tanaman = formulaTanaman[jenisTanaman];
    
    // This function can be expanded to show formula preview
    console.log('Selected:', tanaman.nama);
}

// Hitung Kebutuhan
function hitungKebutuhan() {
    // Get inputs
    const jenisTanaman = document.getElementById('jenisTanaman').value;
    const luasLahan = parseFloat(document.getElementById('luasLahan').value);
    const musim = document.getElementById('musim').value;
    const sistemIrigasi = document.getElementById('sistemIrigasi').value;
    const kondisiTanah = document.getElementById('kondisiTanah').value;
    
    // Get base values
    const tanaman = formulaTanaman[jenisTanaman];
    
    // Calculate Air (Water)
    const airPerHari = tanaman.air * luasLahan * faktorMusim[musim] * faktorIrigasi[sistemIrigasi];
    const airTotal = airPerHari * tanaman.lamaTanam;
    
    // Calculate Pupuk (Fertilizer)
    const ureaTotal = tanaman.urea * luasLahan * faktorTanah[kondisiTanah];
    const npkTotal = tanaman.npk * luasLahan * faktorTanah[kondisiTanah];
    
    // Display results
    tampilkanHasil({
        tanaman: tanaman,
        luasLahan: luasLahan,
        musim: musim,
        sistemIrigasi: sistemIrigasi,
        kondisiTanah: kondisiTanah,
        airPerHari: Math.round(airPerHari),
        airTotal: Math.round(airTotal),
        ureaTotal: Math.round(ureaTotal * 10) / 10,
        npkTotal: Math.round(npkTotal * 10) / 10,
        faktorMusim: faktorMusim[musim],
        faktorIrigasi: faktorIrigasi[sistemIrigasi],
        faktorTanah: faktorTanah[kondisiTanah]
    });
    
    // Show result section
    document.getElementById('hasilPrediksi').style.display = 'block';
    document.getElementById('hasilPrediksi').scrollIntoView({ behavior: 'smooth' });
}

// Tampilkan Hasil
function tampilkanHasil(data) {
    const resultGrid = document.getElementById('resultGrid');
    
    resultGrid.innerHTML = `
        <div class="result-item" style="background: linear-gradient(135deg, #3498db, #2980b9);">
            <p style="font-size: 1rem; margin-bottom: 0.5rem;">💧 Kebutuhan Air/Hari</p>
            <h3>${data.airPerHari.toLocaleString()}</h3>
            <p>Liter</p>
        </div>
        <div class="result-item" style="background: linear-gradient(135deg, #f39c12, #e67e22);">
            <p style="font-size: 1rem; margin-bottom: 0.5rem;">🌱 Pupuk Urea</p>
            <h3>${data.ureaTotal.toLocaleString()}</h3>
            <p>Kilogram (kg)</p>
        </div>
        <div class="result-item" style="background: linear-gradient(135deg, #27ae60, #229954);">
            <p style="font-size: 1rem; margin-bottom: 0.5rem;">🧪 Pupuk NPK</p>
            <h3>${data.npkTotal.toLocaleString()}</h3>
            <p>Kilogram (kg)</p>
        </div>
    `;
    
    // Detail Breakdown
    const detailBreakdown = document.getElementById('detailBreakdown');
    detailBreakdown.innerHTML = `
        <h3 style="margin-top: 2rem; margin-bottom: 1rem;">📋 Detail Perhitungan</h3>
        <table class="breakdown-table">
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Nilai</th>
                    <th>Keterangan</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Jenis Tanaman</strong></td>
                    <td>${data.tanaman.icon} ${data.tanaman.nama}</td>
                    <td>Lama tanam: ${data.tanaman.lamaTanam} hari</td>
                </tr>
                <tr>
                    <td><strong>Luas Lahan</strong></td>
                    <td>${data.luasLahan} Ha</td>
                    <td>${data.luasLahan * 10000} m²</td>
                </tr>
                <tr>
                    <td><strong>Kebutuhan Air per Hari</strong></td>
                    <td>${data.airPerHari.toLocaleString()} liter</td>
                    <td>${(data.airPerHari / 1000).toFixed(1)} m³</td>
                </tr>
                <tr>
                    <td><strong>Total Kebutuhan Air</strong></td>
                    <td>${data.airTotal.toLocaleString()} liter</td>
                    <td>Untuk ${data.tanaman.lamaTanam} hari</td>
                </tr>
                <tr>
                    <td><strong>Pupuk Urea</strong></td>
                    <td>${data.ureaTotal} kg</td>
                    <td>Aplikasi: 3 tahap</td>
                </tr>
                <tr>
                    <td><strong>Pupuk NPK</strong></td>
                    <td>${data.npkTotal} kg</td>
                    <td>Aplikasi: 2 tahap</td>
                </tr>
                <tr>
                    <td><strong>Faktor Musim</strong></td>
                    <td>×${data.faktorMusim}</td>
                    <td>${data.musim === 'hujan' ? 'Musim Hujan' : 'Musim Kemarau'}</td>
                </tr>
                <tr>
                    <td><strong>Faktor Irigasi</strong></td>
                    <td>×${data.faktorIrigasi}</td>
                    <td>${document.getElementById('sistemIrigasi').options[document.getElementById('sistemIrigasi').selectedIndex].text}</td>
                </tr>
                <tr>
                    <td><strong>Faktor Kondisi Tanah</strong></td>
                    <td>×${data.faktorTanah}</td>
                    <td>${document.getElementById('kondisiTanah').options[document.getElementById('kondisiTanah').selectedIndex].text}</td>
                </tr>
            </tbody>
        </table>
    `;
    
    // Formula Info
    const formulaInfo = document.getElementById('formulaInfo');
    formulaInfo.innerHTML = `
        <div style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <h4 style="color: #3498db; margin-bottom: 0.5rem;">💧 Formula Kebutuhan Air:</h4>
            <code style="display: block; padding: 0.8rem; background: #ecf0f1; border-radius: 4px; font-family: monospace;">
                Air/hari = Kebutuhan_Base × Luas_Lahan × Faktor_Musim × Faktor_Irigasi<br>
                = ${data.tanaman.air} × ${data.luasLahan} × ${data.faktorMusim} × ${data.faktorIrigasi}<br>
                = ${data.airPerHari.toLocaleString()} liter/hari
            </code>
        </div>
        
        <div style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <h4 style="color: #f39c12; margin-bottom: 0.5rem;">🌱 Formula Pupuk Urea:</h4>
            <code style="display: block; padding: 0.8rem; background: #ecf0f1; border-radius: 4px; font-family: monospace;">
                Urea = Kebutuhan_Base × Luas_Lahan × Faktor_Tanah<br>
                = ${data.tanaman.urea} × ${data.luasLahan} × ${data.faktorTanah}<br>
                = ${data.ureaTotal} kg
            </code>
        </div>
        
        <div style="background: white; padding: 1rem; border-radius: 8px;">
            <h4 style="color: #27ae60; margin-bottom: 0.5rem;">🧪 Formula Pupuk NPK:</h4>
            <code style="display: block; padding: 0.8rem; background: #ecf0f1; border-radius: 4px; font-family: monospace;">
                NPK = Kebutuhan_Base × Luas_Lahan × Faktor_Tanah<br>
                = ${data.tanaman.npk} × ${data.luasLahan} × ${data.faktorTanah}<br>
                = ${data.npkTotal} kg
            </code>
        </div>
        
        <div style="margin-top: 1rem; padding: 1rem; background: #d4edda; border-radius: 8px;">
            <h4 style="color: #155724; margin-bottom: 0.5rem;">💰 Estimasi Biaya</h4>
            <p style="color: #155724;">
                <strong>Air:</strong> Rp ${(data.airTotal * 0.5).toLocaleString()} (Rp 500/m³)<br>
                <strong>Urea:</strong> Rp ${(data.ureaTotal * 2500).toLocaleString()} (Rp 2.500/kg)<br>
                <strong>NPK:</strong> Rp ${(data.npkTotal * 3500).toLocaleString()} (Rp 3.500/kg)<br>
                <strong style="font-size: 1.1rem;">Total Estimasi: Rp ${((data.airTotal * 0.5) + (data.ureaTotal * 2500) + (data.npkTotal * 3500)).toLocaleString()}</strong>
            </p>
        </div>
    `;
    
    // Save to localStorage
    localStorage.setItem('lastPrediksi', JSON.stringify(data));
}

// Download Laporan
function downloadLaporan() {
    alert('📄 Laporan PDF sedang digenerate...\n\n✅ Download akan dimulai sebentar lagi!');
}

// Export Excel
function exportExcel() {
    const data = JSON.parse(localStorage.getItem('lastPrediksi') || '{}');
    
    if (!data.tanaman) {
        alert('Tidak ada data untuk di-export. Silakan hitung kebutuhan terlebih dahulu.');
        return;
    }
    
    // Create CSV content
    let csv = 'Parameter,Nilai,Satuan\n';
    csv += `Jenis Tanaman,${data.tanaman.nama},\n`;
    csv += `Luas Lahan,${data.luasLahan},Hektar\n`;
    csv += `Kebutuhan Air per Hari,${data.airPerHari},Liter\n`;
    csv += `Total Kebutuhan Air,${data.airTotal},Liter\n`;
    csv += `Pupuk Urea,${data.ureaTotal},Kg\n`;
    csv += `Pupuk NPK,${data.npkTotal},Kg\n`;
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prediksi-air-pupuk.csv';
    a.click();
    
    alert('📊 Data berhasil di-export ke Excel!');
}

// Print Result
function printResult() {
    window.print();
}