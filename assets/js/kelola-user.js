// ==========================================
// KELOLA USER - MANDALA TANI
// ==========================================

let userData = [
    { id: 1, nama: "Admin Utama", email: "admin@sidoarjo.go.id", role: "admin", wilayah: "Kabupaten", status: "Aktif" },
    { id: 2, nama: "Budi Santoso", email: "budi@sidoarjo.go.id", role: "penyuluh_kecamatan", wilayah: "Candi", status: "Aktif" },
    { id: 3, nama: "Siti Aminah", email: "siti@sidoarjo.go.id", role: "penyuluh_kecamatan", wilayah: "Sidoarjo", status: "Aktif" },
    { id: 4, nama: "Ahmad Dahlan", email: "ahmad@sidoarjo.go.id", role: "penyuluh_kecamatan", wilayah: "Porong", status: "Aktif" },
    { id: 5, nama: "Dewi Lestari", email: "dewi@sidoarjo.go.id", role: "penyuluh_desa", wilayah: "Desa Candi", status: "Aktif" },
    { id: 6, nama: "Eko Prasetyo", email: "eko@sidoarjo.go.id", role: "penyuluh_desa", wilayah: "Desa Larangan", status: "Aktif" },
    { id: 7, nama: "Fitri Handayani", email: "fitri@sidoarjo.go.id", role: "penyuluh_desa", wilayah: "Desa Porong", status: "Nonaktif" },
    { id: 8, nama: "Hendra Wijaya", email: "hendra@sidoarjo.go.id", role: "penyuluh_kecamatan", wilayah: "Tanggulangin", status: "Aktif" }
];

const kecamatanList = ["Candi", "Sidoarjo", "Buduran", "Taman", "Waru", "Krian", "Porong", "Tanggulangin", "Gedangan", "Prambon"];
const desaList = ["Desa Candi", "Desa Larangan", "Desa Sidoarjo", "Desa Porong", "Desa Tanggulangin", "Desa Waru"];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    loadUserTable();
    setupSearch();
    updateStats();
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

