var express = require("express");
var router = express.Router();
var multer = require("multer");
const path = require("path");

const multerconfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    const onemarr = file.originalname.split("/");
    const fileend = onemarr[onemarr.length - 1];
    cb(null, fileend);
  },
});
const upload = multer({ storage: multerconfig });

/* GET home page. */
router.get("/", function (req, res) {
  res.render("uploadimg");
});

router.post("/", upload.single("file"), function (req, res) {
  console.log(req.file);

  res.json({ msg: "complited" });
});

module.exports = router;
