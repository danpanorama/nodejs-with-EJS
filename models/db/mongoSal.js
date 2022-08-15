const mongoose = require("mongoose");

const mystoreSchema = new mongoose.Schema({
  ID: mongoose.Types.ObjectId,

  itemName: { type: String },
  itemDiscription: { type: String },
  itemPrice: { type: Number, min: 0 },
  itemTopic: { type: String },
  idcart: { type: String },
  StoreName: { type: String },
  clientName: { type: String },
  ClientNumber: { type: Number },
  StoreNumber: { type: Number },
  sum: { type: Number, default: 1 },
  sold: { type: Number, default: 0 },
  unsold: { type: Number, default: 0 },
  userLikes: [{ name: String, number: Number }],
  userUnlike: [{ name: String, number: Number }],
  file: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("salkniyots", mystoreSchema);

// פה אני מכניס את המוצר לטבלה שיש בה מוצרים ותעודות זהות של המשתמש שקנה אותם
