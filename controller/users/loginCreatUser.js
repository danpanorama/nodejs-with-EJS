const hapijoiCreate = require("../../auth/joiCreat");
const authbcrypt = require("../../auth/bcrypt");
const users = require("../../models/sql/sqlpools");
const jwt = require("../../auth/jwt");
const localStorage = require("localStorage");
const jwtPass = require("../../auth/chackPass180")

// this is create use rfunction

const createNewAccount = async (req, res, next) => {
  try {
    const date = new Date();
    localStorage.setItem("isRemember", req.body.remember);
    let checkemail = await users.cheakUsername(req.body.client_fullName);
    if (checkemail[0].length > 0) {
      req.session.err = "user username is alredy in used";
      res.redirect("/CreateUser");
    }
    let checkemailname = await users.cheakUserEmail(req.body.client_email);
    if (checkemailname[0].length > 0) {
      req.session.err = "user email is alredy in used";
      res.redirect("/CreateUser");
    }
    let data = await hapijoiCreate.createAccount(req.body);
    let hash = await authbcrypt.hashPassport(data.password);
    let token = await jwt.makeToken({ hash: hash });

    let passChange = await jwtPass.makeToken({ hash: hash })
    
    let insertToBigBase = await users.insertall(
      hash,
      data.client_fullName,
      data.client_email,
      data.client_phon,
      data.client_view,
      passChange,
      date
    );

    if (insertToBigBase) {
      let theuser = await users.cheakUsername(data.client_fullName);
      req.session.tokenPass = passChange;
      req.session.clientNumber = theuser[0][0].client_number;
      req.session.loginName = data.client_fullName;
      req.session.userAllData = data;
      req.session.jwtToken = token;
      (req.session.view = data.client_view),
        console.log("req.session.clientNumber");
    }
    res.status(202);
    res.redirect("/store");
  } catch (e) {
    req.session.err = e.message;
    console.log("error while creating the user", e);
    res.status(500);
    res.redirect("/CreateUser");
  }
};

module.exports.createNewAccount = createNewAccount;
