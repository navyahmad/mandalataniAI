// ==========================================
// ADMIN DASHBOARD - MANDALA TANI AI
// ==========================================

// Data Panen per Kecamatan
const dataPanen = [
  {
    kecamatan: "Candi",
    padi: 850,
    jagung: 320,
    kedelai: 150,
    tebu: 1200,
    status: "Baik",
  },
  {
    kecamatan: "Sidoarjo",
    padi: 920,
    jagung: 280,
    kedelai: 180,
    tebu: 1100,
    status: "Baik",
  },
  {
    kecamatan: "Buduran",
    padi: 780,
    jagung: 350,
    kedelai: 140,
    tebu: 950,
    status: "Baik",
  },
  {
    kecamatan: "Taman",
    padi: 650,
    jagung: 420,
    kedelai: 160,
    tebu: 800,
    status: "Waspada",
  },
  {
    kecamatan: "Waru",
    padi: 890,
    jagung: 310,
    kedelai: 170,
    tebu: 1050,
    status: "Baik",
  },
  {
    kecamatan: "Krian",
    padi: 720,
    jagung: 380,
    kedelai: 145,
    tebu: 920,
    status: "Baik",
  },
  {
    kecamatan: "Porong",
    padi: 580,
    jagung: 250,
    kedelai: 120,
    tebu: 750,
    status: "Rendah",
  },
  {
    kecamatan: "Tanggulangin",
    padi: 620,
    jagung: 290,
    kedelai: 130,
    tebu: 680,
    status: "Rendah",
  },
  {
    kecamatan: "Gedangan",
    padi: 810,
    jagung: 340,
    kedelai: 155,
    tebu: 980,
    status: "Baik",
  },
  {
    kecamatan: "Prambon",
    padi: 740,
    jagung: 310,
    kedelai: 148,
    tebu: 870,
    status: "Baik",
  },
];

// Data Statistik Panen 6 Bulan
const dataBulanan = [
  { bulan: "Jun", padi: 6200, jagung: 2800, kedelai: 1200, tebu: 7500 },
  { bulan: "Jul", padi: 6800, jagung: 3100, kedelai: 1350, tebu: 8200 },
  { bulan: "Agu", padi: 7200, jagung: 3300, kedelai: 1450, tebu: 8800 },
  { bulan: "Sep", padi: 7800, jagung: 3450, kedelai: 1520, tebu: 9100 },
  { bulan: "Okt", padi: 8100, jagung: 3600, kedelai: 1580, tebu: 9500 },
  { bulan: "Nov", padi: 8450, jagung: 3750, kedelai: 1620, tebu: 9850 },
];

// Initialize Dashboard
document.addEventListener("DOMContentLoaded", function () {
  initSidebar();
  loadTableData();
  createCharts();
  updateStats();
  setupSearch();
});

// Sidebar Toggle
function initSidebar() {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");

  // Create overlay if it doesn't exist
  let overlay = document.querySelector(".mobile-menu-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "mobile-menu-overlay";
    document.body.appendChild(overlay);
  }

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", function () {
      sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : "";
    });

    // Close sidebar when clicking overlay
    overlay.addEventListener("click", function () {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });

    // Close sidebar when clicking nav items on mobile
    const navItems = sidebar.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("active");
          overlay.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    });

    // Close on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}

// Load Table Data
function loadTableData() {
  const tbody = document.getElementById("tablePanenBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  dataPanen.forEach((data) => {
    const total = data.padi + data.jagung + data.kedelai + data.tebu;
    const statusClass = data.status === "Baik" ? "success" : data.status === "Waspada" ? "warning" : "danger";

    const row = `
            <tr>
                <td><strong>${data.kecamatan}</strong></td>
                <td>${data.padi.toLocaleString()}</td>
                <td>${data.jagung.toLocaleString()}</td>
                <td>${data.kedelai.toLocaleString()}</td>
                <td>${data.tebu.toLocaleString()}</td>
                <td><strong>${total.toLocaleString()}</strong></td>
                <td><span class="status-badge ${statusClass}">${data.status}</span></td>
                <td>
                    <button class="btn-action btn-view" onclick="viewDetail('${data.kecamatan}')">👁️</button>
                    <button class="btn-action btn-edit" onclick="editData('${data.kecamatan}')">✏️</button>
                </td>
            </tr>
        `;
    tbody.innerHTML += row;
  });
}

// Create Charts
function createCharts() {
  createPanenChart();
  createDistribusiChart();
}

// Chart Panen
function createPanenChart() {
  const canvas = document.getElementById("chartPanen");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw bars
  const barWidth = width / dataBulanan.length / 5;
  const maxValue = Math.max(...dataBulanan.map((d) => d.padi + d.jagung + d.kedelai + d.tebu));

  dataBulanan.forEach((data, i) => {
    const x = (i * width) / dataBulanan.length + 40;
    const total = data.padi + data.jagung + data.kedelai + data.tebu;
    const barHeight = (total / maxValue) * (height - 60);

    // Draw bar
    ctx.fillStyle = "#027373";
    ctx.fillRect(x, height - barHeight - 30, barWidth * 3, barHeight);

    // Draw label
    ctx.fillStyle = "#2c3e50";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(data.bulan, x + barWidth * 1.5, height - 10);
    ctx.fillText(total.toLocaleString(), x + barWidth * 1.5, height - barHeight - 35);
  });
}

