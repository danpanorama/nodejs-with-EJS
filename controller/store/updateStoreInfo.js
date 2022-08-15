const hapijoi = require("../../auth/CosAmaSheZe");
const authbcrypt = require("../../auth/bcrypt");
const users = require("../../models/sql/sqlpools");
const mongoos = require("../../models/db/DBallStoreData");
const storesal = require("../../models/db/StoreSal");


const jwt = require("../../auth/jwt");
const jwtPass = require("../../auth/chackPass180");

const localStorage = require("localStorage");

const update = async (req, res, next) => {
  try {
    let data = await hapijoi.CosAmaShelZa( req.body);
    let usersarray = await users.selectStore();

    let filterUsers = await usersarray.filter((user) => {
      return user.store_number != req.body.store_number;
    });
    let validName = await filterUsers.filter((user) => {
      user.store_name = req.body.store_name;
    });
    if (validName.length > 0) {
      res.err = "user name alredy exist";
      console.log("user name alredy exist");
      res.status(201);
      next(); 
    }
    // let chackName = await users.cheakStoreName(req.body.store_name);
    // if (chackName[0].length > 0) {
    //   req.session.err = "store name is alredy in used";
    //   res.status(500);
    //   next();
    // }
    let makenewhash = await authbcrypt.hashPassport(data.password);

    data.password = makenewhash;
    let x = await jwtPass.makeToken({hash:data.password })
    req.session.tokenPass = x

    let updatcomp = await users.updateStore(
      data.store_idcart,
      x,
      data.store_name,
      data.store_email,
      data.password,
      data.store_view,
      data.store_number
    );

    let dbupdate = await mongoos
      .updateMany(
        { StoreName: req.session.loginName },
        {
          $set: {
            StoreName: data.store_name,
            StoreNumber: data.store_number,
          },
        },
        function (err, user) {
          if (err) throw err;

          req.session.loginName = data.store_name;
          req.session.view = data.store_view;
          req.session.userStoreData = data;
          
        }
      )
      .catch((err) => console.log(err));


      let dbupdate2 = await mongosal
      .updateMany(
        { StoreName: req.session.loginName },
        {
          $set: {
            StoreName: data.store_name,
            StoreNumber: data.store_number,
          },
        },
        function (err, user) {
          if (err) throw err;
          console.log("mongosal")
         }
       )
      .catch((err) => console.log(err));



console.log("store number",req.body.store_number)
      let dbupdate3 = await storesal
      .updateMany(
        { StoreNumber: req.body.store_number },
        {
          $set: {
            StoreName: data.store_name,
            
          },
        },
        function (err, user) {
          if (err) throw err;

        console.log("don storesal",user)
          
        }
      )
      .catch((err) => console.log(err));





next();

  } catch (e) {
    console.log("error while updating Store");
    req.session.err= e.message;
    res.redirect("/updateUserInfo");
     res.status(500);
    console.log(e);
  }
};

module.exports.update = update;
