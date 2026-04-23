// ==========================================
// MONITORING PANEN - MANDALA TANI
// ==========================================

const dataPanenDesa = [
    { kecamatan: "Candi", desa: "Desa Candi", padi: 285, jagung: 120, kedelai: 45, target: 450 },
    { kecamatan: "Candi", desa: "Desa Larangan", padi: 320, jagung: 140, kedelai: 50, target: 500 },
    { kecamatan: "Candi", desa: "Desa Kalipecabean", padi: 245, jagung: 60, kedelai: 30, target: 350 },
    { kecamatan: "Sidoarjo", desa: "Desa Sidoarjo", padi: 380, jagung: 180, kedelai: 60, target: 620 },
    { kecamatan: "Sidoarjo", desa: "Desa Cemandi", padi: 290, jagung: 100, kedelai: 40, target: 430 },
    { kecamatan: "Sidoarjo", desa: "Desa Gebang", padi: 250, jagung: 95, kedelai: 35, target: 380 },
    { kecamatan: "Porong", desa: "Desa Porong", padi: 195, jagung: 85, kedelai: 38, target: 320 },
    { kecamatan: "Porong", desa: "Desa Jatirejo", padi: 220, jagung: 90, kedelai: 40, target: 350 },
    { kecamatan: "Porong", desa: "Desa Pesawahan", padi: 165, jagung: 65, kedelai: 30, target: 260 },
    { kecamatan: "Tanggulangin", desa: "Desa Tanggulangin", padi: 240, jagung: 110, kedelai: 42, target: 390 },
    { kecamatan: "Tanggulangin", desa: "Desa Kedensari", padi: 210, jagung: 95, kedelai: 38, target: 340 },
    { kecamatan: "Tanggulangin", desa: "Desa Klurak", padi: 170, jagung: 70, kedelai: 30, target: 270 }
];

const trendBulanan = [
    { bulan: 'Jan', total: 8200 },
    { bulan: 'Feb', total: 8500 },
    { bulan: 'Mar', total: 9100 },
    { bulan: 'Apr', total: 9800 },
    { bulan: 'Mei', total: 10200 },
    { bulan: 'Jun', total: 10800 },
    { bulan: 'Jul', total: 11200 },
    { bulan: 'Agu', total: 11600 },
    { bulan: 'Sep', total: 11900 },
    { bulan: 'Okt', total: 12100 },
    { bulan: 'Nov', total: 12450 },
    { bulan: 'Des', total: 12800 }
];

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    loadPanenTable();
    drawTrendChart();
    setupSearch();
});

function initSidebar() {
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
    }
}

function loadPanenTable() {
    const tbody = document.getElementById('tablePanenBody');
    tbody.innerHTML = '';
    
    dataPanenDesa.forEach(data => {
        const total = data.padi + data.jagung + data.kedelai;
        const percentage = ((total / data.target) * 100).toFixed(1);
        const status = total >= data.target ? 'Tercapai' : 'Di Bawah Target';
        const statusClass = total >= data.target ? 'success' : 'warning';
        
        tbody.innerHTML += `
            <tr>
                <td>${data.kecamatan}</td>
                <td><strong>${data.desa}</strong></td>
                <td>${data.padi}</td>
                <td>${data.jagung}</td>
                <td>${data.kedelai}</td>
                <td><strong>${total}</strong></td>
                <td><span class="status-badge ${statusClass}">${status} (${percentage}%)</span></td>
                <td>
                    <button class="btn-action btn-view" onclick="viewDetail('${data.desa}')">👁️</button>
                </td>
            </tr>
        `;
    });
}

function drawTrendChart() {
    const canvas = document.getElementById('chartTrend');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 350;
    
    const maxValue = Math.max(...trendBulanan.map(d => d.total));
    const padding = 50;
    const chartHeight = canvas.height - padding * 2;
    const chartWidth = canvas.width - padding * 2;
    const barWidth = chartWidth / trendBulanan.length;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    trendBulanan.forEach((data, i) => {
        const barHeight = (data.total / maxValue) * chartHeight;
        const x = padding + (i * barWidth);
        const y = canvas.height - padding - barHeight;
        
        // Bar
        ctx.fillStyle = '#027373';
        ctx.fillRect(x + 5, y, barWidth - 10, barHeight);
        
        // Label
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(data.bulan, x + barWidth / 2, canvas.height - 20);
        ctx.fillText(data.total.toLocaleString(), x + barWidth / 2, y - 10);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchDesa');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#tablePanenBody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

function filterData() {
    const filter = document.getElementById('filterKecamatan').value;
    const rows = document.querySelectorAll('#tablePanenBody tr');
    rows.forEach(row => {
        const kecamatan = row.cells[0].textContent;
        row.style.display = (filter === 'all' || kecamatan === filter) ? '' : 'none';
    });
}

function viewDetail(desa) {
    const data = dataPanenDesa.find(d => d.desa === desa);
    if (data) {
        const total = data.padi + data.jagung + data.kedelai;
        alert(`Detail ${desa}\n\n` +
              `Kecamatan: ${data.kecamatan}\n` +
              `Padi: ${data.padi} ton\n` +
              `Jagung: ${data.jagung} ton\n` +
              `Kedelai: ${data.kedelai} ton\n` +
              `Total: ${total} ton\n` +
              `Target: ${data.target} ton\n` +
              `Pencapaian: ${((total/data.target)*100).toFixed(1)}%`);
    }
}

function exportData() {
    let csv = 'Kecamatan,Desa,Padi (Ton),Jagung (Ton),Kedelai (Ton),Total (Ton)\n';
    dataPanenDesa.forEach(data => {
        const total = data.padi + data.jagung + data.kedelai;
        csv += `${data.kecamatan},${data.desa},${data.padi},${data.jagung},${data.kedelai},${total}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'monitoring-panen.csv';
    a.click();
    alert('📊 Data berhasil di-export!');
}