// Chart Distribusi
function createDistribusiChart() {
  const canvas = document.getElementById("chartDistribusi");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 40;

  // Calculate total
  const total = dataPanen.reduce((sum, d) => {
    return sum + d.padi + d.jagung + d.kedelai + d.tebu;
  }, 0);

  const padiTotal = dataPanen.reduce((sum, d) => sum + d.padi, 0);
  const jagungTotal = dataPanen.reduce((sum, d) => sum + d.jagung, 0);
  const kedelaiTotal = dataPanen.reduce((sum, d) => sum + d.kedelai, 0);
  const tebuTotal = dataPanen.reduce((sum, d) => sum + d.tebu, 0);

  const data = [
    { label: "Padi", value: padiTotal, color: "#027373" },
    { label: "Jagung", value: jagungTotal, color: "#f7b731" },
    { label: "Kedelai", value: kedelaiTotal, color: "#e67e22" },
    { label: "Tebu", value: tebuTotal, color: "#3498db" },
  ];

  let currentAngle = -Math.PI / 2;

  data.forEach((item) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;

    // Draw slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();

    // Draw label
    const labelAngle = currentAngle + sliceAngle / 2;
    const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
    const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(item.label, labelX, labelY);

    const percentage = ((item.value / total) * 100).toFixed(1);
    ctx.font = "12px Arial";
    ctx.fillText(percentage + "%", labelX, labelY + 18);

    currentAngle += sliceAngle;
  });
}

// Update Stats
function updateStats() {
  // Calculate totals
  const totalPanenValue = dataPanen.reduce((sum, d) => {
    return sum + d.padi + d.jagung + d.kedelai + d.tebu;
  }, 0);

  document.getElementById("totalPanen").textContent = totalPanenValue.toLocaleString();

  // Animate numbers
  animateValue("totalPanen", 0, totalPanenValue, 1500);
  animateValue("stokPupuk", 0, 8750, 1500);
  animateValue("totalDesa", 0, 322, 1500);
  animateValue("alertCount", 0, 5, 1000);
}

// Animate Counter
function animateValue(id, start, end, duration) {
  const element = document.getElementById(id);
  if (!element) return;

  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = end.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Setup Search
function setupSearch() {
  const searchInput = document.getElementById("searchKecamatan");
  if (!searchInput) return;

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("#tablePanenBody tr");

    rows.forEach((row) => {
      const kecamatan = row.cells[0].textContent.toLowerCase();
      if (kecamatan.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
}

// Action Functions
function viewDetail(kecamatan) {
  const data = dataPanen.find((d) => d.kecamatan === kecamatan);
  if (data) {
    const total = data.padi + data.jagung + data.kedelai + data.tebu;
    alert(`Detail ${kecamatan}\n\nPadi: ${data.padi} ton\nJagung: ${data.jagung} ton\nKedelai: ${data.kedelai} ton\nTebu: ${data.tebu} ton\n\nTotal: ${total} ton\nStatus: ${data.status}`);
  }
}

function editData(kecamatan) {
  alert(`Fitur edit data untuk ${kecamatan} akan segera tersedia`);
}

function refreshPrediksi() {
  alert("Memperbarui prediksi AI...\n\nPrediksi berhasil diperbarui!");
  setTimeout(() => {
    location.reload();
  }, 1000);
}

function exportData() {
  // Create CSV content
  let csv = "Kecamatan,Padi (Ton),Jagung (Ton),Kedelai (Ton),Tebu (Ton),Total (Ton),Status\n";

  dataPanen.forEach((data) => {
    const total = data.padi + data.jagung + data.kedelai + data.tebu;
    csv += `${data.kecamatan},${data.padi},${data.jagung},${data.kedelai},${data.tebu},${total},${data.status}\n`;
  });

  // Download CSV
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data-panen-sidoarjo.csv";
  a.click();

  alert("Data berhasil diexport!");
}

function tambahDataPanen() {
  alert("Fitur tambah data panen akan segera tersedia");
}

function buatLaporan() {
  alert("Membuat laporan...\n\nLaporan sedang digenerate");
}

function kelolaStok() {
  window.location.href = "stok-pupuk.html";
}

function kirimNotifikasi() {
  alert("Kirim notifikasi ke semua penyuluh?\n\nNotifikasi berhasil dikirim!");
}

// Save to LocalStorage
function saveData() {
  localStorage.setItem("dataPanen", JSON.stringify(dataPanen));
}

// Load from LocalStorage
function loadData() {
  const saved = localStorage.getItem("dataPanen");
  if (saved) {
    return JSON.parse(saved);
  }
  return dataPanen;
}
