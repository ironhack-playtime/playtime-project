require('dotenv').config();
const passport = require('passport');
const User = require('../models/user');
const FbStrategy = require('passport-facebook').Strategy;

passport.use(new FbStrategy({
  clientID: process.env.PATH_FBID,
  clientSecret:process.env.PATH_FBP,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'gender',  'picture.type(large)']
  
}, (accessToken, refreshToken, profile, next) => {
  console.log(profile.photos);
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
      pic_path: profile.photos ? profile.photos[0].value : '/avatars/avatar.jpg'
      
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      next(null, newUser);
    });
  });

}));
