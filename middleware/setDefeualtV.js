module.exports =  (req, res, next) => {
   if(req.session.view){
       next()
   }else{
       req.session.view = "D";
       next()
   }
    
 
  };
  