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
export class LoginService {

  private urlApi:string="https://serviciousuariokaratepro.onrender.com/api/" + "Login/";

  constructor(private http:HttpClient) { }

  IniciarSesion(request:Login):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}inicioSesion`, request);
  }

  Registrarse(request:UsuarioAUsuario):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}registrarse`, request);
  }

  validarToken(token:String):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}validarToken?token=${token}`);
  }


}
