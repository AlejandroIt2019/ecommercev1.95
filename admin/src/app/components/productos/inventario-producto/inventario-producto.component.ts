
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id:any;
  public token;
  public producto : any = {};
  public inventarios : Array<any>=[];

  constructor(
    private _route : ActivatedRoute,
    private _productoService : ProductoService

  ) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);

        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;
              
              this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
                response=>{
                  
                  this.inventarios = response.data;
                  console.log(this.inventarios);
                  
                },
                error=>{
                  console.log(error);
                  
                }
              )
            }
            
          },
          error=>{
            console.log(error);
            
          }
        );

        
      }
    );
  }

}
