const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

// Mendapatkan daftar semua karyawan
router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM karyawan",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Daftar karyawan",
          data: rows,
        });
      }
    }
  );
});

// Membuat data karyawan baru
router.post(
  "/store",
  [
    body("Nama_Karyawan").notEmpty(),
    body("Jabatan").notEmpty(),
    body("Gaji").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let data = {
      Nama_Karyawan: req.body.Nama_Karyawan,
      Jabatan: req.body.Jabatan,
      Gaji: req.body.Gaji,
    };
    connection.query("INSERT INTO karyawan SET ?", data, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data karyawan berhasil ditambahkan",
          data: result,
        });
      }
    });
  }
);

// Mendapatkan detail data karyawan berdasarkan ID
router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM karyawan WHERE id_karyawan=${id}`,
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
          message: "Data karyawan tidak ditemukan",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Detail data karyawan",
          data: rows[0],
        });
      }
    }
  );
});

// Mengupdate data karyawan berdasarkan ID
router.patch(
  "/update/:id",
  [
    body("Nama_Karyawan").notEmpty(),
    body("Jabatan").notEmpty(),
    body("Gaji").notEmpty(),
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
      Nama_Karyawan: req.body.Nama_Naryawan,
      Jabatan: req.body.Jabatan,
      Gaji: req.body.Gaji,
    };
    connection.query(
      `UPDATE karyawan SET ? WHERE id_karyawan=${id}`,
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
            message: "Data karyawan berhasil diperbarui",
          });
        }
      }
    );
  }
);

// Menghapus data karyawan berdasarkan ID
router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `DELETE FROM karyawan WHERE id_karyawan=${id}`,
    function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data karyawan berhasil dihapus",
        });
      }
    }
  );
});

module.exports = router;
