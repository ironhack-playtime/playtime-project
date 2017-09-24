const Match = require("../models/match");
const path = require('path');
const debug = require('debug')("app:auth:local");
const commentsController = require ("../controllers/commentsController");
const router = require('express').Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/dashboard/:id/new-comment',ensureLoggedIn(), commentsController.new_comment);

router.post('/dashboard/:id/new-comment', commentsController.add_comment);

router.get('/dashboard/delete/:id/:comment',ensureLoggedIn(), commentsController.delete_comment);

module.exports = router;
