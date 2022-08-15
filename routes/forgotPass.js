var express = require("express");
const FindeUser = require("../controller/users/FindeUser")


var router = express.Router();

router.get(
  "/",
  function (req, res) {
    
    res.render("ForgotPassword", {
        title: "Express",
        ...req.infoNav,
        view: req.session.view,
        massage: req.session.msg,
        err: req.session.err,
      });
    }
  
);
router.post(
  "/serchuser",
  FindeUser.FindeUser,
  function (req, res) {
    
    res.redirect("/updateUserInfo")
  }
  
);



module.exports = router;
