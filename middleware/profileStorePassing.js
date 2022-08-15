const products = require("../models/db/DBallStoreData");

const findeProd = async (req, res, next) => {
  try {
    if (req.session.idcart) {
      let data = await products.find(
        {
          $and: [
            { StoreName: req.session.loginName },
            { StoreNumber: req.session.clientNumber },
          ],
        },
        function (err, item) {
          if (err) throw err;
          req.profileProduct = item;

          next();
        }
      );
    } else {
      next();
    }
  } catch (e) {
    console.log("error", e);
    res.redirect("/");
  }
};

module.exports.findeProd = findeProd;
