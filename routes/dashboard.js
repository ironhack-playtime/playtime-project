const Match = require("../models/match");
const path = require('path');
const debug = require('debug')("app:auth:local");
const dashboardController = require ("../controllers/dashboardController");
const router = require('express').Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/dashboard',ensureLoggedIn(), dashboardController.dashboards);

router.get('/dashboard/new',ensureLoggedIn(), dashboardController.new_dashboard);

router.post('/dashboard/new', dashboardController.new_dashboard_post);

router.get('/dashboard/view/:id',ensureLoggedIn(), dashboardController.match_edit);

router.post('/dashboard/view/:id', dashboardController.match_update);

router.get('/dashboard/view/delete/:id',ensureLoggedIn(), dashboardController.match_delete);

router.get('/dashboard/view/:id/new-player',ensureLoggedIn(),dashboardController.match_add);

router.get('/dashboard/:id/deletemyself',ensureLoggedIn(),dashboardController.match_deleteme);

router.get('/dashboard/:id/new-comment',ensureLoggedIn(), dashboardController.new_comment);

router.post('/dashboard/:id/new-comment', dashboardController.add_comment);

router.get('/dashboard/:id/:comment',ensureLoggedIn(), dashboardController.delete_comment);

module.exports = router;
