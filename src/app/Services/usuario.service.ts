import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { ResponseApi } from '../interfaces/response-api';
import { Login } from '../interfaces/login';
import { Usuario } from '../interfaces/usuario';
import { UsurioNombre } from '../interfaces/usuario-nombre';
import { UsurioId } from '../interfaces/usuario-id';
import { UsuarioAUsuario } from '../interfaces/usuario-a-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApi:string="https://serviciousuariokaratepro.onrender.com/api/" + "Usuario/";

  constructor(private http:HttpClient) { }

  

  listaUsuarios():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}consultaTodo`);
  }

  guardarUsuario(request:UsuarioAUsuario):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}grabar`, request);
  }

  editarUsuario(request:UsuarioAUsuario):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}actualizar`, request);
  }

 /* buscarUsuario(request:UsurioNombre):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}buscar`, request);
  }*/

  eliminarUsuario(request:number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${request}`);
  }



}
