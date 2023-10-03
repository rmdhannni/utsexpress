const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

// Mendapatkan daftar semua item pesanan pada menu
router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM pesanan_menu",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Daftar item pesanan pada menu",
          data: rows,
        });
      }
    }
  );
});

// Menambahkan item pesanan baru pada menu
router.post(
  "/store",
  [
    body("ID_Pesanan").notEmpty(),
    body("ID_Menu").notEmpty(),
    body("Jumlah_Pesanan").notEmpty(),
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
      ID_Menu: req.body.ID_Menu,
      Jumlah_Pesanan: req.body.Jumlah_Pesanan,
    };
    connection.query("INSERT INTO pesanan_menu SET ?", data, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Item pesanan pada menu berhasil ditambahkan",
          data: result,
        });
      }
    });
  }
);

// Mendapatkan detail item pesanan pada menu berdasarkan ID
router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM pesanan_menu WHERE ID_Pesanan_menu=${id}`,
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
          message: "Item pesanan pada menu tidak ditemukan",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Detail item pesanan pada menu",
          data: rows[0],
        });
      }
    }
  );
});

// Mengupdate item pesanan pada menu berdasarkan ID
router.patch(
  "/update/:id",
  [
    body("ID_Pesanan").notEmpty(),
    body("ID_Menu").notEmpty(),
    body("Jumlah_Pesanan").notEmpty(),
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
      ID_Menu: req.body.ID_Menu,
      Jumlah_Pesanan: req.body.Jumlah_Pesanan,
    };
    connection.query(
      `UPDATE pesanan_menu SET ? WHERE ID_Pesanan_menu=${id}`,
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
            message: "Item pesanan pada menu berhasil diperbarui",
          });
        }
      }
    );
  }
);

// Menghapus item pesanan pada menu berdasarkan ID
router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `DELETE FROM pesanan_menu WHERE ID_Pesanan_menu=${id}`,
    function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Item pesanan pada menu berhasil dihapus",
        });
      }
    }
  );
});

module.exports = router;
