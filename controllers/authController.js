const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");

module.exports = {
  signup: (req, res, next) => {
    res.render("auth/signup", {
      user: req.user
    });
  },
  signup_post: (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const phone = req.body.phone;
    const mail = req.body.mail;

    if (username === "" || password === "" || phone === "" ||  mail === "") {
      res.render("auth/signup", {
        message: "All fields requiered"
      });
      return;
    }

    User.findOne({
      username
    }, "username", (err, user) => {
      if (user !== null) {
        res.render("auth/signup", {
          message: "The username already exists"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      debug("User created");

      const newUser = new User({
          username,
          password: hashPass,
          phone,
          mail
        })
        .save()
        .then(user => res.redirect('/'))
        .catch(e => res.render("auth/signup", {
          message: "Something went wrong"
        }));

    });
  },
  login: (req, res, next) => {
    res.render('auth/login', {
      user: req.user,
      message: req.flash("error")
    });
  },
  logout: (req, res, next) => {
    req.logout();
    res.redirect("/");
  }
};
