'use strict'

var express = require('express');
var AdminController = require('../controllers/AdminController');

var api = express.Router();

api.post('/registro_admin',AdminController.registro_admin);
api.post('/login_admin',AdminController.login_admin);

module.exports = api;