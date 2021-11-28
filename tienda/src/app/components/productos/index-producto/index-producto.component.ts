import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var noUiSlider:any;
declare var $:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public config_global : any = {};
  public filter_categoria = '';
  public productos : Array<any> = [];
  public filter_producto = '';
  public filter_cat_producto = 'todos';
  public url;

  public load_data = true;
  public route_categoria;
  public page = 1;
  public pageSize = 9;

  public sort_by = 'Defecto'
  

  constructor(
    private _clienteService: ClienteService,
    private _route: ActivatedRoute
  ) {
    //contructor
    this.url = GLOBAL.url;
    this._clienteService.obtener_config_publico().subscribe(
      response=>{
        
        this.config_global = response.data;
        
        //console.log(this.config_global); por si algo falla 
      }
    )
    
      //route
      this._route.params.subscribe(
        params=>{
          this.route_categoria = params['categoria'];
          
          if(this.route_categoria){
            this._clienteService.listar_productos_publico('').subscribe(
              response=>{
                //console.log(response); por si algo falla
                this.productos = response.data;
                this.productos = this.productos.filter(item =>item.categoria.toLowerCase() == this.route_categoria);
                this.load_data = false;
              }
            );
          }else{
            this._clienteService.listar_productos_publico('').subscribe(
              response=>{
                //console.log(response); por si algo falla
                this.productos = response.data;
                this.load_data = false;
              }
            );
          }
          
        }
      );

    //mostrar todos los productos
   
   }

  ngOnInit(): void {
    //0, 1000
    var slider : any = document.getElementById('slider');
    noUiSlider.create(slider, {
        start: [0, 1000000],
        connect: true,
        range: {
            'min': 0,
            'max': 1000000
        },
        tooltips: [true,true],
        pips: {
          mode: 'count', 
          values: 5,
          
        }
    })

    slider.noUiSlider.on('update', function (values:any) {
        $('.cs-range-slider-value-min').val(values[0]);
        $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');


  }


  buscar_categorias(){
    
    if(this.filter_categoria){
      var search = new RegExp(this.filter_categoria, 'i');
      this.config_global.categorias = this.config_global.categorias.filter(
        item=>search.test(item.titulo)
      );
    }else{
      this._clienteService.obtener_config_publico().subscribe(
        response=>{
          
          this.config_global = response.data;
           
          
        }
      )
    }
    
  }

  buscar_producto(){
    this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
      response=>{
        //console.log(response); por si algo falla
        this.productos = response.data;
        this.load_data = false;
      }
    );
  }
  //para el botón de rango de precios, está vinculado con el html evento ngclick
  buscar_precios(){

    this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
      response=>{
        //console.log(response); por si algo falla
        this.productos = response.data;
        let min = parseInt($('.cs-range-slider-value-min').val());
        let max = parseInt($('.cs-range-slider-value-max').val());
        //verificación
        console.log(min);
        console.log(max);
        
        this.productos = this.productos.filter((item)=>{
          return item.precio >= min && 
                  item.precio <= max
        });
        
        
      }
    );

    
    
  }

  buscar_por_categoria(){
    if(this.filter_cat_producto == 'todos'){
      this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
        response=>{
          //console.log(response); por si algo falla
          this.productos = response.data;
          
          this.load_data = false;
        }
      );
    }else{
      this._clienteService.listar_productos_publico(this.filter_producto).subscribe(
        response=>{
          //console.log(response); por si algo falla
          this.productos = response.data;
          this.productos = this.productos.filter(item =>item.categoria == this.filter_cat_producto);
          this.load_data = false;
        }
      );
      
    }
    
  }

  reset_productos(){
    this.filter_producto = '';
    this._clienteService.listar_productos_publico('').subscribe(
      response=>{
        //console.log(response); por si algo falla
        this.productos = response.data;
        this.load_data = false;
      }
    );
  }

  orden_por(){
    if(this.sort_by == 'Defecto'){
      this._clienteService.listar_productos_publico('').subscribe(
        response=>{
          //console.log(response); por si algo falla
          this.productos = response.data;
          this.load_data = false;
        }
      );
    }else if(this.sort_by == 'Popularidad'){
      this.productos.sort((a, b) => {

        if (a.nventas < b.nventas) {
          return 1;
        }
        if (a.nventas > b.nventas) {
          return -1;
        }
        // a debe ser igual que b
        return 0;
      });
    }else if(this.sort_by == '+-Precio'){
      this.productos.sort((a, b) => {

        if (a.precio < b.precio) {
          return 1;
        }
        if (a.precio > b.precio) {
          return -1;
        }
        // a debe ser igual que b
        return 0;
      });
    }else if(this.sort_by == '-+Precio'){
      this.productos.sort((a, b) => {
        //cambio de condición > <
        if (a.precio > b.precio) {
          return 1;
        }
        if (a.precio < b.precio) {
          return -1;
        }
        // a debe ser igual que b
        return 0;
      });
    }else if(this.sort_by == 'azTitulo'){
      this.productos.sort((a, b) => {
        //cambio de condición > <
        if (a.titulo > b.titulo) {
          return 1;
        }
        if (a.titulo < b.titulo) {
          return -1;
        }
        // a debe ser igual que b
        return 0;
      });
    }else if(this.sort_by == 'zaTitulo'){
      this.productos.sort((a, b) => {
        //cambio de condición > <
        if (a.titulo < b.titulo) {
          return 1;
        }
        if (a.titulo > b.titulo) {
          return -1;
        }
        // a debe ser igual que b
        return 0;
      });
    }
  }


}
