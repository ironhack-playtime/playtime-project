const passport = require('passport');
const User = require('../models/User');
const FbStrategy = require('passport-facebook').Strategy;

passport.use(new FbStrategy({
  clientID: "114489382627653",
  clientSecret: "805ad14643ebf2dc625e0b4a81429894",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, next) => {
  console.log(profile);
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return next(null, user);
    }

    const newUser = new User({
      facebookID: profile.id,
      username: profile.displayName
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      next(null, newUser);
    });
  });

}));
