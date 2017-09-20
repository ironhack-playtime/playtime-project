const auth = require("../controllers/authController");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");
var multer  = require('multer');
const router = require('express').Router();
const upload=multer({dest:"./public/avatars/"})

router.get("/signup", auth.signup);

router.post("/signup",upload.single("avatar"), auth.signup_post);

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
