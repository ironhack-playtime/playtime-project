const User = require("../models/user");
const path = require('path');
const debug = require('debug')("app:auth:local");

const router = require('express').Router();

router.get('/dashboard', (req, res) => {
  res.render('Dashboard/dashboard',{user:req.user});
});

router.get('/dashboard/new', (req, res) => {
  res.render('Dashboard/new',{user:req.user});
});

router.get('/dashboard/view', (req, res) => {
  res.render('Dashboard/view',{user:req.user});
});

module.exports = router;
