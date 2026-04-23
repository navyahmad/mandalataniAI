// ===========================================
// MANDALA TANI AI - MAIN JAVASCRIPT
// ===========================================

// Data Kecamatan + koordinat sederhana
const kecamatanData = [
  { id: 1, nama: "Candi", curahHujan: 180, status: "Normal", commodity: "Padi", coordinates: [-7.506, 112.703] },
  { id: 2, nama: "Sidoarjo", curahHujan: 150, status: "Normal", commodity: "Jagung", coordinates: [-7.45, 112.718] },
  { id: 3, nama: "Buduran", curahHujan: 195, status: "Normal", commodity: "Padi", coordinates: [-7.436, 112.751] },
  { id: 4, nama: "Taman", curahHujan: 220, status: "Waspada", commodity: "Cabai", coordinates: [-7.35, 112.686] },
  { id: 5, nama: "Waru", curahHujan: 170, status: "Normal", commodity: "Kedelai", coordinates: [-7.358, 112.758] },
  { id: 6, nama: "Krian", curahHujan: 200, status: "Waspada", commodity: "Padi", coordinates: [-7.409, 112.561] },
  { id: 7, nama: "Porong", curahHujan: 310, status: "Siaga", commodity: "Jagung", coordinates: [-7.527, 112.698] },
  { id: 8, nama: "Tanggulangin", curahHujan: 350, status: "Awas", commodity: "Cabai", coordinates: [-7.508, 112.719] },
  { id: 9, nama: "Gedangan", curahHujan: 160, status: "Normal", commodity: "Kedelai", coordinates: [-7.364, 112.726] },
  { id: 10, nama: "Prambon", curahHujan: 190, status: "Normal", commodity: "Padi", coordinates: [-7.448, 112.569] },
];

const statusColors = {
  Normal: "#27ae60",
  Waspada: "#f39c12",
  Siaga: "#e67e22",
  Awas: "#e74c3c",
};

// Data Blog
const blogData = [
  {
    id: 1,
    title: "Teknologi AI dalam Pertanian Modern",
    date: "25 November 2024",
    excerpt: "Bagaimana AI membantu petani meningkatkan produktivitas dan efisiensi dalam mengelola lahan pertanian.",
    icon: "🤖",
  },
  {
    id: 2,
    title: "Prediksi Cuaca untuk Pertanian",
    date: "23 November 2024",
    excerpt: "Pentingnya memahami prediksi cuaca untuk menentukan waktu tanam dan panen yang tepat.",
    icon: "🌤️",
  },
  {
    id: 3,
    title: "Mengenal Hama dan Penyakit Tanaman",
    date: "20 November 2024",
    excerpt: "Panduan lengkap mengenali dan mengatasi berbagai jenis hama dan penyakit pada tanaman padi dan jagung.",
    icon: "🐛",
  },
];

let leafletState = null;

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  initializeLeafletMap();
  initializeBlog();
  initializeSmoothScroll();
  initializeMobileMenu();
});

// Initialize Leaflet Map
function initializeLeafletMap() {
  const mapContainer = document.getElementById("leafletMap");
  if (!mapContainer || typeof L === "undefined") return;

  const map = L.map("leafletMap").setView([-7.446, 112.717], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);

  loadSidoarjoBoundary(map);

  const markers = kecamatanData
    .map((kec) => {
      if (!kec.coordinates) return null;
      const marker = L.circleMarker(kec.coordinates, {
        radius: 10,
        color: statusColors[kec.status] || "#2c3e50",
        fillColor: statusColors[kec.status] || "#2c3e50",
        fillOpacity: 0.8,
      });

      marker.bindPopup(`
            <strong>${kec.nama}</strong><br />
            Curah Hujan: ${kec.curahHujan} mm<br />
            Komoditas Utama: ${kec.commodity}<br />
            Status: ${kec.status}
        `);

      marker.addTo(map);

      return {
        marker,
        data: kec,
      };
    })
    .filter(Boolean);

  leafletState = { map, markers };
  initializeMapFilters();
}

