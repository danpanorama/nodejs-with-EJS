var express = require("express");
const darkLite = require("../middleware/darkLite");
const GetVie = require("../middleware/setDefeualtV");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  err = undefined;
  massage = undefined;
  res.render("index", {
    title: "Express",
    ...req.infoNav,
    view: req.session.view,
    massage: req.session.msg,
    err: req.session.err,
  });
});

router.post("/darklite/:page",GetVie, darkLite, function (req, res, next) {
  console.log("gfhhgh")
  console.log(req.params.page)

  if(req.params.page == "/"){
    res.redirect("/");
    console.log(req.params.page)

  }
  else{
    console.log("yes",req.query.sum)
    res.redirect("/" + req.params.page);
  }
});


router.post("/darklite/",GetVie, darkLite, function (req, res, next) {
  console.log("darklite")
    res.redirect("/");
});

router.post("/darklite/store/:page",GetVie, darkLite, function (req, res, next) {
  console.log("darklite",req.params.page+"?sum=" +req.query.sum)
console.log("yes",req.query.sum)

  


    res.redirect("/store/"+req.params.page+"?sum=" +req.query.sum );
});

module.exports = router;
