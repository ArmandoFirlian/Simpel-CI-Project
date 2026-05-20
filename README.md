# Simpel-CI-Project
Homework
Hai ini Armando Sedang Mengerjakan Tugas DevOps

---

## 📊 Pertemuan 11: Monitoring & Logging (Observability)

Proyek ini telah dilengkapi dengan monitoring metrics (Prometheus), visualisasi dashboard (Grafana), dan structured logging (JSON) sesuai dengan materi Pertemuan 11.

### Fitur Observability:
1. **Expose Metrics `/metrics`**: Menggunakan `prom-client` untuk mengekspos metrik sistem Node.js dan metrik kustom (jumlah HTTP request).
2. **Structured Logging (JSON)**: Log konsol server dicetak dalam format JSON standar industri agar mudah di-parse oleh sistem logging seperti ELK Stack atau Loki.
3. **Multi-Container Stack**: Menjalankan App, Database, Prometheus, dan Grafana secara bersamaan menggunakan Docker Compose.

---

## 🐳 Cara Menjalankan Stack Monitoring (Docker Compose)

### 1. Jalankan Semua Container
Pastikan **Docker Desktop** sedang berjalan, lalu buka terminal di folder project ini dan ketik:
```bash
docker compose up --build -d
```
*Docker akan mendownload image, mem-build aplikasi Node.js, serta menjalankan Prometheus dan Grafana di background.*

### 2. Port Akses Layanan
Setelah container berjalan, Anda dapat mengakses layanan di port berikut:
* **Game Sudoku**: [http://localhost:3000](http://localhost:3000)
* **Health Check**: [http://localhost:3000/health](http://localhost:3000/health)
* **Prometheus Metrics Endpoints**: [http://localhost:3000/metrics](http://localhost:3000/metrics)
* **Prometheus UI**: [http://localhost:9090](http://localhost:9090) (Gunakan ini untuk tes query PromQL seperti `http_requests_total`)
* **Grafana UI**: [http://localhost:3001](http://localhost:3001)
  * *Username default*: `admin`
  * *Password default*: `admin` (Anda akan diminta mengganti password baru, klik *Skip* jika hanya untuk tes).

### 3. Cara Menghubungkan Prometheus ke Grafana
1. Buka Grafana di [http://localhost:3001](http://localhost:3001).
2. Pergi ke **Connections** -> **Data sources** -> Klik **Add data source**.
3. Pilih **Prometheus**.
4. Di bagian **Connection**, masukkan URL Prometheus container:
   `http://prometheus:9090` (atau `http://sudoku-prometheus:9090`).
5. Scroll ke bawah dan klik **Save & test**.
6. Anda sekarang bisa membuat visualisasi grafik dashboard menggunakan metrik seperti `http_requests_total`.

### 4. Melihat Structured JSON Logs
Jalankan perintah berikut di terminal untuk melihat output log server dalam format JSON terstruktur:
```bash
docker logs -f sudoku-app
```
Contoh output log:
```json
{"timestamp":"2026-05-20T08:21:00.000Z","level":"info","message":"HTTP Request processed","method":"GET","path":"/health","status_code":200,"duration_ms":3}
```

### 5. Menghentikan Layanan
```bash
docker compose down
```

---

## 🛠️ Alternatif: Terraform Deployment (Pertemuan 10)
Jika ingin mendeploy container app utama secara mandiri menggunakan Terraform:
```bash
terraform init
terraform plan
terraform apply
```
Untuk menghapus:
```bash
terraform destroy
```