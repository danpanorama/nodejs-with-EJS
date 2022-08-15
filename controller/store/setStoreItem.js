const SetItem = require("../../models/db/mongoSal");
const SetAllItem = require("../../models/db/DBallStoreData");

const joiifValid = require("../../auth/hapi");
const path = require("path");
const fs = require("fs");
const { cache } = require("ejs");

// פה אני מכניס את המידע שקיבלתי לתוך התא של העסק העצמי ולתוך התא של כל המוצרים

const setItemMiddleware = async (req, res, next) => {
  var set;
  try {
    let data = await joiifValid.createProductSchema(req.body);

    if (req.file) {
      set = {
        itemName: data.itemName,
        itemDiscription: data.itemDiscript,
        itemPrice: data.itemPrice,
        itemTopic: data.itemTopic,
        idcart: req.session.idcart,
        StoreName: req.session.loginName,
        StoreNumber: req.session.clientNumber,
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
      };
    } else {
      set = {
        itemName: data.itemName,
        itemDiscription: data.itemDiscript,
        itemPrice: data.itemPrice,
        itemTopic: data.itemTopic,
        idcart: req.session.idcart,
        StoreName: req.session.loginName,
        StoreNumber: req.session.clientNumber,
      };
    }

    if (data) {
      const setAlllItem = await new SetAllItem(set);
      setAlllItem
        .save()
        .then(async (result) => {
          
          const setItem = await new SetItem(set);
          setItem
            .save()
            .then((result) => {
             
              req.session.err =""
              res.redirect("/store").status(201);
            })
            .catch((err) => res.status(404));
        })
        .catch((err) => res.status(500));
    } else {
      req.session.err = "somthing go wrong";
      res.status(500);
      res.redirect("/profile");
    }
  } catch (e) {
    console.log("error while edit item setStoreItems", e);
    req.session.err = e.message;
    res.status(500);
    res.redirect("/profile");
  }
};

module.exports.setItemMiddleware = setItemMiddleware;
