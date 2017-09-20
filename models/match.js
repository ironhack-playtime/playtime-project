const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const matchSchema = new Schema({
  date: Date,
  sport: String,
  creator: String,
  players: [{type: Schema.Types.ObjectId, ref: "User"}],
  location: { type: { type: String, coordinates: [Number] }},
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
  playersNumber: Number
},
  {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

matchSchema.index({ location: '2dsphere' });

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
