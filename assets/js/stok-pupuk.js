// ==========================================
// MANAJEMEN STOK PUPUK - MANDALA TANI
// ==========================================

let stokData = [
    { id: 1, kode: 'UR-001', jenis: 'Urea', lokasi: 'Gudang Pusat', stok: 850, harga: 2500000 },
    { id: 2, kode: 'UR-002', jenis: 'Urea', lokasi: 'Gudang Candi', stok: 650, harga: 2500000 },
    { id: 3, kode: 'UR-003', jenis: 'Urea', lokasi: 'Gudang Sidoarjo', stok: 550, harga: 2500000 },
    { id: 4, kode: 'UR-004', jenis: 'Urea', lokasi: 'Gudang Porong', stok: 400, harga: 2500000 },
    { id: 5, kode: 'NPK-001', jenis: 'NPK', lokasi: 'Gudang Pusat', stok: 720, harga: 3500000 },
    { id: 6, kode: 'NPK-002', jenis: 'NPK', lokasi: 'Gudang Candi', stok: 480, harga: 3500000 },
    { id: 7, kode: 'NPK-003', jenis: 'NPK', lokasi: 'Gudang Sidoarjo', stok: 380, harga: 3500000 },
    { id: 8, kode: 'NPK-004', jenis: 'NPK', lokasi: 'Gudang Porong', stok: 270, harga: 3500000 },
    { id: 9, kode: 'ORG-001', jenis: 'Organik', lokasi: 'Gudang Pusat', stok: 450, harga: 1800000 },
    { id: 10, kode: 'ORG-002', jenis: 'Organik', lokasi: 'Gudang Candi', stok: 280, harga: 1800000 },
    { id: 11, kode: 'ORG-003', jenis: 'Organik', lokasi: 'Gudang Sidoarjo', stok: 150, harga: 1800000 },
    { id: 12, kode: 'ORG-004', jenis: 'Organik', lokasi: 'Gudang Porong', stok: 100, harga: 1800000 },
    { id: 13, kode: 'ZA-001', jenis: 'ZA', lokasi: 'Gudang Pusat', stok: 280, harga: 2200000 },
    { id: 14, kode: 'ZA-002', jenis: 'ZA', lokasi: 'Gudang Candi', stok: 180, harga: 2200000 },
    { id: 15, kode: 'ZA-003', jenis: 'ZA', lokasi: 'Gudang Sidoarjo', stok: 120, harga: 2200000 },
    { id: 16, kode: 'ZA-004', jenis: 'ZA', lokasi: 'Gudang Porong', stok: 70, harga: 2200000 }
];

