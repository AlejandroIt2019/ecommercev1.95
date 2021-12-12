import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { GuestService } from 'src/app/services/guest.service';
import { io } from "socket.io-client";
declare var tns;
declare var lightGallery;
declare var iziToast;

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css']
})
export class ShowProductoComponent implements OnInit {
  //son los dato del producto
  public token;
  public slug;
  public producto: any = {};
  public url;
  public productos_rec : Array<any> = [];

  public carrito_data : any = {
    variedad: '',
    cantidad: 1
  };
  public btn_cart = false;

  public socket = io('http://localhost:4201');
  public descuento_activo : any  = undefined;

  constructor(
    private _route: ActivatedRoute,
    private _guestService : GuestService,
    private _clienteService : ClienteService
  ) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params =>{
        this.slug = params['slug'];
        
        this._guestService.obtener_productos_slug_publico(this.slug).subscribe(
          response =>{
            this.producto = response.data;
            
            //productos recomendados
            this._guestService.listar_productos_recomendados_publico(this.producto.categoria).subscribe(
              response =>{
                this.productos_rec = response.data;
                
              }
            );
            
          }
        );
        
      }
    );
   }

  ngOnInit(): void {

    //parte de la galeria
    setTimeout(()=>{
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
        gutter: 15,
      });

      //lightgallery
      var e = document.querySelectorAll(".cs-gallery");
      if (e.length){
        for (var t = 0; t < e.length; t++){
          lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }

      //slider
    tns({
      container: '.cs-carousel-inner-two',
      controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
      navPosition: "top",
      controlsPosition: "top",
      mouseDrag: !0,
      speed: 600,
      autoplayHoverPause: !0,
      autoplayButtonOutput: !1,
      nav: false,
      controlsContainer: "#custom-controls-related",
      responsive: {
        0: {
          items: 1,
          gutter: 20
        },
        480: {
          items: 2,
          gutter: 24
        },
        700: {
          items: 3,
          gutter: 24
        },
        1100: {
          items: 4,
          gutter: 30
        }
      }
    });


    },500);

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

  agregar_producto(){
    if(this.carrito_data.variedad){
      if(this.carrito_data.cantidad <= this.producto.stock){
        let data = {
          producto: this.producto._id,
          cliente: localStorage.getItem('_id'),
          cantidad: this.carrito_data.cantidad,
          variedad: this.carrito_data.variedad,
        }
        this.btn_cart = true;
        //devolver la data al backend
        this._clienteService.agregar_carrito_cliente(data,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                class: 'text-danger',
                position: 'topRight',
                message: 'El producto ya existe en el carrito'
              });
              this.btn_cart = false;
            }else{
              console.log(response);
                iziToast.show({
                  title: 'SUCESS',
                  titleColor: '#33FFB2',
                  class: 'text-sucess',
                  position: 'topRight',
                  message: 'Se agrego el producto al carrito.'
                });
                this.socket.emit('add-carrito-add',{data:true});
                this.btn_cart = false;
                
            }
            
          }
        );
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'La máxima cantidad disponible es: '+this.producto.stock
        });
      }
    }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'Seleccione una variedad de producto'
        });
    }
  }

}
