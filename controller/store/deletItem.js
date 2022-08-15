const deleteall = require("../../models/db/DBallStoreData");
const sal = require("../../models/db/mongoSal");

const deleteItems = async (req, res, next) => {
  if (req.session.idcart) {
    try {
      // let data =
      await deleteall.deleteOne(
        { _id: req.params.itemID, StoreName: req.session.loginName },
        function (err, item) {
          if (err) throw err;

          next();
        }
      );
    } catch {
      console.log("dident deleted item");
      res.redirect("/");
    }
  } else {
    console.log("pass");
    req.session.err = "you must logge in to delete an item ";
    next();
  }
};

const deleteItemssal = async (req, res, next) => {
  try {
    let data2 = await sal.deleteOne({ _id: req.params.itemID }, function (
      err,
      item
    ) {
      if (err) throw err;

      next();
    });
  } catch {
    console.log("dident deleted item");
    res.redirect("/");
  }
};

module.exports.deleteItems = deleteItems;
module.exports.deleteItemssal = deleteItemssal;
