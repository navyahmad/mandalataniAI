// ===========================================
// MANDALA TANI AI - PENYULUH MODULE
// ===========================================

const BASE_PREFIX = window.location.pathname.includes("/penyuluh-") ? "../" : "";
const DATA_PATHS = {
  panen: `${BASE_PREFIX}assets/data/panen.json`,
  permintaan: `${BASE_PREFIX}assets/data/permintaan.json`,
};

const LOCAL_KEYS = {
  panen: "mandalaPanenLocal",
  permintaan: "mandalaPermintaanLocal",
};

let panenDataset = null;
let permintaanDataset = null;
let requestMap = null;
let requestMarker = null;

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([loadPanenData(), loadPermintaanData()]);
  initKecamatanDashboard();
  initPanenForm();
  initMonitoringPage();
  initPermintaanForm();
  initStatusPermintaan();
});

async function loadPanenData() {
  try {
    const res = await fetch(DATA_PATHS.panen);
    const data = await res.json();
    const localEntries = getLocalEntries(LOCAL_KEYS.panen);
    panenDataset = {
      ...data,
      desa: [...data.desa, ...localEntries],
    };
  } catch (err) {
    console.error("Gagal memuat panen.json", err);
    panenDataset = { ringkasan: { totalDesa: 0, luasTanam: 0, hasilPanen: 0, belumLengkap: 0 }, tren: [], desa: [], notifikasi: [] };
  }
}

async function loadPermintaanData() {
  try {
    const res = await fetch(DATA_PATHS.permintaan);
    const data = await res.json();
    const localEntries = getLocalEntries(LOCAL_KEYS.permintaan);
    permintaanDataset = {
      permintaan: [...data.permintaan, ...localEntries],
    };
  } catch (err) {
    console.error("Gagal memuat permintaan.json", err);
    permintaanDataset = { permintaan: [] };
  }
}

function getLocalEntries(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Tidak dapat membaca localStorage", err);
    return [];
  }
}

function saveLocalEntries(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn("Tidak dapat menyimpan ke localStorage", err);
  }
}

// ========== KECAMATAN DASHBOARD ==========
function initKecamatanDashboard() {
  if (!panenDataset) return;
  const summaryContainer = document.getElementById("ringkasanCards");
  if (summaryContainer) {
    const ringkasan = computeRingkasan(panenDataset);
    summaryContainer.innerHTML = [
      { label: "Total Desa", value: ringkasan.totalDesa, icon: "🏘️" },
      { label: "Luas Tanam (Ha)", value: ringkasan.luasTanam, icon: "🌾" },
      { label: "Hasil Panen (Ton)", value: ringkasan.hasilPanen, icon: "📦" },
      { label: "Data Belum Lengkap", value: ringkasan.belumLengkap, icon: "⏳" },
    ]
      .map(
        (item) => `
      <div class="summary-card">
        <div class="card-icon">${item.icon}</div>
        <p>${item.label}</p>
        <h3>${item.value}</h3>
      </div>
    `
      )
      .join("");
  }

  renderTrendChart();
  renderStatusTable();
  renderNotifications();
}

function computeRingkasan(data) {
  const totalDesa = data.desa.length;
  const luasTanam = data.desa.reduce((sum, item) => sum + Number(item.luas || 0), 0);
  const hasilPanen = data.desa.reduce((sum, item) => sum + Number(item.hasil || 0), 0);
  const belumLengkap = data.desa.filter((item) => (item.status || "").toLowerCase().includes("belum")).length;
  return {
    totalDesa: data.ringkasan?.totalDesa || totalDesa,
    luasTanam: data.ringkasan?.luasTanam || luasTanam,
    hasilPanen: data.ringkasan?.hasilPanen || hasilPanen,
    belumLengkap: data.ringkasan?.belumLengkap || belumLengkap,
  };
}

