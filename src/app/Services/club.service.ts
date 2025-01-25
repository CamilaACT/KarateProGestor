import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { ResponseApi } from '../interfaces/response-api';
import { Observable } from 'rxjs/internal/Observable';
import { ClubAClub } from '../interfaces/club-a-club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private urlApi:string=environment.apiUrl + "Club/";

  constructor(private http:HttpClient) { }

  

  consultaTodoClub():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}consultaTodo`);
  }

  grabaClub(request:ClubAClub):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}grabar`, request);
  }

  actualizaClub(request:ClubAClub):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}actualizar`, request);
  }

 /* buscarUsuario(request:UsurioNombre):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}buscar`, request);
  }*/

  eliminarClub(request:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${request}`);
  }
}