let riwayatData = [
    { tanggal: '2024-11-25', jenis: 'Masuk', pupuk: 'Urea', jumlah: 200, keterangan: 'Pengadaan Rutin' },
    { tanggal: '2024-11-24', jenis: 'Keluar', pupuk: 'NPK', jumlah: 150, keterangan: 'Distribusi ke Kecamatan Candi' },
    { tanggal: '2024-11-23', jenis: 'Keluar', pupuk: 'Organik', jumlah: 80, keterangan: 'Bantuan Program Desa' },
    { tanggal: '2024-11-22', jenis: 'Masuk', pupuk: 'ZA', jumlah: 120, keterangan: 'Pengadaan Rutin' },
    { tanggal: '2024-11-21', jenis: 'Keluar', pupuk: 'Urea', jumlah: 300, keterangan: 'Distribusi Musim Tanam' }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    loadStokData();
    loadRiwayat();
    updateTotalStok();
    checkLowStock();
    setupSearch();
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

// Load Stok Data
function loadStokData() {
    const tbody = document.getElementById('tableStokBody');
    tbody.innerHTML = '';
    
    stokData.forEach(item => {
        const totalNilai = item.stok * item.harga;
        const status = item.stok < 300 ? 'Rendah' : item.stok < 600 ? 'Sedang' : 'Aman';
        const statusClass = status === 'Rendah' ? 'danger' : status === 'Sedang' ? 'warning' : 'success';
        
        const row = `
            <tr>
                <td><strong>${item.kode}</strong></td>
                <td>${item.jenis}</td>
                <td>${item.lokasi}</td>
                <td>${item.stok.toLocaleString()}</td>
                <td>Rp ${item.harga.toLocaleString()}</td>
                <td><strong>Rp ${totalNilai.toLocaleString()}</strong></td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td>
                    <button class="btn-action btn-view" onclick="viewDetail(${item.id})">👁️</button>
                    <button class="btn-action btn-edit" onclick="editStok(${item.id})">✏️</button>
                    <button class="btn-action btn-delete" onclick="deleteStok(${item.id})">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Load Riwayat
function loadRiwayat() {
    const tbody = document.getElementById('tableRiwayatBody');
    tbody.innerHTML = '';
    
    riwayatData.forEach(item => {
        const jenisClass = item.jenis === 'Masuk' ? 'success' : 'warning';
        
        const row = `
            <tr>
                <td>${item.tanggal}</td>
                <td><span class="status-badge ${jenisClass}">${item.jenis}</span></td>
                <td>${item.pupuk}</td>
                <td>${item.jumlah} Ton</td>
                <td>${item.keterangan}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Update Total Stok
function updateTotalStok() {
    const totalUrea = stokData.filter(s => s.jenis === 'Urea').reduce((sum, s) => sum + s.stok, 0);
    const totalNPK = stokData.filter(s => s.jenis === 'NPK').reduce((sum, s) => sum + s.stok, 0);
    const totalOrganik = stokData.filter(s => s.jenis === 'Organik').reduce((sum, s) => sum + s.stok, 0);
    const totalZA = stokData.filter(s => s.jenis === 'ZA').reduce((sum, s) => sum + s.stok, 0);
    
    document.getElementById('stokUrea').textContent = totalUrea.toLocaleString();
    document.getElementById('stokNPK').textContent = totalNPK.toLocaleString();
    document.getElementById('stokOrganik').textContent = totalOrganik.toLocaleString();
    document.getElementById('stokZA').textContent = totalZA.toLocaleString();
}

// Check Low Stock
function checkLowStock() {
    const lowStockItems = stokData.filter(s => s.stok < 300);
    
    if (lowStockItems.length > 0) {
        const alertContainer = document.getElementById('alertContainer');
        let alertHTML = '<div class="alert-low">';
        alertHTML += '<strong>⚠️ Peringatan Stok Rendah!</strong><br>';
        alertHTML += '<ul style="margin-top: 0.5rem; margin-left: 1.5rem;">';
        
        lowStockItems.forEach(item => {
            alertHTML += `<li>${item.jenis} di ${item.lokasi}: ${item.stok} ton</li>`;
        });
        
        alertHTML += '</ul></div>';
        alertContainer.innerHTML = alertHTML;
    }
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('searchStok');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#tableStokBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Filter Stok
function filterStok() {
    const filter = document.getElementById('filterJenis').value;
    const rows = document.querySelectorAll('#tableStokBody tr');
    
    rows.forEach(row => {
        const jenis = row.cells[1].textContent;
        if (filter === 'all' || jenis === filter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Open Modal
function openModal(mode, id = null) {
    const modal = document.getElementById('modalStok');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('formStok');
    
    form.reset();
    
    if (mode === 'add') {
        title.textContent = 'Tambah Stok Pupuk';
        document.getElementById('editId').value = '';
    } else if (mode === 'edit' && id) {
        title.textContent = 'Edit Stok Pupuk';
        const item = stokData.find(s => s.id === id);
        
        if (item) {
            document.getElementById('editId').value = item.id;
            document.getElementById('jenisPupuk').value = item.jenis;
            document.getElementById('lokasiGudang').value = item.lokasi;
            document.getElementById('jumlahStok').value = item.stok;
            document.getElementById('hargaTon').value = item.harga;
        }
    }
    
    modal.classList.add('active');
}

// Close Modal
function closeModal() {
    document.getElementById('modalStok').classList.remove('active');
}

// Save Stok
function saveStok(event) {
    event.preventDefault();
    
    const editId = document.getElementById('editId').value;
    const jenis = document.getElementById('jenisPupuk').value;
    const lokasi = document.getElementById('lokasiGudang').value;
    const jumlah = parseFloat(document.getElementById('jumlahStok').value);
    const harga = parseFloat(document.getElementById('hargaTon').value);
    
    if (editId) {
        // Edit existing
        const item = stokData.find(s => s.id === parseInt(editId));
        if (item) {
            item.jenis = jenis;
            item.lokasi = lokasi;
            item.stok = jumlah;
            item.harga = harga;
        }
        
        alert('✅ Data stok berhasil diupdate!');
    } else {
        // Add new
        const newId = Math.max(...stokData.map(s => s.id)) + 1;
        const prefix = jenis === 'Urea' ? 'UR' : jenis === 'NPK' ? 'NPK' : jenis === 'Organik' ? 'ORG' : 'ZA';
        const kode = `${prefix}-${String(newId).padStart(3, '0')}`;
        
        stokData.push({
            id: newId,
            kode: kode,
            jenis: jenis,
            lokasi: lokasi,
            stok: jumlah,
            harga: harga
        });
        
        // Add to riwayat
        const today = new Date().toISOString().split('T')[0];
        riwayatData.unshift({
            tanggal: today,
            jenis: 'Masuk',
            pupuk: jenis,
            jumlah: jumlah,
            keterangan: 'Penambahan stok baru'
        });
        
        alert('✅ Stok baru berhasil ditambahkan!');
    }
    
    closeModal();
    loadStokData();
    loadRiwayat();
    updateTotalStok();
    checkLowStock();
    
    // Save to localStorage
    localStorage.setItem('stokPupuk', JSON.stringify(stokData));
    localStorage.setItem('riwayatStok', JSON.stringify(riwayatData));
}

// View Detail
function viewDetail(id) {
    const item = stokData.find(s => s.id === id);
    if (item) {
        const totalNilai = item.stok * item.harga;
        alert(`Detail Stok\n\n` +
              `Kode: ${item.kode}\n` +
              `Jenis: ${item.jenis}\n` +
              `Lokasi: ${item.lokasi}\n` +
              `Stok: ${item.stok} ton\n` +
              `Harga: Rp ${item.harga.toLocaleString()}/ton\n` +
              `Total Nilai: Rp ${totalNilai.toLocaleString()}`);
    }
}

// Edit Stok
function editStok(id) {
    openModal('edit', id);
}

// Delete Stok
function deleteStok(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data stok ini?')) {
        const index = stokData.findIndex(s => s.id === id);
        if (index > -1) {
            const item = stokData[index];
            
            // Add to riwayat
            const today = new Date().toISOString().split('T')[0];
            riwayatData.unshift({
                tanggal: today,
                jenis: 'Keluar',
                pupuk: item.jenis,
                jumlah: item.stok,
                keterangan: 'Penghapusan stok'
            });
            
            stokData.splice(index, 1);
            
            alert('✅ Data stok berhasil dihapus!');
            
            loadStokData();
            loadRiwayat();
            updateTotalStok();
            checkLowStock();
            
            localStorage.setItem('stokPupuk', JSON.stringify(stokData));
            localStorage.setItem('riwayatStok', JSON.stringify(riwayatData));
        }
    }
}

// Load from localStorage on init
window.addEventListener('load', function() {
    const savedStok = localStorage.getItem('stokPupuk');
    const savedRiwayat = localStorage.getItem('riwayatStok');
    
    if (savedStok) stokData = JSON.parse(savedStok);
    if (savedRiwayat) riwayatData = JSON.parse(savedRiwayat);
    
    loadStokData();
    loadRiwayat();
    updateTotalStok();
    checkLowStock();
});