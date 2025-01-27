import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../interfaces/response-api';
import { Observable } from 'rxjs/internal/Observable';
import { RangoARango } from '../interfaces/rango-a-rango';

@Injectable({
  providedIn: 'root'
})
export class RangoService {

  private urlApi:string="https://serviciopeleakaratepro.onrender.com/api/"+ "Rango/";

  constructor(private http:HttpClient) { }

  

  consultaTodoRango():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}consultaTodo`);
  }

  grabaRango(request:RangoARango):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}grabar`, request);
  }

  actualizaRango(request:RangoARango):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}actualizar`, request);
  }

 /* buscarUsuario(request:UsurioNombre):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}buscar`, request);
  }*/

  eliminarRango(request:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${request}`);
  }
}
