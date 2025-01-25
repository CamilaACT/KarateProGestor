import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod'; 
import { ResponseApi } from '../interfaces/response-api';
import { Login } from '../interfaces/login';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private urlApi:string=environment.apiUrl + "Menu/";

  constructor(private http:HttpClient) { }  

  listaUsuarios(request:number):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}listaUsuarios`, request);
  }
}

