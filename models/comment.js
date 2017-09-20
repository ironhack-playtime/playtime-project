const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  _creatorId: [{type:Schema.Types.ObjectId, ref:"User"}],
  _eventId: [{type:Schema.Types.ObjectId, ref:"Match"}],
  description: String,
},
  {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
