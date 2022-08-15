const hapijoi = require("../../auth/joiLoggin");
const authbcrypt = require("../../auth/bcrypt");
const users = require("../../models/sql/sqlpools");
const jwt = require("../../auth/jwt");
const chakemiddleware = require("../../middleware/changePassTime")

const localStorage = require("localStorage");

// this is logg in function
const logedin = async (req, res, next) => {
  localStorage.setItem("isRemember", req.body.remember);

  if (req.body.userNameLogin && req.body.passwordLogin) {
    try {
      let data = await hapijoi.loginvalidation(req.body);
      let finduser = await users.cheakUsername(data.userNameLogin);
      if (finduser[0].length > 0) {
        let checkpassword = await authbcrypt.checkPassword(
          req.body.passwordLogin,
          finduser[0][0].client_id
        );

        let chekTokens = await jwt.makeToken({
          hash: finduser[0][0].client_id,
        }); 
        

        if (checkpassword && chekTokens) {
          req.session.tokenPass = finduser[0][0].token;


          req.session.loginName = finduser[0][0].client_fullName;
          req.session.clientNumber = finduser[0][0].client_number;
          req.session.jwtToken = chekTokens;
          req.session.userAllData = finduser[0][0];
          req.session.view = finduser[0][0].client_view;
          req.session.msg = "your loggd in";
          req.session.err = "";
          res.redirect("/profile");
          return;
        } else {
          req.session.err = "password or user name is incorrect";
          res.status(501);
          res.redirect("/login");
        }
      } else {
        console.log("ges start check other databass");
        let findeStoremail = await users.cheakStoreName(data.userNameLogin);
        if (findeStoremail[0].length > 0) {
          let checkpasswordstore = await authbcrypt.checkPassword(
            req.body.passwordLogin,
            findeStoremail[0][0].store_hash
          );
          req.session.allstoredata = findeStoremail[0][0];
          let chekTokensStore = await jwt.makeToken({
            hash: findeStoremail[0][0].store_hash,
          });

          if (checkpasswordstore && chekTokensStore) {
            console.log(findeStoremail[0][0]);
            req.session.userStoreData = findeStoremail[0][0];
            req.session.loginName = findeStoremail[0][0].store_name;
            req.session.view = findeStoremail[0][0].store_view;
            req.session.clientNumber = findeStoremail[0][0].store_number;
            req.session.idcart = findeStoremail[0][0].store_idcart;
            req.session.jwtToken = chekTokensStore;
            req.session.err = "";
            res.status(202);


            req.session.tokenPass = findeStoremail[0][0].token;
        
        
            res.redirect("/profile");
          } else {
            req.session.err = "password of store is incorrect";
            res.status(501);
            res.redirect("/login");
          }
        } else {
          req.session.err = "username is not defaind";
          res.redirect("/login");
        }
      }
    } catch (e) {
      console.log("i am the master ", e.message);
      req.session.err = e.message;
      res.status(500);
      // req.session.err = e.details.map((item) => item.message);
      res.redirect("/login");
    }
  } else {
    req.session.err = "the value in this texts box is requier!";
    res.redirect("/login");
  }
};

const logute = async (req, res, next) => {
  try {
    if (req.session.loginName) {
      let promis = new Promise((ok, notok) => {
        req.session.loginName = undefined;
        req.session.clientNumber = undefined;
        req.session.store_idcart = undefined;
        req.session.idcart = undefined;
        req.session.itemData = undefined;
        req.session.jwtToken = undefined;
        req.session.userAllData = undefined;
        req.session.userStoreData = undefined;
        req.session.msg = "your logged out";
        req.session.err = "";
        ok("secsses");
        notok(new Error("fail"));
      });
      promis.then((val) => {
        console.log("loggd uot " + val);
      });

      res.redirect("/");
    } else {
      req.session.err = "your need to loggd in first";
      res.redirect("/login");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.logedin = logedin;
module.exports.logute = logute;
