const user = require("../models/sql/sqlpools");

const findUserNumber = async (req, res, next) => {
  try {
    if (req.session.clientNumber) {
      console.log("number", req.session.clientNumber);
      next();
    }
    if (req.session.loginName) {
      if (req.session.idcart) {
        let store = await user.cheakStoreName(req.session.loginName);
        if (store.length > 0) {
          req.session.clientNumber = store[0][0].store_number;
          next();
        }
      } else {
        let theuser = await user.cheakUsername(req.session.loginName);
        if (theuser.length > 0 && theuser[0][0].client_number) {
          req.session.clientNumber = theuser[0][0].client_number;
          next();
        }
      }
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.findUserNumber = findUserNumber;
