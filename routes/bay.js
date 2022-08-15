var express = require("express");
const tokenandName = require("../middleware/tokenMiddleware");
const BayController = require("../controller/store/LikeController")
const findStorSalk = require("../controller/users/getUserItems")

var router = express.Router();

/* GET bayItemsList page. */
router.get(
  "/",
  tokenandName.tryGetIn,
  findStorSalk.findUserItems,
  function (req, res) {
  req.session.mssg = undefined;
 
    res.render("bayItemsList", {
      title: "Express",
      ...req.infoNav,
      loginName: req.session.loginName,
      view: req.session.view,
      storeSalItems:req.storeSalK,
      sumArray : req.sumarray,
      mssg:req.session.mssg,
      date:req.date

    });
  }
);


router.post(
    "/baynow/:itemID",
    tokenandName.tryGetIn,
    BayController.bayone, 
    (req, res) => {

      // res.redirect("/store/"+ req.params.itemID +"?sum="+ req.body.sum?req.body.sum:0 );
      res.redirect(req.headers.referer );

    }
  );


module.exports = router;
