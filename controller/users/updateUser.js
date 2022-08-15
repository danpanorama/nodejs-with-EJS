const hapijoi = require("../../auth/CosAohtak");
const authbcrypt = require("../../auth/bcrypt");
const users = require("../../models/sql/sqlpools");
const mongoos = require("../../models/db/mongoSal");
const storeSal = require("../../models/db/StoreSal");
const allDb = require("./../../models/db/DBallStoreData")

const jwtPass = require("../../auth/chackPass180");

const jwt = require("../../auth/jwt");
const localStorage = require("localStorage");

const update = async (req, res, next) => {
  try {

    let data = await hapijoi.cosAohtak(req.body);
    let usersarray = await users.selectUser();

    let filterUsers = await usersarray.filter((user) => {
      return user.client_number != req.body.userID;
    });
    let validName = await filterUsers.filter((user) => {
      user.client_fullName = req.body.client_fullName;
    });
    
    if (validName.length > 0) {
      res.err = "user name alredy exist";
      res.status(201);
      next();
    }
    let makenewhash = await authbcrypt.hashPassport(data.password);
    data.password = makenewhash;

    let newToken = await jwtPass.makeToken({hash:data.password});
    console.log("bbbbbbbbbb",newToken)
    req.session.tokenPass = newToken;

    let updatcomp = await users.updateUser(
      data.password,
      newToken,
      data.client_fullName,
      data.client_email,
      data.client_phon,
      data.client_view,
      data.userID
    );



    let dbupdate = await mongoos
      .updateMany(
        { clientName: req.session.loginName },
        { $set: { clientName: data.client_fullName } },
        function (err, user) {
          if (err) throw err;
        console.log("don")
        }
      )
      .catch((err) => console.log(err));


      let dbupdate2 = await storeSal 
      .updateMany(
        {  StoreNumber: req.session.clientNumber  },
        { $set:{ StoreName: data.client_fullName } },
        function (err, user) {
          if (err) throw err;
         console.log("don gegabana",user) 
        }
      )
      .catch((err) => console.log(err));


 
console.log("llllllll",req.session.clientNumber)
      let dbupdate4 = await allDb 
      .updateMany(
        {'userUnlike.number':req.session.clientNumber},
        { $set:{ 'userUnlike.$.name': data.client_fullName } },
        function (err, user) {
          if (err) throw err;
         console.log("nnnaaaannaaaabannaannaaa",user) 
        }
      )
      .catch((err) => console.log(err));






      req.session.view = data.client_view;
      req.session.loginName = data.client_fullName;
      req.session.userAllData = data;
      res.status(201);
      next();

  } catch (e) {
    console.log("error while updating user");
    req.session.err = e.message;
    res.status(500);
    console.log(e);
    res.redirect("/updateUserInfo");
  }
};

module.exports.update = update;
