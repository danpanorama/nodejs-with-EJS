var express = require("express");
const loginController = require("../controller/users/loginCreatUser");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {

  res.render("CreateUser", {
    ...req.infoNav,
    err: req.session.err,
    view: req.session.view,
    massage: req.session.msg,
  });
});
router.post("/signup", loginController.createNewAccount);




module.exports = router;
