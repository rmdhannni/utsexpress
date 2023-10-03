const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

// Mendapatkan daftar semua data pembayaran
router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM pembayaran",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Daftar pembayaran",
          data: rows,
        });
      }
    }
  );
});

// Membuat data pembayaran baru
router.post(
  "/store",
  [
    body("ID_Pesanan").notEmpty(),
    body("Jumlah_Pembayaran").notEmpty(),
    body("Tanggal_Pembayaran").notEmpty(),
    body("Metode_Pembayaran").notEmpty(),
    
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let data = {
      ID_Pesanan: req.body.ID_Pesanan,
      Jumlah_Pembayaran: req.body.Jumlah_Pembayaran,
      Tanggal_Pembayaran: req.body.Tanggal_Pembayaran,
      Metode_Pembayaran: req.body.Metode_Pembayaran,
      
    };
    connection.query("INSERT INTO pembayaran SET ?", data, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data pembayaran berhasil ditambahkan",
          data: result,
        });
      }
    });
  }
);

// Mendapatkan detail data pembayaran berdasarkan ID
router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM pembayaran WHERE id_pembayaran=${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      }
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: "Data pembayaran tidak ditemukan",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Detail data pembayaran",
          data: rows[0],
        });
      }
    }
  );
});

// Mengupdate data pembayaran berdasarkan ID
router.patch(
  "/update/:id",
  [
    body("ID_Pesanan").notEmpty(),
    body("Jumlah_Pembayaran").notEmpty(),
    body("Tanggal_Pembayaran").notEmpty(),
    body("Metode_Pembayaran").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    let id = req.params.id;
    let data = {
      ID_Pesanan: req.body.ID_Pesanan,
      Jumlah_Pembayaran: req.body.Jumlah_Pembayaran,
      Tanggal_Pembayaran: req.body.Tanggal_Pembayaran,
      Metode_Pembayaran: req.body.Metode_Pembayaran,
    };
    connection.query(
      `UPDATE pembayaran SET ? WHERE id_pembayaran=${id}`,
      data,
      function (err, result) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server error",
            error: err,
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Data pembayaran berhasil diperbarui",
          });
        }
      }
    );
  }
);

// Menghapus data pembayaran berdasarkan ID
router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `DELETE FROM pembayaran WHERE id_pembayaran=${id}`,
    function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data pembayaran berhasil dihapus",
        });
      }
    }
  );
});

module.exports = router;
