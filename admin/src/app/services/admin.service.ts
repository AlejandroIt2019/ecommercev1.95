import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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

   login_admin(data: { email: any; password:any;}):Observable<any>{

      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.url + 'login_admin',data,{headers: headers});
   }

   getToken(){
     return localStorage.getItem('token');
   }
}