function renderTrendChart() {
  const canvas = document.getElementById("trendChart");
  if (!canvas || !panenDataset) return;
  const ctx = canvas.getContext("2d");
  resizeCanvas(canvas, ctx);

  const colors = ["#0a8f5a", "#f7b731", "#e67e22", "#3498db"];
  const padding = 40;
  const innerWidth = canvas.width - padding * 2;
  const innerHeight = canvas.height - padding * 2;
  const maxValue = Math.max(...panenDataset.tren.flatMap((t) => t.nilai), 1);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "14px Segoe UI";
  ctx.fillStyle = "#2c3e50";
  ctx.textAlign = "center";

  panenDataset.tren.forEach((tren, index) => {
    const barWidth = innerWidth / (panenDataset.tren.length * 1.5);
    const x = padding + index * (barWidth * 1.5) + barWidth / 2;
    const height = (Math.max(...tren.nilai) / maxValue) * innerHeight;
    ctx.fillStyle = colors[index % colors.length];
    ctx.beginPath();
    ctx.roundRect(x, padding + innerHeight - height, barWidth, height, 8);
    ctx.fill();
    ctx.fillStyle = "#2c3e50";
    ctx.fillText(tren.komoditas, x + barWidth / 2, canvas.height - 10);
  });
}

function renderStatusTable() {
  const tbody = document.getElementById("statusDesaTable");
  if (!tbody || !panenDataset) return;
  const rows = panenDataset.desa
    .slice(0, 6)
    .map(
      (item) => `
      <tr>
        <td>${item.desa}</td>
        <td>${item.komoditas}</td>
        <td>${item.luas}</td>
        <td>${item.hasil}</td>
        <td><span class="status-badge ${item.status?.toLowerCase().includes("lengkap") ? "success" : "warning"}">${item.status}</span></td>
      </tr>
    `
    )
    .join("");
  tbody.innerHTML = rows || '<tr><td colspan="5">Belum ada data.</td></tr>';
}

function renderNotifications() {
  const container = document.getElementById("notifList");
  if (!container || !panenDataset) return;
  container.innerHTML =
    panenDataset.notifikasi
      ?.map(
        (item) => `
    <div class="notif-item">
      <div>
        <h4>${item.desa}</h4>
        <p>${item.detail}</p>
      </div>
      <span class="badge ${item.jenis === "Banjir" ? "alert" : "warning"}">${item.jenis} - ${item.status}</span>
    </div>
  `
      )
      .join("") || "<p>Tidak ada notifikasi terbaru.</p>";
}

// ========== INPUT PANEN ==========
function initPanenForm() {
  if (!panenDataset) return;
  const form = document.getElementById("inputPanenForm");
  if (!form) return;

  const desaSelect = document.getElementById("desaSelect");
  const uniqueDesa = [...new Set(panenDataset.desa.map((d) => d.desa))].sort();
  desaSelect.innerHTML = uniqueDesa.map((desa) => `<option value="${desa}">${desa}</option>`).join("");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      desa: desaSelect.value,
      komoditas: document.getElementById("komoditasSelect").value,
      luas: Number(document.getElementById("luasInput").value),
      hasil: Number(document.getElementById("hasilInput").value),
      status: "Lengkap",
      cuaca: document.getElementById("cuacaSelect").value,
      opt: document.getElementById("optCheckbox").checked,
      catatan: document.getElementById("catatanInput").value,
    };

    const current = getLocalEntries(LOCAL_KEYS.panen);
    current.push(newEntry);
    saveLocalEntries(LOCAL_KEYS.panen, current);
    showFormMessage("panenFormMessage", "Data panen tersimpan. Silakan cek Monitoring Desa.", "success");
    form.reset();
    loadPanenData().then(() => {
      renderTrendChart();
      renderStatusTable();
    });
  });
}

function showFormMessage(elementId, message, type = "success") {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = `form-message ${type}`;
  setTimeout(() => {
    el.textContent = "";
    el.className = "form-message";
  }, 4000);
}

// ========== MONITORING ==========
function initMonitoringPage() {
  if (!panenDataset) return;
  renderMonitoringTable();
  renderKomoditasChart();
}

function renderMonitoringTable() {
  const tbody = document.getElementById("monitoringTable");
  if (!tbody || !panenDataset) return;
  tbody.innerHTML =
    panenDataset.desa
      .map(
        (item) => `
    <tr>
      <td>${item.desa}</td>
      <td>${item.komoditas}</td>
      <td>${item.luas}</td>
      <td>${item.hasil}</td>
      <td>${item.cuaca}</td>
      <td>${item.opt ? '<span class="badge alert">Ya</span>' : '<span class="badge success">Tidak</span>'}</td>
      <td><span class="status-badge ${item.status?.toLowerCase().includes("lengkap") ? "success" : "warning"}">${item.status}</span></td>
    </tr>
  `
      )
      .join("") || '<tr><td colspan="7">Belum ada data.</td></tr>';
}

