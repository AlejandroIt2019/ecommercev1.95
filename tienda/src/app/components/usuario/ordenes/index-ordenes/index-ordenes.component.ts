import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-ordenes',
  templateUrl: './index-ordenes.component.html',
  styleUrls: ['./index-ordenes.component.css']
})
export class IndexOrdenesComponent implements OnInit {

  public url;
  public token;
  public ordenes : Array<any> = [];
  public load_data = true;
  public user : any = {};

  public page = 1;
  public pageSize = 9;

  constructor(
    private _clienteService : ClienteService
  ) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._clienteService.obtener_ordenes_cliente(localStorage.getItem('_id'),this.token).subscribe(
      response =>{
        
        this.ordenes = response.data;
        
        this.load_data = false;
      }
    );
  }

}
