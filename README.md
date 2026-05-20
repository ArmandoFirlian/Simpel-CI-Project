# Simpel-CI-Project
Homework
Hai ini Armando Sedang Mengerjakan Tugas DevOps

## 🏗️ Infrastructure as Code (IaC)

Proyek ini mendukung dua metode *Infrastructure as Code* (IaC): **Docker Compose** (orkestrasi multi-container sederhana) dan **Terraform** (pengelolaan infrastruktur deklaratif).

---

## 🐳 Metode 1: Docker Compose

Metode ini mempermudah orkestrasi *multi-container* (aplikasi Sudoku dan database PostgreSQL).

### Prasyarat
Pastikan Anda sudah menginstal **Docker Desktop**.

### Build dan Run
```bash
docker compose up --build -d
```

### Stop Container
```bash
docker compose down
```

---

## 🛠️ Metode 2: Terraform

Metode ini menggunakan Terraform untuk mengelola siklus hidup container Docker secara deklaratif.

### Prasyarat
1. Pastikan **Docker Desktop** sedang berjalan.
2. Unduh dan instal [Terraform](https://developer.hashicorp.com/terraform/downloads).
3. Tambahkan folder eksekusi Terraform ke sistem `PATH` Anda.

### Langkah-Langkah Menjalankan

1. **Inisialisasi Terraform** (Mengunduh provider Docker):
   ```bash
   terraform init
   ```

2. **Melihat Rencana Eksekusi** (Preview infrastruktur):
   ```bash
   terraform plan
   ```

3. **Menerapkan Infrastruktur** (Build image dan jalankan container):
   ```bash
   terraform apply
   ```
   *Ketik `yes` ketika diminta konfirmasi.*

4. **Menghancurkan Infrastruktur** (Hapus container dan image):
   ```bash
   terraform destroy
   ```
   *Ketik `yes` ketika diminta konfirmasi.*

---

## 🚀 Akses Aplikasi
* **Game Sudoku**: [http://localhost:3000](http://localhost:3000)
* **Health Check**: [http://localhost:3000/health](http://localhost:3000/health)