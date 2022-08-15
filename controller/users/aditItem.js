const Mogoallitems = require("../../models/db/DBallStoreData");


const setItemSal = async (req, res, next) => {
  try {
    console.log(req.params.productid);
    
 
    await Mogoallitems.find({ _id: req.params.productid }, async function (
      err,
      user
    ) {
      if (err) throw err;
      req.item = user;
      req.itemID = user[0]._id;
      
      console.log(user);
      next();
    }).catch((err) => console.log("fdsghfjdgkjfl", err));
  } catch (e) {
    console.log("error while adit new item", e);
    res.status(404);
  }
};

module.exports.setItemSal = setItemSal;
