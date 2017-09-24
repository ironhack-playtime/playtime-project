const Match = require("../models/match");
const path = require('path');
const Comment = require("../models/comment");
const debug = require('debug')("app:auth:local");


module.exports = {
  new_comment: (req, res, next) => {
    Match.findById(req.params.id, (err, match) => {
      res.render("comments/new-comment", {
        user: req.user,
        match
      });
    });
  },

 
  
 add_comment: (req, res, next) => {
  
  
     new Comment({
        _creatorId:req.user.id,
        description:req.body.comment
      })
      .save()
      .then(comment => {
        Match.findByIdAndUpdate(req.params.id, {
          $push: {"comments": comment._id}
        })
        .then(match => res.redirect('/dashboard')); })
      .catch(e =>   
         res.render("comments/new-comment", {
        user: req.user,
        message: "Something went wrong"
      }));
  },


  delete_comment: (req, res, next) => {
    Comment.findById(req.params.comment, (err, comentario) => {
      if (comentario._creatorId.toString() !== req.user._id.toString()) {
        res.redirect("/dashboard");
      } else {
        Match.findByIdAndUpdate(req.params.id, {
            $pull: {
              comments: req.params.comment
            }
          })
          .then(() => Comment.findByIdAndRemove(req.params.comment))
          .then(res.redirect('/dashboard'))
          .catch(e => res.redirect('/dashboard'));
      }
    });
  }
};
