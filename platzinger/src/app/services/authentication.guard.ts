import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   // return false; // Al regresar false, el guardia no me deja navegar a la pantalla que esta aplicando, por ej, en este caso Home.
    return this.authenticationService.getStatus().pipe(
      map(status => {
        if(status){
          return true;
        }else{
          this.router.navigate(['login']);
          return false;
        }
      } )
    ); //Debo transformarlo a booleano, dado que no devuelve bool getStatus. Con el pipe map, chequeo si la sesion esta activa, si lo esta, return true, sino False
  }
  
}
