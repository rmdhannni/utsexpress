const express = require("express");
const app = express();
const port = 3000; // Port yang akan digunakan (sesuaikan dengan kebutuhan Anda)
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const karyawanRoutes = require("./routes/karyawan");
const menuRoutes = require("./routes/menu");
const pesananRoutes = require("./routes/pesanan");
const pesananMenuRoutes = require("./routes/pesanan_menu");
const pembayaranRoutes = require("./routes/pembayaran");
const stokBahanBakuRoutes = require("./routes/stok_bahan_baku");
const pelangganRoutes = require("./routes/pelanggan");

// Menggunakan routes
app.use("/api/karyawan", karyawanRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/pesanan", pesananRoutes);
app.use("/api/pesanan-menu", pesananMenuRoutes);
app.use("/api/pembayaran", pembayaranRoutes);
app.use("/api/stok-bahan-baku", stokBahanBakuRoutes);
app.use("/api/pelanggan", pelangganRoutes);

// Server berjalan
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
