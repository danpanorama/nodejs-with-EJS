const products = require("../models/db/mongoSal");
const alldata = require("../models/db/DBallStoreData");

const findUserItems = async (req, res, next) => {
  try {
    if (req.session.idcart) {
      next();
    } else {
      let data2 = await products.find(
        {
          $and: [
            { ClientNumber: req.session.clientNumber },
            { clientName: req.session.loginName },
          ],
        },
        function (err, item) {
          if (err) throw err;
          req.profileProduct = item;

          next();
        }
      );
    }
  } catch (e) {
    console.log(e, "cnnote get data from sal kniyot");
  }
};

module.exports.findUserItems = findUserItems;
