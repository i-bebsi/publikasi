# Manual Pengguna Kafka Monitor

## Pendahuluan

Kafka Monitor adalah aplikasi web untuk memantau dan mengelola Kafka Connect connectors di berbagai lingkungan (Production, Staging, Development). Aplikasi ini menyediakan interface yang mudah digunakan untuk memantau status connector, mengelola kegagalan, dan mengorganisir connector berdasarkan cluster dan tim.

## Akses Aplikasi

Aplikasi dapat diakses melalui URL: `http://localhost/kafka-monitor/`

## Menu Utama

### 1. Dashboard
**URL:** `/kafka-monitor/`

Dashboard adalah halaman utama yang menampilkan ringkasan status sistem Kafka Monitor:
- **Total Connectors:** Jumlah keseluruhan connector yang dipantau
- **Active Connectors:** Connector yang sedang berjalan
- **Failed Connectors:** Connector yang mengalami kegagalan
- **Statistik per Environment:** Breakdown connector berdasarkan Production, Staging, Development
- **Grafik Status:** Visualisasi distribusi status connector
- **Recent Failures:** Daftar kegagalan terbaru yang terjadi

### 2. Connectors
**URL:** `/kafka-monitor/connectors`

#### Fitur Utama:
- **Daftar Semua Connector:** Menampilkan semua connector dari berbagai environment
- **Filter dan Pencarian:** Cari connector berdasarkan nama, status, atau environment
- **Status Real-time:** Status terkini setiap connector (RUNNING, FAILED, PAUSED, dll.)
- **Informasi Detail:** Nama, cluster, tim, DBMS, environment, dan waktu update terakhir

#### Operasi Bulk (Massal):
- **Bulk Restart:** Restart beberapa connector sekaligus
- **Bulk Pause:** Pause beberapa connector sekaligus
- **Bulk Resume:** Resume beberapa connector sekaligus

#### Operasi Individual Connector:

##### Melihat Detail Connector
**URL:** `/kafka-monitor/connectors/{nama-connector}`
- Informasi lengkap konfigurasi connector
- Status tasks individual
- Topic yang digunakan
- Konfigurasi database source/sink
- Riwayat perubahan status

##### Edit Connector
**URL:** `/kafka-monitor/connectors/{nama-connector}/edit`
- Update assignment cluster
- Update assignment tim
- Update informasi DBMS
- Catatan: Hanya data organisasi yang bisa diubah, bukan konfigurasi teknis

##### Operasi Connector:
- **Restart:** Restart connector yang bermasalah
- **Pause:** Temporary stop connector
- **Resume:** Melanjutkan connector yang di-pause
- **Delete:** Hapus connector dari Kafka Connect
- **Delete from Database:** Hapus record connector dari database lokal saja

##### Update Assignment:
- **Update Cluster:** Assign connector ke cluster bisnis tertentu
- **Update DBMS:** Update informasi sistem database
- **Update Tim:** Assign connector ke tim pengelola

#### Fetch Connectors
**URL:** `/kafka-monitor/connectors/fetch` (POST)
Manual synchronization connector dari Kafka Connect server ke database lokal.

### 3. Failures (Kegagalan Connector)
**URL:** `/kafka-monitor/failures`

#### Monitoring Kegagalan:
- **Daftar Kegagalan:** Semua connector yang mengalami kegagalan
- **Detail Error:** Pesan error lengkap dan timestamp
- **Status Resolution:** Kegagalan yang sudah/belum diselesaikan
- **Environment Tracking:** Environment tempat kegagalan terjadi

#### Detail Kegagalan
**URL:** `/kafka-monitor/failures/{failure-id}`
- Informasi lengkap connector yang gagal
- Pesan error detail
- Riwayat kegagalan
- Langkah troubleshooting yang disarankan

#### Resolve Failure
- **Mark as Resolved:** Tandai kegagalan sebagai sudah diselesaikan
- **Auto Resolution:** Sistem otomatis menandai resolved ketika connector kembali normal

### 4. Clusters
**URL:** `/kafka-monitor/clusters`

#### Manajemen Cluster Bisnis:
- **Create Cluster:** Buat cluster bisnis baru
- **View Clusters:** Lihat daftar semua cluster
- **Edit Cluster:** Update informasi cluster
- **Delete Cluster:** Hapus cluster (jika tidak ada connector)

#### Detail Cluster:
- **Daftar Connector:** Semua connector yang assigned ke cluster
- **Statistik Cluster:** Jumlah connector aktif/gagal per cluster
- **Tim Pengelola:** Tim yang bertanggung jawab terhadap cluster

### 5. Tim
**URL:** `/kafka-monitor/tim`

#### Manajemen Tim:
- **Create Tim:** Buat tim baru
- **View Teams:** Lihat daftar semua tim
- **Edit Tim:** Update informasi tim
- **Delete Tim:** Hapus tim (soft delete)
- **Restore Tim:** Restore tim yang sudah dihapus

#### Assignment Tim:
- **Connector Assignment:** Assign connector ke tim tertentu
- **Default Assignment:** Connector auto-discovered assigned ke tim "Lainnya"

### 6. Topics
**URL:** `/kafka-monitor/topics`

#### Monitoring Kafka Topics:
- **Daftar Topics:** Semua topic yang digunakan connector
- **Auto Discovery:** Topic otomatis terdeteksi dari konfigurasi connector
- **Usage Tracking:** Connector mana saja yang menggunakan topic tertentu

## Sistem Scheduler

### Scheduler Status
**URL:** `/kafka-monitor/scheduler`

