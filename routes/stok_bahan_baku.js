const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

// Mendapatkan daftar semua stok bahan baku
router.get("/", function (req, res) {
  connection.query("SELECT * FROM Jumlah_Stok", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Daftar stok bahan baku",
        data: rows,
      });
    }
  });
});

// Menambahkan stok bahan baku baru
router.post(
  "/store",
  [body("Nama_Bahan_Baku").notEmpty(), body("Jumlah_Stok").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let data = {
      Nama_Bahan_Baku: req.body.Nama_Bahan_Baku,
      Jumlah_Stok: req.body.Jumlah_Stok,
    };
    connection.query("INSERT INTO Jumlah_Stok SET ?", data, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Stok bahan baku berhasil ditambahkan",
          data: result,
        });
      }
    });
  }
);

// Mendapatkan detail stok bahan baku berdasarkan ID
router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM Jumlah_Stok WHERE stok_bahan_baku =${id}`,
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
          message: "Stok bahan baku tidak ditemukan",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Detail stok bahan baku",
          data: rows[0],
        });
      }
    }
  );
});

// Mengupdate stok bahan baku berdasarkan ID
router.patch(
  "/update/:id",
  [body("Nama_Bahan_Baku").notEmpty(), body("Jumlah_Stok").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    let id = req.params.id;
    let data = {
      Nama_Bahan_Baku: req.body.Nama_Bahan_Baku,
      Jumlah_Stok: req.body.Jumlah_Stok,
    };
    connection.query(
        `UPDATE stok_bahan_baku SET ? WHERE id_stok='${id}'`

        ,
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
            message: "Stok bahan baku berhasil diperbarui",
          });
        }
      }
    );
  }
);

// Menghapus stok bahan baku berdasarkan ID
router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `DELETE FROM Jumlah_Stok WHERE stok_bahan_baku=${id}`,
    function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Stok bahan baku berhasil dihapus",
        });
      }
    }
  );
});

module.exports = router;
