# 🛒 Toko Sembako Nico (Offline Version)

Aplikasi Toko Online berbasis web yang dibangun menggunakan **React + Vite**. Aplikasi ini didesain untuk berjalan **100% Offline** tanpa memerlukan koneksi internet, server backend, atau database cloud (Firebase/MySQL).

Semua data (Produk, User, Keranjang, Riwayat Pesanan) disimpan secara aman di dalam **LocalStorage (Memori Browser)**.

## 🚀 Teknologi yang Digunakan
* **Frontend:** React.js
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Database:** LocalStorage (Browser API)
* **State Management:** React Context API (Auth & Cart)

## ✨ Fitur Utama

### 👤 Halaman Pengunjung (User)
* **Register & Login:** Sistem autentikasi mandiri (tersimpan di browser).
* **Katalog Produk:** Menampilkan barang dengan gambar, harga, dan kategori.
* **Pencarian & Filter:** Cari barang berdasarkan nama atau kategori.
* **Keranjang Belanja:** Menambah barang dan menghitung total harga otomatis.
* **Checkout:** Form pengiriman barang simulasi.
* **Riwayat Pesanan:** Melihat status dan detail belanjaan yang sudah dibayar.

### 🛡️ Halaman Admin
* **Dashboard Admin:** Ringkasan produk.
* **CRUD Produk:** Tambah, Edit, dan Hapus produk toko.
* **Upload Gambar:** Mengubah gambar menjadi format Base64 (Teks) agar bisa disimpan offline.

## 📦 Cara Menjalankan Project

Pastikan di laptopmu sudah terinstall **Node.js**.

1.  **Download/Clone** folder project ini.
2.  Buka terminal di dalam folder project.
3.  Install library yang dibutuhkan:
    ```bash
    npm install
    ```
4.  Jalankan aplikasi:
    ```bash
    npm run dev
    ```
5.  Buka browser dan akses: https://react-context-shopping-cart-i2ja.vercel.app/

## 🔑 Panduan Akun (PENTING!)

Karena aplikasi ini offline, data akun tersimpan di laptop masing-masing.

**1. Cara Login User:**
* Silakan menu **Register** dan buat akun baru.
* Login menggunakan email & password yang baru dibuat.

**2. Cara Menjadi Admin:**
Secara default, akun baru adalah "User Biasa". Untuk masuk ke menu Admin:
1.  Buka **Inspect Element** (Klik Kanan -> Inspect).
2.  Masuk tab **Application** -> **Local Storage**.
3.  Cari key `users`.
4.  Edit value akun kamu, ubah `"role":"user"` menjadi `"role":"admin"`.
5.  Logout dan Login kembali. Menu Admin akan muncul.

## ⚠️ Catatan Penting (Disclaimer)

Aplikasi ini menggunakan **LocalStorage**.
* Data **TIDAK AKAN HILANG** jika halaman di-refresh atau laptop dimatikan.
* Data **AKAN HILANG** jika kamu melakukan "Clear Cache/History" pada browser atau ganti browser/laptop.
* Jika ingin memindahkan data, silakan copy value dari LocalStorage secara manual.

---
**Created by Nico** | Front-End Journey
