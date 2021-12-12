import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $;
import { io } from "socket.io-client";
import { GuestService } from 'src/app/services/guest.service';
declare var iziToast;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public token:any;
  public id:any;
  public user: any = undefined;
  public user_lc : any = undefined ;
  public config_global : any = {};
  public op_cart = false;

  public carrito_arr : Array<any> = [];
  public url;
  public subtotal = 0;
  public socket = io('http://localhost:4201');

  public descuento_activo : any  = undefined;

  constructor(
    //inyectar servicios
    private _clienteService: ClienteService,
    private _router: Router,
    private _guestService: GuestService
  ) { 
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    //categorias
    this._clienteService.obtener_config_publico().subscribe(
      response=>{
        
        this.config_global = response.data;
        
      }
    )

    //validar la data del localstorage
    

    //console.log(this.user_lc);
  
    //condición si hay token
    if(this.token){
      this._clienteService.obtener_cliente_guest(this.id,this.token).subscribe(
        response =>{
          
          this.user = response.data;
          localStorage.setItem('user_data',JSON.stringify(this.user));
          if(localStorage.getItem('user_data')){
            this.user_lc = JSON.parse(localStorage.getItem('user_data') || '{}');

            this.obtener_carrito_cliente();

          }else{
            this.user_lc = undefined;
          }
          
          
        },
        error=>{
         
          this.user = undefined;
        }
      );
    }
    
  }

  obtener_carrito_cliente(){
    //servicio, obtener carro
    this._clienteService.obtener_carrito_cliente(this.user_lc._id, this.token).subscribe(
      response =>{
        this.carrito_arr = response.data;
        this.calcular_carrito();

      }
    );
  }

  ngOnInit(): void {
    
    this.socket.on('new-carrito', this.obtener_carrito_cliente.bind(this));
    this.socket.on('new-carrito-add', this.obtener_carrito_cliente.bind(this));
    
    this._guestService.obtener_descuento_activo().subscribe(
      response =>{
        
        if(response.data != undefined){
          this.descuento_activo = response.data[0];
          
        }else{
          this.descuento_activo = undefined;
        }

               
      }
    );
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }
  //carrito con un bool
  op_modalcart(){
    if(!this.op_cart){
      this.op_cart = true;
      $('#cart').addClass('show');
    }else{
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }

  //metodo para calcular el total del carro
  calcular_carrito(){
    this.subtotal = 0
    if(this.descuento_activo == undefined){
      this.carrito_arr.forEach(element =>{
        this.subtotal = this.subtotal + parseInt(element.producto.precio);
        
      });
    }else if(this.descuento_activo != undefined){
      this.carrito_arr.forEach(element =>{
        let new_precio = Math.round(parseInt(element.producto.precio) - (parseInt(element.producto.precio)*this.descuento_activo.descuento)/100);
        this.subtotal = this.subtotal + new_precio;
        
      });
    }
  }

  eliminar_item(id){
    this._clienteService.eliminar_carrito_cliente(id,this.token).subscribe(
      response =>{
        iziToast.show({
          title: 'SUCESS',
          titleColor: '#33FFB2',
          class: 'text-sucess',
          position: 'topRight',
          message: 'Se elimino el producto del carrito.'
        });
        this.socket.emit('delete-carrito',{data:response.data});
        console.log(response);
        
      }
    );
  }


}
