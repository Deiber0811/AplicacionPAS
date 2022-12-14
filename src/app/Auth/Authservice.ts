import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedIn = false;
  constructor(private http: HttpClient) {}
  
  isAuthenticated() {

    return new Promise((Ok, rejects) => {
      var islogin = localStorage.getItem('user') != undefined ? true : false
      Ok(islogin)

    })

  }
  GetConsumption(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/app`);
  }
  Login(user:string , password :string) {
    return new Promise((Ok, rejects) => {
      if(user=='admin' && password=='admin' ){
        localStorage.setItem('user','admin')
        Ok(true)
        }else{
        localStorage.clear()
        rejects('Usuario  o contraseña erronea' )
      }
    })

  }
  
}