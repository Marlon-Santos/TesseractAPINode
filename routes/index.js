var express = require("express");
var tesseract = require("tesseract.js");
var router = express.Router();

/* GET home page. */
router.get("/tesseract", function (req, res, next) {
  tesseract
    .recognize(
      "https://nova-escola-producao.s3.amazonaws.com/PVHDASREdd8TmVxrCbE2vNQm2F9JZ54mb28cYUtpFDnR4FG9cWxeDFjyPH7m/introducao",
      "por",
      {
        logger: (m) => console.log(m),
      }
    )
    .then(({ data: { text } }) => {
      res.json({ text: text });
    });
});

module.exports = router;
