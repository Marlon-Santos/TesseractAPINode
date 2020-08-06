var express = require("express");
var tesseract = require("tesseract.js");
var multer = require("multer");
var router = express.Router();
var fs = require("fs");
var upload = multer({ dest: "uploads/" });
/* GET home page. */
router.post("/tesseract", upload.single("file"), function (req, res, next) {
  try {
    if (
      req.file.mimetype !== "image/bmp" &&
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/pbm" &&
      req.file.mimetype !== "image/x-portable-bitmap"
    ) {
      console.log(req.file);
      fs.unlinkSync(req.file.path);
      res.json({ error: "Arquivo enviado não é suportado pelo OCR" });
      return;
    }
    tesseract.recognize(req.file.path, "por").then(
      ({ data: { text } }) => {
        fs.unlinkSync(req.file.path);
        var textFormat = text.split("\n").join("");
        res.json({ text: textFormat });
      },
      (e) => {
        res.json({ error: "Arquivo enviado não é suportado pelo OCR" });
      }
    );
  } catch (error) {
    res.json({ error: "Arquivo enviado não é suportado pelo OCR" });
  }
});

module.exports = router;
