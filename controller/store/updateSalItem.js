const Mogoallitems = require("../../models/db/mongoSal");
const fs = require("fs");
const path = require("path");

const updatingItem = async (req, res, next) => {
  let where = { ID: req.body.itemID };

  let set;

  if (req.file) {
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
    let itemsInData = await Mogoallitems.findOneAndUpdate(where, set, function (
      err,
      user
    ) {
      if (err) throw err;

      console.log(" result of update", user);
      res.status(202);
      next();
    }).catch((err) => console.log(err));
  } catch (e) {
    console.log("error by updating item", e);
    res.status(500);
  }
};
module.exports.updatingItem = updatingItem;
