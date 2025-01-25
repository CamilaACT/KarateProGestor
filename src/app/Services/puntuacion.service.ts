import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../interfaces/response-api';
import { Observable } from 'rxjs/internal/Observable';
import { RangoARango } from '../interfaces/rango-a-rango';
import { PeleaAPelea } from '../interfaces/pelea-a-pelea';
import { PuntuacionAPuntuacion } from '../interfaces/puntuacion-a-puntuacion';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  private urlApi:string=environment.apiUrl + "Puntuacion/";

  constructor(private http:HttpClient) { }

  


  grabaPuntuacion(request:PuntuacionAPuntuacion):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}grabar`, request);
  }



  eliminarPuntuacion(request:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${request}`);
  }

  consultaPuntuacionId(request:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}consultaPuntosPorPelID/${request}`);
  }
}


