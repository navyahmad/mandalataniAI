// ==========================================
// PREDIKSI PASAR - MANDALA TANI
// ==========================================

const marketData = [
    { id: 1, nama: "Padi", harga: 5100, trend: 8, stok: 12450, konsumsi: 10000, demand: 11500, icon: "🌾", color: "#27ae60" },
    { id: 2, nama: "Jagung", harga: 4200, trend: -3, stok: 8200, konsumsi: 7500, demand: 8000, icon: "🌽", color: "#f39c12" },
    { id: 3, nama: "Kedelai", harga: 8500, trend: 12, stok: 3200, konsumsi: 4000, demand: 4050, icon: "🫘", color: "#e74c3c" },
    { id: 4, nama: "Tebu", harga: 850, trend: 5, stok: 25000, konsumsi: 22000, demand: 23500, icon: "🎋", color: "#3498db" },
    { id: 5, nama: "Kacang Hijau", harga: 12000, trend: 15, stok: 1800, konsumsi: 1500, demand: 1650, icon: "🫛", color: "#9b59b6" }
];

const demandKecamatan = [
    { kecamatan: "Candi", populasi: 85000, padi: 850, jagung: 620, kedelai: 280 },
    { kecamatan: "Sidoarjo", populasi: 120000, padi: 1200, jagung: 880, kedelai: 400 },
    { kecamatan: "Porong", populasi: 65000, padi: 650, jagung: 480, kedelai: 220 },
    { kecamatan: "Tanggulangin", populasi: 78000, padi: 780, jagung: 570, kedelai: 260 },
    { kecamatan: "Waru", populasi: 95000, padi: 950, jagung: 700, kedelai: 320 }
];

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    loadMarketCards();
    loadPrediksiTable();
    loadDemandTable();
    drawChart();
});

function initSidebar() {
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
    }
}

function loadMarketCards() {
    const grid = document.getElementById('marketGrid');
    grid.innerHTML = '';
    
    marketData.forEach(item => {
        const trendIcon = item.trend > 0 ? '📈' : '📉';
        const trendClass = item.trend > 0 ? 'trend-up' : 'trend-down';
        const status = item.stok >= item.demand ? 'Surplus' : 'Defisit';
        const statusColor = status === 'Surplus' ? '#27ae60' : '#e74c3c';
        
        const card = `
            <div class="market-card" style="border-color: ${item.color}">
                <div style="display: flex; justify-content: between; align-items: start;">
                    <div>
                        <div style="font-size: 2.5rem;">${item.icon}</div>
                        <h3 style="margin: 0.5rem 0;">${item.nama}</h3>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.8rem; font-weight: bold; color: ${item.color}">
                            Rp ${item.harga.toLocaleString()}
                        </div>
                        <div style="font-size: 0.85rem; color: #7f8c8d;">per kg</div>
                    </div>
                </div>
                <div class="price-trend ${trendClass}">
                    <span style="font-size: 1.5rem;">${trendIcon}</span>
                    <strong>${Math.abs(item.trend)}%</strong>
                    <span>${item.trend > 0 ? 'Naik' : 'Turun'} minggu ini</span>
                </div>
                <div class="forecast-box">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Status:</span>
                        <strong style="color: ${statusColor}">${status}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Stok:</span>
                        <strong>${item.stok.toLocaleString()} ton</strong>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

function loadPrediksiTable() {
    const tbody = document.getElementById('tablePrediksiBody');
    tbody.innerHTML = '';
    
    marketData.forEach(item => {
        const selisih = item.stok - item.demand;
        const status = selisih >= 0 ? 'Surplus' : 'Defisit';
        const statusClass = selisih >= 0 ? 'success' : 'danger';
        const rekomendasi = selisih >= 0 ? 
            `Export ${Math.abs(selisih)} ton` : 
            `Import ${Math.abs(selisih)} ton`;
        
        tbody.innerHTML += `
            <tr>
                <td><strong>${item.icon} ${item.nama}</strong></td>
                <td>${item.stok.toLocaleString()}</td>
                <td>${item.konsumsi.toLocaleString()}</td>
                <td>${item.demand.toLocaleString()}</td>
                <td><span class="status-badge ${statusClass}">${status} (${Math.abs(selisih)} ton)</span></td>
                <td>${rekomendasi}</td>
            </tr>
        `;
    });
}

function loadDemandTable() {
    const tbody = document.getElementById('tableDemandBody');
    tbody.innerHTML = '';
    
    demandKecamatan.forEach(kec => {
        const total = kec.padi + kec.jagung + kec.kedelai;
        tbody.innerHTML += `
            <tr>
                <td><strong>${kec.kecamatan}</strong></td>
                <td>${kec.populasi.toLocaleString()}</td>
                <td>${kec.padi.toLocaleString()}</td>
                <td>${kec.jagung.toLocaleString()}</td>
                <td>${kec.kedelai.toLocaleString()}</td>
                <td><strong>${total.toLocaleString()}</strong></td>
            </tr>
        `;
    });
}

function drawChart() {
    const canvas = document.getElementById('chartHarga');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;
    
    const months = ['Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const data = {
        padi: [4800, 4900, 5000, 4950, 5050, 5100],
        jagung: [4500, 4400, 4300, 4250, 4200, 4200],
        kedelai: [7800, 8000, 8200, 8300, 8400, 8500]
    };
    
    // Simple line chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    
    // Draw axes
    months.forEach((month, i) => {
        const x = 50 + (i * (canvas.width - 100) / 5);
        ctx.fillText(month, x, canvas.height - 20);
    });
    
    // Draw lines
    const colors = ['#27ae60', '#f39c12', '#e74c3c'];
    const datasets = [data.padi, data.jagung, data.kedelai];
    
    datasets.forEach((dataset, idx) => {
        ctx.strokeStyle = colors[idx];
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        dataset.forEach((value, i) => {
            const x = 50 + (i * (canvas.width - 100) / 5);
            const y = canvas.height - 50 - ((value - 4000) / 50);
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
    });
}

function updateCharts() {
    alert('Memperbarui data untuk periode yang dipilih...');
    drawChart();
}