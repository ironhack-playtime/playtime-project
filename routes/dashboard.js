const User = require("../models/user");
const path = require('path');
const debug = require('debug')("app:auth:local");

const router = require('express').Router();

router.get('/dashboard', (req, res) => {
  res.render('Dashboard/dashboard');
});

router.get('/dashboard/new', (req, res) => {
  res.render('Dashboard/new');
});

router.get('/dashboard/view', (req, res) => {
  res.render('Dashboard/view');
});

module.exports = router;
