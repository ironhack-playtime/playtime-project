const passport = require('passport');
const User = require('../models/user');
const FbStrategy = require('passport-facebook').Strategy;

passport.use(new FbStrategy({
  clientID: process.env.PATH_FBID,
  clientSecret: process.env.PATH_FBP,
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, picture, next) => {
  console.log("AQUI BRO", picture);
  User.findOne({ FBID: profile.id }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return next(null, user);
    }

    const newUser = new User({
      FBID: profile.id,
      username: profile.displayName,
    });
    
    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      next(null, newUser);
    });
  });

}));
