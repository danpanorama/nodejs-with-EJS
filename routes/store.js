var express = require("express");
const setStoreItems = require("../controller/store/setStoreItem");
const deleteItems = require("../controller/store/deletItem");
const tokenMiddleware = require("../middleware/tokenMiddleware");
const sal = require("../controller/users/aditItem");
const setSal = require("../controller/store/setSalItem");
const getItemDB = require("../controller/store/getStoreItem");
const findProductinBass = require("../controller/store/getItemByID");
const updateItem = require("../controller/store/updateItem");
const updateSalItem = require("../controller/store/updateSalItem");
const getStoreArray = require("../middleware/getStoreArray")
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

var router = express.Router();

/* GET store page. */

router.get("/",getStoreArray.getStoreArray, 
 getItemDB.getItem, async function (req, res) {
  req.session.mssg = ""
  res.render("store", {
    ...req.infoNav,
    data: req.itemData,
    err: req.session.err,
    allData:req.storeLength,
    view: req.session.view,
    clientNumber: req.session.clientNumber,
    storecase: req.session.idcart,
  });
});

// adit item
router.post(
  "/edit/:itemID",
  tokenMiddleware.tryGetIn,
  findProductinBass.findItemThatAdd,
  setSal.setitemintosal,
  (req, res) => {
    console.log(req.params.page,req.query.page,req.headers.referer);
    if(req.params.page){
      console.log(req.params.page);
      res.redirect("/store/"+"?page="+req.params.page);
    }
    res.redirect(req.headers.referer);
  }
);

// set store item

router.post(
  "/setitems",
  upload.single("file"),
  setStoreItems.setItemMiddleware,
  (req, res) => {}
);

// delete store item

router.post(
  "/delete/:itemID",
  deleteItems.deleteItems,
  deleteItems.deleteItemssal,
  (req, res) => {
    res.redirect("/profile");
  }
);

// updating item

router.post(
  "/update",
  upload.single("file"),
  updateItem.updatingItem,
  updateSalItem.updatingItem,
  (req, res) => {
    console.log("finish update");
    res.redirect("/profile");
  }
);

// get item parms page

router.get("/:productid", sal.setItemSal, (req, res) => {

  res.render("itemSelect", {
    ...req.infoNav,
    data: req.item,
    itemInfo: req.itemInfo,
    view: req.session.view,
    mssg:req.session.mssg, 
    summ:req.query.sum,
    loginName: req.session.loginName,
    clientNumber: req.session.clientNumber, 
  });
  req.session.mssg = undefined;


});

module.exports = router;
