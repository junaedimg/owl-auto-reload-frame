# owl-auto-reload-frame

# 🔄 Auto Frame Reload for Development

Script ini digunakan untuk **mempercepat proses development** di lingkungan kerja kantor. (Mirip dan terinspirasi dari Extensi "Live Server" pada VSCode).

---

## 🎯 Tujuan

Sebelumnya, setiap perubahan file `.php` atau `.js` membutuhkan:
- Klik kanan
- Pilih "Reload Frame" secara manual

Dengan script ini:
- Perubahan file langsung memicu reload pada frame (otomatis)
- **Menghemat waktu developer**
- Mencegah lupa reload saat pengembangan

---

## ⚙️ Cara Kerja

1. Server WebSocket lokal berjalan di `ws://localhost:3001`
2. Semua file `.php` dan `.js` dalam folder project dipantau (`watch`)
3. Jika salah satu file berubah:
   - Server mengirim sinyal `reload-frame` ke browser
4. Script client mendeteksi sinyal dan otomatis **reload frame**

---

## 🚀 Menjalankan Script

### 1. Install Dependency
Pastikan kamu berada di root folder project, lalu jalankan:
```bash
npm install ws
```
### 2. Running scriptnya.
```bash
node watcher.js
```
---

## 📂 Struktur Folder
 ```bash  
project-folder/
├── watcher.js           # Copy watcher.js ke root "/" untuk WebSocket server (Node.js)
├── js/
│   └── generic.js       # Sisipkan isi Client.js ke Generic.js untuk reload di sisi client
  ```
