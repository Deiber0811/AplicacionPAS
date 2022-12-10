import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../Auth/Authservice";


@Injectable({
    providedIn:'root'
  })
  
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.isAuthenticated().then(

          (authenticated: boolean) => {
            if(authenticated) {
              return true;
            } else {
              this.router.navigate(['/login']);
            }
          }
        );
    }

}



