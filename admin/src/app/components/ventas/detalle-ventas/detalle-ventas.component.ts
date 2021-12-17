import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentasComponent implements OnInit {

  public url:any;
  public token:any;
  public orden : any = {};
  public detalles : Array<any> = [];
  public load_data = true;
  public id:any;

  constructor(
    private _route: ActivatedRoute,
    private _adminService: AdminService
  ) { 
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params =>{
        this.id = params['id'];

        this._adminService.obtener_detalles_ordenes_cliente(this.id,this.token).subscribe(
          response=>{

            if(response.data != undefined){
              this.orden = response.data;
              this.detalles = response.detalles;
              this.load_data = false;
            }else{
              this.orden = undefined;
            }
            
            console.log(this.detalles);
            
            
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }

}
