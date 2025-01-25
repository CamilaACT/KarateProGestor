import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { ResponseApi } from '../interfaces/response-api';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const sesionString = localStorage.getItem("sesion") || "";
  const router = inject(Router);
  const accesoService = inject(LoginService);

  if (sesionString != "") {
  
    const sesion = JSON.parse(sesionString);

    const token = sesion.token;

    return new Observable<boolean | import("@angular/router").UrlTree>(observer => {
      accesoService.validarToken(token).subscribe({
        next: (respuesta: ResponseApi) => {
        
          if (respuesta.codigoError === -1) {
            observer.next(true);  
          } else {
            const url = router.createUrlTree(["login"]); 
            observer.next(url);   
          }
        },
        error: () => {
          
          const url = router.createUrlTree(["login"]);
          observer.next(url);
        },
        complete: () => observer.complete()
      });
    });
  } else {
    // Redirigir si no hay sesión o token
    const url = router.createUrlTree(["login"]);
    return url;
  }
  
};
