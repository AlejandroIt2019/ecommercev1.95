import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';
declare var iziToast:any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public contacto : any = {};
  public load_btn = false;

  constructor(
    private _guestService : GuestService
  ) { }

  ngOnInit(): void {
  }



  registro(registroForm:any){
    this.load_btn = true;
    if(registroForm.valid){
      this._guestService.enviar_mensaje_contacto(this.contacto).subscribe(
        response =>{
          console.log(response);
            iziToast.show({
              title: 'SUCESS',
              titleColor: '#33FFB2',
              class: 'text-sucess',
              position: 'topRight',
              message: 'Se envió correctamente el mensaje.'
            });
            this.contacto = {};
            this.load_btn = false;
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
