// ==========================================
// KELOLA BLOG - MANDALA TANI
// ==========================================

let blogData = [
    {
        id: 1,
        judul: "Teknologi AI dalam Pertanian Modern",
        kategori: "Teknologi",
        icon: "🤖",
        ringkasan: "Bagaimana AI membantu petani meningkatkan produktivitas dan efisiensi dalam mengelola lahan pertanian.",
        konten: "Artificial Intelligence (AI) telah membawa revolusi besar dalam dunia pertanian modern. Teknologi ini membantu petani dalam berbagai aspek, mulai dari prediksi cuaca, analisis tanah, hingga optimasi penggunaan pupuk dan air...",
        tanggal: "2024-11-25",
        penulis: "Admin Dinas",
        views: 1250
    },
    {
        id: 2,
        judul: "Prediksi Cuaca untuk Pertanian",
        kategori: "Tips",
        icon: "🌤️",
        ringkasan: "Pentingnya memahami prediksi cuaca untuk menentukan waktu tanam dan panen yang tepat.",
        konten: "Cuaca merupakan faktor krusial dalam keberhasilan pertanian. Dengan memahami prediksi cuaca, petani dapat merencanakan waktu tanam yang optimal, menghindari kerugian akibat banjir atau kekeringan...",
        tanggal: "2024-11-23",
        penulis: "Admin Dinas",
        views: 890
    },
    {
        id: 3,
        judul: "Mengenal Hama dan Penyakit Tanaman",
        kategori: "Panduan",
        icon: "🐛",
        ringkasan: "Panduan lengkap mengenali dan mengatasi berbagai jenis hama dan penyakit pada tanaman padi dan jagung.",
        konten: "Hama dan penyakit tanaman menjadi salah satu tantangan terbesar dalam pertanian. Wereng batang coklat, penggerek batang, dan blast adalah beberapa contoh OPT yang sering menyerang...",
        tanggal: "2024-11-20",
        penulis: "Admin Dinas",
        views: 1580
    },
    {
        id: 4,
        judul: "Tips Menghadapi Musim Kemarau",
        kategori: "Tips",
        icon: "☀️",
        ringkasan: "Strategi efektif untuk menjaga produktivitas lahan pertanian saat musim kemarau panjang.",
        konten: "Musim kemarau yang panjang dapat menjadi tantangan besar bagi petani. Namun dengan strategi yang tepat seperti irigasi tetes, mulsa, dan pemilihan varietas tahan kekeringan...",
        tanggal: "2024-11-18",
        penulis: "Admin Dinas",
        views: 720
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    loadBlogGrid();
    setupSearch();
});

function initSidebar() {
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
    }
}

