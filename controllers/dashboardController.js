const Match = require("../models/match");
const path = require('path');
const debug = require('debug')("app:auth:local");

module.exports = {
  dashboard: (req, res, next) => {
    res.render('dashboard/dashboard', {
      user: req.user,
      // match: req.match
    });},

  new_dashboard: (req, res) => {
    res.render('dashboard/new', {
      user: req.user
    });},

  new_dashboard_post: (req, res) => {
    const date = req.body.date;
    const sport = req.body.sport;
    const playersNumber = req.body.maxnum;

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

  dashboards: (req, res) => {
    res.render('dashboard/view', {
      user: req.user
    });}
};
