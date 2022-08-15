const mongoose = require("mongoose");
const { string } = require("@hapi/joi");

const storeProductToAllBass = new mongoose.Schema({
  itemName: { type: String },
  itemDiscription: { type: String },
  itemPrice: { type: Number, min: 0 },
  itemTopic: { type: String },
  StoreName: { type: String },
  StoreNumber: { type: Number },
  ClientNumber: { type: Number },
  sum: { type: Number, default: 1 },
  sold: { type: Number, default: 0 },
  unsold: { type: Number, default: 0 },
  userLikes: [{ name: String, number: Number }],
  userUnlike: [{ name: String, number: Number, text: String }],
  file: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("storeItems", storeProductToAllBass);
 