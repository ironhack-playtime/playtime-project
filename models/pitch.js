const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const fildSchema = new Schema({
  name: String,
  date:Date,
  sport:String,
  location: { type: { type: String }, coordinates: [Number] }
},
  {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const fild = mongoose.model("fild", fildSchema);

module.exports = fild;