function loadBlogGrid() {
    const grid = document.getElementById('blogGrid');
    grid.innerHTML = '';
    
    // Sort by date (newest first)
    const sortedBlogs = [...blogData].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    
    sortedBlogs.forEach(blog => {
        const item = document.createElement('div');
        item.className = 'blog-item';
        item.innerHTML = `
            <div class="blog-thumbnail">${blog.icon}</div>
            <div class="blog-body">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span class="status-badge success">${blog.kategori}</span>
                    <span style="color: #7f8c8d; font-size: 0.85rem;">👁️ ${blog.views}</span>
                </div>
                <h3 style="margin-bottom: 0.8rem; font-size: 1.1rem;">${blog.judul}</h3>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.5;">
                    ${blog.ringkasan.substring(0, 100)}...
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid #ecf0f1;">
                    <span style="color: #7f8c8d; font-size: 0.85rem;">${formatDate(blog.tanggal)}</span>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-action btn-view" onclick="viewBlog(${blog.id})" title="Lihat">👁️</button>
                        <button class="btn-action btn-edit" onclick="editBlog(${blog.id})" title="Edit">✏️</button>
                        <button class="btn-action btn-delete" onclick="deleteBlog(${blog.id})" title="Hapus">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(item);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

function setupSearch() {
    const searchInput = document.getElementById('searchBlog');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.blog-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

function filterBlog() {
    const filter = document.getElementById('filterKategori').value;
    const items = document.querySelectorAll('.blog-item');
    items.forEach(item => {
        const kategori = item.querySelector('.status-badge').textContent;
        item.style.display = (filter === 'all' || kategori === filter) ? '' : 'none';
    });
}

function openModal(mode, id = null) {
    const modal = document.getElementById('modalBlog');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('formBlog');
    
    form.reset();
    
    if (mode === 'add') {
        title.textContent = 'Tulis Artikel Baru';
        document.getElementById('editBlogId').value = '';
    } else if (mode === 'edit' && id) {
        title.textContent = 'Edit Artikel';
        const blog = blogData.find(b => b.id === id);
        
        if (blog) {
            document.getElementById('editBlogId').value = blog.id;
            document.getElementById('judulBlog').value = blog.judul;
            document.getElementById('kategoriBlog').value = blog.kategori;
            document.getElementById('iconBlog').value = blog.icon;
            document.getElementById('ringkasanBlog').value = blog.ringkasan;
            document.getElementById('kontenBlog').value = blog.konten;
        }
    }
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modalBlog').classList.remove('active');
}

function saveBlog(event) {
    event.preventDefault();
    
    const editId = document.getElementById('editBlogId').value;
    const judul = document.getElementById('judulBlog').value;
    const kategori = document.getElementById('kategoriBlog').value;
    const icon = document.getElementById('iconBlog').value || '📝';
    const ringkasan = document.getElementById('ringkasanBlog').value;
    const konten = document.getElementById('kontenBlog').value;
    
    if (editId) {
        // Edit existing
        const blog = blogData.find(b => b.id === parseInt(editId));
        if (blog) {
            blog.judul = judul;
            blog.kategori = kategori;
            blog.icon = icon;
            blog.ringkasan = ringkasan;
            blog.konten = konten;
        }
        alert('✅ Artikel berhasil diupdate!');
    } else {
        // Add new
        const newId = Math.max(...blogData.map(b => b.id)) + 1;
        const today = new Date().toISOString().split('T')[0];
        
        blogData.push({
            id: newId,
            judul: judul,
            kategori: kategori,
            icon: icon,
            ringkasan: ringkasan,
            konten: konten,
            tanggal: today,
            penulis: 'Admin Dinas',
            views: 0
        });
        
        alert('✅ Artikel baru berhasil dipublikasikan!');
    }
    
    closeModal();
    loadBlogGrid();
    
    // Save to localStorage
    localStorage.setItem('blogData', JSON.stringify(blogData));
}

function viewBlog(id) {
    const blog = blogData.find(b => b.id === id);
    if (blog) {
        alert(`${blog.icon} ${blog.judul}\n\n` +
              `Kategori: ${blog.kategori}\n` +
              `Tanggal: ${formatDate(blog.tanggal)}\n` +
              `Penulis: ${blog.penulis}\n` +
              `Views: ${blog.views}\n\n` +
              `Ringkasan:\n${blog.ringkasan}\n\n` +
              `Konten:\n${blog.konten.substring(0, 200)}...`);
        
        // Increment views
        blog.views++;
        loadBlogGrid();
        localStorage.setItem('blogData', JSON.stringify(blogData));
    }
}

function editBlog(id) {
    openModal('edit', id);
}

function deleteBlog(id) {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
        const index = blogData.findIndex(b => b.id === id);
        if (index > -1) {
            blogData.splice(index, 1);
            alert('✅ Artikel berhasil dihapus!');
            
            loadBlogGrid();
            localStorage.setItem('blogData', JSON.stringify(blogData));
        }
    }
}

// Load from localStorage on init
window.addEventListener('load', function() {
    const savedBlogs = localStorage.getItem('blogData');
    if (savedBlogs) {
        blogData = JSON.parse(savedBlogs);
        loadBlogGrid();
    }
});