import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../interfaces/response-api';
import { Observable } from 'rxjs/internal/Observable';
import { RangoARango } from '../interfaces/rango-a-rango';
import { TecnicaATecnica } from '../interfaces/tecnica-a-tecnica';

@Injectable({
  providedIn: 'root'
})
export class TecnicaService {

  private urlApi:string="https://serviciopeleakaratepro.onrender.com/api/" + "Tecnica/";

  constructor(private http:HttpClient) { }

  

  consultaTodoTecnica():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}consultaTodo`);
  }

  grabaTecnica(request:TecnicaATecnica):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}grabar`, request);
  }

  actualizaTecnica(request:TecnicaATecnica):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}actualizar`, request);
  }

 /* buscarUsuario(request:UsurioNombre):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}buscar`, request);
  }*/

  eliminarTecnica(request:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${request}`);
  }
}

