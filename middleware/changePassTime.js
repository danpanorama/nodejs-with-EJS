const e = require("express");
const jwt = require("../auth/chackPass180")

const  topken = async (req, res, next) =>{
try{
     console.log(req.session.tokenPass,"|||||||")
     let x = await jwt.chekingToken(req.session.tokenPass);
     next()
     
}catch(e){
    console.log("need to change password",e);
     
    res.redirect("/updateUserInfo") 
}
  
   
    

};

module.exports.topken = topken