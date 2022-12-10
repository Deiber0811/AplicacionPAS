import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedIn = false;

  isAuthenticated() {

    return new Promise((Ok, rejects) => {
      var islogin = localStorage.getItem('user') != undefined ? true : false
      Ok(islogin)

    })

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