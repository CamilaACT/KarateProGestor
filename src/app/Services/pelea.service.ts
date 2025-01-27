import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../interfaces/response-api';
import { Observable } from 'rxjs/internal/Observable';
import { RangoARango } from '../interfaces/rango-a-rango';
import { PeleaAPelea } from '../interfaces/pelea-a-pelea';

@Injectable({
  providedIn: 'root'
})
export class PeleaService {

  private urlApi:string="https://serviciopeleakaratepro.onrender.com/api/" + "Pelea/";

  constructor(private http:HttpClient) { }

  

  consultaTodoRango():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}consultaTodo`);
  }

  grabaRango(request:PeleaAPelea):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}grabar`, request);
  }

  grabaGanador(request: { pel_id: number }): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}grabarGanador`, request);
  }
  

  actualizaRango(request:PeleaAPelea):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}actualizar`, request);
  }

  eliminarRango(request:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${request}`);
  }

  consultaRivalesId(request:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}consultaRivalesID/${request}`);
  }
}

