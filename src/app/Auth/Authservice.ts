import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import FileSaver from 'file-saver';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedIn = false;
  constructor(private http: HttpClient) { }

  isAuthenticated() {

    return new Promise((Ok, rejects) => {
      var islogin = localStorage.getItem('user') != undefined ? true : false
      Ok(islogin)

    })

  }

 async excel(IdSala: number, all) {
    return await this.http.get(`${environment.baseUrl}/api/v1/app/salas/excel/${IdSala}/${all}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        
          responseType: 'blob',
        }
      )
      .toPromise()
      .then((response) => this.saveAsBlob(`Consumos-${IdSala}`, response))
      .catch((_error) => console.log('Error al descargar el archivo', _error));
  }


  GetConsumption(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/app`);
  }

  private saveAsBlob(title: string, data: any) {
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    const file = new File([blob], 'reporte_' + title + '.xlsx', {
      type: 'application/vnd.ms-excel',
    });

    FileSaver.saveAs(file);
  }
  Login(user: string, password: string) {
    return new Promise((Ok, rejects) => {
      if (user == 'admin' && password == 'admin') {
        localStorage.setItem('user', 'admin')
        Ok(true)
      } else {
        localStorage.clear()
        rejects('Usuario  o contraseña erronea')
      }
    })

  }

}