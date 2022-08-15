var express = require("express");
const storeSetController = require("../controller/users/login");
var router = express.Router();
var ddd = require("../middleware/changePassTime")

/* GET users listing. */
router.get("/", function (req, res, next) {
  err = undefined;
  massage = undefined;
  res.render("login", {
    ...req.infoNav,
    err: req.session.err,
    view: req.session.view,
    massage: req.session.msg,
  });
});
router.post("/", storeSetController.logedin);
router.post("/logout", storeSetController.logute);



module.exports = router;
