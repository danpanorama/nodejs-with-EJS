var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("about", {
    title: "Express",
    ...req.infoNav,
    view: req.session.view,
    err: req.session.err,
  });
});

module.exports = router;
