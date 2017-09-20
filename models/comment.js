const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  _creatorId: [{type:Schema.Types.ObjectId, ref:"User"}],
  description: String
},
  {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Comment = mongoose.model("Comment", commentSchema);
console.log("hooli");
module.exports = Comment;
