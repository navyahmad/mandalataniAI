// ==========================================
// SIMULASI HASIL PANEN - MANDALA TANI
// ==========================================

const yieldNormal = {
    padi: { min: 5, max: 6, unit: 'ton/ha' },
    jagung: { min: 8, max: 10, unit: 'ton/ha' },
    kedelai: { min: 1.5, max: 2, unit: 'ton/ha' },
    tebu: { min: 80, max: 100, unit: 'ton/ha' }
};

const impactFactor = {
    banjir: { padi: 0.4, jagung: 0.5, kedelai: 0.45, tebu: 0.35 },
    kekeringan: { padi: 0.3, jagung: 0.35, kedelai: 0.4, tebu: 0.25 },
    suhu_tinggi: { padi: 0.25, jagung: 0.2, kedelai: 0.3, tebu: 0.15 },
    angin_kencang: { padi: 0.35, jagung: 0.4, kedelai: 0.3, tebu: 0.45 }
};

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
});

function initSidebar() {
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
    }
}

function runSimulation(event) {
    event.preventDefault();
    
    const jenis = document.getElementById('jenisTanaman').value;
    const luas = parseFloat(document.getElementById('luasLahan').value);
    const skenario = document.getElementById('skenarioCuaca').value;
    const durasi = parseInt(document.getElementById('durasiEkstrem').value);
    
    // Calculate yields
    const normalYield = (yieldNormal[jenis].min + yieldNormal[jenis].max) / 2;
    const normalTotal = normalYield * luas;
    
    const impact = impactFactor[skenario][jenis];
    const durasiImpact = 1 - (durasi * 0.05); // Semakin lama, semakin besar dampak
    const ekstremYield = normalYield * (1 - impact) * durasiImpact;
    const ekstremTotal = ekstremYield * luas;
    
    const loss = normalTotal - ekstremTotal;
    const lossPercentage = ((loss / normalTotal) * 100).toFixed(1);
    
    // Harga per ton (estimasi)
    const harga = { padi: 5000000, jagung: 4000000, kedelai: 8000000, tebu: 800000 };
    const financialLoss = loss * harga[jenis];
    
    // Display results
    displayResults(jenis, luas, normalYield, normalTotal, ekstremYield, ekstremTotal, loss, lossPercentage, financialLoss, skenario, durasi);
    
    document.getElementById('hasilSimulasi').style.display = 'block';
    document.getElementById('hasilSimulasi').scrollIntoView({ behavior: 'smooth' });
}

function displayResults(jenis, luas, normalYield, normalTotal, ekstremYield, ekstremTotal, loss, lossPercentage, financialLoss, skenario, durasi) {
    // Normal results
    document.getElementById('normalResults').innerHTML = `
        <table class="comparison-table">
            <tr>
                <td>Produktivitas</td>
                <td><strong>${normalYield.toFixed(2)} ton/ha</strong></td>
            </tr>
            <tr>
                <td>Total Hasil</td>
                <td><strong>${normalTotal.toFixed(2)} ton</strong></td>
            </tr>
            <tr>
                <td>Nilai Ekonomi</td>
                <td><strong>Rp ${(normalTotal * getHarga(jenis)).toLocaleString()}</strong></td>
            </tr>
            <tr>
                <td>Status</td>
                <td><span style="color: #27ae60; font-weight: bold;">✅ Optimal</span></td>
            </tr>
        </table>
    `;
    
    // Ekstrem results
    document.getElementById('ekstremResults').innerHTML = `
        <table class="comparison-table">
            <tr>
                <td>Produktivitas</td>
                <td><strong>${ekstremYield.toFixed(2)} ton/ha</strong></td>
            </tr>
            <tr>
                <td>Total Hasil</td>
                <td><strong>${ekstremTotal.toFixed(2)} ton</strong></td>
            </tr>
            <tr>
                <td>Nilai Ekonomi</td>
                <td><strong>Rp ${(ekstremTotal * getHarga(jenis)).toLocaleString()}</strong></td>
            </tr>
            <tr>
                <td>Status</td>
                <td><span style="color: #e74c3c; font-weight: bold;">⚠️ Risiko Tinggi</span></td>
            </tr>
        </table>
    `;
    
    // Comparison table
    document.getElementById('comparisonTable').innerHTML = `
        <tr>
            <td><strong>Kerugian Produksi</strong></td>
            <td style="text-align: right; color: #e74c3c; font-weight: bold;">${loss.toFixed(2)} ton (${lossPercentage}%)</td>
        </tr>
        <tr>
            <td><strong>Kerugian Finansial</strong></td>
            <td style="text-align: right; color: #e74c3c; font-weight: bold;">Rp ${financialLoss.toLocaleString()}</td>
        </tr>
        <tr>
            <td><strong>Skenario Cuaca</strong></td>
            <td style="text-align: right;">${getSkenarioLabel(skenario)}</td>
        </tr>
        <tr>
            <td><strong>Durasi Dampak</strong></td>
            <td style="text-align: right;">${durasi} minggu</td>
        </tr>
    `;
    
    // Rekomendasi
    document.getElementById('rekomendasiMitigasi').innerHTML = getRekomendasi(skenario, jenis, lossPercentage);
}

