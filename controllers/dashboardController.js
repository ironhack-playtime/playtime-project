const Match = require("../models/match");
const path = require('path');
const debug = require('debug')("app:auth:local");


module.exports = {
  dashboards: (req, res, next) => {
    Match.find()
      .then( result =>   res.render('dashboard/dashboard', {
          user: req.user,
          matches: result
        }));
  },

  new_dashboard: (req, res) => {
    res.render('dashboard/new', {
      user: req.user
    });},

  new_dashboard_post: (req, res) => {
    const date = req.body.date;
    const sport = req.body.sport;
    const playersNumber = req.body.maxnum;
    console.log (req.body)

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
        playersNumber
      })
      .save()
      .then(match => res.redirect('/dashboard'))
      .catch(e => res.render("dashboard/new", {
        message: "Something went wrong"
      }));
    },

  match_edit: (req, res) => {
    Match.findById(req.params.id, (err, match) => {
      if (err)       { return next(err) ;}
      if (!match) { return next(new Error("404")) ;}
      return res.render('dashboard/edit', { user: req.user, match});
    });
    },

  match_update: (req, res, next) => {
    const myId = req.params.id;

    const updates = {
      date: req.body.date,
      sport: req.body.sport,
      maxnum: req.body.maxnum,
    };
    console.log(updates, myId);
    Match.findByIdAndUpdate(req.params, updates, (err, match) => {
      if (err) {
        return res.render('dashboard/view', {
          match,
        });
      }
      if (!match) {
        return next(new Error('404'));
      }
      return res.redirect('/dashboard/view/:id');
    });
  }
};
