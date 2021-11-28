import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

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


  constructor(
    //inyectar servicios
    private _clienteService: ClienteService,
    private _router: Router
  ) { 
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

  ngOnInit(): void {
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }

}
