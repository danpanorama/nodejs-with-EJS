const Mogoallitems = require("../../models/db/DBallStoreData");

const baddcomm = async (req, res, next) => {
  try {
    let array = {
      name: req.session.loginName,
      number: req.session.clientNumber,
      text: req.body.commend,
    };

    let item = await Mogoallitems.findOneAndUpdate(
      { _id: req.params.itemID },
      { $push: { userUnlike: array } }
    ).catch((err) => console.log(err));

    next();
  } catch (e) {
    console.log("error while adit new item", e);
    res.status(404);
  }
};

module.exports.baddcomm = baddcomm;
