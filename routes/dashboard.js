const Match = require("../models/match");
const path = require('path');
const debug = require('debug')("app:auth:local");
const dashboardController = require ("../controllers/dashboardController");
const router = require('express').Router();

router.get('/dashboard', dashboardController.dashboards);

router.get('/dashboard/new', dashboardController.new_dashboard);

router.post('/dashboard/new', dashboardController.new_dashboard_post);

router.get('/dashboard/view/:id', dashboardController.match_edit);

router.post('/dashboard/view/:id', dashboardController.match_update);

router.get('/dashboard/view/delete/:id',dashboardController.match_delete);

router.get('/dashboard/view/:id/new-player',dashboardController.match_add);

router.get('/dashboard/:id/deletemyself',dashboardController.match_deleteme);

module.exports = router;
