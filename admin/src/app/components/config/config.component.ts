import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
declare var iziToast:any;
declare var jQuery: any;
declare var $: any;
//import { v4 as uuidv4 } from 'uuid';
import * as uuidv4 from 'uuid';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token;
  public config : any = {};

  public titulo_cat = '';
  public icono_cat = '';

  constructor(
    private _adminService: AdminService
  ) { 
    this.token = localStorage.getItem('token');
    this._adminService.obtener_config_admin(this.token).subscribe(
      response=>{
        
        this.config = response.data;
        console.log(this.config);
        
        
        
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  ngOnInit(): void {
  }


  agregar_cat(){
    if(this.titulo_cat && this.icono_cat){
      console.log(uuidv4());
      
      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4()
      });

      this.titulo_cat = '';
      this.icono_cat = '';
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe ingresar un titulo e icono para la categoria :)'
      });
    }
  }
}
