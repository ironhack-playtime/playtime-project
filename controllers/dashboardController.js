const Match = require("../models/match");
const path = require('path');
const Comment = require("../models/comment");
const debug = require('debug')("app:auth:local");


module.exports = {

  dashboards: (req, res, next) => {
    Match.find().populate("players")
      .populate("comments")
      .then(result => res.render('dashboard/dashboard', {
        user: req.user,
        matches: result
      }));
  },

  new_dashboard: (req, res) => {
    res.render('dashboard/new', {
      user: req.user
    });
  },

  new_dashboard_post: (req, res) => {
    const date = req.body.date;
    const sport = req.body.sport;
    const playersNumber = req.body.maxnum;
    const creator=req.user.id
    const location = {
      type: "Point",
      coordinates: [req.body.lat, req.body.lon]
    };

    if (date === "" || sport === "" || playersNumber === 0) {
      res.render("dashboard/new", {
        message: "All fields required"
      });
      return;
    }

    debug("Match created");

    const newMatch = new Match({
        date,
        sport,
        playersNumber,
        creator,
        location
      })
      .save()
      .then(match => res.redirect('/dashboard'))
      .catch(e => res.render("dashboard/new", {
        message: "Something went wrong"
      }));
  },

  match_edit: (req, res) => {
    Match.findById(req.params.id, (err, match) => {
      if (err) {
        return next(err);
      }

      if (!match) {
        return next(new Error("404"));
      }

      return res.render('dashboard/edit', {
        user: req.user,
        match

      });
    });
  },

  match_update: (req, res, next) => {
    const updates = {
      date: req.body.date,
      sport: req.body.sport,
      playersNumber: req.body.maxnum,
      location: {
        type: "Point",
        coordinates: [req.body.lat, req.body.lon]
      }
    };

    Match.findByIdAndUpdate(req.params.id, updates, (err, match) => {
      if (err) {
        return res.render('dashboard/view', {
          match,
        });
      }
      if (!match) {
        return next(new Error('404'));
      }
      return res.redirect('/dashboard');
    });


  },

  match_delete: (req, res, next) => {
    Match.findById(req.params.id,(err,match)=>{
      if(match.creator!==req.user.id)
      res.redirect('/dashboard')
      else{
    Match.findByIdAndRemove(req.params.id, (err, match) => {

      res.redirect('/dashboard');
    });
  }
  })

  },

  match_add: (req, res, next) => {
    Match.findById(req.params.id, (err, match) => {
      if (match.players.indexOf(req.user._id) >= 0) {
        res.redirect("/dashboard");
      } else {
        Match.findByIdAndUpdate(req.params.id, {
          $push: {
            players: req.user._id
          }
        }, (err, match) => {
          if (err) {
            return res.render('dashboard/view', {
              user: req.user
            });
          }
          if (!match) {
            return next(new Error('404'));
          }
          return res.redirect('/dashboard');
        });
      }
    });
  },

  match_deleteme: (req, res, next) => {
    Match.findByIdAndUpdate(req.params.id, {
      $pull: {
        players: req.user._id
      }
    }, (err, match) => {
      if (err) {
        return res.redirect('/dashboard');
      }
      if (!match) {
        return next(new Error('404'));
      }
      return res.redirect('/dashboard');
    });
  },

  new_comment: (req, res, next) => {
    Match.findById(req.params.id, (err, match) => {
      res.render("comments/new-comment", {
        user: req.user,
        match
      });
    });
  },

  add_comment: (req, res, next) => {
    const _creatorId = req.user.id;
    const description = req.body.comment;

    if (description === "") {
      res.render("comments/new-comment", {
        user: req.user,
        message: "Write something"
      });
      return;
    }

    debug("Comment created");

    const newComment = new Comment({
        _creatorId,
        description
      })
      .save()
      .then(comment => {
        Match.findByIdAndUpdate(req.params.id, {
          $push: {
            "comments": comment._id
          }
        }).then(match => res.redirect('/dashboard'));
      })
      .catch(e => res.render("comments/new-comment", {
        user: req.user,
        message: "Something went wrong"
      }));
  },

  delete_comment: (req, res, next) => {
    Match.findByIdAndUpdate(req.params.id, { $pull: { comments: req.params.comment}  })
    .then(() => Comment.findByIdAndRemove(req.params.comment))
    .then(res.redirect('/dashboard'))
      .catch( e=>res.rendirect('/dashboard'));}


};
