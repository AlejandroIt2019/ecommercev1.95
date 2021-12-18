import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //crear variables para vincular con los input
  public user: any = {};
  public usuario: any = {};
  public token:any;


  public cliente: any = {};
  

  constructor(
    private _clienteService: ClienteService,
    private _router : Router,
    
  ) { 
    this.token = localStorage.getItem('token');
    if(this.token){
      this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  //función del form
  login(loginForm:any){
    if(loginForm.valid){
      
      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._clienteService.login_cliente(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: response.message
            });
          }else{
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);
            
            this._clienteService.obtener_cliente_guest(response.data._id,response.token).subscribe(
              response =>{
                console.log(response);
                
              },
              error=>{
                console.log(error);
                
              }
            );

            this._router.navigate(['/']);

          }
         
        },
        error=>{
          console.log(error);
          
        }
      );
      
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }

  registro(registroForm:any){
    if(registroForm.valid){
      

      this._clienteService.registro_cliente(this.cliente).subscribe(
        response=>{
          console.log(response);
            iziToast.show({
              title: 'SUCESS',
              titleColor: '#33FFB2',
              class: 'text-sucess',
              position: 'topRight',
              message: 'Se registro correctamente el nuevo cliente'
            });
          this.cliente = {
          
            nombres: this.cliente.nombres,
            apellidos: this.cliente.apellidos,
            email: this.cliente.email,
            password: this.cliente.password
          }
          
          this._router.navigate(['/login']);
        },
        error=>{
          console.log(error);
          
        }
      );
      
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }
}
