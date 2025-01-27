import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { ResponseApi } from '../interfaces/response-api';
import { Login } from '../interfaces/login';
import { Usuario } from '../interfaces/usuario';
import { Rol } from '../interfaces/rol';
import { CompetidorACompetidor } from '../interfaces/competidor-a-competidor';

@Injectable({
  providedIn: 'root'
})
export class CompetidorService {

  private urlApi:string="https://serviciocompetidorkaratepro.onrender.com/api/"+ "Competidor/";

  constructor(private http:HttpClient) { }

  

  consultaTodoRango():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}consultaTodo`);
  }

  grabaRango(request:CompetidorACompetidor):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}grabar`, request);
  }

  actualizaRango(request:CompetidorACompetidor):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}actualizar`, request);
  }

 /* buscarUsuario(request:UsurioNombre):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}buscar`, request);
  }*/

  eliminarRango(request:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${request}`);
  }
}
