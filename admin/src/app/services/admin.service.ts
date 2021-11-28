import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor (

    private _http: HttpClient,
  
   ) {
    this.url = GLOBAL.url;
    }

   /*login_admin(data: { email: any; password:any;}):Observable<any>{ */
    /*login_admin(data:any):Observable<any>{  */
      login_admin(data: { email: any; password:any;}):Observable<any>{

      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.url + 'login_admin',data,{headers: headers});
   }

   getToken(){
     return localStorage.getItem('token');
   }

  public IsAuthenticated(allowRoles : string[]) :boolean{

    const token:any = localStorage.getItem('token');
    if(!token){
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);
      
      console.log(decodedToken);

      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }

      if(!decodedToken){
        console.log('noacceso');
        localStorage.removeItem('token');
        return false;  
      }
      } catch (error) {
        localStorage.removeItem('token');
        return false;
      }

    return allowRoles.includes(decodedToken['role']);

  }

  actualiza_config_admin(id:any,data:any,token:any):Observable<any>{
    if(data.logo){
      let headers = new HttpHeaders({'Authorization':token});

      const fd = new FormData();
  
      fd.append('titulo',data.titulo);
      fd.append('serie',data.serie);
      fd.append('correlativo',data.correlativo);
      fd.append('categorias',JSON.stringify(data.categorias));
      fd.append('logo',data.logo);

      return this._http.put(this.url+'actualiza_config_admin/'+id,fd,{headers:headers});
    }else{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url + 'actualiza_config_admin/'+id,data,{headers: headers});
      
    }
   
  }

  obtener_config_admin(token:any):Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url + 'obtener_config_admin',{headers: headers});
  }

  obtener_config_publico():Observable<any>{

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'obtener_config_publico',{headers: headers});
 }


}