function renderKomoditasChart() {
  const canvas = document.getElementById("komoditasChart");
  if (!canvas || !panenDataset) return;
  const ctx = canvas.getContext("2d");
  resizeCanvas(canvas, ctx);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const aggregate = panenDataset.desa.reduce((acc, item) => {
    acc[item.komoditas] = (acc[item.komoditas] || 0) + Number(item.hasil || 0);
    return acc;
  }, {});
  const labels = Object.keys(aggregate);
  const values = Object.values(aggregate);
  const maxValue = Math.max(...values, 1);
  const padding = 40;
  const innerWidth = canvas.width - padding * 2;
  const innerHeight = canvas.height - padding * 2;
  const barWidth = innerWidth / (labels.length * 1.5 || 1);

  labels.forEach((label, index) => {
    const value = values[index];
    const height = (value / maxValue) * innerHeight;
    const x = padding + index * (barWidth * 1.5);
    ctx.fillStyle = "#0a8f5a";
    ctx.beginPath();
    ctx.roundRect(x, padding + innerHeight - height, barWidth, height, 8);
    ctx.fill();
    ctx.fillStyle = "#2c3e50";
    ctx.textAlign = "center";
    ctx.fillText(label, x + barWidth / 2, canvas.height - 10);
    ctx.fillText(`${value.toFixed(0)}t`, x + barWidth / 2, padding + innerHeight - height - 10);
  });
}

function resizeCanvas(canvas, ctx) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
}

// ========== PENYULUH DESA ==========
function initPermintaanForm() {
  if (!permintaanDataset) return;
  const form = document.getElementById("permintaanForm");
  if (!form) return;

  initLeafletMap();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const lokasi = requestMarker?.getLatLng();
    const newRequest = {
      id: Date.now(),
      kelompok: document.getElementById("kelompokInput").value,
      jenis: document.getElementById("jenisPupukSelect").value,
      jumlah: Number(document.getElementById("jumlahInput").value),
      alasan: document.getElementById("alasanInput").value,
      status: "Menunggu",
      lokasi: lokasi ? [lokasi.lat, lokasi.lng] : null,
      tanggal: new Date().toISOString().split("T")[0],
    };

    const current = getLocalEntries(LOCAL_KEYS.permintaan);
    current.push(newRequest);
    saveLocalEntries(LOCAL_KEYS.permintaan, current);
    showFormMessage("permintaanMessage", "Permintaan terkirim. Pantau status di menu Status Permintaan.", "success");
    form.reset();
    resetMarker();
    loadPermintaanData().then(initStatusPermintaan);
  });
}

function initLeafletMap() {
  const mapContainer = document.getElementById("requestMap");
  if (!mapContainer || typeof L === "undefined") return;
  requestMap = L.map("requestMap").setView([-7.446, 112.717], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap",
  }).addTo(requestMap);

  requestMap.on("click", (e) => {
    if (!requestMarker) {
      requestMarker = L.marker(e.latlng, { draggable: true }).addTo(requestMap);
      requestMarker.on("dragend", updateLocationInfo);
    } else {
      requestMarker.setLatLng(e.latlng);
    }
    updateLocationInfo();
  });
}

function updateLocationInfo() {
  const info = document.getElementById("locationInfo");
  if (!info) return;
  const latlng = requestMarker?.getLatLng();
  if (!latlng) {
    info.textContent = "Belum ada titik dipilih.";
    return;
  }
  info.textContent = `Titik dipilih: ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`;
}

function resetMarker() {
  if (requestMarker && requestMap) {
    requestMap.removeLayer(requestMarker);
    requestMarker = null;
    updateLocationInfo();
  }
}

function initStatusPermintaan() {
  if (!permintaanDataset) return;
  const container = document.getElementById("statusList");
  if (!container) return;
  const entries = [...permintaanDataset.permintaan].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  container.innerHTML =
    entries
      .map(
        (item) => `
    <div class="status-card">
      <div>
        <h4>${item.kelompok}</h4>
        <p>${item.jenis} - ${item.jumlah} kg</p>
        <small>${item.alasan}</small>
      </div>
      <div class="status-meta">
        <span class="badge ${statusClass(item.status)}">${item.status}</span>
        <span class="muted-text">${formatDate(item.tanggal)}</span>
      </div>
    </div>
  `
      )
      .join("") || "<p>Belum ada permintaan.</p>";
}

function statusClass(status) {
  const normalized = (status || "").toLowerCase();
  if (normalized.includes("setuju")) return "success";
  if (normalized.includes("tolak")) return "alert";
  return "warning";
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}
