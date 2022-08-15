const joiLogin = require("../../auth/joiLoggin");
const users = require("../../models/sql/sqlpools");

const FindeUser = async (req, res, next) => {
    try{
        console.log("start")
        let userName = await users.cheakUserEmailAndName(req.body.name,req.body.email);
        if(userName[0].length>0){
            req.session.userAllData= userName[0][0];
            req.session.loginName=userName[0][0].client_fullName
            req.session.view=userName[0][0].client_view
            req.session.clientNumber=userName[0][0].client_number
                   next()       
}

        console.log("second")
        let store = await users.cheakStoreEmailAndName(req.body.email,req.body.name);
        if(store[0].length>0){
       console.log(store[0])
       req.session.idcart = store[0][0].store_idcart;
       req.session.userStoreData= store[0][0];
       req.session.loginName = store[0][0].store_name;
       req.session.view =store[0][0].store_view;
       req.session.clientNumber =store[0][0].store_number
       next()
        }
      console.log("33333")
      req.session.err = "user is not defaind";
      res.redirect("/forgotPass");
    }catch(e){
console.log("err whaile finding user",e)
res.status(505)
    }
  
};

module.exports.FindeUser = FindeUser;
