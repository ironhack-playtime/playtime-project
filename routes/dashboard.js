const Match = require("../models/match");
const path = require('path');
const debug = require('debug')("app:auth:local");
const dashboardController = require ("../controllers/dashboardController");
const router = require('express').Router();

router.get('/dashboard', dashboardController.dashboards);

router.get('/dashboard/new', dashboardController.new_dashboard);

router.post('/dashboard/new', dashboardController.new_dashboard_post);

router.get('/dashboard/view', dashboardController.dashboard);


module.exports = router;
