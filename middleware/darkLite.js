const sqls = require("../models/sql/sqlpools")






module.exports = async (req, res, next) => {
  try {
    if (req.session.view && req.session.view == "D") {
      req.session.view = "L";


                    if(req.session.clientNumber && req.session.idcart ){
                        console.log("its a store")
                        sqls.updateStoreView(req.session.view ,req.session.clientNumber)
                        
                     }

              if(req.session.clientNumber && ! req.session.idcart ){
                     console.log("its a user")
                     sqls.updateUserViwe(req.session.view ,req.session.clientNumber )
                }

     
      next();
    } else {
      req.session.view = "D";

            if(req.session.clientNumber && req.session.idcart ){
                        console.log("its a store")
                        sqls.updateStoreView(req.session.view ,req.session.clientNumber)
                     }

              if(req.session.clientNumber && ! req.session.idcart ){
                     console.log("its a user")
                     sqls.updateUserViwe(req.session.view,req.session.clientNumber )
                } 
      
      next();
    }
  } catch (e) {
    console.log(e);
  }
};
