import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { ResponseApi } from '../interfaces/response-api';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { UsuarioAUsuario } from '../interfaces/usuario-a-usuario';


@Injectable({
  providedIn: 'root'
})
export class InformeService {

  private urlApi:string="https://serviciocompetidorkaratepro.onrender.com" + "Informe/";

  constructor(private http:HttpClient) { }


  
  clubPorCompetencia(request: { com_id: number }): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}clubPorCompetencia`, request);
  }


  
  generarReporte(request: any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}competidorPorClubCompeTecForeach`, request);
  }
  

  // Obtener lista de competencias
  consultaCompetencias(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}consultaCompetencias`);
  }

  // Obtener lista de clubes
  consultaClubes(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}consultaClubes`);
  }

  // Obtener lista de técnicas
  consultaTecnicas(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}consultaTecnicas`);
  }

  // Obtener informe por club, competencia y técnica
  competidorPorClubCompeTecForeach(request: { com_id: number; clu_id: number; tec_id: number }): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}competidorPorClubCompeTecForeach`, request);
  }

  calcularEficiencia(comId: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}calcularEficiencia?comId=${comId}`);
  }

  topCompetidores(comId: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}topcompetidores?comId=${comId}`);
  }
  
  
  
}

