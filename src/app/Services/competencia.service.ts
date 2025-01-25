import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { ResponseApi } from '../interfaces/response-api';
import { Observable } from 'rxjs/internal/Observable';
import { ClubAClub } from '../interfaces/club-a-club';
import { CompetenciaACompetencia } from '../interfaces/competencia-a-competencia';

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  private urlApi:string="https://serviciocompetenciakaratepro.onrender.com" + "Competencia/";

  constructor(private http:HttpClient) { }

  

  consultaTodoCompetencia():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}consultaTodo`);
  }

  grabaCompetencia(request:CompetenciaACompetencia):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}grabar`, request);
  }

  actualizaCompetencia(request:CompetenciaACompetencia):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}actualizar`, request);
  }

 /* buscarUsuario(request:UsurioNombre):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}buscar`, request);
  }*/

  eliminarCompetencia(request:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${request}`);
  }
}