// Load User Table
function loadUserTable() {
    const tbody = document.getElementById('tableUserBody');
    tbody.innerHTML = '';
    
    userData.forEach(user => {
        const roleLabel = getRoleLabel(user.role);
        const statusClass = user.status === 'Aktif' ? 'success' : 'danger';
        
        const row = `
            <tr>
                <td><strong>${user.id}</strong></td>
                <td>${user.nama}</td>
                <td>${user.email}</td>
                <td>${roleLabel}</td>
                <td>${user.wilayah}</td>
                <td><span class="status-badge ${statusClass}">${user.status}</span></td>
                <td>
                    <button class="btn-action btn-view" onclick="viewUser(${user.id})">👁️</button>
                    <button class="btn-action btn-edit" onclick="editUser(${user.id})">✏️</button>
                    <button class="btn-action btn-delete" onclick="deleteUser(${user.id})">🗑️</button>
                    ${user.status === 'Aktif' ? 
                        `<button class="btn-action" style="background: #e67e22;" onclick="toggleStatus(${user.id})">🔒</button>` : 
                        `<button class="btn-action" style="background: #27ae60;" onclick="toggleStatus(${user.id})">🔓</button>`
                    }
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Get Role Label
function getRoleLabel(role) {
    const roleMap = {
        "admin": "Admin Dinas",
        "penyuluh_kecamatan": "Penyuluh Kecamatan",
        "penyuluh_desa": "Penyuluh Desa"
    };
    return roleMap[role] || role;
}

// Update Stats
function updateStats() {
    const totalAdmin = userData.filter(u => u.role === 'admin').length;
    const totalKec = userData.filter(u => u.role === 'penyuluh_kecamatan').length;
    const totalDesa = userData.filter(u => u.role === 'penyuluh_desa').length;
    
    document.getElementById('totalAdmin').textContent = totalAdmin;
    document.getElementById('totalPenyuluhKec').textContent = totalKec;
    document.getElementById('totalPenyuluhDesa').textContent = totalDesa;
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('searchUser');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#tableUserBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Filter User
function filterUser() {
    const filter = document.getElementById('filterRole').value;
    const rows = document.querySelectorAll('#tableUserBody tr');
    
    rows.forEach(row => {
        const role = row.cells[3].textContent;
        if (filter === 'all') {
            row.style.display = '';
        } else {
            const filterLabel = getRoleLabel(filter);
            row.style.display = role === filterLabel ? '' : 'none';
        }
    });
}

// Open Modal
function openModal(mode, id = null) {
    const modal = document.getElementById('modalUser');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('formUser');
    
    form.reset();
    document.getElementById('wilayahContainer').style.display = 'none';
    
    if (mode === 'add') {
        title.textContent = 'Tambah User Baru';
        document.getElementById('editUserId').value = '';
        document.getElementById('passwordUser').required = true;
    } else if (mode === 'edit' && id) {
        title.textContent = 'Edit User';
        const user = userData.find(u => u.id === id);
        
        if (user) {
            document.getElementById('editUserId').value = user.id;
            document.getElementById('namaUser').value = user.nama;
            document.getElementById('emailUser').value = user.email;
            document.getElementById('roleUser').value = user.role;
            document.getElementById('passwordUser').required = false;
            
            updateWilayahOptions();
            document.getElementById('wilayahUser').value = user.wilayah;
        }
    }
    
    modal.classList.add('active');
}

// Close Modal
function closeModal() {
    document.getElementById('modalUser').classList.remove('active');
}

// Update Wilayah Options
function updateWilayahOptions() {
    const role = document.getElementById('roleUser').value;
    const container = document.getElementById('wilayahContainer');
    const select = document.getElementById('wilayahUser');
    
    if (role === 'admin') {
        container.style.display = 'none';
        select.required = false;
    } else {
        container.style.display = 'block';
        select.required = true;
        
        select.innerHTML = '<option value="">Pilih Wilayah</option>';
        
        const list = role === 'penyuluh_kecamatan' ? kecamatanList : desaList;
        list.forEach(wilayah => {
            const option = document.createElement('option');
            option.value = wilayah;
            option.textContent = wilayah;
            select.appendChild(option);
        });
    }
}

// Save User
function saveUser(event) {
    event.preventDefault();
    
    const editId = document.getElementById('editUserId').value;
    const nama = document.getElementById('namaUser').value;
    const email = document.getElementById('emailUser').value;
    const role = document.getElementById('roleUser').value;
    const wilayah = role === 'admin' ? 'Kabupaten' : document.getElementById('wilayahUser').value;
    const password = document.getElementById('passwordUser').value;
    
    if (editId) {
        // Edit existing
        const user = userData.find(u => u.id === parseInt(editId));
        if (user) {
            user.nama = nama;
            user.email = email;
            user.role = role;
            user.wilayah = wilayah;
            
            if (password) {
                // Update password (in real app, hash it)
                console.log('Password updated');
            }
        }
        alert('✅ User berhasil diupdate!');
    } else {
        // Add new
        const newId = Math.max(...userData.map(u => u.id)) + 1;
        
        userData.push({
            id: newId,
            nama: nama,
            email: email,
            role: role,
            wilayah: wilayah,
            status: 'Aktif'
        });
        
        alert('✅ User baru berhasil ditambahkan!');
    }
    
    closeModal();
    loadUserTable();
    updateStats();
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
}

// View User
function viewUser(id) {
    const user = userData.find(u => u.id === id);
    if (user) {
        alert(`Detail User\n\n` +
              `ID: ${user.id}\n` +
              `Nama: ${user.nama}\n` +
              `Email: ${user.email}\n` +
              `Role: ${getRoleLabel(user.role)}\n` +
              `Wilayah: ${user.wilayah}\n` +
              `Status: ${user.status}`);
    }
}

// Edit User
function editUser(id) {
    openModal('edit', id);
}

// Delete User
function deleteUser(id) {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
        const index = userData.findIndex(u => u.id === id);
        if (index > -1) {
            userData.splice(index, 1);
            alert('✅ User berhasil dihapus!');
            
            loadUserTable();
            updateStats();
            
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }
}

// Toggle Status
function toggleStatus(id) {
    const user = userData.find(u => u.id === id);
    if (user) {
        user.status = user.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
        
        alert(`✅ Status user ${user.nama} diubah menjadi ${user.status}`);
        
        loadUserTable();
        localStorage.setItem('userData', JSON.stringify(userData));
    }
}

// Load from localStorage on init
window.addEventListener('load', function() {
    const savedUsers = localStorage.getItem('userData');
    if (savedUsers) {
        userData = JSON.parse(savedUsers);
        loadUserTable();
        updateStats();
    }
});