function getHarga(jenis) {
    const harga = { padi: 5000000, jagung: 4000000, kedelai: 8000000, tebu: 800000 };
    return harga[jenis];
}

function getSkenarioLabel(skenario) {
    const labels = {
        banjir: 'Banjir',
        kekeringan: 'Kekeringan',
        suhu_tinggi: 'Suhu Ekstrem Tinggi',
        angin_kencang: 'Angin Kencang & Badai'
    };
    return labels[skenario];
}

function getRekomendasi(skenario, jenis, lossPercentage) {
    const rekomendasiMap = {
        banjir: `
            <div style="padding: 1.5rem; background: #fff3e0; border-radius: 8px;">
                <h4 style="color: #e65100; margin-bottom: 1rem;">🌊 Mitigasi Banjir</h4>
                <ul style="color: #555; line-height: 1.8;">
                    <li>Buat sistem drainase yang baik</li>
                    <li>Tinggikan bedengan pada lahan rawan banjir</li>
                    <li>Tanam varietas ${jenis} tahan genangan</li>
                    <li>Siapkan pompa air untuk evakuasi cepat</li>
                    <li>Asuransi pertanian untuk meminimalkan kerugian</li>
                    <li><strong>Potensi kerugian: ${lossPercentage}% (Rp ${(lossPercentage * 50000000 / 100).toLocaleString()})</strong></li>
                </ul>
            </div>
        `,
        kekeringan: `
            <div style="padding: 1.5rem; background: #ffebee; border-radius: 8px;">
                <h4 style="color: #c62828; margin-bottom: 1rem;">☀️ Mitigasi Kekeringan</h4>
                <ul style="color: #555; line-height: 1.8;">
                    <li>Bangun sistem irigasi tetes untuk efisiensi air</li>
                    <li>Gunakan mulsa untuk mengurangi evaporasi</li>
                    <li>Pilih varietas ${jenis} tahan kekeringan</li>
                    <li>Atur jadwal tanam sesuai musim hujan</li>
                    <li>Buat embung untuk cadangan air</li>
                    <li><strong>Potensi kerugian: ${lossPercentage}% (Rp ${(lossPercentage * 50000000 / 100).toLocaleString()})</strong></li>
                </ul>
            </div>
        `,
        suhu_tinggi: `
            <div style="padding: 1.5rem; background: #e3f2fd; border-radius: 8px;">
                <h4 style="color: #1565c0; margin-bottom: 1rem;">🌡️ Mitigasi Suhu Tinggi</h4>
                <ul style="color: #555; line-height: 1.8;">
                    <li>Tanam pohon pelindung di sekitar lahan</li>
                    <li>Tingkatkan frekuensi penyiraman</li>
                    <li>Gunakan varietas ${jenis} toleran panas</li>
                    <li>Aplikasi pupuk dengan unsur kalium lebih tinggi</li>
                    <li>Hindari pemupukan saat suhu puncak</li>
                    <li><strong>Potensi kerugian: ${lossPercentage}% (Rp ${(lossPercentage * 50000000 / 100).toLocaleString()})</strong></li>
                </ul>
            </div>
        `,
        angin_kencang: `
            <div style="padding: 1.5rem; background: #e8f5e9; border-radius: 8px;">
                <h4 style="color: #2e7d32; margin-bottom: 1rem;">💨 Mitigasi Angin Kencang</h4>
                <ul style="color: #555; line-height: 1.8;">
                    <li>Tanam windbreak (pohon pemecah angin)</li>
                    <li>Gunakan ajir/bambu untuk menopang tanaman</li>
                    <li>Tanam varietas ${jenis} dengan batang kuat</li>
                    <li>Perhatikan early warning system cuaca</li>
                    <li>Panen lebih awal jika prediksi badai</li>
                    <li><strong>Potensi kerugian: ${lossPercentage}% (Rp ${(lossPercentage * 50000000 / 100).toLocaleString()})</strong></li>
                </ul>
            </div>
        `
    };
    
    return rekomendasiMap[skenario] || 'Tidak ada rekomendasi';
}