const Mogoallitems = require("../../models/db/DBallStoreData");
const fs = require("fs");
const path = require("path");

const updatingItem = async (req, res, next) => {
  let where = { _id: req.body.itemID };
  let set;

  if (req.file) {
    console.log("file.file name is exist");
    set = {
      $set: {
        itemPrice: req.body.itemPrice,
        itemName: req.body.itemName,
        itemDiscription: req.body.itemDiscription,
        itemTopic: req.body.itemTopic,
        file: {
          data: fs.readFileSync(
            path.join(
              __dirname +
                "../" +
                "../" +
                "../" +
                "public" +
                "/uploads/" +
                req.file.filename
            )
          ),
          contentType: "image/png",
        },
      },
    };
  } else {
    set = {
      $set: {
        itemPrice: req.body.itemPrice,
        itemName: req.body.itemName,
        itemDiscription: req.body.itemDiscription,
        itemTopic: req.body.itemTopic,
      },
    };
  }
  try {
    // let itemsInData =
    await Mogoallitems.findOneAndUpdate(where, set, function (err, user) {
      if (err) throw err;

      console.log(" update seccses");
      next();
    }).catch((err) => console.log(err));
  } catch (e) {
    console.log("error by updating item", e);
    res.status(500);
  }
};
module.exports.updatingItem = updatingItem;
