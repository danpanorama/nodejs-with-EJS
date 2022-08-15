const mongoose = require("mongoose");



const mystoreSchema = new mongoose.Schema({
  ID: mongoose.Types.ObjectId, 
  StoreName: { type: String },
  StoreNumber: { type: Number },
  sum:{type:Number,default:1},
  date:{type:Date},

});

module.exports = mongoose.model("storeSal", mystoreSchema);

// פה אני מכניס את המוצר לטבלה שיש בה מוצרים ותעודות זהות של המשתמש שקנה אותם
 