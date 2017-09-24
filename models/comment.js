const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  _creatorId: {type:Schema.Types.ObjectId, ref:"User"},
  _creatorName: String,
  description: String
},
  {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
