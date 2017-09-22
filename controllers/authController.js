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
    const img = (req.file) ? `/avatars/${req.file.filename}` : "/avatars/avatar.jpg";

    if (username === "" || password === "") {
      res.render("auth/signup", {
        message: "Indicate username and password",
        user: res.locals.user
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
          pic_path: img
        })
        .save()
        .then(() => res.redirect('/'))
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
    res.render('auth/edit', {user:req.user});
  },

  edit_post:(req,res,next)=>{
    const img = (req.file) ? `/avatars/${req.file.filename}` : req.user.pic_path;

    let hashPass = '';
    let password = req.body.password;

    if (req.body.password !== ""){
      let salt = bcrypt.genSaltSync(bcryptSalt);
      hashPass = bcrypt.hashSync(password, salt);
    }
    else {
     hashPass = req.user.password;
    }

    const updates = {
       username : req.body.username,
       password : hashPass,
       phone : req.body.phone,
       mail : req.body.mail,
       pic_path : img
    };

    User.findByIdAndUpdate(req.user._id, updates)
     .then (result => res.redirect ('/dashboard') )
     .catch(() => res.redirect('auth/edit'));

   }
};
