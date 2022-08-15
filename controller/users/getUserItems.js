const storeSal = require("../../models/db/StoreSal");
const alldata = require("../../models/db/DBallStoreData");

const findUserItems = async (req, res, next) => {
try {
    let myitemarr=[]; 
    let summArray=[];

    let data2 = await storeSal.find(
      {
        $and: [
          { StoreNumber: req.session.clientNumber },
          { StoreName: req.session.loginName },
        ],
      },
      async function (err, item) {
        if (err) throw err;
        req.date = item;
      
        for(let i = 0 ; i < item.length ; i++){
            let itemsofuser = await alldata.find(
            { _id: item[i].ID },
        async function (err, user) { 
            if (err) throw err;
            try{
            
                  console.log(i)
              myitemarr.push(user);
                  summArray.push(item[i].sum);
            }catch(e){
                console.log(e)
              }   
        }
            ).catch((err) => console.log(err));
          }
        
        console.log(myitemarr,":::::::://///",summArray)
        req.storeSalK=myitemarr;
        req.sumarray = summArray;
        next();
      }
    );
  
  

} catch (e) {
  console.log(e, "cnnote get data from storesal");
}
};

module.exports.findUserItems = findUserItems;
