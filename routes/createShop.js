var express = require("express");

const logAsAsellerController = require("../controller/users/loggAsAseller");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  err = undefined;
  massage = undefined;
  res.render("createShop", {
    ...req.infoNav,
    err: req.session.err,
    view: req.session.view,
    massage: req.session.msg,
  });
});

router.post("/logasseller", logAsAsellerController.createNewStoreAccount);



module.exports = router;
