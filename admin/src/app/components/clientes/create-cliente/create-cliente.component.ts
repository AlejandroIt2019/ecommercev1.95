import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ValidarRutService } from 'src/app/services/validar-rut.service';
declare var iziToast:any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente : any = {
    genero: ''
  }; 
  public token:any;
  public load_btn = false;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router,
    private _validarRutService:ValidarRutService
  ) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
  }

  registro(registroForm:NgForm){
    if(!this._validarRutService.validateRUT(this.cliente.rut)){
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Rut no valido'
      });
      return
    }
    if(registroForm.valid){
      console.log(this.cliente);

      this.load_btn = true;
      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
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
            genero: '',
            nombres: '',
            apellidos: '',
            f_nacimiento: '',
            telefono: '',
            rut: '',
            email: ''
          }
          this.load_btn = false;
          this._router.navigate(['/panel/clientes']);
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
