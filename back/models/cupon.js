'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuponSchema = Schema({

    codigo: {type: String, required:true},
    tipo: {type: String, required:true}, //porcentaje o precio fijo
    valor: {type: Number, required:true},
    limite: {type: Number, required:true},
    habilitado:{type:Boolean,default:true},
    createdAt:{ type:Date, default:Date.now, require:true}

});


module.exports = mongoose.model('cupon',CuponSchema);