#### Monitoring Scheduler:
- **Status Aktif:** Scheduler sedang berjalan atau tidak
- **Last Run:** Waktu terakhir scheduler dijalankan
- **Next Run:** Waktu scheduler selanjutnya
- **Health Check:** Status kesehatan sistem monitoring

#### Manual Sync
**URL:** `/kafka-monitor/scheduler/sync` (POST)
Trigger manual synchronization semua environment.

#### System Health
**URL:** `/kafka-monitor/scheduler/health`
- **Database Connection:** Status koneksi database
- **Kafka Connect APIs:** Status koneksi ke semua environment
- **Disk Space:** Monitoring penggunaan disk
- **Memory Usage:** Monitoring penggunaan memory

### Scheduler Configuration
**URL:** `/kafka-monitor/scheduler-config`

#### Konfigurasi Scheduler:
- **Enable/Disable Environment:** Aktifkan/nonaktifkan monitoring per environment
- **Schedule Times:** Atur waktu sync harian
- **Update Intervals:** Atur interval update real-time
- **Notification Settings:** Konfigurasi notifikasi Telegram

#### Toggle Configuration:
Setiap environment bisa diaktifkan/nonaktifkan secara individual:
- **Production Enabled:** Monitoring environment production
- **Staging Enabled:** Monitoring environment staging
- **Development Enabled:** Monitoring environment development

## Sistem Raft (KafkaRaft)

### Raft Connectors
**URL:** `/kafka-monitor/raft/connectors`

Sistem terpisah untuk monitoring KafkaRaft connectors dengan fitur serupa seperti Kafka Connect:
- **Daftar Raft Connectors**
- **Operasi Individual:** Restart, Pause, Resume
- **Update Assignments:** Cluster, DBMS, Tim

### Raft Clusters
**URL:** `/kafka-monitor/raft/clusters`
Manajemen cluster untuk KafkaRaft connectors.

### Raft Teams
**URL:** `/kafka-monitor/raft/tims`
Manajemen tim untuk KafkaRaft connectors.

### Raft Topics
**URL:** `/kafka-monitor/raft/topiks`
- **Daftar Raft Topics**
- **Topic Statistics API:** `/kafka-monitor/raft/api/topiks/stats`

### Raft Failures
**URL:** `/kafka-monitor/raft/failures`
- **Monitoring Kegagalan Raft**
- **Resolve/Unresolve:** Kelola status kegagalan
- **Failure Statistics API:** `/kafka-monitor/raft/api/failures/stats`

## Alur Kerja Umum

### 1. Monitoring Harian
1. **Buka Dashboard** untuk overview status sistem
2. **Periksa Failures** untuk melihat connector yang bermasalah
3. **Review Scheduler Status** untuk memastikan monitoring berjalan

### 2. Troubleshooting Connector
1. **Identifikasi Masalah** dari Dashboard atau Failures page
2. **Detail Connector** untuk melihat informasi lengkap
3. **Restart Connector** jika diperlukan
4. **Mark Failure as Resolved** setelah masalah diselesaikan

### 3. Manajemen Organisasi
1. **Buat/Update Cluster** untuk organisasi bisnis
2. **Buat/Update Tim** untuk assignment pengelola
3. **Assign Connector** ke cluster dan tim yang tepat

### 4. Maintenance Sistem
1. **Monitor Scheduler Health** secara berkala
2. **Update Scheduler Configuration** sesuai kebutuhan
3. **Manual Sync** jika diperlukan update mendadak

## Tips Penggunaan

### Best Practices:
1. **Regular Monitoring:** Periksa dashboard minimal 2x sehari
2. **Proper Assignment:** Pastikan semua connector assigned ke cluster dan tim
3. **Quick Response:** Tangani failure segera untuk menghindari impact bisnis
4. **Documentation:** Catat tindakan troubleshooting untuk referensi future

### Troubleshooting Umum:
1. **Connector FAILED:** Restart terlebih dahulu, jika masih gagal periksa log detail
2. **Scheduler Tidak Berjalan:** Periksa system health dan konfigurasi
3. **Data Tidak Update:** Trigger manual sync atau periksa koneksi network
4. **Assignment Hilang:** Re-assign connector ke cluster dan tim yang sesuai

## Notifikasi dan Alert

### Telegram Integration:
- **Failure Alerts:** Notifikasi otomatis ketika connector gagal
- **Recovery Notifications:** Notifikasi ketika connector kembali normal
- **Throttled Notifications:** Maksimal 1 notifikasi per jam per connector

### Email Notifications:
- **Daily Summary:** Ringkasan harian status sistem
- **Critical Failures:** Alert untuk kegagalan critical connector

## API Endpoints

### Public APIs:
- **Scheduler Config:** `/kafka-monitor/api/scheduler-config`
- **Raft Topic Stats:** `/kafka-monitor/raft/api/topiks/stats`
- **Raft Failure Stats:** `/kafka-monitor/raft/api/failures/stats`

## Keamanan dan Akses

### Authentication:
Aplikasi menggunakan sistem authentication Laravel standar.

### Authorization:
- **Admin Access:** Full control semua fitur
- **User Access:** View-only untuk monitoring
- **Team Lead Access:** Kelola connector untuk tim tertentu

## Support dan Bantuan

### Dokumentasi Teknis:
- **CLAUDE.md:** Dokumentasi untuk developer
- **README.md:** Setup dan konfigurasi aplikasi

### Troubleshooting:
Untuk masalah teknis, hubungi tim IT atau periksa log aplikasi di `/storage/logs/`.

---

*Manual ini akan terus diupdate seiring dengan pengembangan fitur baru aplikasi Kafka Monitor.*