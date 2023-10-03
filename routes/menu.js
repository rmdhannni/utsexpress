const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

// Mendapatkan daftar semua menu
router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM menu",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Daftar menu",
          data: rows,
        });
      }
    }
  );
});

// Membuat menu baru
router.post(
  "/store",
  [
    body("nama_menu").notEmpty(),
    body("harga").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let data = {
      nama_menu: req.body.nama_menu,
      harga: req.body.harga,
    };
    connection.query("INSERT INTO menu SET ?", data, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Menu berhasil ditambahkan",
          data: result,
        });
      }
    });
  }
);

// Mendapatkan detail menu berdasarkan ID
router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM menu WHERE id_menu=${id}`,
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
          message: "Menu tidak ditemukan",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Detail menu",
          data: rows[0],
        });
      }
    }
  );
});

// Mengupdate menu berdasarkan ID
router.patch(
  "/update/:id",
  [
    body("nama_menu").notEmpty(),
    body("harga").notEmpty(),
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
      nama_menu: req.body.nama_menu,
      harga: req.body.harga,
    };
    connection.query(
      `UPDATE menu SET ? WHERE id_menu=${id}`,
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
            message: "Menu berhasil diperbarui",
          });
        }
      }
    );
  }
);

// Menghapus menu berdasarkan ID
router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `DELETE FROM menu WHERE id_menu=${id}`,
    function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Menu berhasil dihapus",
        });
      }
    }
  );
});

module.exports = router;
