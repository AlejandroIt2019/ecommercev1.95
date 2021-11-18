import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';
declare var iziToast:any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent implements OnInit {

  public token : any;
  public cupon : any = {
    tipo: ''
  };
  public load_btn = false;
  public id:any;
  public load_data = true;

  constructor(
    private _cuponService : CuponService,
    private _router : Router,
    private _route : ActivatedRoute
  ) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);
        
       this._cuponService.obtener_cupon_admin(this.id,this.token).subscribe(
         response=>{
           if(response.data == undefined){
            this.cupon = undefined;
            this.load_data = false;
           }else{
             this.cupon = response.data;
             this.load_data = false;
           }
           console.log(this.cupon);
           
         }
       )
      }
    )
  }

  actualizar(actualizarForm:any){
    if(actualizarForm.valid){
      this.load_btn = true;
      this._cuponService.actualizar_cupon_admin(this.id,this.cupon,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCESS',
            titleColor: '#33FFB2',
            class: 'text-sucess',
            position: 'topRight',
            message: 'Se actualizo correctamente el cupón.'
          });
          this.load_btn = false;
          this._router.navigate(['/panel/cupones']);
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
