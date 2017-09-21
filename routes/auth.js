const auth = require("../controllers/authController");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");
const multer  = require('multer');
const router = require('express').Router();
const upload=multer({dest:"./public/avatars/"});
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/signup",ensureLoggedOut(), auth.signup);

router.post("/signup",upload.single("avatar"), auth.signup_post);

router.get('/login',ensureLoggedOut(), auth.login);

router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/logout',ensureLoggedIn(), auth.logout);

router.get("/edit/:id", ensureLoggedIn(),auth.edit_view);

router.post("/edit/:id", upload.single("avatar"), auth.edit_post);

router.get("/auth/facebook",ensureLoggedOut(), passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/dashboard",
  failureRedirect: "/"
}));



module.exports = router;
