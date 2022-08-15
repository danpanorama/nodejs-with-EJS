const Mogoallitems = require("../../models/db/DBallStoreData");
const storeDB = require("../../models/db/StoreSal")

const likeone = async (req, res, next) => {
  try {
    let array = {
      name: req.session.loginName,
      number: req.session.clientNumber,
    };

    let item = await Mogoallitems.findOneAndUpdate(
      { _id: req.params.itemID },
      { $push: { userLikes: array } }
    ).catch((err) => console.log(err));

    next();
  } catch (e) {
    console.log("error while adit new item", e);
    res.status(404);
  }
};

const bayone = async (req, res, next) => {
  try {
    const date = new Date();
    let like = await Mogoallitems.updateOne(
      { _id: req.params.itemID },
      { $inc: { sold: 1 } }
    );
    if( req.session.clientNumber){
      const setStoreSalItem = await new storeDB({
        ID: req.params.itemID,
        StoreName: req.session.loginName,
        StoreNumber:req.session.clientNumber,
        sum:req.body.sum,
        date : date
      });
      setStoreSalItem
        .save()
        .then((result) => {
          req.session.mssg = "you bay it secssesfuly"
          req.session.err = "";
          next();
          

        })
        .catch((err) => req.session.err = "bad value");
    }else{
      next()
    }
  } catch (e) {
    console.log("error baying", e);
    req.session.err = "bad you dont bay this item value"
    res.status(404);
  }
};

module.exports.likeone = likeone;
module.exports.bayone = bayone;
