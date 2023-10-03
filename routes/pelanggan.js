const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query(
    "SELECT id_pelanggan, Nama_Pelanggan, Alamat, Nomor_Telepon FROM pelanggan",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "data pelanggan",
          data: rows,
        });
      }
    }
  );
});

router.post(
  "/store",
  [
    body("Nama_Pelanggan").notEmpty(),
    body("Alamat").notEmpty(),
    body("Nomor_Telepon").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let data = {
      Nama_Pelanggan: req.body.Nama_Pelanggan,
      Alamat: req.body.Alamat,
      Nomor_Telepon: req.body.Nomor_Telepon,
    };
    connection.query("INSERT INTO pelanggan SET ?", data, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "server error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "data pelanggan berhasil dibuat",
          data: result,
        });
      }
    });
  }
);

router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM pelanggan WHERE id_pelanggan=${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "server error",
        });
      }
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: "not found",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "data pelanggan",
          data: rows[0],
        });
      }
    }
  );
});

router.patch(
  "/update/:id",
  [
    body("Nama_Pelanggan").notEmpty(),
    body("Alamat").notEmpty(),
    body("Nomor_Telepon").notEmpty(),
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
      Nama_Pelanggan: req.body.Nama_Pelanggan,
      Alamat: req.body.Alamat,
      Nomor_Telepon: req.body.Nomor_Telepon,
    };
    connection.query(
      `UPDATE pelanggan SET ? WHERE id_pelanggan=${id}`,
      data,
      function (err, result) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "server error",
            error: err,
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "update data pelanggan",
          });
        }
      }
    );
  }
);

router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `DELETE FROM pelanggan WHERE id_pelanggan=${id}`,
    function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "hapus data pelanggan",
        });
      }
    }
  );
});

module.exports = router;
