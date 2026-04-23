// ==========================================
// ADMIN COMMON FUNCTIONS - MANDALA TANI AI
// ==========================================

// Initialize sidebar toggle for all admin pages
document.addEventListener("DOMContentLoaded", function () {
  initSidebar();
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

    // Handle window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}
