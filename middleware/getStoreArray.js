const GetAllItem = require("../models/db/DBallStoreData");

const getStoreArray = async (req,res,next)=>{
    try {
        // let data =
        await GetAllItem.find({}, function (err, user) {
          if (err) throw err;
          req.storeLength = user;
          next();
        }).catch((err) => console.log(err));
      } catch {
        console.log("error by get data");
        res.status(500);
      }
}

module.exports.getStoreArray =getStoreArray;