function loadSidoarjoBoundary(map) {
  fetch("assets/data/sidoarjo.geojson")
    .then((res) => res.json())
    .then((geojson) => {
      const boundaryLayer = L.geoJSON(geojson, {
        style: {
          color: "#0a8f5a",
          weight: 1,
          fillColor: "#74c889",
          fillOpacity: 0.2,
        },
      }).addTo(map);
      map.fitBounds(boundaryLayer.getBounds(), { padding: [20, 20] });
    })
    .catch((err) => console.warn("Gagal memuat batas Sidoarjo:", err));
}

function initializeMapFilters() {
  const form = document.getElementById("mapFilterForm");
  if (!form || !leafletState) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const commodity = document.getElementById("komoditasSelect").value;
    const year = document.getElementById("tahunSelect").value;

    updateLeafletMarkers(commodity);
    updateFilterInfo(commodity, year);
  });
}

function updateLeafletMarkers(commodity) {
  if (!leafletState) return;

  leafletState.markers.forEach(({ marker, data }) => {
    const shouldShow = !commodity || data.commodity === commodity;
    if (shouldShow) {
      if (!leafletState.map.hasLayer(marker)) {
        marker.addTo(leafletState.map);
      }
    } else if (leafletState.map.hasLayer(marker)) {
      leafletState.map.removeLayer(marker);
    }
  });
}

function updateFilterInfo(commodity, year) {
  const info = document.getElementById("filterInfo");
  if (!info) return;

  const commodityText = commodity ? `komoditas ${commodity}` : "seluruh komoditas";
  info.textContent = `Menampilkan ${commodityText} tahun ${year}.`;
}

// Initialize Blog Grid
function initializeBlog() {
  const blogGrid = document.getElementById("blogGrid");
  if (!blogGrid) return;

  blogGrid.innerHTML = "";

  blogData.forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card";
    blogCard.innerHTML = `
            <div class="blog-image">${blog.icon}</div>
            <div class="blog-content">
                <div class="blog-date">${blog.date}</div>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <a href="#" class="blog-link">Baca Selengkapnya →</a>
            </div>
        `;
    blogGrid.appendChild(blogCard);
  });
}

// Smooth Scroll for Navigation
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
  const menuToggle = document.getElementById("mobileMenuToggle");
  const nav = document.querySelector(".nav");
  const overlay = document.querySelector(".mobile-menu-overlay");

  if (!menuToggle || !nav) return;

  // Create overlay if it doesn't exist
  let menuOverlay = overlay;
  if (!menuOverlay) {
    menuOverlay = document.createElement("div");
    menuOverlay.className = "mobile-menu-overlay";
    document.body.appendChild(menuOverlay);
  }

  // Toggle menu
  menuToggle.addEventListener("click", function () {
    toggleMobileMenu(menuToggle, nav, menuOverlay);
  });

  // Close menu when clicking overlay
  menuOverlay.addEventListener("click", function () {
    closeMobileMenu(menuToggle, nav, menuOverlay);
  });

  // Close menu when clicking nav links
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      closeMobileMenu(menuToggle, nav, menuOverlay);
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      closeMobileMenu(menuToggle, nav, menuOverlay);
    }
  });
}

function toggleMobileMenu(toggle, nav, overlay) {
  const isActive = nav.classList.contains("active");

  if (isActive) {
    closeMobileMenu(toggle, nav, overlay);
  } else {
    openMobileMenu(toggle, nav, overlay);
  }
}

function openMobileMenu(toggle, nav, overlay) {
  toggle.classList.add("active");
  nav.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu(toggle, nav, overlay) {
  toggle.classList.remove("active");
  nav.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Save to localStorage (for future use)
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Error saving to localStorage:", e);
    return false;
  }
}

// Load from localStorage
function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error loading from localStorage:", e);
    return null;
  }
}

// Export functions for use in other pages
window.MandalaTaniUtils = {
  kecamatanData,
  blogData,
  statusColors,
  saveToLocalStorage,
  loadFromLocalStorage,
};
