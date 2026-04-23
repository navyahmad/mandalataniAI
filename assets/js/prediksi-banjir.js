// ==========================================
// PREDIKSI BANJIR - MANDALA TANI
// ==========================================

// Data BMKG (Simulasi)
const dataBMKG = [
    { kecamatan: "Candi", curahHujan: 180, suhu: 28, kelembaban: 75, status: "Normal" },
    { kecamatan: "Sidoarjo", curahHujan: 150, suhu: 29, kelembaban: 72, status: "Normal" },
    { kecamatan: "Buduran", curahHujan: 195, suhu: 27, kelembaban: 78, status: "Normal" },
    { kecamatan: "Taman", curahHujan: 220, suhu: 26, kelembaban: 80, status: "Waspada" },
    { kecamatan: "Waru", curahHujan: 170, suhu: 28, kelembaban: 74, status: "Normal" },
    { kecamatan: "Krian", curahHujan: 280, suhu: 27, kelembaban: 76, status: "Waspada" },
    { kecamatan: "Porong", curahHujan: 350, suhu: 25, kelembaban: 85, status: "Siaga" },
    { kecamatan: "Tanggulangin", curahHujan: 420, suhu: 24, kelembaban: 88, status: "Awas" },
    { kecamatan: "Gedangan", curahHujan: 160, suhu: 29, kelembaban: 70, status: "Normal" },
    { kecamatan: "Prambon", curahHujan: 190, suhu: 28, kelembaban: 73, status: "Normal" },
    { kecamatan: "Tulangan", curahHujan: 450, suhu: 23, kelembaban: 90, status: "Awas" },
    { kecamatan: "Wonoayu", curahHujan: 240, suhu: 27, kelembaban: 78, status: "Waspada" },
    { kecamatan: "Tarik", curahHujan: 175, suhu: 28, kelembaban: 74, status: "Normal" },
    { kecamatan: "Balongbendo", curahHujan: 185, suhu: 28, kelembaban: 75, status: "Normal" },
    { kecamatan: "Jabon", curahHujan: 320, suhu: 26, kelembaban: 82, status: "Siaga" },
    { kecamatan: "Sukodono", curahHujan: 165, suhu: 29, kelembaban: 71, status: "Normal" },
    { kecamatan: "Krembung", curahHujan: 440, suhu: 24, kelembaban: 89, status: "Awas" },
    { kecamatan: "Sedati", curahHujan: 155, suhu: 29, kelembaban: 70, status: "Normal" }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    loadMapBanjir();
    loadTableBanjir();
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

// Determine Status berdasarkan Curah Hujan
function determineStatus(curahHujan) {
    if (curahHujan > 400) return "Awas";
    if (curahHujan > 300) return "Siaga";
    if (curahHujan > 200) return "Waspada";
    return "Normal";
}

// Get Status Class
function getStatusClass(status) {
    const statusMap = {
        "Awas": "danger",
        "Siaga": "warning",
        "Waspada": "warning",
        "Normal": "success"
    };
    return statusMap[status] || "success";
}

// Get Rekomendasi
function getRekomendasi(status) {
    const rekomMap = {
        "Awas": "Evakuasi segera! Hentikan aktivitas pertanian",
        "Siaga": "Siapkan evakuasi, monitoring ketat",
        "Waspada": "Tingkatkan kewaspadaan, siapkan pompa",
        "Normal": "Monitoring rutin, jaga drainase"
    };
    return rekomMap[status] || "Monitoring rutin";
}

// Load Map Banjir
function loadMapBanjir() {
    const container = document.getElementById('mapBanjir');
    container.innerHTML = '';
    
    dataBMKG.forEach(kec => {
        const item = document.createElement('div');
        item.className = `map-item-banjir ${kec.status.toLowerCase()}`;
        item.innerHTML = `
            <div style="font-weight: bold; font-size: 1.1rem; margin-bottom: 0.5rem;">${kec.kecamatan}</div>
            <div style="font-size: 1.3rem; font-weight: bold; margin-bottom: 0.3rem;">${kec.curahHujan} mm</div>
            <div style="font-size: 0.9rem; font-weight: 600;">${kec.status}</div>
        `;
        
        item.addEventListener('click', function() {
            showKecamatanDetail(kec);
        });
        
        container.appendChild(item);
    });
}

// Load Table Banjir
function loadTableBanjir() {
    const tbody = document.getElementById('tableBanjirBody');
    tbody.innerHTML = '';
    
    // Sort by curah hujan (descending)
    const sortedData = [...dataBMKG].sort((a, b) => b.curahHujan - a.curahHujan);
    
    sortedData.forEach(kec => {
        const statusClass = getStatusClass(kec.status);
        const rekomendasi = getRekomendasi(kec.status);
        
        const row = `
            <tr>
                <td><strong>${kec.kecamatan}</strong></td>
                <td><strong>${kec.curahHujan} mm</strong></td>
                <td>${kec.suhu}°C</td>
                <td>${kec.kelembaban}%</td>
                <td><span class="status-badge ${statusClass}">${kec.status}</span></td>
                <td>${rekomendasi}</td>
                <td>
                    <button class="btn-action btn-view" onclick="showKecamatanDetail(${JSON.stringify(kec).replace(/"/g, '&quot;')})">👁️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Show Kecamatan Detail
function showKecamatanDetail(kec) {
    const rekomendasi = getRekomendasi(kec.status);
    
    let detailMessage = `📍 ${kec.kecamatan}\n\n`;
    detailMessage += `Status: ${kec.status}\n\n`;
    detailMessage += `Data Cuaca:\n`;
    detailMessage += `💧 Curah Hujan: ${kec.curahHujan} mm\n`;
    detailMessage += `🌡️ Suhu: ${kec.suhu}°C\n`;
    detailMessage += `💨 Kelembaban: ${kec.kelembaban}%\n\n`;
    detailMessage += `Rekomendasi:\n${rekomendasi}\n\n`;
    
    if (kec.status === "Awas") {
        detailMessage += `🚨 PERINGATAN DINI!\n`;
        detailMessage += `- Evakuasi area rawan banjir\n`;
        detailMessage += `- Hentikan aktivitas pertanian\n`;
        detailMessage += `- Hubungi BPBD: 0812-xxxx-xxxx`;
    } else if (kec.status === "Siaga") {
        detailMessage += `⚠️ SIAGA BANJIR\n`;
        detailMessage += `- Siapkan rencana evakuasi\n`;
        detailMessage += `- Monitoring setiap 4 jam\n`;
        detailMessage += `- Amankan hasil panen`;
    } else if (kec.status === "Waspada") {
        detailMessage += `⚡ WASPADA\n`;
        detailMessage += `- Bersihkan saluran air\n`;
        detailMessage += `- Siapkan pompa air\n`;
        detailMessage += `- Monitoring rutin`;
    } else {
        detailMessage += `✅ KONDISI NORMAL\n`;
        detailMessage += `- Lanjutkan monitoring\n`;
        detailMessage += `- Jaga sistem drainase\n`;
        detailMessage += `- Tetap waspada`;
    }
    
    alert(detailMessage);
}

// Refresh BMKG Data
function refreshBMKG() {
    alert('🔄 Memperbarui data BMKG...\n\n' +
          '📡 Mengambil data cuaca terkini\n' +
          '🌧️ Memproses prediksi curah hujan\n' +
          '🗺️ Memperbarui peta status\n\n' +
          '✅ Data berhasil diperbarui!\n\n' +
          'Terakhir update: ' + new Date().toLocaleString('id-ID'));
    
    // Simulate data refresh
    setTimeout(() => {
        // Randomly update some values
        dataBMKG.forEach(kec => {
            const change = Math.floor(Math.random() * 30) - 15;
            kec.curahHujan = Math.max(50, kec.curahHujan + change);
            kec.status = determineStatus(kec.curahHujan);
        });
        
        loadMapBanjir();
        loadTableBanjir();
    }, 500);
}

// Export Functions for inline onclick
window.showKecamatanDetail = function(kec) {
    if (typeof kec === 'string') {
        kec = JSON.parse(kec);
    }
    showKecamatanDetail(kec);
};