const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");
const bodyParser = require('body-parser');

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
          mail,
          pic_path:`/avatars/${req.file.filename}`
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
  },

  edit_view: (req, res, next) => {
   
    res.render('auth/edit', {user:req.user})


  },

  edit_post:(req,res,next)=>{
    console.log(req.body);
    const updates = {
       username : req.body.username,
       password :req.body.password,
       phone : req.body.phone,
       mail : req.body.mail
    };
    console.log(updates);

    User.findByIdAndUpdate(req.user._id, updates, (err, match) => {
      if (err) {
        return res.render('auth/edit', {
          user:req.user
        });
      }
      if (!match) {
        return next(new Error('404'));
      }
      return res.redirect('/dashboard');
    });

  }
};
