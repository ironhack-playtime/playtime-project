const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");

const router = require('express').Router();

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const phone = req.body.phone;
  const mail = req.body.mail;

  if (username === "" || password === "" || phone === "" || mail === "") {
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
});

router.get('/login', (req, res) => {
  res.render('auth/login', {
    message: req.flash("error")
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect("/");
});


router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/dashboard",
  failureRedirect: "/"
}));


module.exports = router;
