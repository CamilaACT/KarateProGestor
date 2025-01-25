import { HttpInterceptorFn } from '@angular/common/http';
import { UtilidadService } from '../Reutilizable/utilidad.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  //debugger;
  if(req.url.indexOf("Login")>0) return next(req);
  if(req.url.indexOf("Roles")>0) return next(req);

  const sesion = localStorage.getItem("sesion");
  if (sesion) {
    const sesionObj = JSON.parse(sesion); 
    const token = sesionObj.token; 

    if (token) {
      const clonRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(clonRequest);
    }
  }
  return next(req);
  
};
