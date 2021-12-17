'use strict'

//cambie las A para a minisculas
var express = require('express');
var adminController = require('../controllers/adminController');
var auth = require('../middlewares/authenticate');
const admin = require('../models/admin');
var api = express.Router();

api.post('/registro_admin',adminController.registro_admin);
api.post('/login_admin',adminController.login_admin);

api.get('/obtener_mensajes_admin',auth.auth,adminController.obtener_mensajes_admin);
api.put('/cerrar_mensaje_admin/:id',auth.auth,adminController.cerrar_mensaje_admin);

api.get('/obtener_ventas_admin/:desde?/:hasta?',auth.auth,adminController.obtener_ventas_admin);

module.exports = api;