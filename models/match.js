const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const matchSchema = new Schema({
  players: Array,
  date: Date,
  sport: String,
  creator: String,
  location: { type: { type: String }, coordinates: [Number] },
  playersNumber: Number
},
  {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

matchSchema.index({ location: '2dsphere' });
const match = mongoose.model("match", matchSchema);

module.exports = match;
