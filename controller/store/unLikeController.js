const Mogoallitems = require("../../models/db/DBallStoreData");

const unLike = async (req, res, next) => {
  try {
    let array = {
      name: req.session.loginName,
      number: req.session.clientNumber,
    };
    console.log(req.params.itemID, "params<", array);
    let item = await Mogoallitems.findOneAndUpdate(
      { _id: req.params.itemID },
      { $pull: { userLikes: array } }
    ).catch((err) => console.log(err));

    next();
  } catch (e) {
    console.log("error while adit new item", e);
    res.status(404);
  }
};

module.exports.unLike = unLike;
