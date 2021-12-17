'use strict'

var Admin = require('../models/admin');
var Venta = require('../models/venta');
var Dventa = require('../models/dventa');

var Contacto = require('../models/contacto');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_admin = async function(req,res){

    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({email:data.email});

        if (admin_arr.length ==0){

           /* var reg = await Cliente.create(data); */
            if(data.password){
                bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){

                    data.password =hash;
                    var reg = await Admin.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message: 'ErrorServer',data:undefined});

                }

                })
            }else{
                res.status(200).send({message: 'no hay una contraseña',data:undefined});

            }

            


        }else{
            res.status(200).send({message: 'el correo ya existe en la base de datos',data:undefined});
}
}

const login_admin = async function(req,res){

    var data = req.body;
    var admin_arr =[];

    admin_arr = await Admin.find({email:data.email});

    if(admin_arr.length == 0){

        res.status(200).send({message: 'No se encontro el correo',data: undefined});

    }else{
        let user = admin_arr[0];
        
        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createtoken(user)
                });
                
            }else{
                res.status(200).send({message: 'La contraseña no coincide',data:undefined});
            }
        });
       
    }

}

const obtener_mensajes_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){

            let reg = await Contacto.find().sort({createdAt: -1});
            res.status(200).send({data:reg});
                      
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const cerrar_mensaje_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){

            let id = req.params['id'];
            
            let reg = await Contacto.findByIdAndUpdate({_id:id},{estado: 'Cerrado'});
            res.status(200).send({data:reg});
                      
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

//VENTAS
const obtener_ventas_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){

            let ventas = [];
            let desde = req.params['desde'];
            let hasta = req.params['hasta'];

            if(desde == 'undefined' && hasta == 'undefined'){
                ventas = await Venta.find().populate('cliente').populate('direccion').sort({createdAt: -1});
                res.status(200).send({data:ventas});
            }else{
                let tt_desde = Date.parse(new Date(desde+'T00:00:00'))/1000;
                let tt_hasta = Date.parse(new Date(hasta+'T00:00:00'))/1000;

                let tem_ventas = await Venta.find().populate('cliente').populate('direccion').sort({createdAt: -1});
                
                for(var item of tem_ventas ){
                    var tt_created = Date.parse(new Date(item.createdAt))/1000;
                    if(tt_created >= tt_desde && tt_created <= tt_hasta){
                        ventas.push(item);
                    }
                }
                res.status(200).send({data:ventas});


            }

                      
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

module.exports ={
    registro_admin,
    login_admin,
    obtener_mensajes_admin,
    cerrar_mensaje_admin,
    obtener_ventas_admin
}