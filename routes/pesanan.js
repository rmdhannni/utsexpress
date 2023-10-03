const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

// Mendapatkan daftar semua pesanan
router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM pesanan",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Daftar pesanan",
          data: rows,
        });
      }
    }
  );
});

// Membuat pesanan baru
router.post(
  "/store",
  [
    body("ID_Pelanggan").notEmpty(),
    body("Tanggal_Pesanan").notEmpty(),
    body("Total_Harga").notEmpty(),
    body("ID_Karyawan").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let data = {
      ID_Pelanggan: req.body.ID_Pelanggan,
      Tanggal_Pesanan: req.body.Tanggal_Pesanan,
      Total_Harga: req.body.Total_Harga,
      ID_Karyawan: req.body.ID_Karyawan,
    };
    connection.query("INSERT INTO pesanan SET ?", data, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Pesanan berhasil dibuat",
          data: result,
        });
      }
    });
  }
);

// Mendapatkan detail pesanan berdasarkan ID
router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM pesanan WHERE id_pesanan=${id}`,
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
          message: "Pesanan tidak ditemukan",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Detail pesanan",
          data: rows[0],
        });
      }
    }
  );
});

// Mengupdate pesanan berdasarkan ID
router.patch(
  "/update/:id",
  [
    body("ID_Pelanggan").notEmpty(),
    body("Tanggal_Pesanan").notEmpty(),
    body("Total_Harga").notEmpty(),
    body("ID_Karyawan").notEmpty(),
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
      ID_Pelanggan: req.body.ID_Pelanggan,
      Tanggal_Pesanan: req.body.Tanggal_Pesanan,
      Total_Harga: req.body.Total_Harga,
      ID_Karyawan: req.body.ID_Karyawan,
    };
    connection.query(
      `UPDATE pesanan SET ? WHERE id_pesanan=${id}`,
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
            message: "Pesanan berhasil diperbarui",
          });
        }
      }
    );
  }
);

// Menghapus pesanan berdasarkan ID
router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `DELETE FROM pesanan WHERE id_pesanan=${id}`,
    function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Pesanan berhasil dihapus",
        });
      }
    }
  );
});

module.exports = router;
