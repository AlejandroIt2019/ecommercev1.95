const carrito = require('../models/carrito');
var Carrito = require('../models/carrito');

const agregar_carrito_cliente = async function(req,res){
    if(req.user){
        let data = req.body;
        //agregar a colección
        //no productos iguales en el carro
        let carrito_cliente = await Carrito.find({cliente: data.cliente, producto:data.producto});
        
        if(carrito_cliente.length ==0){
        
        let reg = await Carrito.create(data);
        res.status(200).send({data:reg});
        }else if(carrito_cliente.length >=1){
            res.status(200).send({data:undefined});
        }        
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}
//reutilizar
const obtener_carrito_cliente = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        //agregar a colección
        //no productos iguales en el carro
        let carrito_cliente = await Carrito.find({cliente: id}).populate('producto');
        //enviando la data al frontend, acá había error de compi
        res.status(200).send({data:carrito_cliente});
        
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const eliminar_carrito_cliente = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        //agregar a colección
        //no productos iguales en el carro
        let reg = await Carrito.findByIdAndRemove({_id:id});
        res.status(200).send({data:reg});
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const limpiar_carrito_cliente = async function(req,res){
    if(req.user){
        console.log(req.user.sub);
        let id = req.user.sub;
        //agregar a colección
        //no productos iguales en el carro
        let reg
        try{
            reg = await Carrito.deleteMany({cliente:id})
        }catch(e){
            res.status(500).send(e)
        }
        res.status(200).send({data:reg});
        res.send(req.user.sub);
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

module.exports = {
    agregar_carrito_cliente,
    obtener_carrito_cliente,
    eliminar_carrito_cliente,
    limpiar_carrito_cliente
}

