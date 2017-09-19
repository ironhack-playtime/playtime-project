const User = require("../models/user");
const auth = require("../controllers/authController");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");

const router = require('express').Router();

router.get("/signup", auth.signup);

router.post("/signup", auth.signup_post);

router.get('/login', auth.login);

router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/logout', auth.logout);


router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/dashboard",
  failureRedirect: "/"
}));


module.exports = router;
