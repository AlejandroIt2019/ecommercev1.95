'user strict'

var express = require('express');
var app = express();
var bodeparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;
//socket.io back y client
var server = require('http').createServer(app);
var io = require('socket.io')(server,{
    cors: {origin : '*'}
});
//configuracion de carro backend
io.on('connection',function(socket){
    socket.on('delete-carrito',function(data){
        io.emit('new-carrito',data);
        console.log(data);
    });

    socket.on('add-carrito-add',function(data){
        io.emit('new-carrito-add',data);
        console.log(data);
    });

});


var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');
var producto_route = require('./routes/producto');
const bodyParser = require('body-parser');

//cupon
var cupon_route = require('./routes/cupon');
//config
var config_route = require('./routes/config');

//carrito
var carrito_route = require('./routes/carrito');
//venta
var venta_route = require('./routes/venta');
var descuento_route = require('./routes/descuento');

mongoose.connect('mongodb://127.0.0.1:27017/tienda',(err, res)=>{

    if(err){

        console.log(err);
    }else{
        //app
        server.listen(port,function(){
            console.log('Servidor corriendo en el puerto' + port);

        });
    }

});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: '50mb',extended:true}));


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',cliente_route);
app.use('/api',admin_route);
app.use('/api',producto_route);
app.use('/api',cupon_route);
app.use('/api',config_route);
app.use('/api',carrito_route);
app.use('/api',venta_route);
app.use('/api',descuento_route);

module.exports = app;

